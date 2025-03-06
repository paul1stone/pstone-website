
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import SudokuSolver from '../components/SudokuSolver';
import AStarPathfinding from '../components/AStarPathfinding';
import SortingVisualizer from '../components/SortingVisualizer';


const AlgorithmVisualizationPage = () => {
  const [selectedAlgo, setSelectedAlgo] = useState('sudoku');

  const algorithms = [
    { id: 'sudoku', name: 'Sudoku Solver' },
    { id: 'astar', name: 'A* Pathfinding' },
    { id: 'sorting', name: 'Sorting Algorithms' },
    { id: 'coming-soon-2', name: 'Coming Soon: Graph Traversal' }
  ];

  const renderSelectedAlgorithm = () => {
    switch (selectedAlgo) {
      case 'sudoku':
        return <SudokuSolver />;
      case 'astar':
        return <AStarPathfinding />;
      case 'sorting':
        return <SortingVisualizer />;
      case 'coming-soon-2':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              bgcolor: 'grey.100',
              borderRadius: 2,
              width: '100%',
              height: '400px'
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>Coming Soon</Typography>
            <Typography variant="body1" color="text.secondary">
              This algorithm visualization is under development.
            </Typography>
          </Box>
        );
      default:
        return <SudokuSolver />;
    }
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1A237E',
              mb: 4,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Algorithm Visualization Lab
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Interactive visualizations of common algorithms to help understand how they work.
            These demos show the step-by-step execution of algorithms, making it easier to
            understand their inner workings and efficiency.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Select Algorithm
                </Typography>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="algorithm-select-label">Algorithm</InputLabel>
                  <Select
                    labelId="algorithm-select-label"
                    id="algorithm-select"
                    value={selectedAlgo}
                    label="Algorithm"
                    onChange={(e) => setSelectedAlgo(e.target.value)}
                  >
                    {algorithms.map((algo) => (
                      <MenuItem key={algo.id} value={algo.id}>
                        {algo.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                  About This Project
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This lab helps visualize how different algorithms work through interactive demonstrations.
                  Select an algorithm from the dropdown above to get started.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                    Implementation Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    These visualizations are built using React and focus on showing the
                    step-by-step process of each algorithm. The code is structured to highlight
                    the core logic while providing an intuitive interface for exploration.
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={9}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  {renderSelectedAlgorithm()}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Technical write-up section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Technical Implementation
            </Typography>

            <Typography variant="body1" paragraph>
              The algorithm visualizations in this lab are implemented using React and JavaScript. Each algorithm
              is broken down into discrete steps that can be visualized sequentially, allowing users to understand
              how the algorithm progresses and makes decisions.
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
              Sudoku Solver Implementation
            </Typography>

            <Typography variant="body1" paragraph>
              The Sudoku solver uses a backtracking algorithm to find solutions to the puzzle. Here's how it works:
            </Typography>

            <Box component="ol" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" mb={1}>
                The solver attempts to place numbers 1-9 in empty cells.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                Before placing a number, it checks if that number can be placed in the current cell according to Sudoku rules.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                If a number can be placed, it moves to the next cell.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                If no number can be placed, it backtracks to the previous cell and tries a different number.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                This process continues until the entire board is filled or no solution is found.
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              The visualization captures each attempt and backtrack, allowing users to see how the algorithm
              explores different possibilities and eventually finds a solution.
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
              A* Pathfinding (Coming Soon)
            </Typography>

            <Typography variant="body1" paragraph>
              The A* pathfinding algorithm will visualize how a computer finds the shortest path between two points
              in a grid with obstacles. This implementation will showcase:
            </Typography>

            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" mb={1}>
                How the algorithm uses a heuristic function to estimate the distance to the goal
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                The process of exploring nodes and updating the path
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                How A* efficiently finds the optimal path by prioritizing promising directions
              </Typography>
            </Box>

            <Typography variant="body1">
              The visualizations are designed to be educational and interactive, with controls for stepping through
              the algorithm manually or watching an automated animation at various speeds.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AlgorithmVisualizationPage;