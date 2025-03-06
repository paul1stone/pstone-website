
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Slider,
  Stack,
  Grid,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; const SortingVisualizer = () => {
  const theme = useTheme();
  const ARRAY_SIZE = 20;
  const MAX_VALUE = 100;
  const MIN_VALUE = 5;
  const algorithms = [
    { name: 'Bubble Sort', id: 'bubble', color: theme.palette.primary.main, timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
    { name: 'Insertion Sort', id: 'insertion', color: theme.palette.secondary.main, timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
    { name: 'Merge Sort', id: 'merge', color: theme.palette.success.main, timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)' },
    { name: 'Quick Sort', id: 'quick', color: theme.palette.warning.main, timeComplexity: 'O(n log n)', spaceComplexity: 'O(log n)' }
  ];
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(80);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [algorithmStates, setAlgorithmStates] = useState({});
  const [results, setResults] = useState({});
  const [sortingFinished, setSortingFinished] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [rankedResults, setRankedResults] = useState([]);
  const animationRef = useRef(null);
  useEffect(() => {
    generateRandomArray();
  }, []);
  const handleCloseLeaderboard = () => {
    setLeaderboardOpen(false);
  };
  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      newArray.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    }
    setArray(newArray);
    const initialStates = {};
    algorithms.forEach(algorithm => {
      initialStates[algorithm.id] = {
        array: [...newArray],
        comparisons: [],
        swaps: [],
        animations: [],
        currentStep: 0,
        finished: false,
        timer: 0,
        comparisonCount: 0,
        swapCount: 0
      };
    });
    setAlgorithmStates(initialStates);
    setResults({});
    setSortingFinished(false); if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
  };
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const prepareAllSortingAnimations = () => {
    const newStates = { ...algorithmStates }; algorithms.forEach(algorithm => {
      const animations = [];
      const arr = [...array];
      const comparisonCount = { value: 0 };
      const swapCount = { value: 0 }; switch (algorithm.id) {
        case 'bubble':
          bubbleSort(arr, animations, comparisonCount, swapCount);
          break;
        case 'insertion':
          insertionSort(arr, animations, comparisonCount, swapCount);
          break;
        case 'merge':
          mergeSort(arr, 0, arr.length - 1, animations, comparisonCount, swapCount);
          break;
        case 'quick':
          quickSort(arr, 0, arr.length - 1, animations, comparisonCount, swapCount);
          break;
        default:
          break;
      }      newStates[algorithm.id] = {
        ...newStates[algorithm.id],
        animations,
        comparisonCount: comparisonCount.value,
        swapCount: swapCount.value
      };
    }); setAlgorithmStates(newStates);
    return newStates;
  };
  const startSorting = () => {
    if (isRunning && !isPaused) return; if (!isRunning || (isRunning && isPaused)) {
      let states = algorithmStates;
      if (!isRunning) {
        states = prepareAllSortingAnimations();
      } setIsRunning(true);
      setIsPaused(false);
      animateStep(states);
    }
  };
  const pauseSorting = () => {
    if (!isRunning || isPaused) return; setIsPaused(true); if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };
  const resetSorting = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    const resetStates = {};
    algorithms.forEach(algorithm => {
      resetStates[algorithm.id] = {
        array: [...array],
        comparisons: [],
        swaps: [],
        animations: algorithmStates[algorithm.id]?.animations || [],
        currentStep: 0,
        finished: false,
        timer: 0,
        comparisonCount: algorithmStates[algorithm.id]?.comparisonCount || 0,
        swapCount: algorithmStates[algorithm.id]?.swapCount || 0
      };
    }); setAlgorithmStates(resetStates);
    setResults({});
    setSortingFinished(false);
    setIsRunning(false);
    setIsPaused(false);
  };
  const animateStep = (states) => {
    if (isPaused) return;
    const allFinished = Object.values(states).every(state =>
      state.finished || state.currentStep >= state.animations.length
    ); if (allFinished) {
      setIsRunning(false);
      finalizeResults(states);
      return;
    }
    let newStates = { ...states };
    let anyAlgorithmActive = false; const stepsPerFrame = speed > 80 ? Math.floor((speed - 80) / 5) + 1 : 1;
    for (let step = 0; step < stepsPerFrame; step++) {
      const allFinishedMidStep = Object.values(newStates).every(state =>
        state.finished || state.currentStep >= state.animations.length
      ); if (allFinishedMidStep) {
        break;
      }
      algorithms.forEach(algorithm => {
        const state = newStates[algorithm.id];
        if (state.finished || state.currentStep >= state.animations.length) {
          if (!state.finished) {
            newStates[algorithm.id] = {
              ...state,
              finished: true,
              timer: state.timer + 1
            };
          }
          return;
        } anyAlgorithmActive = true;
        const animation = state.animations[state.currentStep];
        const newArray = [...state.array];
        if (animation.type === 'compare') {
          newStates[algorithm.id] = {
            ...state,
            comparisons: animation.indices,
            timer: state.timer + 1,
            currentStep: state.currentStep + 1
          };
        } else if (animation.type === 'swap') {
          const [i, j] = animation.indices;
          const temp = newArray[i];
          newArray[i] = newArray[j];
          newArray[j] = temp; newStates[algorithm.id] = {
            ...state,
            array: newArray,
            swaps: animation.indices,
            comparisons: [],
            timer: state.timer + 1,
            currentStep: state.currentStep + 1
          };
        } else if (animation.type === 'replace') {
          newArray[animation.index] = animation.value; newStates[algorithm.id] = {
            ...state,
            array: newArray,
            swaps: [animation.index],
            comparisons: [],
            timer: state.timer + 1,
            currentStep: state.currentStep + 1
          };
        }
      });
    }
    setAlgorithmStates(newStates); if (anyAlgorithmActive) {
      const nextDelay = Math.max(5, 300 - (speed * 3));
      animationRef.current = setTimeout(() => animateStep(newStates), nextDelay);
    } else {
      setIsRunning(false);
      finalizeResults(newStates);
    }
  };
  const finalizeResults = (states) => {
    const sortingResults = {};
    const rankingList = []; algorithms.forEach(algorithm => {
      const state = states[algorithm.id];
      sortingResults[algorithm.id] = {
        name: algorithm.name,
        time: state.timer,
        comparisonCount: state.comparisonCount,
        swapCount: state.swapCount,
        color: algorithm.color
      };
      rankingList.push({
        id: algorithm.id,
        name: algorithm.name,
        time: state.timer,
        comparisonCount: state.comparisonCount,
        swapCount: state.swapCount,
        color: algorithm.color
      });
    });
    rankingList.sort((a, b) => a.time - b.time);
    rankingList.forEach((result, index) => {
      sortingResults[result.id].rank = index + 1;
    }); setResults(sortingResults);
    setRankedResults(rankingList);
    setSortingFinished(true);
    setLeaderboardOpen(true);
  };
  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };
  const bubbleSort = (arr, animations, comparisonCount, swapCount) => {
    const n = arr.length; for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push({ type: 'compare', indices: [j, j + 1] });
        comparisonCount.value++; if (arr[j] > arr[j + 1]) {
          animations.push({ type: 'swap', indices: [j, j + 1] });
          swapCount.value++; const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    } return arr;
  };
  const insertionSort = (arr, animations, comparisonCount, swapCount) => {
    const n = arr.length; for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      animations.push({ type: 'compare', indices: [i, j] });
      comparisonCount.value++; while (j >= 0 && arr[j] > key) {
        animations.push({ type: 'swap', indices: [j, j + 1] });
        swapCount.value++; arr[j + 1] = arr[j];
        j--; if (j >= 0) {
          animations.push({ type: 'compare', indices: [i, j] });
          comparisonCount.value++;
        }
      }
      if (j + 1 !== i) {
        animations.push({ type: 'replace', index: j + 1, value: key });
        arr[j + 1] = key;
      }
    } return arr;
  };
  const mergeSort = (arr, start, end, animations, comparisonCount, swapCount) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      mergeSort(arr, start, mid, animations, comparisonCount, swapCount);
      mergeSort(arr, mid + 1, end, animations, comparisonCount, swapCount);
      merge(arr, start, mid, end, animations, comparisonCount, swapCount);
    } return arr;
  };
  const merge = (arr, start, mid, end, animations, comparisonCount, swapCount) => {
    const leftArray = arr.slice(start, mid + 1);
    const rightArray = arr.slice(mid + 1, end + 1); let i = 0, j = 0, k = start; while (i < leftArray.length && j < rightArray.length) {
      animations.push({ type: 'compare', indices: [start + i, mid + 1 + j] });
      comparisonCount.value++; if (leftArray[i] <= rightArray[j]) {
        animations.push({ type: 'replace', index: k, value: leftArray[i] });
        arr[k] = leftArray[i];
        i++;
      } else {
        animations.push({ type: 'replace', index: k, value: rightArray[j] });
        arr[k] = rightArray[j];
        j++;
        swapCount.value++;
      }
      k++;
    }
    while (i < leftArray.length) {
      animations.push({ type: 'replace', index: k, value: leftArray[i] });
      arr[k] = leftArray[i];
      i++;
      k++;
    } while (j < rightArray.length) {
      animations.push({ type: 'replace', index: k, value: rightArray[j] });
      arr[k] = rightArray[j];
      j++;
      k++;
    }
  };
  const quickSort = (arr, low, high, animations, comparisonCount, swapCount) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, animations, comparisonCount, swapCount);
      quickSort(arr, low, pivotIndex - 1, animations, comparisonCount, swapCount);
      quickSort(arr, pivotIndex + 1, high, animations, comparisonCount, swapCount);
    } return arr;
  };
  const partition = (arr, low, high, animations, comparisonCount, swapCount) => {
    const pivot = arr[high];
    let i = low - 1; for (let j = low; j < high; j++) {
      animations.push({ type: 'compare', indices: [j, high] });
      comparisonCount.value++; if (arr[j] <= pivot) {
        i++;
        animations.push({ type: 'swap', indices: [i, j] });
        swapCount.value++; const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    animations.push({ type: 'swap', indices: [i + 1, high] });
    swapCount.value++; const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp; return i + 1;
  };
  const renderSortingVisualizer = (algorithmId, index) => {
    const algorithm = algorithms.find(algo => algo.id === algorithmId);
    const state = algorithmStates[algorithmId] || {
      array: array,
      comparisons: [],
      swaps: [],
      finished: false
    }; const result = results[algorithmId];
    const maxArrayValue = Math.max(...array); return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1
          }}
        >
          <Typography variant="h6" fontWeight="bold" color={algorithm.color}>
            {algorithm.name}
          </Typography>
          {result && (
            <Tooltip title={`Rank: ${result.rank}, Time: ${result.time} steps`} arrow>
              <Typography variant="body2" fontWeight="bold">
                #{result.rank}
              </Typography>
            </Tooltip>
          )}
        </Box>        <Paper
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            p: 1,
            backgroundColor: 'grey.100',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Array bars */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            {state.array.map((value, idx) => (
              <Box
                key={idx}
                sx={{
                  height: `${(value / maxArrayValue) * 100}%`,
                  width: `${80 / ARRAY_SIZE}%`,
                  backgroundColor: state.comparisons.includes(idx)
                    ? 'info.main'
                    : state.swaps.includes(idx)
                      ? 'error.main'
                      : algorithm.color,
                  margin: '0 1px',
                  transition: 'height 0.3s ease-in-out'
                }}
              />
            ))}
          </Box>          {state.finished && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'success.light',
                color: 'white',
                p: 0.5,
                borderRadius: '0 0 0 4px',
                fontSize: '0.75rem'
              }}
            >
              Completed
            </Box>
          )}
        </Paper>        {result && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" component="div" color="text.secondary">
              Time: {result.time} steps | Comparisons: {result.comparisonCount} | Swaps: {result.swapCount}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }; return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width: '100%' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Sorting Algorithms Comparison
      </Typography>      <Paper sx={{ p: 2, mb: 3, width: '100%', maxWidth: 850 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={generateRandomArray}
              startIcon={<ShuffleIcon />}
              disabled={isRunning && !isPaused}
              size="small"
            >
              New Array
            </Button>
            <Button
              variant="outlined"
              onClick={resetSorting}
              startIcon={<RestartAltIcon />}
              disabled={isRunning && !isPaused}
              size="small"
            >
              Reset
            </Button>
          </Stack>          <Button
            variant="contained"
            color={isRunning && !isPaused ? 'warning' : 'primary'}
            onClick={isRunning && !isPaused ? pauseSorting : startSorting}
            startIcon={isRunning && !isPaused ? <PauseIcon /> : <PlayArrowIcon />}
            disabled={sortingFinished}
            size="small"
          >
            {isRunning && !isPaused ? 'Pause' : (isPaused ? 'Resume' : 'Start Sorting')}
          </Button>
        </Box>        <Grid container spacing={2} sx={{ mb: 2 }}>
          {algorithms.map((algorithm, index) => (
            <Grid item xs={12} sm={6} key={algorithm.id} sx={{ height: 250 }}>
              {renderSortingVisualizer(algorithm.id, index)}
            </Grid>
          ))}
        </Grid>        <Box sx={{ mt: 2 }}>
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
      </Paper>      <Paper sx={{ p: 2, width: '100%', maxWidth: 850 }}>
        <Typography variant="h6" gutterBottom>
          About Sorting Algorithms
        </Typography>        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Algorithm</TableCell>
                <TableCell align="center">Time Complexity</TableCell>
                <TableCell align="center">Space Complexity</TableCell>
                <TableCell align="center">Stable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Bubble Sort</TableCell>
                <TableCell align="center">O(n²)</TableCell>
                <TableCell align="center">O(1)</TableCell>
                <TableCell align="center">Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Insertion Sort</TableCell>
                <TableCell align="center">O(n²)</TableCell>
                <TableCell align="center">O(1)</TableCell>
                <TableCell align="center">Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Merge Sort</TableCell>
                <TableCell align="center">O(n log n)</TableCell>
                <TableCell align="center">O(n)</TableCell>
                <TableCell align="center">Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quick Sort</TableCell>
                <TableCell align="center">O(n log n)</TableCell>
                <TableCell align="center">O(log n)</TableCell>
                <TableCell align="center">No</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>        <Typography variant="body2" paragraph>
          This visualization demonstrates how different sorting algorithms perform on the same data set. You can observe:
        </Typography>        <Box component="ul" sx={{ pl: 4, mt: 1 }}>
          <Box component="li">
            <Typography variant="body2">
              <strong>Efficiency:</strong> Notice how algorithms with O(n log n) complexity generally finish faster than O(n²) algorithms.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body2">
              <strong>Different approaches:</strong> Each algorithm uses a different strategy to sort the array.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body2">
              <strong>Comparison and swap counts:</strong> See which algorithms perform more operations to achieve the sorted result.
            </Typography>
          </Box>
        </Box>
      </Paper>      {/* Leaderboard Dialog */}
      <Dialog
        open={leaderboardOpen}
        onClose={handleCloseLeaderboard}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 300, maxWidth: 500 }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center' }}>
          <EmojiEventsIcon sx={{ mr: 1 }} />
          Sorting Algorithm Results
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body2" paragraph>
            Final results based on {array.length} elements:
          </Typography>          <TableContainer sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Algorithm</TableCell>
                  <TableCell align="right">Time (steps)</TableCell>
                  <TableCell align="right">Comparisons</TableCell>
                  <TableCell align="right">Swaps</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankedResults.map((result, index) => (
                  <TableRow key={result.id} sx={{
                    bgcolor: index === 0 ? `${result.color}15` : 'inherit',
                    '& td': index === 0 ? { fontWeight: 'bold' } : {}
                  }}>
                    <TableCell sx={{ color: index === 0 ? result.color : 'inherit' }}>
                      {index === 0 ? '🏆' : `#${index + 1}`}
                    </TableCell>
                    <TableCell sx={{ color: index === 0 ? result.color : 'inherit' }}>{result.name}</TableCell>
                    <TableCell align="right">{result.time}</TableCell>
                    <TableCell align="right">{result.comparisonCount}</TableCell>
                    <TableCell align="right">{result.swapCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>          <Typography variant="body2" paragraph>
            <strong>Insights:</strong>
          </Typography>          {rankedResults.length > 0 && (
            <Box component="ul" sx={{ pl: 3, mt: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong style={{ color: rankedResults[0]?.color }}>{rankedResults[0]?.name}</strong> was the fastest, completing in {rankedResults[0]?.time} steps.
                </Typography>
              </Box>
              {rankedResults.length > 1 && (
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    {rankedResults[0]?.name} was {Math.round((rankedResults[1]?.time / rankedResults[0]?.time - 1) * 100)}% faster than {rankedResults[1]?.name}.
                  </Typography>
                </Box>
              )}
              <Box component="li">
                <Typography variant="body2">
                  {rankedResults.length > 0 && rankedResults.reduce((acc, curr) => curr.comparisonCount < acc.comparisonCount ? curr : acc, rankedResults[0]).name} performed the fewest comparisons.
                </Typography>
              </Box>
            </Box>
          )}          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="outlined" onClick={handleCloseLeaderboard}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}; export default SortingVisualizer;