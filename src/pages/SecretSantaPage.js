import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Chip,
  Card,
  CardContent,
  Alert,
  Tooltip,
  Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import AddIcon from '@mui/icons-material/Add';
import CasinoIcon from '@mui/icons-material/Casino';

const SecretSantaPage = () => {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [matches, setMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const canvasRef = useRef(null);


  const defaultParticipants = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Joe', email: 'joe@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Sam', email: 'sam@example.com' },
    { name: 'Emma', email: 'emma@example.com' },
    { name: 'David', email: 'david@example.com' },
    { name: 'Olivia', email: 'olivia@example.com' },
    { name: 'Michael', email: 'michael@example.com' }
  ];


  const handleAddParticipant = () => {
    if (!newParticipant.name || !newParticipant.email) {
      setError('Please provide both name and email');
      return;
    }

    if (participants.some(p => p.name.toLowerCase() === newParticipant.name.toLowerCase())) {
      setError('This name already exists');
      return;
    }

    if (participants.some(p => p.email.toLowerCase() === newParticipant.email.toLowerCase())) {
      setError('This email already exists');
      return;
    }

    setError('');


    const colors = [
      '#FF5722', '#2196F3', '#4CAF50', '#9C27B0',
      '#FFC107', '#795548', '#00BCD4', '#E91E63',
      '#3F51B5', '#009688', '#FF9800', '#607D8B'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setParticipants([...participants, {
      name: newParticipant.name,
      email: newParticipant.email,
      color: randomColor
    }]);
    setNewParticipant({ name: '', email: '' });
    setMatches([]);
    setShowMatches(false);
  };


  const handleRemoveParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
    setMatches([]);
    setShowMatches(false);
  };


  const generateRandomNames = () => {

    const shuffled = [...defaultParticipants].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 3) + 4;
    const selectedParticipants = shuffled.slice(0, count);


    const colors = [
      '#FF5722', '#2196F3', '#4CAF50', '#9C27B0',
      '#FFC107', '#795548', '#00BCD4', '#E91E63'
    ];

    const newParticipants = selectedParticipants.map((participant, index) => ({
      name: participant.name,
      email: participant.email,
      color: colors[index % colors.length]
    }));

    setParticipants(newParticipants);
    setMatches([]);
    setShowMatches(false);
  };


  const generateMatches = () => {
    if (participants.length < 3) {
      setError('You need at least 3 participants');
      return;
    }

    setError('');


    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    const matchesList = shuffled.map((person, index) => {
      const giftTo = shuffled[(index + 1) % shuffled.length];
      return {
        giver: person,
        receiver: giftTo
      };
    });

    setMatches(matchesList);
    setShowMatches(true);
    setSnackbarMessage('Secret Santa matches generated!');
    setOpenSnackbar(true);


    setTimeout(() => {
      drawGraph(matchesList);
    }, 100);
  };


  const drawGraph = (matchesList) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;


    ctx.clearRect(0, 0, width, height);


    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60;

    const nodePositions = {};

    matchesList.forEach((match, index) => {
      const angle = (index * 2 * Math.PI) / matchesList.length - Math.PI / 2;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      nodePositions[match.giver.name] = { x, y, color: match.giver.color };
    });


    matchesList.forEach(match => {
      const fromPos = nodePositions[match.giver.name];
      const toPos = nodePositions[match.receiver.name];

      if (fromPos && toPos) {
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        ctx.strokeStyle = fromPos.color;
        ctx.lineWidth = 3;
        ctx.stroke();


        const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const arrowSize = 10;

        ctx.beginPath();
        ctx.moveTo(toPos.x, toPos.y);
        ctx.lineTo(
          toPos.x - arrowSize * Math.cos(angle - Math.PI / 6),
          toPos.y - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          toPos.x - arrowSize * Math.cos(angle + Math.PI / 6),
          toPos.y - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = fromPos.color;
        ctx.fill();
      }
    });


    Object.entries(nodePositions).forEach(([name, { x, y, color }]) => {

      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();


      ctx.font = '14px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, x, y);
    });
  };


  const sendEmails = () => {
    setSnackbarMessage('Emails would be sent in a real implementation!');
    setOpenSnackbar(true);
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
            Secret Santa App
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            A Secret Santa organizer that uses a Hamiltonian cycle algorithm for optimal matching, this ensures all participants give and receive a gift, with no reciprocal
            assignments (where A gives to B and B gives to A).
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
                  The Secret Santa App was built to help the classic holiday process.
                </Typography>


                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  <Chip label="React" size="small" />
                  <Chip label="AWS" size="small" />
                  <Chip label="Firebase" size="small" />
                  <Chip label="FastAPI" size="small" />
                  <Chip label="Material UI" size="small" />
                </Box>

                <Typography variant="subtitle2" fontWeight="medium" mb={1}>
                  Implementation Details
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  I found that one of the more interesting aspects to this project was getting the matching to work as a cycle.
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  The app was built using React for the frontend, with Firebase for authentication and FastAPI for the backend service. AWS SES was used for email delivery, but turned off in this implementation.
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/paul1stone/secret-santa"
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
                  {/* Add participant form */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                      Secret Santa Organizer
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Add participants to create a Secret Santa group.
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Participant Name"
                          variant="outlined"
                          value={newParticipant.name}
                          onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          value={newParticipant.email}
                          onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleAddParticipant}
                          sx={{
                            height: '100%',
                            bgcolor: '#1A237E',
                            '&:hover': { bgcolor: '#0D47A1' }
                          }}
                        >
                          Add
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<CasinoIcon />}
                          onClick={generateRandomNames}
                          sx={{
                            height: '100%',
                            borderColor: '#1A237E',
                            color: '#1A237E',
                            '&:hover': {
                              borderColor: '#0D47A1',
                              bgcolor: 'rgba(26, 35, 126, 0.04)'
                            }
                          }}
                        >
                          Random Names
                        </Button>
                      </Grid>
                    </Grid>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                  </Box>

                  {/* Participants list */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Participants
                      </Typography>
                      <Tooltip title="You need at least 3 participants">
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Card variant="outlined">
                      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                        {participants.length === 0 ? (
                          <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              No participants added yet
                            </Typography>
                          </Box>
                        ) : (
                          <List sx={{ width: '100%', p: 0 }}>
                            {participants.map((participant, index) => (
                              <React.Fragment key={index}>
                                <ListItem
                                  secondaryAction={
                                    <IconButton edge="end" onClick={() => handleRemoveParticipant(index)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  }
                                >
                                  <Box
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: '50%',
                                      bgcolor: participant.color,
                                      mr: 2
                                    }}
                                  />
                                  <ListItemText
                                    primary={participant.name}
                                    secondary={participant.email}
                                  />
                                </ListItem>
                                {index < participants.length - 1 && <Divider />}
                              </React.Fragment>
                            ))}
                          </List>
                        )}
                      </CardContent>
                    </Card>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Button
                      variant="contained"
                      startIcon={<ShuffleIcon />}
                      onClick={generateMatches}
                      disabled={participants.length < 3}
                      sx={{
                        bgcolor: '#1A237E',
                        '&:hover': { bgcolor: '#0D47A1' },
                        '&.Mui-disabled': { bgcolor: '#E0E0E0' }
                      }}
                    >
                      Generate Matches
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<SendIcon />}
                      onClick={sendEmails}
                      disabled={!showMatches}
                      sx={{
                        borderColor: '#1A237E',
                        color: '#1A237E',
                        '&:hover': {
                          borderColor: '#0D47A1',
                          bgcolor: 'rgba(26, 35, 126, 0.04)'
                        }
                      }}
                    >
                      Send Notifications
                    </Button>
                  </Box>

                  {/* Graph Visualization */}
                  {showMatches && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" fontWeight="bold" mb={2}>
                        Hamiltonian Cycle Visualization
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        This graph shows the gift-giving cycle. Each participant gives to the person
                        their arrow points to and receives from the person pointing to them.
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          bgcolor: '#f9f9f9',
                          borderRadius: 1,
                          border: '1px solid #ddd',
                          p: 2
                        }}
                      >
                        <canvas
                          ref={canvasRef}
                          width="450"
                          height="400"
                          style={{ maxWidth: '100%' }}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Results */}
                  {showMatches && (
                    <Box>
                      <Typography variant="h6" fontWeight="bold" mb={2}>
                        Secret Santa Matches
                      </Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <List>
                            {matches.map((match, index) => (
                              <React.Fragment key={index}>
                                <ListItem>
                                  <Box
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: '50%',
                                      bgcolor: match.giver.color,
                                      mr: 2
                                    }}
                                  />
                                  <ListItemText
                                    primary={`${match.giver.name} → ${match.receiver.name}`}
                                    secondary={`${match.giver.email} will give a gift to ${match.receiver.name} (${match.receiver.email})`}
                                  />
                                </ListItem>
                                {index < matches.length - 1 && <Divider />}
                              </React.Fragment>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Box>
                  )}
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
              The Hamiltonian cycle-based algorithm works as follows:
            </Typography>

            <Box component="ol" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" mb={1}>
                We start by shuffling all participants for randomness.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                Then we create a cycle where each person gives to the next person in the sequence.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                The last person in the sequence gives to the first, completing the cycle.
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                By using a cycle that's longer than 2 people, we ensure there are no reciprocal matches.
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              Further implementations could include:
            </Typography>

            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" mb={1}>
                Exclusion lists (people who shouldn't be matched together)
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                Family groupings (avoiding matches within the same family)
              </Typography>
              <Typography component="li" variant="body1" mb={1}>
                History of previous years' matches (to avoid repeat matches)
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Feedback notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default SecretSantaPage;