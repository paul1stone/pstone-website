
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
  Tooltip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ClearIcon from '@mui/icons-material/Clear';
import GridOnIcon from '@mui/icons-material/GridOn';
import { styled } from '@mui/material/styles';


const EMPTY = 0;
const WALL = 1;
const START = 2;
const END = 3;
const VISITED = 4;
const PATH = 5;
const CURRENT = 6;
const NEIGHBOR = 7;


const CELL_COLORS = {
  [EMPTY]: '#ffffff',
  [WALL]: '#212121',
  [START]: '#4caf50',
  [END]: '#f44336',
  [VISITED]: '#bbdefb',
  [PATH]: '#ffeb3b',
  [CURRENT]: '#2196f3',
  [NEIGHBOR]: '#90caf9'
};


const GridCell = styled(Box)(({
  isStart,
  isEnd,
  isWall,
  isPath,
  isVisited,
  isCurrent,
  isNeighbor
}) => ({
  width: 24,
  height: 24,
  border: '1px solid #e0e0e0',
  backgroundColor: isStart ? CELL_COLORS[START] :
    isEnd ? CELL_COLORS[END] :
      isWall ? CELL_COLORS[WALL] :
        isPath ? CELL_COLORS[PATH] :
          isCurrent ? CELL_COLORS[CURRENT] :
            isNeighbor ? CELL_COLORS[NEIGHBOR] :
              isVisited ? CELL_COLORS[VISITED] :
                CELL_COLORS[EMPTY],
  transition: 'background-color 0.2s',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
}));


