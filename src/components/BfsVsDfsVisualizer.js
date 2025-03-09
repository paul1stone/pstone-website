import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Slider,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import InfoIcon from '@mui/icons-material/Info';

// Node states
const NORMAL = 0;
const VISITED_BFS = 1;
const VISITED_DFS = 2;
const CURRENT_BFS = 3;
const CURRENT_DFS = 4;
const QUEUE = 5;
const STACK = 6;
const TARGET = 7;

// Colors for different node states
const NODE_COLORS = {
  [NORMAL]: '#ffffff',
  [VISITED_BFS]: '#bbdefb',
  [VISITED_DFS]: '#e1bee7',
  [CURRENT_BFS]: '#1976d2',
  [CURRENT_DFS]: '#7b1fa2',
  [QUEUE]: '#64b5f6',
  [STACK]: '#ce93d8',
  [TARGET]: '#f44336'
};

// Sample graph structures
const SAMPLE_GRAPHS = {
  simple: {
    name: 'Simple Graph',
    nodes: [
      { id: 1, label: 'A', x: 400, y: 50, connections: [2, 3, 4] },
      { id: 2, label: 'B', x: 200, y: 150, connections: [1, 5, 6] },
      { id: 3, label: 'C', x: 400, y: 150, connections: [1, 7] },
      { id: 4, label: 'D', x: 600, y: 150, connections: [1, 8] },
      { id: 5, label: 'E', x: 100, y: 250, connections: [2, 9] },
      { id: 6, label: 'F', x: 300, y: 250, connections: [2] },
      { id: 7, label: 'G', x: 500, y: 250, connections: [3, 8] },
      { id: 8, label: 'H', x: 700, y: 250, connections: [4, 7] },
      { id: 9, label: 'I', x: 100, y: 350, connections: [5] }
    ],
    startNode: 1,
    targetNode: 9
  },
  complex: {
    name: 'Complex Graph',
    nodes: [
      { id: 1, label: 'A', x: 400, y: 50, connections: [2, 3, 4] },
      { id: 2, label: 'B', x: 200, y: 150, connections: [1, 5, 6] },
      { id: 3, label: 'C', x: 400, y: 150, connections: [1, 7, 8] },
      { id: 4, label: 'D', x: 600, y: 150, connections: [1, 8, 9] },
      { id: 5, label: 'E', x: 100, y: 250, connections: [2, 10] },
      { id: 6, label: 'F', x: 300, y: 250, connections: [2, 7, 10] },
      { id: 7, label: 'G', x: 400, y: 250, connections: [3, 6, 8] },
      { id: 8, label: 'H', x: 500, y: 250, connections: [3, 4, 7, 9] },
      { id: 9, label: 'I', x: 700, y: 250, connections: [4, 8, 12] },
      { id: 10, label: 'J', x: 200, y: 350, connections: [5, 6, 11] },
      { id: 11, label: 'K', x: 300, y: 450, connections: [10, 12] },
      { id: 12, label: 'L', x: 600, y: 400, connections: [9, 11] }
    ],
    startNode: 1,
    targetNode: 11
  },
  maze: {
    name: 'Maze-like Graph',
    nodes: [
      { id: 1, label: 'A', x: 100, y: 50, connections: [2] },
      { id: 2, label: 'B', x: 100, y: 150, connections: [1, 3, 5] },
      { id: 3, label: 'C', x: 200, y: 150, connections: [2, 4] },
      { id: 4, label: 'D', x: 300, y: 150, connections: [3, 7] },
      { id: 5, label: 'E', x: 100, y: 250, connections: [2, 6] },
      { id: 6, label: 'F', x: 200, y: 250, connections: [5, 9] },
      { id: 7, label: 'G', x: 300, y: 250, connections: [4, 8, 10] },
      { id: 8, label: 'H', x: 400, y: 250, connections: [7] },
      { id: 9, label: 'I', x: 200, y: 350, connections: [6, 10, 12] },
      { id: 10, label: 'J', x: 300, y: 350, connections: [7, 9, 11] },
      { id: 11, label: 'K', x: 400, y: 350, connections: [10] },
      { id: 12, label: 'L', x: 200, y: 450, connections: [9, 13] },
      { id: 13, label: 'M', x: 300, y: 450, connections: [12] }
    ],
    startNode: 1,
    targetNode: 13
  }
};

