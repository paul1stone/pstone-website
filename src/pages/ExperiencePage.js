// src/pages/ExperiencePage.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CloudIcon from '@mui/icons-material/Cloud';
import MemoryIcon from '@mui/icons-material/Memory';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

// Import your profile image if needed
import profilePhoto from '../images/hs.jpeg';

const ExperiencePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

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
            Professional Experience
          </Typography>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={3}
            sx={{
              mb: 5,
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Experience Overview
            </Typography>
            <Typography variant="body1" paragraph>
              My professional experience spans machine learning engineering, research, and software development.
              I've worked in both industry and academic environments, applying my technical skills to solve
              real-world problems and contributing to cutting-edge projects.
            </Typography>
            <Typography variant="body1">
              Select an experience below to learn more about my roles, responsibilities, and achievements.
            </Typography>
          </Paper>
        </motion.div>

        {/* Experience Cards */}
        <Grid container spacing={4}>
          {/* Zeta Global Card */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ bgcolor: '#673AB7', p: 3, color: 'white' }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Zeta Global
                  </Typography>
                  <Typography variant="subtitle1">
                    Machine Learning Engineer Intern
                  </Typography>
                  <Typography variant="body2">
                    June 2024 - August 2024
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#673AB7', mr: 2 }}>
                      <PsychologyIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        RAG-based Chatbot Development
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Developed using AWS Bedrock and Dockerized microservices
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#673AB7', mr: 2 }}>
                      <CloudIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Cloud & DevOps Implementation
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kubernetes, CI/CD workflows, AWS integration
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/experience/zeta')}
                      sx={{
                        bgcolor: '#673AB7',
                        '&:hover': {
                          bgcolor: '#5E35B1'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>

          {/* Cornell Research Card */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ bgcolor: '#4CAF50', p: 3, color: 'white' }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Cornell University
                  </Typography>
                  <Typography variant="subtitle1">
                    Research Assistant
                  </Typography>
                  <Typography variant="body2">
                    February 2022 - May 2022
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#4CAF50', mr: 2 }}>
                      <MemoryIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        IoT Energy Monitoring System
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Campus-wide mesh network for energy usage tracking
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#4CAF50', mr: 2 }}>
                      <CodeIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Microcontroller Development
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        C++ programming with MQTT-based communication
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/experience/cornell')}
                      sx={{
                        bgcolor: '#4CAF50',
                        '&:hover': {
                          bgcolor: '#43A047'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Skills Gained Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Professional Growth Timeline
            </Typography>
            <Typography variant="body1" paragraph>
              Key skills and knowledge acquired through my professional experiences:
            </Typography>

            <Timeline position={isMobile ? "right" : "alternate"}>
              <TimelineItem>
                <TimelineOppositeContent sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body2" color="text.secondary">
                    February 2022
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success">
                    <MemoryIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    Cornell Research Assistant
                  </Typography>
                  <Typography variant="body2">
                    IoT development, C++ programming, data pipelines
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineOppositeContent sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body2" color="text.secondary">
                    May 2022
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success">
                    <SchoolIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    Project Completion
                  </Typography>
                  <Typography variant="body2">
                    10% reduction in campus energy usage achieved
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineOppositeContent sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body2" color="text.secondary">
                    June 2024
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="secondary">
                    <WorkIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    Zeta Global Internship
                  </Typography>
                  <Typography variant="body2">
                    Machine learning, AWS, cloud infrastructure
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineOppositeContent sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body2" color="text.secondary">
                    August 2024
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="secondary">
                    <PsychologyIcon />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    RAG Chatbot Deployment
                  </Typography>
                  <Typography variant="body2">
                    Large Language Models, containerization, CI/CD
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Paper>
        </motion.div>

        {/* Full Resume Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 5,
              borderRadius: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Complete Resume
              </Typography>
              <Typography variant="body1" paragraph>
                View my comprehensive professional resume with all experiences, skills, education, and achievements.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/experience/resume')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#1A237E',
                  '&:hover': {
                    bgcolor: '#0D47A1'
                  }
                }}
              >
                View Full Resume
              </Button>
            </Box>

            <Box
              component="img"
              src={profilePhoto}
              alt="Paul Stone"
              sx={{
                width: { xs: 200, md: 180 },
                height: { xs: 200, md: 180 },
                borderRadius: '50%',
                border: '5px solid #e0e0e0',
              }}
            />
          </Paper>
        </motion.div>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/about')}
            sx={{
              mx: 1,
              borderColor: '#1A237E',
              color: '#1A237E',
              '&:hover': {
                borderColor: '#0D47A1',
                bgcolor: 'rgba(26, 35, 126, 0.04)'
              }
            }}
          >
            About Me
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/projects')}
            sx={{
              mx: 1,
              borderColor: '#1A237E',
              color: '#1A237E',
              '&:hover': {
                borderColor: '#0D47A1',
                bgcolor: 'rgba(26, 35, 126, 0.04)'
              }
            }}
          >
            View Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ExperiencePage;
