import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Slider,
  Stack,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const MinimumSpanningTreeVisualizer = () => {
  // Constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 500;
  const NODE_RADIUS = 20;
  const DEFAULT_VERTICES = 8;
  const DEFAULT_EDGE_PROBABILITY = 0.5;
  const MAX_EDGE_WEIGHT = 20;
  const MIN_EDGE_WEIGHT = 1;


  // Node status colors
  const COLORS = {
    NORMAL: '#757575',
    ACTIVE: '#2196f3',
    VISITED: '#4caf50',
    CONSIDERING: '#ff9800',
    HIGHLIGHT: '#f44336',
    MST_EDGE: '#4caf50',
    EDGE_HIGHLIGHT: '#ff9800',
    EDGE_NORMAL: '#bdbdbd',
    EDGE_CONSIDERING: '#ff9800',
    TEXT_COLOR: '#fff',
    WEIGHT_COLOR: '#212121'
  };

  // States for visualization
  const [graph, setGraph] = useState({ vertices: [], edges: [] });
  const [algorithms] = useState([
    { id: 'prim', name: "Prim's Algorithm", color: '#2196f3' },
    { id: 'kruskal', name: "Kruskal's Algorithm", color: '#f44336' }
  ]);
  const [algorithmStates, setAlgorithmStates] = useState({});
  const [activeAlgorithm, setActiveAlgorithm] = useState('prim');
  const [vertexCount, setVertexCount] = useState(DEFAULT_VERTICES);
  const [edgeProbability, setEdgeProbability] = useState(DEFAULT_EDGE_PROBABILITY);
  const [runningState, setRunningState] = useState('idle');
  const [speed, setSpeed] = useState(50);
  const [showWeights, setShowWeights] = useState(true);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isDraggingRef = useRef(false);
  const draggedNodeRef = useRef(null);

  // Generate a random graph
  useEffect(() => {
    generateRandomGraph();
  }, [vertexCount, edgeProbability]);

  // Render graph whenever graph changes
  useEffect(() => {
    renderGraph();
  }, [graph, algorithmStates, activeAlgorithm]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Generate random graph with vertices and edges
  const generateRandomGraph = () => {
    // Reset animation state
    if (runningState === 'running') {
      pauseVisualization();
    }
    setRunningState('idle');

    // Create vertices distributed in a circle
    const vertices = [];
    const angleStep = (2 * Math.PI) / vertexCount;
    const radius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.4;
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    for (let i = 0; i < vertexCount; i++) {
      const angle = i * angleStep;
      vertices.push({
        id: i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        status: 'normal'
      });
    }

    // Create edges with random weights
    const edges = [];
    for (let i = 0; i < vertexCount; i++) {
      for (let j = i + 1; j < vertexCount; j++) {
        if (Math.random() < edgeProbability) {
          edges.push({
            source: i,
            target: j,
            weight: Math.floor(Math.random() * (MAX_EDGE_WEIGHT - MIN_EDGE_WEIGHT + 1)) + MIN_EDGE_WEIGHT,
            status: 'normal'
          });
        }
      }
    }

    setGraph({ vertices, edges });
    resetAlgorithmStates(vertices, edges);
  };

  // Reset algorithm states
  const resetAlgorithmStates = (vertices, edges) => {
    const initialStates = {};

    algorithms.forEach(algorithm => {
      initialStates[algorithm.id] = {
        vertices: vertices.map(v => ({ ...v, status: 'normal' })),
        edges: edges.map(e => ({ ...e, status: 'normal' })),
        animation: [],
        currentStep: 0,
        finished: false,
        mstEdges: [],
        mstWeight: 0
      };
    });

    setAlgorithmStates(initialStates);
  };

  // Handle algorithm selection
  const handleAlgorithmChange = (event, newAlgorithm) => {
    if (newAlgorithm !== null) {
      setActiveAlgorithm(newAlgorithm);
    }
  };

  // Handle speed change
  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };

  // Render the graph on canvas
  const renderGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const state = algorithmStates[activeAlgorithm];
    if (!state) return;

    // Draw edges
    state.edges.forEach(edge => {
      const sourceVertex = state.vertices[edge.source];
      const targetVertex = state.vertices[edge.target];

      let edgeColor = COLORS.EDGE_NORMAL;
      let lineWidth = 2;

      // Check if this edge is part of the MST
      const isMSTEdge = state.mstEdges.some(
        mstEdge => (mstEdge.source === edge.source && mstEdge.target === edge.target) ||
          (mstEdge.source === edge.target && mstEdge.target === edge.source)
      );

      if (isMSTEdge) {
        edgeColor = COLORS.MST_EDGE;
        lineWidth = 4;
      } else if (edge.status === 'considering') {
        edgeColor = COLORS.EDGE_CONSIDERING;
        lineWidth = 3;
      } else if (edge.status === 'highlight') {
        edgeColor = COLORS.EDGE_HIGHLIGHT;
        lineWidth = 3;
      }

      drawEdge(ctx, sourceVertex, targetVertex, edge.weight, edgeColor, lineWidth);
    });

    // Draw vertices
    state.vertices.forEach(vertex => {
      let color = COLORS.NORMAL;

      if (vertex.status === 'active') {
        color = COLORS.ACTIVE;
      } else if (vertex.status === 'visited') {
        color = COLORS.VISITED;
      } else if (vertex.status === 'considering') {
        color = COLORS.CONSIDERING;
      } else if (vertex.status === 'highlight') {
        color = COLORS.HIGHLIGHT;
      }

      drawVertex(ctx, vertex, color);
    });

    // Debug: Draw current step information
    if (state.animation && state.currentStep < state.animation.length) {
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(`Step: ${state.currentStep}/${state.animation.length}`, 10, 20);

      const currentStep = state.animation[state.currentStep - 1];
      if (currentStep && currentStep.message) {
        ctx.fillText(currentStep.message, 10, 40);
      }
    }
  };

  // Draw a vertex
  const drawVertex = (ctx, vertex, color) => {
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, NODE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw vertex label
    ctx.fillStyle = COLORS.TEXT_COLOR;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(vertex.id.toString(), vertex.x, vertex.y);
  };

  // Draw an edge
  const drawEdge = (ctx, source, target, weight, color, lineWidth = 2) => {
    // Draw edge line
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Draw weight label if enabled
    if (showWeights) {
      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2;

      // Draw small white circle behind the weight
      ctx.beginPath();
      ctx.arc(midX, midY, 12, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw weight
      ctx.fillStyle = COLORS.WEIGHT_COLOR;
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(weight.toString(), midX, midY);
    }
  };

  // Start visualization
  const startVisualization = () => {
    if (runningState === 'running') return;

    if (runningState === 'idle') {
      // Generate algorithm steps
      const algorithm = activeAlgorithm;
      let animation = [];

      if (algorithm === 'prim') {
        animation = generatePrimAlgorithmSteps();
      } else if (algorithm === 'kruskal') {
        animation = generateKruskalAlgorithmSteps();
      }

      // Only proceed if we have animation steps
      if (animation.length === 0) {
        console.log("No animation steps generated");
        return;
      }

      console.log(`Generated ${animation.length} animation steps for ${algorithm}`);

      const newState = {
        ...algorithmStates[algorithm],
        animation,
        currentStep: 0,
        finished: false,
        mstEdges: []
      };

      setAlgorithmStates(prevState => ({
        ...prevState,
        [algorithm]: newState
      }));

      setRunningState('running');
      // Use setTimeout to ensure state is updated before animation starts
      setTimeout(() => {
        animateStep();
      }, 50);
    } else if (runningState === 'paused') {
      setRunningState('running');
      animateStep();
    }
  };

  // Pause visualization
  const pauseVisualization = () => {
    if (runningState !== 'running') return;

    setRunningState('paused');
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Reset visualization
  const resetVisualization = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    resetAlgorithmStates(graph.vertices, graph.edges);
    setRunningState('idle');
  };

  // Generate steps for Prim's algorithm
  const generatePrimAlgorithmSteps = () => {
    const animation = [];
    const vertices = [...graph.vertices];
    const edges = [...graph.edges];

    console.log(`Starting Prim's algorithm with ${vertices.length} vertices and ${edges.length} edges`);

    if (vertices.length === 0) {
      console.log("No vertices in graph");
      return animation;
    }

    // Make a copy of edges that's easier to work with
    const adjList = {};
    vertices.forEach(vertex => {
      adjList[vertex.id] = [];
    });

    edges.forEach(edge => {
      adjList[edge.source].push({ to: edge.target, weight: edge.weight, original: edge });
      adjList[edge.target].push({ to: edge.source, weight: edge.weight, original: edge });
    });

    // Initialize arrays for tracking
    const visited = new Array(vertices.length).fill(false);
    const mstEdges = [];
    let mstWeight = 0;

    // Start with vertex 0
    visited[0] = true;

    // Mark starting vertex as active
    animation.push({
      type: 'updateVertex',
      id: 0,
      status: 'active',
      message: 'Starting with vertex 0'
    });

    // Collect all edges from vertex 0
    const priorityQueue = [];
    adjList[0].forEach(edge => {
      priorityQueue.push({
        source: 0,
        target: edge.to,
        weight: edge.weight,
        original: edge.original
      });

      animation.push({
        type: 'considerEdge',
        edge: {
          source: 0,
          target: edge.to,
          weight: edge.weight
        },
        message: `Considering edge (0-${edge.to}) with weight ${edge.weight}`
      });
    });

    console.log(`Added ${priorityQueue.length} edges from vertex 0 to priority queue`);

    // Sort the priority queue by weight
    priorityQueue.sort((a, b) => a.weight - b.weight);

    // Main loop - continue until all vertices are visited or priority queue is empty
    while (priorityQueue.length > 0 && mstEdges.length < vertices.length - 1) {
      // Get the edge with minimum weight
      const minEdge = priorityQueue.shift();
      console.log(`Processing minimum edge (${minEdge.source}-${minEdge.target}) with weight ${minEdge.weight}`);

      animation.push({
        type: 'highlightEdge',
        edge: minEdge,
        message: `Checking edge (${minEdge.source}-${minEdge.target}) with weight ${minEdge.weight}`
      });

      // If the target vertex is already visited, skip this edge
      if (visited[minEdge.target]) {
        console.log(`Vertex ${minEdge.target} is already visited, skipping edge`);
        animation.push({
          type: 'skipEdge',
          edge: minEdge,
          message: `Vertex ${minEdge.target} is already in the MST. Skipping edge.`
        });
        continue;
      }

      // Explicitly highlight vertices
      animation.push({
        type: 'updateVertex',
        id: minEdge.source,
        status: 'active',
        message: `Highlighting source vertex ${minEdge.source}`
      });

      animation.push({
        type: 'updateVertex',
        id: minEdge.target,
        status: 'active',
        message: `Highlighting target vertex ${minEdge.target}`
      });

      // Add the edge to MST
      mstEdges.push(minEdge);
      mstWeight += minEdge.weight;
      visited[minEdge.target] = true;
      console.log(`Added edge to MST, marking vertex ${minEdge.target} as visited`);

      animation.push({
        type: 'addEdgeToMST',
        edge: minEdge,
        vertex: minEdge.target,
        mstWeight,
        message: `Adding edge (${minEdge.source}-${minEdge.target}) to MST. Total weight: ${mstWeight}`
      });

      // Add all edges of the newly added vertex to the priority queue
      adjList[minEdge.target].forEach(edge => {
        if (!visited[edge.to]) {
          console.log(`Adding edge (${minEdge.target}-${edge.to}) with weight ${edge.weight} to priority queue`);
          priorityQueue.push({
            source: minEdge.target,
            target: edge.to,
            weight: edge.weight,
            original: edge.original
          });

          animation.push({
            type: 'considerEdge',
            edge: {
              source: minEdge.target,
              target: edge.to,
              weight: edge.weight
            },
            message: `Considering edge (${minEdge.target}-${edge.to}) with weight ${edge.weight}`
          });
        }
      });

      // Re-sort the priority queue
      priorityQueue.sort((a, b) => a.weight - b.weight);
    }

    // Final animation step
    animation.push({
      type: 'complete',
      mstEdges,
      mstWeight,
      message: `Prim's algorithm complete. MST weight: ${mstWeight}`
    });

    console.log(`Generated ${animation.length} animation steps for Prim`);
    return animation;
  };

  // Generate steps for Kruskal's algorithm
  const generateKruskalAlgorithmSteps = () => {
    const animation = [];
    const vertices = [...graph.vertices];
    const edges = [...graph.edges];

    console.log(`Starting Kruskal's algorithm with ${vertices.length} vertices and ${edges.length} edges`);

    if (vertices.length === 0) {
      console.log("No vertices in graph");
      return animation;
    }

    // Sort all edges by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    console.log(`Sorted ${sortedEdges.length} edges by weight`);

    animation.push({
      type: 'message',
      message: 'Sorting all edges by weight'
    });

    // Initialize disjoint set for each vertex
    const parent = Array(vertices.length).fill().map((_, i) => i);

    // Find function for the disjoint set
    const find = (i) => {
      if (parent[i] !== i) {
        parent[i] = find(parent[i]);
      }
      return parent[i];
    };

    // Union function for the disjoint set
    const union = (i, j) => {
      parent[find(i)] = find(j);
    };

    // Track the MST
    const mstEdges = [];
    let mstWeight = 0;

    // Initialize all vertices as not visited
    animation.push({
      type: 'initVertices',
      message: 'Initializing all vertices'
    });

    // Process edges in ascending order of weight
    for (const edge of sortedEdges) {
      console.log(`Processing edge (${edge.source}-${edge.target}) with weight ${edge.weight}`);

      animation.push({
        type: 'considerEdge',
        edge,
        message: `Considering edge (${edge.source}-${edge.target}) with weight ${edge.weight}`
      });

      animation.push({
        type: 'highlightEdge',
        edge,
        message: `Checking if adding edge (${edge.source}-${edge.target}) creates a cycle`
      });

      const rootSource = find(edge.source);
      const rootTarget = find(edge.target);
      console.log(`Vertex ${edge.source} is in set ${rootSource}, vertex ${edge.target} is in set ${rootTarget}`);

      animation.push({
        type: 'highlightVertices',
        vertices: [edge.source, edge.target],
        message: `Checking vertices ${edge.source} (set ${rootSource}) and ${edge.target} (set ${rootTarget})`
      });

      // If including this edge doesn't create a cycle, add it to MST
      if (rootSource !== rootTarget) {
        console.log(`Adding edge (${edge.source}-${edge.target}) to MST`);
        union(rootSource, rootTarget);
        mstEdges.push(edge);
        mstWeight += edge.weight;

        // Explicitly set vertex status to active before adding to MST
        animation.push({
          type: 'updateVertex',
          id: edge.source,
          status: 'active',
          message: `Highlighting vertex ${edge.source}`
        });

        animation.push({
          type: 'updateVertex',
          id: edge.target,
          status: 'active',
          message: `Highlighting vertex ${edge.target}`
        });

        animation.push({
          type: 'addEdgeToMST',
          edge,
          mstWeight,
          message: `Adding edge (${edge.source}-${edge.target}) to MST. Total weight: ${mstWeight}`
        });

        // If we have n-1 edges, MST is complete
        if (mstEdges.length === vertices.length - 1) {
          console.log("MST complete with", mstEdges.length, "edges");
          break;
        }
      } else {
        console.log(`Skipping edge (${edge.source}-${edge.target}) to avoid cycle`);
        animation.push({
          type: 'skipEdge',
          edge,
          message: `Edge (${edge.source}-${edge.target}) would create a cycle. Skipping.`
        });
      }
    }

    // Final animation step
    animation.push({
      type: 'complete',
      mstEdges,
      mstWeight,
      message: `Kruskal's algorithm complete. MST weight: ${mstWeight}`
    });

    console.log(`Generated ${animation.length} animation steps for Kruskal`);
    return animation;
  };

  // Animate a single step of the algorithm
  const animateStep = () => {
    if (runningState !== 'running') return;

    const algorithm = activeAlgorithm;
    const state = algorithmStates[algorithm];

    if (!state || state.currentStep >= state.animation.length) {
      setRunningState('finished');
      return;
    }

    const currentStep = state.animation[state.currentStep];
    const newVertices = [...state.vertices];
    const newEdges = [...state.edges];
    let newMSTEdges = [...state.mstEdges];
    let newMSTWeight = state.mstWeight;

    // Process step based on type
    switch (currentStep.type) {
      case 'message':
        // Just a message, no state changes
        break;

      case 'initVertices':
        // Reset all vertices to normal status
        newVertices.forEach(vertex => {
          vertex.status = 'normal';
        });
        break;

      case 'updateVertex':
        // Update a specific vertex's status
        if (currentStep.id < newVertices.length) {
          newVertices[currentStep.id].status = currentStep.status;

          // Log the change for debugging
          console.log(`Updated vertex ${currentStep.id} status to ${currentStep.status}`);
        }
        break;

      case 'considerEdge':
        // Find the edge in our newEdges array
        const edgeToConsider = newEdges.find(
          e => (e.source === currentStep.edge.source && e.target === currentStep.edge.target) ||
            (e.source === currentStep.edge.target && e.target === currentStep.edge.source)
        );

        if (edgeToConsider) {
          console.log(`Setting edge (${edgeToConsider.source}-${edgeToConsider.target}) status to 'considering'`);
          edgeToConsider.status = 'considering';

          // Also highlight the vertices connected by this edge
          if (currentStep.edge.source < newVertices.length) {
            newVertices[currentStep.edge.source].status = 'considering';
          }
          if (currentStep.edge.target < newVertices.length) {
            newVertices[currentStep.edge.target].status = 'considering';
          }
        } else {
          console.log(`WARNING: Could not find edge (${currentStep.edge.source}-${currentStep.edge.target}) for 'considering' status`);
        }
        break;

      case 'highlightEdge':
        // Reset any previously highlighted edges
        newEdges.forEach(e => {
          if (e.status === 'highlight') {
            console.log(`Resetting edge (${e.source}-${e.target}) from 'highlight' to 'normal'`);
            e.status = 'normal';
          }
        });

        // Find the edge in our newEdges array
        const edgeToHighlight = newEdges.find(
          e => (e.source === currentStep.edge.source && e.target === currentStep.edge.target) ||
            (e.source === currentStep.edge.target && e.target === currentStep.edge.source)
        );

        if (edgeToHighlight) {
          console.log(`Setting edge (${edgeToHighlight.source}-${edgeToHighlight.target}) status to 'highlight'`);
          edgeToHighlight.status = 'highlight';

          // Also highlight the vertices connected by this edge
          if (currentStep.edge.source < newVertices.length) {
            newVertices[currentStep.edge.source].status = 'highlight';
          }
          if (currentStep.edge.target < newVertices.length) {
            newVertices[currentStep.edge.target].status = 'highlight';
          }
        } else {
          console.log(`WARNING: Could not find edge (${currentStep.edge.source}-${currentStep.edge.target}) for 'highlight' status`);
        }
        break;

      case 'highlightVertices':
        // Explicitly highlight specified vertices
        currentStep.vertices.forEach(vertexId => {
          if (vertexId < newVertices.length) {
            // Ensure previous status doesn't override the highlight
            newVertices[vertexId].status = 'highlight';
            console.log(`Highlighting vertex ${vertexId}`);
          }
        });
        break;

      case 'addEdgeToMST':
        // Update the edge status
        const mstEdge = newEdges.find(
          e => (e.source === currentStep.edge.source && e.target === currentStep.edge.target) ||
            (e.source === currentStep.edge.target && e.target === currentStep.edge.source)
        );

        if (mstEdge) {
          console.log(`Setting edge (${mstEdge.source}-${mstEdge.target}) status to 'mst'`);
          mstEdge.status = 'mst'; // This status should make it green
        } else {
          console.log(`WARNING: Could not find edge ${currentStep.edge.source}-${currentStep.edge.target} in edges array`);

          // Log all edges for debugging
          if (showDebug) {
            console.log('All edges:');
            newEdges.forEach(e => {
              console.log(`Edge: ${e.source}-${e.target}, status: ${e.status}`);
            });
          }
        }

        // Add edge to MST list if not already there
        if (!newMSTEdges.some(e =>
          (e.source === currentStep.edge.source && e.target === currentStep.edge.target) ||
          (e.source === currentStep.edge.target && e.target === currentStep.edge.source))) {
          newMSTEdges.push(currentStep.edge);
        }

        newMSTWeight = currentStep.mstWeight;

        // Update vertex status (for Prim's algorithm)
        if (currentStep.vertex !== undefined) {
          if (currentStep.vertex < newVertices.length) {
            newVertices[currentStep.vertex].status = 'visited';
            console.log(`Marking vertex ${currentStep.vertex} as visited`);
          }
        }

        // For both algorithms: Always mark source and target as visited
        if (currentStep.edge.source < newVertices.length) {
          newVertices[currentStep.edge.source].status = 'visited';
          console.log(`Marking source vertex ${currentStep.edge.source} as visited`);
        }

        if (currentStep.edge.target < newVertices.length) {
          newVertices[currentStep.edge.target].status = 'visited';
          console.log(`Marking target vertex ${currentStep.edge.target} as visited`);
        }
        break;

      case 'skipEdge':
        // Reset edge status
        const edgeToSkip = newEdges.find(
          e => (e.source === currentStep.edge.source && e.target === currentStep.edge.target) ||
            (e.source === currentStep.edge.target && e.target === currentStep.edge.source)
        );

        if (edgeToSkip) {
          edgeToSkip.status = 'normal';

          // Reset vertex highlighting unless they're already visited
          if (currentStep.edge.source < newVertices.length &&
            newVertices[currentStep.edge.source].status !== 'visited') {
            newVertices[currentStep.edge.source].status = 'normal';
          }

          if (currentStep.edge.target < newVertices.length &&
            newVertices[currentStep.edge.target].status !== 'visited') {
            newVertices[currentStep.edge.target].status = 'normal';
          }
        }
        break;

      case 'complete':
        // Update all vertices to visited
        newVertices.forEach(vertex => {
          vertex.status = 'visited';
        });

        // Update final MST edges and weight
        newMSTEdges = currentStep.mstEdges;
        newMSTWeight = currentStep.mstWeight;
        break;

      default:
        break;
    }

    // Update algorithm state
    const newState = {
      ...state,
      vertices: newVertices,
      edges: newEdges,
      currentStep: state.currentStep + 1,
      mstEdges: newMSTEdges,
      mstWeight: newMSTWeight,
      finished: currentStep.type === 'complete'
    };

    setAlgorithmStates({
      ...algorithmStates,
      [algorithm]: newState
    });

    // Schedule next animation step with appropriate delay
    const delay = Math.max(100, 1000 - (speed * 9));
    animationRef.current = setTimeout(animateStep, delay);
  };

  // Toggle play/pause
  const toggleVisualization = () => {
    if (runningState === 'running') {
      pauseVisualization();
    } else {
      startVisualization();
    }
  };

  // Debug information for canvas
  const renderDebugInfo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const state = algorithmStates[activeAlgorithm];

    if (!state) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(10, 10, 300, 130);

    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(`Algorithm: ${activeAlgorithm}`, 20, 30);
    ctx.fillText(`Vertices: ${state.vertices.length}, Edges: ${state.edges.length}`, 20, 50);

    if (state.animation) {
      ctx.fillText(`Animation steps: ${state.animation.length}, Current: ${state.currentStep}`, 20, 70);
    } else {
      ctx.fillText('No animation steps generated', 20, 70);
    }

    // Count edges by status
    const edgeStats = {};
    state.edges.forEach(edge => {
      edgeStats[edge.status || 'normal'] = (edgeStats[edge.status || 'normal'] || 0) + 1;
    });

    ctx.fillText(`MST edges: ${state.mstEdges.length}`, 20, 90);
    ctx.fillText(`Edge status counts:`, 20, 110);

    let statusLine = '';
    Object.entries(edgeStats).forEach(([status, count]) => {
      statusLine += `${status}: ${count} `;
    });

    ctx.fillText(statusLine, 20, 130);
  };

  // Handle mouse down on canvas for dragging vertices
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Check if we clicked on a vertex
    const state = algorithmStates[activeAlgorithm];
    if (!state) return;

    for (let i = 0; i < state.vertices.length; i++) {
      const vertex = state.vertices[i];
      const distance = Math.sqrt(
        Math.pow(vertex.x - mouseX, 2) + Math.pow(vertex.y - mouseY, 2)
      );

      if (distance <= NODE_RADIUS) {
        isDraggingRef.current = true;
        draggedNodeRef.current = i;
        return;
      }
    }
  };

  // Handle mouse move on canvas for dragging vertices
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || draggedNodeRef.current === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Update vertex position
    const state = algorithmStates[activeAlgorithm];
    if (!state) return;

    const newVertices = [...state.vertices];
    newVertices[draggedNodeRef.current] = {
      ...newVertices[draggedNodeRef.current],
      x: mouseX,
      y: mouseY
    };

    // Update all algorithm states with new vertex positions
    const newStates = {};
    Object.keys(algorithmStates).forEach(key => {
      newStates[key] = {
        ...algorithmStates[key],
        vertices: newVertices
      };
    });

    setAlgorithmStates(newStates);

    // Also update original graph
    const newGraphVertices = [...graph.vertices];
    newGraphVertices[draggedNodeRef.current] = {
      ...newGraphVertices[draggedNodeRef.current],
      x: mouseX,
      y: mouseY
    };

    setGraph({
      ...graph,
      vertices: newGraphVertices
    });
  };

  // Handle mouse up on canvas for dragging vertices
  const handleMouseUp = () => {
    isDraggingRef.current = false;
    draggedNodeRef.current = null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width: '100%' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Minimum Spanning Tree Algorithms
        <Tooltip title="Learn more about MST algorithms">
          <IconButton size="small" onClick={() => setInfoDialogOpen(true)} sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>

      <Paper sx={{ p: 2, mb: 3, width: '100%', maxWidth: 850 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <ToggleButtonGroup
              value={activeAlgorithm}
              exclusive
              onChange={handleAlgorithmChange}
              size="small"
              aria-label="algorithm selection"
            >
              {algorithms.map(algorithm => (
                <ToggleButton
                  key={algorithm.id}
                  value={algorithm.id}
                  aria-label={algorithm.name}
                  sx={{
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: algorithm.color,
                      '&:hover': {
                        backgroundColor: algorithm.color,
                        opacity: 0.9
                      }
                    }
                  }}
                >
                  {algorithm.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color={runningState === 'running' ? 'warning' : 'primary'}
              onClick={toggleVisualization}
              startIcon={runningState === 'running' ? <PauseIcon /> : <PlayArrowIcon />}
              disabled={runningState === 'finished'}
              size="small"
            >
              {runningState === 'running' ? 'Pause' :
                runningState === 'paused' ? 'Continue' : 'Start'}
            </Button>
            <Button
              variant="outlined"
              onClick={resetVisualization}
              startIcon={<RestartAltIcon />}
              disabled={runningState === 'running'}
              size="small"
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              onClick={generateRandomGraph}
              startIcon={<ShuffleIcon />}
              disabled={runningState === 'running'}
              size="small"
            >
              New Graph
            </Button>
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" gutterBottom>
                Vertex Count: {vertexCount}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="small"
                  onClick={() => setVertexCount(Math.max(3, vertexCount - 1))}
                  disabled={vertexCount <= 3 || runningState === 'running'}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Slider
                  value={vertexCount}
                  onChange={(_, newValue) => setVertexCount(newValue)}
                  min={3}
                  max={15}
                  step={1}
                  disabled={runningState === 'running'}
                  sx={{ mx: 2, flexGrow: 1 }}
                />
                <IconButton
                  size="small"
                  onClick={() => setVertexCount(Math.min(15, vertexCount + 1))}
                  disabled={vertexCount >= 15 || runningState === 'running'}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" gutterBottom>
                Edge Density: {Math.round(edgeProbability * 100)}%
              </Typography>
              <Slider
                value={edgeProbability}
                onChange={(_, newValue) => setEdgeProbability(newValue)}
                min={0.1}
                max={1}
                step={0.1}
                disabled={runningState === 'running'}
                marks
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showWeights}
                onChange={(e) => setShowWeights(e.target.checked)}
                disabled={runningState === 'running'}
              />
            }
            label="Show Edge Weights"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showDebug}
                onChange={(e) => setShowDebug(e.target.checked)}
              />
            }
            label="Show Debug Info"
          />
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: 1,
            bgcolor: '#f5f5f5',
            width: '100%',
            height: CANVAS_HEIGHT,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              width: '100%',
              height: '100%',
              cursor: isDraggingRef.current ? 'grabbing' : 'default'
            }}
          />
        </Paper>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Animation Speed
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 300, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Typography variant="caption" sx={{ mr: 1 }}>
                Slow
              </Typography>
              <Slider
                value={speed}
                onChange={handleSpeedChange}
                min={1}
                max={100}
                valueLabelDisplay="auto"
                sx={{ mx: 2 }}
              />
              <Typography variant="caption" sx={{ ml: 1 }}>
                Fast
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Current Algorithm: {algorithms.find(a => a.id === activeAlgorithm)?.name}
          </Typography>
          {algorithmStates[activeAlgorithm]?.finished && (
            <Box sx={{ mt: 1, p: 2, bgcolor: 'success.light', color: 'white', borderRadius: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                Minimum Spanning Tree Weight: {algorithmStates[activeAlgorithm].mstWeight}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Paper sx={{ p: 2, width: '100%', maxWidth: 850 }}>
        <Typography variant="h6" gutterBottom>
          Algorithm Details
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Algorithm</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Time Complexity</TableCell>
                <TableCell align="center">Space Complexity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Prim's Algorithm</TableCell>
                <TableCell>
                  Grows a single tree from a starting vertex by repeatedly adding the lowest-weight edge that connects any vertex in the tree to a vertex outside the tree.
                </TableCell>
                <TableCell align="center">O(E log V)</TableCell>
                <TableCell align="center">O(V)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kruskal's Algorithm</TableCell>
                <TableCell>
                  Sorts all edges by weight and adds them one by one to the forest, avoiding edges that would create cycles.
                </TableCell>
                <TableCell align="center">O(E log E)</TableCell>
                <TableCell align="center">O(V)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          How to use:
        </Typography>
        <Typography variant="body2" paragraph>
          1. Use the controls to create a graph with your preferred number of vertices and edge density.
        </Typography>
        <Typography variant="body2" paragraph>
          2. Select either Prim's or Kruskal's algorithm and click "Start" to watch the algorithm in action.
        </Typography>
        <Typography variant="body2" paragraph>
          3. You can drag vertices to rearrange the graph. The visualization will dynamically update.
        </Typography>
        <Typography variant="body2">
          4. Compare the two algorithms to see the differences in how they build minimum spanning trees.
        </Typography>
      </Paper>

      {/* Information Dialog */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        maxWidth="md"
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          About Minimum Spanning Tree Algorithms
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>What is a Minimum Spanning Tree?</Typography>
          <Typography variant="body2" paragraph>
            A Minimum Spanning Tree (MST) is a subset of the edges of a connected, edge-weighted graph that connects all
            vertices together without cycles while minimizing the total edge weight. In other words, an MST is the cheapest
            possible way to connect all nodes in a graph.
          </Typography>

          <Typography variant="h6" gutterBottom>Prim's Algorithm</Typography>
          <Typography variant="body2" paragraph>
            Prim's algorithm builds the MST one vertex at a time, starting with an arbitrary vertex and always adding the
            lowest-weight edge that connects a vertex in the growing MST to a vertex outside the MST.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Key Steps:</strong>
          </Typography>
          <Typography component="ol" variant="body2" sx={{ pl: 3 }}>
            <Box component="li" sx={{ mb: 1 }}>Start with any vertex in the graph</Box>
            <Box component="li" sx={{ mb: 1 }}>Examine all edges connecting the current MST to vertices not yet in the MST</Box>
            <Box component="li" sx={{ mb: 1 }}>Choose the edge with the smallest weight</Box>
            <Box component="li" sx={{ mb: 1 }}>Add that edge and the new vertex to the MST</Box>
            <Box component="li">Repeat steps 2-4 until all vertices are included</Box>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Kruskal's Algorithm</Typography>
          <Typography variant="body2" paragraph>
            Kruskal's algorithm builds the MST by considering edges in ascending order of weight, adding an edge to the MST
            if it doesn't create a cycle with edges already in the MST.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Key Steps:</strong>
          </Typography>
          <Typography component="ol" variant="body2" sx={{ pl: 3 }}>
            <Box component="li" sx={{ mb: 1 }}>Sort all edges in the graph by weight (ascending)</Box>
            <Box component="li" sx={{ mb: 1 }}>Start with an empty MST and each vertex in its own component</Box>
            <Box component="li" sx={{ mb: 1 }}>Consider each edge in order of increasing weight</Box>
            <Box component="li" sx={{ mb: 1 }}>Add the edge to the MST if it connects two different components</Box>
            <Box component="li">Repeat step 4 until the MST has (V-1) edges</Box>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>When to Use Each Algorithm?</Typography>
          <Typography variant="body2" paragraph>
            <strong>Prim's Algorithm:</strong> Generally better for dense graphs where the number of edges is close to
            the maximum possible number of edges.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Kruskal's Algorithm:</strong> Usually more efficient for sparse graphs with relatively few edges.
          </Typography>
          <Typography variant="body2">
            Both algorithms are guaranteed to find the minimum spanning tree for a given graph, but they may find different
            trees if there are multiple edges with the same weight.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MinimumSpanningTreeVisualizer;