const BfsVsDfsVisualizer = () => {
  // State
  const [graphType, setGraphType] = useState('simple');
  const [graph, setGraph] = useState(SAMPLE_GRAPHS.simple.nodes);
  const [startNode, setStartNode] = useState(SAMPLE_GRAPHS.simple.startNode);
  const [targetNode, setTargetNode] = useState(SAMPLE_GRAPHS.simple.targetNode);
  const [nodeStates, setNodeStates] = useState({});
  const [runningState, setRunningState] = useState('idle'); // 'idle', 'running', 'paused', 'finished'
  const [speed, setSpeed] = useState(50);
  const [activeAlgorithm, setActiveAlgorithm] = useState('both'); // 'bfs', 'dfs', 'both'
  const [bfsStats, setBfsStats] = useState({ steps: 0, pathLength: 0, visited: 0 });
  const [dfsStats, setDfsStats] = useState({ steps: 0, pathLength: 0, visited: 0 });
  const [visualizationSteps, setVisualizationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  // Current positions for BFS and DFS pointers
  const [bfsPointer, setBfsPointer] = useState(null);
  const [dfsPointer, setDfsPointer] = useState(null);

  // Refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize graph and canvas
  useEffect(() => {
    initializeGraph();
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update when graph type changes
  useEffect(() => {
    initializeGraph();
  }, [graphType]);

  // Handle canvas resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const container = canvas.parentElement;
      setCanvasSize({
        width: container.clientWidth,
        height: 500 // Fixed height
      });
    }
  };

  // Initialize or reset graph
  const initializeGraph = () => {
    const selectedGraph = SAMPLE_GRAPHS[graphType];
    setGraph(selectedGraph.nodes);
    setStartNode(selectedGraph.startNode);
    setTargetNode(selectedGraph.targetNode);

    // Reset node states
    const initialStates = {};
    selectedGraph.nodes.forEach(node => {
      initialStates[node.id] = NORMAL;
    });
    setNodeStates(initialStates);

    // Reset stats and steps
    setBfsStats({ steps: 0, pathLength: 0, visited: 0 });
    setDfsStats({ steps: 0, pathLength: 0, visited: 0 });
    setVisualizationSteps([]);
    setCurrentStepIndex(0);
    setRunningState('idle');
    setBfsPointer(null);
    setDfsPointer(null);

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    // Render initial graph
    renderGraph();
  };

  // Generate a random graph
  const generateRandomGraph = () => {
    // Select a random graph type
    const graphTypes = Object.keys(SAMPLE_GRAPHS);
    const randomType = graphTypes[Math.floor(Math.random() * graphTypes.length)];
    setGraphType(randomType);
  };

  // Handle algorithm selection change
  const handleAlgorithmChange = (event, newAlgorithm) => {
    if (newAlgorithm !== null) {
      setActiveAlgorithm(newAlgorithm);
    }
  };

  // Handle graph type change
  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  // Run BFS algorithm
  const runBFS = () => {
    const steps = [];
    const startNodeObj = graph.find(node => node.id === startNode);
    if (!startNodeObj) return steps;

    // Queue for BFS
    const queue = [{ node: startNodeObj, path: [] }];
    const visited = new Set();
    visited.add(startNodeObj.id);

    let stepCount = 0;
    let foundPath = false;

    // BFS main loop
    while (queue.length > 0 && !foundPath) {
      const { node, path } = queue.shift();
      stepCount++;

      // Create snapshot of current state
      const snapshot = { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) };

      // Mark all visited nodes
      visited.forEach(id => {
        snapshot[id] = VISITED_BFS;
      });

      // Mark current node
      snapshot[node.id] = CURRENT_BFS;

      // Mark queue nodes
      queue.forEach(item => {
        if (snapshot[item.node.id] === NORMAL) {
          snapshot[item.node.id] = QUEUE;
        }
      });

      // Mark target node
      if (node.id !== targetNode) {
        snapshot[targetNode] = TARGET;
      }

      steps.push({
        states: snapshot,
        type: 'bfs',
        step: stepCount,
        currentNode: node.id
      });

      // Check if reached target
      if (node.id === targetNode) {
        foundPath = true;

        // Create final path snapshot
        const pathSnapshot = { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) };

        // Mark all visited nodes
        visited.forEach(id => {
          pathSnapshot[id] = VISITED_BFS;
        });

        // Mark path nodes
        const fullPath = [...path, node];
        fullPath.forEach(n => {
          pathSnapshot[n.id] = CURRENT_BFS;
        });

        steps.push({
          states: pathSnapshot,
          type: 'bfs',
          complete: true,
          path: fullPath.map(n => n.id),
          step: stepCount,
          currentNode: node.id
        });

        setBfsStats({
          steps: stepCount,
          pathLength: fullPath.length,
          visited: visited.size
        });

        break;
      }

      // Get connections and add to queue
      const connections = graph.filter(n => node.connections.includes(n.id));
      for (const connectedNode of connections) {
        if (!visited.has(connectedNode.id)) {
          visited.add(connectedNode.id);
          queue.push({
            node: connectedNode,
            path: [...path, node]
          });
        }
      }
    }

    // If no path found
    if (!foundPath) {
      steps.push({
        states: { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) },
        type: 'bfs',
        complete: true,
        noPath: true,
        step: stepCount
      });

      setBfsStats({
        steps: stepCount,
        pathLength: 0,
        visited: visited.size
      });
    }

    return steps;
  };

  // Run DFS algorithm
  const runDFS = () => {
    const steps = [];
    const startNodeObj = graph.find(node => node.id === startNode);
    if (!startNodeObj) return steps;

    // Stack for DFS
    const stack = [{ node: startNodeObj, path: [] }];
    const visited = new Set();
    visited.add(startNodeObj.id);

    let stepCount = 0;
    let foundPath = false;

    // DFS main loop
    while (stack.length > 0 && !foundPath) {
      const { node, path } = stack.pop();
      stepCount++;

      // Create snapshot of current state
      const snapshot = { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) };

      // Mark all visited nodes
      visited.forEach(id => {
        snapshot[id] = VISITED_DFS;
      });

      // Mark current node
      snapshot[node.id] = CURRENT_DFS;

      // Mark stack nodes
      stack.forEach(item => {
        if (snapshot[item.node.id] === NORMAL) {
          snapshot[item.node.id] = STACK;
        }
      });

      // Mark target node
      if (node.id !== targetNode) {
        snapshot[targetNode] = TARGET;
      }

      steps.push({
        states: snapshot,
        type: 'dfs',
        step: stepCount,
        currentNode: node.id
      });

      // Check if reached target
      if (node.id === targetNode) {
        foundPath = true;

        // Create final path snapshot
        const pathSnapshot = { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) };

        // Mark all visited nodes
        visited.forEach(id => {
          pathSnapshot[id] = VISITED_DFS;
        });

        // Mark path nodes
        const fullPath = [...path, node];
        fullPath.forEach(n => {
          pathSnapshot[n.id] = CURRENT_DFS;
        });

        steps.push({
          states: pathSnapshot,
          type: 'dfs',
          complete: true,
          path: fullPath.map(n => n.id),
          step: stepCount,
          currentNode: node.id
        });

        setDfsStats({
          steps: stepCount,
          pathLength: fullPath.length,
          visited: visited.size
        });

        break;
      }

      // Get connections and add to stack
      const connections = graph.filter(n => node.connections.includes(n.id));
      // DFS goes in reverse order to visualize the stack correctly
      for (let i = connections.length - 1; i >= 0; i--) {
        const connectedNode = connections[i];
        if (!visited.has(connectedNode.id)) {
          visited.add(connectedNode.id);
          stack.push({
            node: connectedNode,
            path: [...path, node]
          });
        }
      }
    }

    // If no path found
    if (!foundPath) {
      steps.push({
        states: { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) },
        type: 'dfs',
        complete: true,
        noPath: true,
        step: stepCount
      });

      setDfsStats({
        steps: stepCount,
        pathLength: 0,
        visited: visited.size
      });
    }

    return steps;
  };

  // Merge BFS and DFS steps for simultaneous visualization
  const mergeSteps = (bfsSteps, dfsSteps) => {
    const mergedSteps = [];
    const maxLength = Math.max(bfsSteps.length, dfsSteps.length);

    for (let i = 0; i < maxLength; i++) {
      const step = {};

      if (i < bfsSteps.length) {
        step.bfs = bfsSteps[i];
      }

      if (i < dfsSteps.length) {
        step.dfs = dfsSteps[i];
      }

      mergedSteps.push(step);
    }

    return mergedSteps;
  };

  // Start algorithms
  const startAlgorithms = () => {
    if (runningState === 'running') return;

    initializeGraph();
    setRunningState('running');

    let steps = [];

    if (activeAlgorithm === 'bfs' || activeAlgorithm === 'both') {
      const bfsSteps = runBFS();
      if (activeAlgorithm === 'bfs') {
        steps = bfsSteps;
      } else {
        // Save BFS steps for merging
        steps = { bfsSteps };
      }
    }

    if (activeAlgorithm === 'dfs' || activeAlgorithm === 'both') {
      const dfsSteps = runDFS();
      if (activeAlgorithm === 'dfs') {
        steps = dfsSteps;
      } else if (activeAlgorithm === 'both') {
        // Merge BFS and DFS steps
        steps = mergeSteps(steps.bfsSteps, dfsSteps);
      }
    }

    setVisualizationSteps(steps);
    startVisualization(steps);
  };

  // Start visualization animation
  const startVisualization = (steps) => {
    let index = runningState === 'paused' ? currentStepIndex : 0;

    function animateStep() {
      if (index >= steps.length) {
        setRunningState('finished');
        return;
      }

      const step = steps[index];

      if (activeAlgorithm === 'bfs') {
        setNodeStates(step.states);
        if (step.currentNode) {
          const node = graph.find(n => n.id === step.currentNode);
          if (node) {
            setBfsPointer({ x: node.x, y: node.y });
          }
        }
      } else if (activeAlgorithm === 'dfs') {
        setNodeStates(step.states);
        if (step.currentNode) {
          const node = graph.find(n => n.id === step.currentNode);
          if (node) {
            setDfsPointer({ x: node.x, y: node.y });
          }
        }
      } else if (activeAlgorithm === 'both') {
        // For 'both', we need to combine the states from bfs and dfs
        const combinedStates = { ...Object.fromEntries(graph.map(n => [n.id, NORMAL])) };

        // Update BFS pointer
        if (step.bfs?.currentNode) {
          const node = graph.find(n => n.id === step.bfs.currentNode);
          if (node) {
            setBfsPointer({ x: node.x, y: node.y });
          }
        }

        // Update DFS pointer
        if (step.dfs?.currentNode) {
          const node = graph.find(n => n.id === step.dfs.currentNode);
          if (node) {
            setDfsPointer({ x: node.x, y: node.y });
          }
        }

        // First, apply BFS states
        if (step.bfs?.states) {
          Object.entries(step.bfs.states).forEach(([id, state]) => {
            combinedStates[id] = state;
          });
        }

        // Then, apply DFS states (with priority)
        if (step.dfs?.states) {
          Object.entries(step.dfs.states).forEach(([id, state]) => {
            // Don't override if it's already a current node
            if (combinedStates[id] !== CURRENT_BFS && combinedStates[id] !== TARGET) {
              combinedStates[id] = state;
            }
          });
        }

        // Make sure target node is properly marked
        combinedStates[targetNode] = TARGET;

        setNodeStates(combinedStates);
      }

      setCurrentStepIndex(index);

      // Check if visualization is complete
      const isBfsComplete = step.bfs?.complete || (activeAlgorithm === 'bfs' && step.complete);
      const isDfsComplete = step.dfs?.complete || (activeAlgorithm === 'dfs' && step.complete);

      if ((activeAlgorithm === 'both' && isBfsComplete && isDfsComplete) ||
        (activeAlgorithm === 'bfs' && isBfsComplete) ||
        (activeAlgorithm === 'dfs' && isDfsComplete)) {
        setRunningState('finished');
        return;
      }

      index++;
      const delay = Math.max(50, 1000 - (speed * 9));
      animationRef.current = setTimeout(animateStep, delay);
    }

    animateStep();
  };

  // Continue visualization after pause
  const continueVisualization = () => {
    if (runningState !== 'paused' || currentStepIndex >= visualizationSteps.length) return;

    setRunningState('running');
    startVisualization(visualizationSteps);
  };

  // Pause visualization
  const pauseVisualization = () => {
    if (runningState !== 'running') return;

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setRunningState('paused');
  };

  // Toggle visualization (start/pause/continue)
  const toggleVisualization = () => {
    if (runningState === 'idle' || runningState === 'finished') {
      startAlgorithms();
    } else if (runningState === 'running') {
      pauseVisualization();
    } else if (runningState === 'paused') {
      continueVisualization();
    }
  };

  // Handle animation speed change
  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };

  // Update animation speed when it changes
  useEffect(() => {
    if (runningState === 'running') {
      pauseVisualization();
      continueVisualization();
    }
  }, [speed]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Render the graph visualization
  const renderGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Scale coordinates based on canvas size
    const scaleX = width / 800;
    const scaleY = height / 500;

    // Draw edges first
    drawEdges(ctx, scaleX, scaleY);

    // Draw nodes on top
    drawNodes(ctx, scaleX, scaleY);

    // Draw pointers if they exist
    if (bfsPointer && (activeAlgorithm === 'bfs' || activeAlgorithm === 'both')) {
      drawPointer(ctx, bfsPointer.x * scaleX, bfsPointer.y * scaleY - 25, '#1976d2', 'BFS');
    }

    if (dfsPointer && (activeAlgorithm === 'dfs' || activeAlgorithm === 'both')) {
      drawPointer(ctx, dfsPointer.x * scaleX, dfsPointer.y * scaleY - 25, '#7b1fa2', 'DFS');
    }
  };

  // Draw a pointer/indicator above a node
  const drawPointer = (ctx, x, y, color, label) => {
    // Draw triangle pointer
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y - 15);
    ctx.lineTo(x + 10, y - 15);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Draw label
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y - 20);
  };

  // Draw graph edges
  const drawEdges = (ctx, scaleX, scaleY) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#aaaaaa';

    // Draw connections between nodes
    graph.forEach(node => {
      node.connections.forEach(connId => {
        const connectedNode = graph.find(n => n.id === connId);
        if (connectedNode) {
          ctx.beginPath();
          ctx.moveTo(node.x * scaleX, node.y * scaleY);
          ctx.lineTo(connectedNode.x * scaleX, connectedNode.y * scaleY);
          ctx.stroke();
        }
      });
    });
  };

  // Draw graph nodes
  const drawNodes = (ctx, scaleX, scaleY) => {
    // Draw nodes
    graph.forEach(node => {
      const nodeState = nodeStates[node.id] ?? NORMAL;
      const nodeColor = NODE_COLORS[nodeState];

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x * scaleX, node.y * scaleY, 20 * scaleX, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node label
      ctx.font = `${14 * scaleX}px Arial`;
      ctx.fillStyle = nodeState === CURRENT_BFS || nodeState === CURRENT_DFS ? '#ffffff' : '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x * scaleX, node.y * scaleY);

      // Highlight start node
      if (node.id === startNode) {
        ctx.beginPath();
        ctx.arc(node.x * scaleX, node.y * scaleY, 24 * scaleX, 0, Math.PI * 2);
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label
        ctx.font = `${10 * scaleX}px Arial`;
        ctx.fillStyle = '#4caf50';
        ctx.fillText('START', node.x * scaleX, node.y * scaleY - 35);
      }

      // Highlight target node
      if (node.id === targetNode) {
        ctx.beginPath();
        ctx.arc(node.x * scaleX, node.y * scaleY, 24 * scaleX, 0, Math.PI * 2);
        ctx.strokeStyle = '#f44336';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label
        ctx.font = `${10 * scaleX}px Arial`;
        ctx.fillStyle = '#f44336';
        ctx.fillText('TARGET', node.x * scaleX, node.y * scaleY - 35);
      }
    });
  };

  // Update the canvas when graph or node states change
  useEffect(() => {
    renderGraph();
  }, [graph, nodeStates, bfsPointer, dfsPointer, canvasSize]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width: '100%' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        BFS vs DFS Graph Traversal
      </Typography>

      <Paper sx={{ p: 2, mb: 3, width: '100%', maxWidth: 850 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="graph-type-label">Graph Type</InputLabel>
              <Select
                labelId="graph-type-label"
                id="graph-type-select"
                value={graphType}
                label="Graph Type"
                onChange={handleGraphTypeChange}
                disabled={runningState === 'running'}
              >
                <MenuItem value={'simple'}>Simple Graph</MenuItem>
                <MenuItem value={'complex'}>Complex Graph</MenuItem>
                <MenuItem value={'maze'}>Maze-like Graph</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<ShuffleIcon />}
              onClick={generateRandomGraph}
              disabled={runningState === 'running'}
              size="small"
            >
              Random Graph
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <ToggleButtonGroup
              value={activeAlgorithm}
              exclusive
              onChange={handleAlgorithmChange}
              size="small"
              aria-label="algorithm selection"
              disabled={runningState === 'running'}
            >
              <ToggleButton value="bfs" aria-label="BFS only">
                <Tooltip title="BFS Only">
                  <Box sx={{ bgcolor: NODE_COLORS[VISITED_BFS], width: 16, height: 16, borderRadius: '50%' }} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="dfs" aria-label="DFS only">
                <Tooltip title="DFS Only">
                  <Box sx={{ bgcolor: NODE_COLORS[VISITED_DFS], width: 16, height: 16, borderRadius: '50%' }} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="both" aria-label="Both algorithms">
                <Tooltip title="Compare Both">
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ bgcolor: NODE_COLORS[VISITED_BFS], width: 8, height: 16 }} />
                    <Box sx={{ bgcolor: NODE_COLORS[VISITED_DFS], width: 8, height: 16 }} />
                  </Box>
                </Tooltip>
              </ToggleButton>
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
                runningState === 'paused' ? 'Continue' : 'Start Search'}
            </Button>
            <Button
              variant="outlined"
              onClick={initializeGraph}
              startIcon={<RestartAltIcon />}
              disabled={runningState === 'running'}
              size="small"
            >
              Reset
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            width: '100%',
            height: 500,
            bgcolor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ display: 'block', width: '100%', height: '100%' }}
          />
        </Box>

        {/* Result statistics */}
        {(bfsStats.steps > 0 || dfsStats.steps > 0) && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
              {bfsStats.steps > 0 && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color={NODE_COLORS[CURRENT_BFS]}>
                      BFS Results
                    </Typography>
                    <Typography variant="body2">
                      Steps: {bfsStats.steps}
                    </Typography>
                    <Typography variant="body2">
                      Path Length: {bfsStats.pathLength > 0 ? bfsStats.pathLength : 'No path found'}
                    </Typography>
                    <Typography variant="body2">
                      Nodes Visited: {bfsStats.visited}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {dfsStats.steps > 0 && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color={NODE_COLORS[CURRENT_DFS]}>
                      DFS Results
                    </Typography>
                    <Typography variant="body2">
                      Steps: {dfsStats.steps}
                    </Typography>
                    <Typography variant="body2">
                      Path Length: {dfsStats.pathLength > 0 ? dfsStats.pathLength : 'No path found'}
                    </Typography>
                    <Typography variant="body2">
                      Nodes Visited: {dfsStats.visited}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {bfsStats.steps > 0 && dfsStats.steps > 0 && (
              <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Comparison
                </Typography>
                <Typography variant="body2">
                  {bfsStats.pathLength && dfsStats.pathLength ? (
                    bfsStats.pathLength <= dfsStats.pathLength ?
                      `BFS found a ${bfsStats.pathLength === dfsStats.pathLength ? 'path of the same length' : 'shorter path'} than DFS.` :
                      `DFS found a shorter path than BFS.`
                  ) : (
                    bfsStats.pathLength ?
                      'BFS found a path, but DFS did not.' :
                      dfsStats.pathLength ?
                        'DFS found a path, but BFS did not.' :
                        'Neither algorithm found a path.'
                  )}
                </Typography>
                <Typography variant="body2">
                  {bfsStats.visited < dfsStats.visited ?
                    `BFS visited fewer nodes (${bfsStats.visited} vs ${dfsStats.visited}).` :
                    `DFS visited fewer nodes (${dfsStats.visited} vs ${bfsStats.visited}).`}
                </Typography>
                <Typography variant="body2">
                  {bfsStats.steps < dfsStats.steps ?
                    `BFS completed in fewer steps (${bfsStats.steps} vs ${dfsStats.steps}).` :
                    `DFS completed in fewer steps (${dfsStats.steps} vs ${bfsStats.steps}).`}
                </Typography>
              </Box>
            )}
          </Box>
        )}

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
      </Paper>

      <Paper sx={{ p: 2, width: '100%', maxWidth: 850 }}>
        <Typography variant="h6" gutterBottom>
          BFS vs DFS: Graph Traversal
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" color={NODE_COLORS[CURRENT_BFS]} gutterBottom>
              Breadth-First Search (BFS)
            </Typography>
            <Typography variant="body2" paragraph>
              BFS explores all nodes at the current depth before moving to nodes at the next level.
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Uses a Queue:</strong> First-in, first-out data structure
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Pattern:</strong> Level by level traversal
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Guarantees:</strong> Finds the shortest path in unweighted graphs
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Applications:</strong> Shortest path finding, level-order traversal
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" color={NODE_COLORS[CURRENT_DFS]} gutterBottom>
              Depth-First Search (DFS)
            </Typography>
            <Typography variant="body2" paragraph>
              DFS explores as far as possible along each branch before backtracking.
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Uses a Stack:</strong> Last-in, first-out data structure
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Pattern:</strong> Deep exploration of one path at a time
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Guarantees:</strong> Will find a path if one exists, but not necessarily the shortest
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2">
                  <strong>Applications:</strong> Maze solving, topological sorting, cycle detection
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Graph Types
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">Simple Graph</Typography>
              <Typography variant="body2">
                A small graph with fewer nodes and connections. Good for understanding the basic traversal patterns.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">Complex Graph</Typography>
              <Typography variant="body2">
                A larger graph with more connections. Shows how the algorithms behave in more realistic scenarios.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">Maze-like Graph</Typography>
              <Typography variant="body2">
                A graph with a path structure similar to a maze. Good for highlighting the differences between BFS and DFS.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Color Legend
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[NORMAL], border: '1px solid #000', mr: 1 }} />
              <Typography variant="body2">Unvisited Node</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[TARGET], mr: 1 }} />
              <Typography variant="body2">Target Node</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[VISITED_BFS], mr: 1 }} />
              <Typography variant="body2">BFS Visited</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[VISITED_DFS], mr: 1 }} />
              <Typography variant="body2">DFS Visited</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[CURRENT_BFS], mr: 1 }} />
              <Typography variant="body2">BFS Current</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[CURRENT_DFS], mr: 1 }} />
              <Typography variant="body2">DFS Current</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[QUEUE], mr: 1 }} />
              <Typography variant="body2">BFS Queue</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16, bgcolor: NODE_COLORS[STACK], mr: 1 }} />
              <Typography variant="body2">DFS Stack</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default BfsVsDfsVisualizer;