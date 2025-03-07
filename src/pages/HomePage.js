
import React from 'react';
import profilePhoto from '../images/hs.jpeg';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {


  const navigate = useNavigate();


  const featuredSkills = [
    "Python", "React", "Machine Learning", "AWS", "Docker", "TypeScript"
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                  Paul Stone
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  CS Student & Machine Learning Engineer
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px' }}>
                  I am a Cornell University student specializing in Machine Learning and AI development. I have experience in
                  building RAG-based chatbots, cloud infrastructure, and full-stack applications.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/projects')}
                    sx={{
                      bgcolor: '#FFD54F',
                      color: '#1A237E',
                      '&:hover': {
                        bgcolor: '#FFC107',
                      }
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/chat')}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: '#FFD54F',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                    endIcon={<ChatIcon />}
                  >
                    Chat with AI
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src={profilePhoto}
                  alt="Paul Stone"
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    display: 'block',
                    mx: 'auto'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>

          {/* Skills chips */}
          <Box sx={{ mt: 6, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Chip
                  label={skill}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'medium',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    }
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Container>

        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
            zIndex: 0
          }}
        />
      </Box>

      {/* Featured Sections */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {/* Education Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8
                  }
                }}
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#ECEFF1' }}>
                  <Avatar sx={{ bgcolor: '#1A237E', mr: 2 }}>
                    <SchoolIcon />
                  </Avatar>
                  <Typography variant="h6" component="h2">
                    Education
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Cornell University
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    B.S. in Computer Science, 2021-2025
                  </Typography>
                  <Typography variant="body2" paragraph>
                    College of Engineering
                  </Typography>
                  <Typography variant="body2">
                    Relevant coursework in Machine Learning, AI, Data Structures, Algorithms, and Database Systems.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/education')}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          {/* Experience Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8
                  }
                }}
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#ECEFF1' }}>
                  <Avatar sx={{ bgcolor: '#1A237E', mr: 2 }}>
                    <WorkIcon />
                  </Avatar>
                  <Typography variant="h6" component="h2">
                    Experience
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Machine Learning Engineer Intern
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Zeta Global | Summer 2024
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Developed RAG-based chatbots using AWS Bedrock
                  </Typography>
                  <Typography variant="body2">
                    Worked with CI/CD workflows, Kubernetes clusters, and integrated various AWS services.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/experience')}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          {/* Projects Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8
                  }
                }}
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#ECEFF1' }}>
                  <Avatar sx={{ bgcolor: '#1A237E', mr: 2 }}>
                    <CodeIcon />
                  </Avatar>
                  <Typography variant="h6" component="h2">
                    Projects
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Featured Projects
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • RAG-based Chatbot
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Agario Game Clone
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Secret Santa Application
                  </Typography>
                  <Typography variant="body2">
                    Utilizing technologies like React, AWS, MongoDB, and Docker.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/projects')}>
                    View All Projects
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Chat with AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              mt: 6,
              p: 4,
              textAlign: 'center',
              background: 'linear-gradient(90deg, #1A237E 0%, #3F51B5 100%)',
              color: 'white',
              borderRadius: 2
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Talk to my AI chatbot that can answer questions about me!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, maxWidth: '700px', mx: 'auto' }}>
              Covers my background, skills, and projects.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<ChatIcon />}
              onClick={() => navigate('/chat')}
              sx={{
                bgcolor: '#FFD54F',
                color: '#1A237E',
                px: 4,
                '&:hover': {
                  bgcolor: '#FFC107',
                }
              }}
            >
              Chat with AI Paul
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;