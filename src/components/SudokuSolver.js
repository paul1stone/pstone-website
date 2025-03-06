
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';


const SudokuCell = styled(Box)(({ theme, isActive, isGiven, isBorderTop, isBorderLeft, isBorderRight, isBorderBottom }) => ({
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isActive ? '#FFF9C4' : isGiven ? '#F5F5F5' : 'white',
  borderTop: isBorderTop ? '2px solid #212121' : '1px solid #BDBDBD',
  borderLeft: isBorderLeft ? '2px solid #212121' : '1px solid #BDBDBD',
  borderRight: isBorderRight ? '2px solid #212121' : '1px solid #BDBDBD',
  borderBottom: isBorderBottom ? '2px solid #212121' : '1px solid #BDBDBD',
  '& input': {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    padding: 0,
    border: 'none',
    fontSize: '1.2rem',
    background: 'none',
    '&:focus': {
      outline: 'none',
    },
    '&:disabled': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    }
  }
}));

const ControlButton = styled(Button)(({ theme }) => ({
  minWidth: 40,
  marginRight: theme.spacing(1),
}));

const SudokuSolver = () => {
  const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const [board, setBoard] = useState(initialBoard);
  const [solving, setSolving] = useState(false);
  const [activeCell, setActiveCell] = useState({ row: -1, col: -1 });
  const [speed, setSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState('backtracking');
  const animationTimeoutRef = useRef(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const resetBoard = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
    setSteps([]);
    setCurrentStep(0);
    setActiveCell({ row: -1, col: -1 });
    setSolving(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  const isValid = (board, row, col, num) => {

    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false;
      }
    }


    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) {
        return false;
      }
    }


    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const solveBacktracking = (board) => {
    const newSteps = [];
    const solvedBoard = JSON.parse(JSON.stringify(board));

    const solve = (row, col) => {
      if (row === 9) {
        return true;
      }

      if (col === 9) {
        return solve(row + 1, 0);
      }

      if (solvedBoard[row][col] !== 0) {
        return solve(row, col + 1);
      }

      for (let num = 1; num <= 9; num++) {
        if (isValid(solvedBoard, row, col, num)) {
          solvedBoard[row][col] = num;

          newSteps.push({
            board: JSON.parse(JSON.stringify(solvedBoard)),
            activeCell: { row, col },
            type: 'try',
            value: num
          });

          if (solve(row, col + 1)) {
            return true;
          }

          solvedBoard[row][col] = 0;

          newSteps.push({
            board: JSON.parse(JSON.stringify(solvedBoard)),
            activeCell: { row, col },
            type: 'backtrack',
            value: 0
          });
        }
      }

      return false;
    };

    solve(0, 0);
    return newSteps;
  };

  const startSolving = () => {
    if (solving) return;


    if (steps.length > 0) {
      resetBoard();
    }

    setSolving(true);

    const newSteps = algorithm === 'backtracking'
      ? solveBacktracking(board)
      : [];

    setSteps(newSteps);
    setCurrentStep(0);

    animateSteps(newSteps, 0);
  };


  useEffect(() => {
    if (solving && currentStep < steps.length) {

      clearTimeout(animationTimeoutRef.current);
      animateSteps(steps, currentStep);
    }

  }, [speed, solving]);

  const animateSteps = (steps, index) => {
    if (index >= steps.length) {
      setSolving(false);
      setActiveCell({ row: -1, col: -1 });
      return;
    }

    const step = steps[index];
    setBoard(step.board);
    setActiveCell(step.activeCell);
    setCurrentStep(index);

    animationTimeoutRef.current = setTimeout(() => {
      animateSteps(steps, index + 1);
    }, speed);
  };

  const togglePause = () => {
    if (solving) {

      clearTimeout(animationTimeoutRef.current);
      setSolving(false);
    } else if (steps.length > 0 && currentStep < steps.length) {

      setSolving(true);
      animateSteps(steps, currentStep);
    }
  };



  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };

  const handleCellChange = (row, col, value) => {
    if (solving) return;

    const newValue = value === '' ? 0 : parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = newValue;
    setBoard(newBoard);
    setSteps([]);
    setCurrentStep(0);
  };

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Sudoku Solver
      </Typography>

      <Paper sx={{ mb: 3, p: 2, width: 'fit-content' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 0 }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                isActive={activeCell.row === rowIndex && activeCell.col === colIndex}
                isGiven={initialBoard[rowIndex][colIndex] !== 0}
                isBorderTop={rowIndex % 3 === 0}
                isBorderLeft={colIndex % 3 === 0}
                isBorderRight={colIndex === 8}
                isBorderBottom={rowIndex === 8}
              >
                <input
                  type="text"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  disabled={solving || initialBoard[rowIndex][colIndex] !== 0}
                  maxLength="1"
                />
              </SudokuCell>
            ))
          )}
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <ControlButton
          variant="contained"
          color="primary"
          onClick={startSolving}
          disabled={solving}
        >
          Solve
        </ControlButton>
        <ControlButton
          variant="contained"
          color="warning"
          onClick={togglePause}
          disabled={steps.length === 0 || currentStep >= steps.length}
        >
          {solving ? 'Pause' : 'Resume'}
        </ControlButton>
        <ControlButton
          variant="contained"
          color="error"
          onClick={resetBoard}
        >
          Reset
        </ControlButton>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 300, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ mr: 1 }}>
            Fast
          </Typography>
          <Slider
            value={speed}
            onChange={handleSpeedChange}
            min={1}
            max={1000}
            step={10}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}ms`}
            sx={{ mx: 2 }}
          />
          <Typography variant="caption" sx={{ ml: 1 }}>
            Slow
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary">
        {solving ? 'Solving...' : steps.length > 0 && currentStep >= steps.length ? 'Solved!' : ''}
      </Typography>
    </Box>
  );
};

export default SudokuSolver;