
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
import MinimumSpanningTreeVisualizer from '../components/MinimumSpanningTreeVisualizer';


const AlgorithmVisualizationPage = () => {
  const [selectedAlgo, setSelectedAlgo] = useState('astar');

  const algorithms = [
    { id: 'astar', name: 'A* Pathfinding' },
    { id: 'sudoku', name: 'Sudoku Solver' },
    { id: 'sorting', name: 'Sorting Algorithms' },
    { id: 'mst', name: 'Minimum Spanning Tree (Prim vs Kruskal)' },
    { id: 'coming-soon-2', name: 'Coming Soon: BFS & DFS Traversal' }
  ];

  const renderSelectedAlgorithm = () => {
    switch (selectedAlgo) {
      case 'astar':
        return <AStarPathfinding />;
      case 'sudoku':
        return <SudokuSolver />;
      case 'sorting':
        return <SortingVisualizer />;
      case 'mst':
        return <MinimumSpanningTreeVisualizer />;
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
            Algorithm Visualization
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Some common Algos that I have come across in school and have made visualizations for.
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
                  This project helps visualize how different algorithms work through interactive demonstrations.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                    Implementation Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    These visualizations are built using React and focus on showing the
                    step-by-step process of each algorithm.
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

      </Container>
    </Box>
  );
};

export default AlgorithmVisualizationPage;