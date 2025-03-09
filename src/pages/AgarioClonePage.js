import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Slider,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Chip,
  Card,
  CardContent,
  Alert,
  Tooltip,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import SpeedIcon from '@mui/icons-material/Speed';
import BugReportIcon from '@mui/icons-material/BugReport';
import SettingsIcon from '@mui/icons-material/Settings';

const AgarioClonePage = () => {
  // Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [showDebug, setShowDebug] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [playerScore, setPlayerScore] = useState(0);
  const [aiCount, setAiCount] = useState(10);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Canvas and animation
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gameStateRef = useRef({
    player: {
      x: 400,
      y: 300,
      radius: 20,
      color: '#3F51B5',
      velocity: { x: 0, y: 0 },
      mass: 20
    },
    ai: [],
    food: [],
    lastUpdate: 0,
    mousePos: { x: 400, y: 300 },
    worldSize: { width: 2000, height: 2000 },
    viewPort: { width: 800, height: 600 },
    camera: { x: 0, y: 0 }
  });

  // Colors for cells
  const cellColors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7',
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
  ];

  // Food colors
  const foodColors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];

  // AI names
  const aiNames = [
    'Blob', 'Cell', 'Chomper', 'Devourer', 'Eater',
    'Feeder', 'Glutton', 'Hunter', 'Ingester', 'Jelly',
    'Killer', 'Lurker', 'Monster', 'Nibbler', 'Omnivore',
    'Predator', 'Quaffer', 'Ravenous', 'Swallower', 'Thrasher'
  ];

  // Initialize game
  useEffect(() => {
    initGame();

    // Add mouse event listeners
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Initialize game state
  const initGame = () => {
    const gameState = gameStateRef.current;

    // Reset player
    gameState.player = {
      x: 400,
      y: 300,
      radius: Math.sqrt(40),
      color: '#3F51B5',
      velocity: { x: 0, y: 0 },
      mass: 40,
      name: playerName
    };

    // Create AI cells
    gameState.ai = [];
    for (let i = 0; i < aiCount; i++) {
      const x = Math.random() * gameState.worldSize.width;
      const y = Math.random() * gameState.worldSize.height;
      const mass = 10 + Math.random() * 40;
      const radius = Math.sqrt(mass);

      gameState.ai.push({
        x,
        y,
        radius,
        mass,
        color: cellColors[Math.floor(Math.random() * cellColors.length)],
        velocity: { x: 0, y: 0 },
        targetX: x,
        targetY: y,
        name: aiNames[Math.floor(Math.random() * aiNames.length)] + (i + 1),
        behaviorType: Math.floor(Math.random() * 3) // 0: wanderer, 1: hunter, 2: avoider
      });
    }

    // Create food particles
    gameState.food = [];
    for (let i = 0; i < 200; i++) {
      gameState.food.push({
        x: Math.random() * gameState.worldSize.width,
        y: Math.random() * gameState.worldSize.height,
        radius: 3,
        mass: 3,
        color: foodColors[Math.floor(Math.random() * foodColors.length)]
      });
    }

    // Reset game state
    setPlayerScore(gameState.player.mass);
    setGameOver(false);
    updateLeaderboard();
  };

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    gameStateRef.current.mousePos = { x, y };
  };

  // Game logic update
  const updateGame = (timestamp) => {
    const gameState = gameStateRef.current;
    const deltaTime = (timestamp - gameState.lastUpdate) / 1000 * gameSpeed;
    gameState.lastUpdate = timestamp;

    // Skip if delta time is too large (tab was inactive)
    if (deltaTime > 0.5) return;

    // Update player movement
    updatePlayerMovement(deltaTime);

    // Update AI movement
    updateAIMovement(deltaTime);

    // Check collisions
    checkCollisions();

    // Add new food if needed
    if (gameState.food.length < 200) {
      for (let i = 0; i < 5; i++) {
        gameState.food.push({
          x: Math.random() * gameState.worldSize.width,
          y: Math.random() * gameState.worldSize.height,
          radius: 3,
          mass: 3,
          color: foodColors[Math.floor(Math.random() * foodColors.length)]
        });
      }
    }

    // Update camera position
    updateCamera();

    // Update player score
    if (!gameOver) {
      setPlayerScore(Math.floor(gameState.player.mass));
    }

    // Update leaderboard every second
    if (Math.floor(timestamp / 1000) !== Math.floor(gameState.lastUpdate / 1000)) {
      updateLeaderboard();
    }

    // Render game
    renderGame();
  };

  // Update player movement
  const updatePlayerMovement = (deltaTime) => {
    const gameState = gameStateRef.current;
    const player = gameState.player;
    const mousePos = gameState.mousePos;

    // Calculate direction to mouse
    const dx = mousePos.x + gameState.camera.x - player.x;
    const dy = mousePos.y + gameState.camera.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Set velocity based on direction
    if (distance > 5) {
      // Normalize direction
      const dirX = dx / distance;
      const dirY = dy / distance;

      // Speed decreases as mass increases
      const speed = Math.max(100 / Math.sqrt(player.mass), 30);

      player.velocity.x = dirX * speed;
      player.velocity.y = dirY * speed;
    } else {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }

    // Update position
    player.x += player.velocity.x * deltaTime;
    player.y += player.velocity.y * deltaTime;

    // Constrain to world boundaries
    player.x = Math.max(player.radius, Math.min(gameState.worldSize.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(gameState.worldSize.height - player.radius, player.y));
  };

  // Update AI movement
  const updateAIMovement = (deltaTime) => {
    const gameState = gameStateRef.current;

    gameState.ai.forEach(ai => {
      // Decide behavior based on type and conditions
      switch (ai.behaviorType) {
        case 0: // Wanderer - moves randomly
          // Change target occasionally
          if (Math.random() < 0.01) {
            ai.targetX = Math.random() * gameState.worldSize.width;
            ai.targetY = Math.random() * gameState.worldSize.height;
          }
          break;

        case 1: // Hunter - chases smaller cells
          // Look for prey (smaller cells or food)
          let closestPreyDist = Infinity;
          let closestPrey = null;

          // Check if player is smaller
          if (gameState.player.mass < ai.mass * 0.9) {
            const distToPlayer = getDistance(ai, gameState.player);
            if (distToPlayer < closestPreyDist && distToPlayer < 300) {
              closestPreyDist = distToPlayer;
              closestPrey = gameState.player;
            }
          }

          // Check other AI cells
          gameState.ai.forEach(otherAi => {
            if (otherAi !== ai && otherAi.mass < ai.mass * 0.9) {
              const dist = getDistance(ai, otherAi);
              if (dist < closestPreyDist && dist < 300) {
                closestPreyDist = dist;
                closestPrey = otherAi;
              }
            }
          });

          // Check food
          gameState.food.forEach(food => {
            const dist = getDistance(ai, food);
            if (dist < closestPreyDist && dist < 200) {
              closestPreyDist = dist;
              closestPrey = food;
            }
          });

          // Chase prey if found, otherwise wander
          if (closestPrey) {
            ai.targetX = closestPrey.x;
            ai.targetY = closestPrey.y;
          } else if (Math.random() < 0.01) {
            ai.targetX = Math.random() * gameState.worldSize.width;
            ai.targetY = Math.random() * gameState.worldSize.height;
          }
          break;

        case 2: // Avoider - runs from larger cells
          // Look for threats (larger cells)
          let closestThreatDist = Infinity;
          let closestThreat = null;

          // Check if player is larger
          if (gameState.player.mass > ai.mass * 1.1) {
            const distToPlayer = getDistance(ai, gameState.player);
            if (distToPlayer < closestThreatDist && distToPlayer < 200) {
              closestThreatDist = distToPlayer;
              closestThreat = gameState.player;
            }
          }

          // Check other AI cells
          gameState.ai.forEach(otherAi => {
            if (otherAi !== ai && otherAi.mass > ai.mass * 1.1) {
              const dist = getDistance(ai, otherAi);
              if (dist < closestThreatDist && dist < 200) {
                closestThreatDist = dist;
                closestThreat = otherAi;
              }
            }
          });

          // Run from threat if found, otherwise look for food
          if (closestThreat) {
            // Run in opposite direction
            const dx = ai.x - closestThreat.x;
            const dy = ai.y - closestThreat.y;
            const distToThreat = Math.sqrt(dx * dx + dy * dy);

            ai.targetX = ai.x + (dx / distToThreat) * 200;
            ai.targetY = ai.y + (dy / distToThreat) * 200;
          } else {
            // Look for food when not threatened
            let closestFoodDist = Infinity;
            let closestFood = null;

            gameState.food.forEach(food => {
              const dist = getDistance(ai, food);
              if (dist < closestFoodDist && dist < 150) {
                closestFoodDist = dist;
                closestFood = food;
              }
            });

            if (closestFood) {
              ai.targetX = closestFood.x;
              ai.targetY = closestFood.y;
            } else if (Math.random() < 0.01) {
              ai.targetX = Math.random() * gameState.worldSize.width;
              ai.targetY = Math.random() * gameState.worldSize.height;
            }
          }
          break;
      }

      // Calculate direction to target
      const dx = ai.targetX - ai.x;
      const dy = ai.targetY - ai.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Set velocity based on direction
      if (distance > 5) {
        // Normalize direction
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Speed decreases as mass increases
        const speed = Math.max(80 / Math.sqrt(ai.mass), 25);

        ai.velocity.x = dirX * speed;
        ai.velocity.y = dirY * speed;
      } else {
        ai.velocity.x = 0;
        ai.velocity.y = 0;
      }

      // Update position
      ai.x += ai.velocity.x * deltaTime;
      ai.y += ai.velocity.y * deltaTime;

      // Constrain to world boundaries
      ai.x = Math.max(ai.radius, Math.min(gameState.worldSize.width - ai.radius, ai.x));
      ai.y = Math.max(ai.radius, Math.min(gameState.worldSize.height - ai.radius, ai.y));
    });
  };

  // Helper function to get distance between objects
  const getDistance = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Check collisions
  const checkCollisions = () => {
    const gameState = gameStateRef.current;

    // Player eats food
    for (let i = gameState.food.length - 1; i >= 0; i--) {
      const food = gameState.food[i];
      const distance = getDistance(gameState.player, food);

      if (distance < gameState.player.radius) {
        gameState.player.mass += food.mass;
        gameState.player.radius = Math.sqrt(gameState.player.mass);
        gameState.food.splice(i, 1);
      }
    }

    // Player eats AI or gets eaten
    for (let i = gameState.ai.length - 1; i >= 0; i--) {
      const ai = gameState.ai[i];
      const distance = getDistance(gameState.player, ai);

      // Player eats AI
      if (gameState.player.mass > ai.mass * 1.1 && distance < gameState.player.radius) {
        gameState.player.mass += ai.mass;
        gameState.player.radius = Math.sqrt(gameState.player.mass);

        // Replace eaten AI with a new one
        const x = Math.random() * gameState.worldSize.width;
        const y = Math.random() * gameState.worldSize.height;
        const mass = 10 + Math.random() * 40;
        const radius = Math.sqrt(mass);

        gameState.ai[i] = {
          x,
          y,
          radius,
          mass,
          color: cellColors[Math.floor(Math.random() * cellColors.length)],
          velocity: { x: 0, y: 0 },
          targetX: x,
          targetY: y,
          name: aiNames[Math.floor(Math.random() * aiNames.length)] + (i + 1),
          behaviorType: Math.floor(Math.random() * 3)
        };
      }
      // AI eats player
      else if (ai.mass > gameState.player.mass * 1.1 && distance < ai.radius) {
        ai.mass += gameState.player.mass;
        ai.radius = Math.sqrt(ai.mass);

        // Game over
        setGameOver(true);
        setIsPlaying(false);
      }
    }

    // AI eats food
    for (let i = 0; i < gameState.ai.length; i++) {
      const ai = gameState.ai[i];

      for (let j = gameState.food.length - 1; j >= 0; j--) {
        const food = gameState.food[j];
        const distance = getDistance(ai, food);

        if (distance < ai.radius) {
          ai.mass += food.mass;
          ai.radius = Math.sqrt(ai.mass);
          gameState.food.splice(j, 1);
        }
      }
    }

    // AI eats other AI
    for (let i = 0; i < gameState.ai.length; i++) {
      const ai1 = gameState.ai[i];

      for (let j = gameState.ai.length - 1; j >= 0; j--) {
        if (i !== j) {
          const ai2 = gameState.ai[j];
          const distance = getDistance(ai1, ai2);

          if (ai1.mass > ai2.mass * 1.1 && distance < ai1.radius) {
            ai1.mass += ai2.mass;
            ai1.radius = Math.sqrt(ai1.mass);

            // Replace eaten AI with a new one
            const x = Math.random() * gameState.worldSize.width;
            const y = Math.random() * gameState.worldSize.height;
            const mass = 10 + Math.random() * 40;
            const radius = Math.sqrt(mass);

            gameState.ai[j] = {
              x,
              y,
              radius,
              mass,
              color: cellColors[Math.floor(Math.random() * cellColors.length)],
              velocity: { x: 0, y: 0 },
              targetX: x,
              targetY: y,
              name: aiNames[Math.floor(Math.random() * aiNames.length)] + (j + 1),
              behaviorType: Math.floor(Math.random() * 3)
            };
          }
        }
      }
    }
  };

  // Update camera position
  const updateCamera = () => {
    const gameState = gameStateRef.current;

    // Camera follows player
    gameState.camera.x = gameState.player.x - gameState.viewPort.width / 2;
    gameState.camera.y = gameState.player.y - gameState.viewPort.height / 2;
  };

  // Update leaderboard
  const updateLeaderboard = () => {
    const gameState = gameStateRef.current;

    // Collect all cells (player and AI)
    const allCells = [
      { name: playerName, mass: gameState.player.mass, color: gameState.player.color, isPlayer: true }
    ];

    gameState.ai.forEach(ai => {
      allCells.push({ name: ai.name, mass: ai.mass, color: ai.color, isPlayer: false });
    });

    // Sort by mass
    allCells.sort((a, b) => b.mass - a.mass);

    // Take top 10
    setLeaderboard(allCells.slice(0, 10));
  };

  // Render game
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gameState = gameStateRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx);

    // Draw food
    gameState.food.forEach(food => {
      if (isVisibleOnScreen(food)) {
        drawCircle(ctx, food, gameState.camera);
      }
    });

    // Draw AI cells
    gameState.ai.forEach(ai => {
      if (isVisibleOnScreen(ai)) {
        drawCell(ctx, ai, gameState.camera);
      }
    });

    // Draw player
    drawCell(ctx, gameState.player, gameState.camera);

    // Draw debug info
    if (showDebug) {
      drawDebugInfo(ctx);
    }

    // Draw game over text
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);

      ctx.font = '24px Arial';
      ctx.fillText(`Your Score: ${Math.floor(gameState.player.mass)}`, canvas.width / 2, canvas.height / 2);

      ctx.font = '18px Arial';
      ctx.fillText('Press Restart to play again', canvas.width / 2, canvas.height / 2 + 50);
    }
  };

  // Draw grid
  const drawGrid = (ctx) => {
    const gameState = gameStateRef.current;
    const gridSize = 50;

    // Adjust for camera position
    const offsetX = -gameState.camera.x % gridSize;
    const offsetY = -gameState.camera.y % gridSize;

    ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = offsetX; x < ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = offsetY; y < ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }
  };

  // Draw circle (for food)
  const drawCircle = (ctx, circle, camera) => {
    ctx.beginPath();
    ctx.arc(
      circle.x - camera.x,
      circle.y - camera.y,
      circle.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = circle.color;
    ctx.fill();
  };

  // Draw cell (for player and AI)
  const drawCell = (ctx, cell, camera) => {
    // Draw cell body
    ctx.beginPath();
    ctx.arc(
      cell.x - camera.x,
      cell.y - camera.y,
      cell.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = cell.color;
    ctx.fill();

    // Draw cell border
    ctx.strokeStyle = darkenColor(cell.color, 0.3);
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw cell name
    const name = cell.name || (cell === gameStateRef.current.player ? playerName : 'AI');
    ctx.font = `${Math.max(12, Math.min(cell.radius / 2, 20))}px Arial`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, cell.x - camera.x, cell.y - camera.y);

    // Draw mass text if big enough
    if (cell.radius > 20) {
      ctx.font = `${Math.max(10, Math.min(cell.radius / 3, 14))}px Arial`;
      ctx.fillText(Math.floor(cell.mass), cell.x - camera.x, cell.y - camera.y + cell.radius / 2 + 5);
    }
  };

  // Draw debug info
  const drawDebugInfo = (ctx) => {
    const gameState = gameStateRef.current;

    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const debugInfo = [
      `Player Position: (${Math.floor(gameState.player.x)}, ${Math.floor(gameState.player.y)})`,
      `Player Mass: ${Math.floor(gameState.player.mass)}`,
      `Player Radius: ${Math.floor(gameState.player.radius)}`,
      `Camera: (${Math.floor(gameState.camera.x)}, ${Math.floor(gameState.camera.y)})`,
      `AI Count: ${gameState.ai.length}`,
      `Food Count: ${gameState.food.length}`,
      `Game Speed: ${gameSpeed}x`
    ];

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(10, 10, 250, 20 * debugInfo.length + 10);

    ctx.fillStyle = 'black';
    debugInfo.forEach((text, i) => {
      ctx.fillText(text, 20, 20 + i * 20);
    });
  };

  // Helper function to check if an object is visible on screen
  const isVisibleOnScreen = (obj) => {
    const gameState = gameStateRef.current;
    const x = obj.x - gameState.camera.x;
    const y = obj.y - gameState.camera.y;

    return (
      x + obj.radius > 0 &&
      x - obj.radius < gameState.viewPort.width &&
      y + obj.radius > 0 &&
      y - obj.radius < gameState.viewPort.height
    );
  };

  // Helper function to darken a color
  const darkenColor = (color, amount) => {
    // Parse hex color
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    // Darken
    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));

    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Animation loop
  const animate = (timestamp) => {
    if (isPlaying && !gameOver) {
      updateGame(timestamp);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  // Start/stop game
  useEffect(() => {
    if (isPlaying) {
      gameStateRef.current.lastUpdate = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  // Handle reset
  const handleReset = () => {
    setIsPlaying(false);
    initGame();
    renderGame();
  };

  // Handle play/pause
  const togglePlay = () => {
    if (gameOver) {
      handleReset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Page Title */}
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
            Agario Game Clone
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            An implementation of the popular agar.io game with AI-controlled (the main project has multiplayer, but here its just AI) cells. Control your cell with your mouse,
            eat smaller cells and food to grow, and avoid being eaten by larger cells!
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  About This Project
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  This Agar.io clone demonstrates key concepts in multiplayer game development:
                </Typography>

                <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                    Canvas-based rendering for smooth graphics
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                    Physics-based movement and collision detection
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                    AI behavior patterns with different strategies
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                    Real-time leaderboard and scoring system
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  <Chip label="React" size="small" />
                  <Chip label="JavaScript" size="small" />
                  <Chip label="WebSockets" size="small" />
                  <Chip label="TypeScript" size="small" />
                </Box>

                <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                  Game Controls
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Mouse:</strong> Move your cell toward the cursor position
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/paul1stone/agario-clone"
                    target="_blank"
                    sx={{
                      borderColor: '#1A237E',
                      color: '#1A237E',
                      '&:hover': {
                        borderColor: '#0D47A1',
                        bgcolor: 'rgba(26, 35, 126, 0.04)'
                      }
                    }}
                  >
                    View Code on GitHub
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2
                }}
              >
                <Box sx={{ width: '100%' }}>
                  {/* Game settings */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                      Game Settings
                    </Typography>

                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Player Name"
                          variant="outlined"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          disabled={isPlaying}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            AI Count:
                          </Typography>
                          <Slider
                            value={aiCount}
                            min={5}
                            max={30}
                            step={1}
                            onChange={(_, value) => setAiCount(value)}
                            valueLabelDisplay="auto"
                            disabled={isPlaying}
                            sx={{ flex: 1, color: '#1A237E' }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Game canvas */}
                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      bgcolor: '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}
                  >
                    <canvas
                      ref={canvasRef}
                      width="800"
                      height="600"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        cursor: 'crosshair'
                      }}
                    />
                  </Box>

                  {/* Game controls */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                      onClick={togglePlay}
                      sx={{
                        bgcolor: '#1A237E',
                        '&:hover': { bgcolor: '#0D47A1' }
                      }}
                    >
                      {isPlaying ? 'Pause' : gameOver ? 'Play Again' : 'Play'}
                    </Button>

                    <Box>
                      <Tooltip title="Restart game">
                        <IconButton
                          onClick={handleReset}
                          sx={{ mr: 1 }}
                        >
                          <RestartAltIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Game speed">
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', mr: 1 }}>
                          <SpeedIcon sx={{ mr: 0.5, color: 'text.secondary', fontSize: 20 }} />
                          <Slider
                            value={gameSpeed}
                            min={0.5}
                            max={2}
                            step={0.1}
                            onChange={(_, value) => setGameSpeed(value)}
                            valueLabelDisplay="auto"
                            sx={{ width: 80, color: '#1A237E' }}
                          />
                        </Box>
                      </Tooltip>

                      <Tooltip title="Show debug info">
                        <IconButton
                          onClick={() => setShowDebug(!showDebug)}
                          color={showDebug ? "primary" : "default"}
                        >
                          <BugReportIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* Game stats and leaderboard */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Your Stats
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Player Name:
                            </Typography>
                            <Typography variant="body1">
                              {playerName}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Current Score:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {playerScore}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Status:
                            </Typography>
                            <Chip
                              label={gameOver ? "Game Over" : isPlaying ? "Playing" : "Paused"}
                              color={gameOver ? "error" : isPlaying ? "success" : "default"}
                              size="small"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Leaderboard
                          </Typography>
                          <List dense sx={{ pt: 0 }}>
                            {leaderboard.map((cell, index) => (
                              <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                <Box
                                  sx={{
                                    width: 24,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    mr: 1
                                  }}
                                >
                                  {index + 1}.
                                </Box>
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: cell.color,
                                    mr: 1
                                  }}
                                />
                                <ListItemText
                                  primary={`${cell.name} (${Math.floor(cell.mass)})`}
                                  primaryTypographyProps={{
                                    fontWeight: cell.isPlayer ? 'bold' : 'normal',
                                    variant: 'body2'
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
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

            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
              Rendering and Animation
            </Typography>


            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" mb={1}>
                Creating a camera system that follows the player's cell
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                Implementing efficient rendering by only drawing objects visible within the viewport
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                Using time calculations to ensure consistent animation speeds regardless of frame rate
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                Drawing cells with dynamic sizing based on mass, with names and borders
              </Typography>
            </Box>

            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
              AI Implementation
            </Typography>

            <Typography variant="body1" paragraph>
              The game features three distinct AI behavior patterns:
            </Typography>

            <Box component="ol" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" mb={1}>
                <strong>Wanderers:</strong>
                They represent the simplest AI behavior and serve as easy targets for players.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                <strong>Hunters:</strong>
                They prioritize the largest prey they can safely consume, making them more aggressive and dangerous.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                <strong>Avoiders:</strong> These cells prioritize survival by fleeing from larger cells that could eat them.
              </Typography>
            </Box>

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AgarioClonePage;