const AStarPathfinding = () => {

  const GRID_ROWS = 20;
  const GRID_COLS = 30;


  const [grid, setGrid] = useState([]);
  const [startPos, setStartPos] = useState({ row: 5, col: 5 });
  const [endPos, setEndPos] = useState({ row: 15, col: 25 });
  const [runningState, setRunningState] = useState('idle');
  const [speed, setSpeed] = useState(50);
  const [visualizationSteps, setVisualizationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [toolMode, setToolMode] = useState('wall');


  const animationRef = useRef(null);
  const isMouseDownRef = useRef(false);


  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(EMPTY));


    newGrid[startPos.row][startPos.col] = START;
    newGrid[endPos.row][endPos.col] = END;

    setGrid(newGrid);
    setRunningState('idle');
    setVisualizationSteps([]);
    setCurrentStepIndex(0);
  };


  const clearGrid = () => {
    const newGrid = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(EMPTY));
    newGrid[startPos.row][startPos.col] = START;
    newGrid[endPos.row][endPos.col] = END;

    setGrid(newGrid);
    setRunningState('idle');
    setVisualizationSteps([]);
    setCurrentStepIndex(0);

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };


  const resetVisualization = () => {
    const newGrid = [...grid.map(row => [...row])];

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (newGrid[row][col] === VISITED ||
          newGrid[row][col] === PATH ||
          newGrid[row][col] === CURRENT ||
          newGrid[row][col] === NEIGHBOR) {
          newGrid[row][col] = EMPTY;
        }
      }
    }

    newGrid[startPos.row][startPos.col] = START;
    newGrid[endPos.row][endPos.col] = END;

    setGrid(newGrid);
    setRunningState('idle');
    setVisualizationSteps([]);
    setCurrentStepIndex(0);

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };


  const handleMouseDown = (row, col) => {
    isMouseDownRef.current = true;


    if (toolMode === 'wall') {
      if (grid[row][col] === EMPTY) {

        const newGrid = [...grid.map(rowArray => [...rowArray])];
        newGrid[row][col] = WALL;
        setGrid(newGrid);
      } else if (grid[row][col] === WALL) {

        const newGrid = [...grid.map(rowArray => [...rowArray])];
        newGrid[row][col] = EMPTY;
        setGrid(newGrid);
      }
    } else if (toolMode === 'start' && grid[row][col] !== END && grid[row][col] !== WALL) {

      const newGrid = [...grid.map(rowArray => [...rowArray])];
      newGrid[startPos.row][startPos.col] = EMPTY;
      newGrid[row][col] = START;
      setGrid(newGrid);
      setStartPos({ row, col });
    } else if (toolMode === 'end' && grid[row][col] !== START && grid[row][col] !== WALL) {

      const newGrid = [...grid.map(rowArray => [...rowArray])];
      newGrid[endPos.row][endPos.col] = EMPTY;
      newGrid[row][col] = END;
      setGrid(newGrid);
      setEndPos({ row, col });
    }
  };


  const handleMouseEnter = (row, col) => {
    if (!isMouseDownRef.current || runningState === 'running') return;

    if (toolMode === 'wall') {
      if (grid[row][col] === EMPTY) {

        const newGrid = [...grid.map(rowArray => [...rowArray])];
        newGrid[row][col] = WALL;
        setGrid(newGrid);
      }
    }
  };


  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };


  const handleToolModeChange = (event, newMode) => {
    if (newMode !== null) {
      setToolMode(newMode);
    }
  };


  const heuristic = (a, b) => {

    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  };


  const runAStarAlgorithm = () => {
    if (runningState === 'running') return;

    resetVisualization();
    setRunningState('running');


    const gridCopy = grid.map(row => [...row]);


    const steps = [];


    class Node {
      constructor(row, col, isWall = false) {
        this.row = row;
        this.col = col;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.isWall = isWall;
        this.parent = null;
      }
    }


    const nodeGrid = Array(GRID_ROWS).fill().map((_, row) =>
      Array(GRID_COLS).fill().map((_, col) =>
        new Node(row, col, gridCopy[row][col] === WALL)
      )
    );


    const startNode = nodeGrid[startPos.row][startPos.col];
    const endNode = nodeGrid[endPos.row][endPos.col];


    const openList = [startNode];
    const closedList = [];


    while (openList.length > 0) {

      let currentNodeIndex = 0;
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[currentNodeIndex].f) {
          currentNodeIndex = i;
        }
      }

      const currentNode = openList[currentNodeIndex];


      steps.push({
        grid: createGridSnapshot(gridCopy, closedList, openList, currentNode),
        current: { row: currentNode.row, col: currentNode.col }
      });


      if (currentNode.row === endNode.row && currentNode.col === endNode.col) {

        let pathNode = currentNode;
        const path = [];

        while (pathNode) {
          path.push({ row: pathNode.row, col: pathNode.col });
          pathNode = pathNode.parent;
        }


        steps.push({
          grid: createPathGridSnapshot(gridCopy, path),
          isComplete: true
        });

        setVisualizationSteps(steps);
        startVisualization(steps);
        return;
      }


      openList.splice(currentNodeIndex, 1);
      closedList.push(currentNode);


      if (gridCopy[currentNode.row][currentNode.col] !== START &&
        gridCopy[currentNode.row][currentNode.col] !== END) {
        gridCopy[currentNode.row][currentNode.col] = VISITED;
      }


      const neighbors = getNeighbors(currentNode, nodeGrid);


      for (const neighbor of neighbors) {

        if (closedList.some(node => node.row === neighbor.row && node.col === neighbor.col) ||
          neighbor.isWall) {
          continue;
        }


        const gScore = currentNode.g + 1;


        let isNewPath = false;

        if (openList.some(node => node.row === neighbor.row && node.col === neighbor.col)) {

          if (gScore < neighbor.g) {
            neighbor.g = gScore;
            isNewPath = true;
          }
        } else {

          neighbor.g = gScore;
          isNewPath = true;
          openList.push(neighbor);


          if (gridCopy[neighbor.row][neighbor.col] !== START &&
            gridCopy[neighbor.row][neighbor.col] !== END) {
            gridCopy[neighbor.row][neighbor.col] = NEIGHBOR;
          }
        }


        if (isNewPath) {
          neighbor.h = heuristic(neighbor, endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentNode;
        }
      }
    }


    steps.push({
      grid: gridCopy,
      isComplete: true,
      noPath: true
    });

    setVisualizationSteps(steps);
    startVisualization(steps);
  };


  const createGridSnapshot = (baseGrid, closedList, openList, currentNode) => {
    const snapshot = baseGrid.map(row => [...row]);


    for (const node of closedList) {
      if (snapshot[node.row][node.col] !== START && snapshot[node.row][node.col] !== END) {
        snapshot[node.row][node.col] = VISITED;
      }
    }


    for (const node of openList) {
      if (snapshot[node.row][node.col] !== START &&
        snapshot[node.row][node.col] !== END &&
        snapshot[node.row][node.col] !== VISITED) {
        snapshot[node.row][node.col] = NEIGHBOR;
      }
    }


    if (snapshot[currentNode.row][currentNode.col] !== START &&
      snapshot[currentNode.row][currentNode.col] !== END) {
      snapshot[currentNode.row][currentNode.col] = CURRENT;
    }

    return snapshot;
  };


  const createPathGridSnapshot = (baseGrid, path) => {
    const snapshot = baseGrid.map(row => [...row]);


    for (const point of path) {
      if (snapshot[point.row][point.col] !== START &&
        snapshot[point.row][point.col] !== END) {
        snapshot[point.row][point.col] = PATH;
      }
    }

    return snapshot;
  };


  const getNeighbors = (node, nodeGrid) => {
    const neighbors = [];
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ];

    for (const dir of directions) {
      const newRow = node.row + dir.row;
      const newCol = node.col + dir.col;


      if (newRow >= 0 && newRow < GRID_ROWS &&
        newCol >= 0 && newCol < GRID_COLS) {
        neighbors.push(nodeGrid[newRow][newCol]);
      }
    }

    return neighbors;
  };


  const startVisualization = (steps) => {
    let index = runningState === 'paused' ? currentStepIndex : 0;

    function animateStep() {
      if (index >= steps.length) {
        setRunningState('finished');
        return;
      }

      const step = steps[index];
      setGrid(step.grid);
      setCurrentStepIndex(index);

      if (step.isComplete) {
        setRunningState('finished');
        return;
      }

      index++;
      animationRef.current = setTimeout(animateStep, (1000 - speed * 9));
    }

    animateStep();
  };


  const continueVisualization = () => {
    if (runningState !== 'paused' || currentStepIndex >= visualizationSteps.length) return;

    setRunningState('running');
    startVisualization(visualizationSteps);
  };


  const pauseVisualization = () => {
    if (runningState !== 'running') return;

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setRunningState('paused');
  };


  const toggleVisualization = () => {
    if (runningState === 'idle' || runningState === 'finished') {
      runAStarAlgorithm();
    } else if (runningState === 'running') {
      pauseVisualization();
    } else if (runningState === 'paused') {
      continueVisualization();
    }
  };


  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };


  useEffect(() => {
    if (runningState === 'running') {
      pauseVisualization();
      continueVisualization();
    }

  }, [speed]);


  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width: '100%' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        A* Pathfinding Visualization
      </Typography>

      <Paper sx={{ p: 2, mb: 3, width: '100%', maxWidth: 850 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <ToggleButtonGroup
              value={toolMode}
              exclusive
              onChange={handleToolModeChange}
              size="small"
              aria-label="drawing tool"
              disabled={runningState === 'running'}
            >
              <ToggleButton value="wall" aria-label="wall">
                <Tooltip title="Draw Walls">
                  <GridOnIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="start" aria-label="start">
                <Tooltip title="Move Start">
                  <Box sx={{ bgcolor: CELL_COLORS[START], width: 16, height: 16, borderRadius: '50%' }} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="end" aria-label="end">
                <Tooltip title="Move End">
                  <Box sx={{ bgcolor: CELL_COLORS[END], width: 16, height: 16, borderRadius: '50%' }} />
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
                runningState === 'paused' ? 'Continue' : 'Find Path'}
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
              color="error"
              onClick={clearGrid}
              startIcon={<ClearIcon />}
              disabled={runningState === 'running'}
              size="small"
            >
              Clear All
            </Button>
          </Stack>
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
            width: '100%',
            overflowX: 'auto'
          }}
          onMouseLeave={handleMouseUp}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_COLS}, 24px)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, 24px)`,
              gap: 0
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <GridCell
                  key={`${rowIndex}-${colIndex}`}
                  isStart={cell === START}
                  isEnd={cell === END}
                  isWall={cell === WALL}
                  isPath={cell === PATH}
                  isVisited={cell === VISITED}
                  isCurrent={cell === CURRENT}
                  isNeighbor={cell === NEIGHBOR}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                />
              ))
            )}
          </Box>
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
      </Paper>

      <Paper sx={{ p: 2, width: '100%', maxWidth: 850 }}>
        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>1. Setup the grid:</strong> Use the tools to place walls (obstacles) and adjust the start and end positions.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>2. Run the algorithm:</strong> Click "Find Path" to see the A* algorithm search for the shortest path.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>3. Understanding the visualization:</strong>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[START], borderRadius: '50%', mr: 1 }} />
              Start position
            </Box>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[END], borderRadius: '50%', mr: 1 }} />
              End position
            </Box>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[WALL], mr: 1 }} />
              Wall (obstacle)
            </Box>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[VISITED], mr: 1 }} />
              Visited cell
            </Box>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[CURRENT], mr: 1 }} />
              Current cell being evaluated
            </Box>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[NEIGHBOR], mr: 1 }} />
              Neighbor cells (candidates for next steps)
            </Box>
            <Box component="li">
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: CELL_COLORS[PATH], mr: 1 }} />
              Final path
            </Box>
          </Box>
        </Typography>
        <Typography variant="body2">
          The A* algorithm combines Dijkstra's algorithm (which guarantees the shortest path) with a heuristic function (distance estimation to the goal) to efficiently find the shortest path.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AStarPathfinding;