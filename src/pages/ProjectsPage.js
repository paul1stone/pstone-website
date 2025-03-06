// src/pages/ProjectsPage.js
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
  CardActions,
  Chip,
  Button,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';

// Import placeholder images - you can replace these with your actual project images
// import ragChatbotImage from '../images/rag_chatbot.png';
// import agarioImage from '../images/agario.png';
// import secretSantaImage from '../images/secret_santa.png';
// import iotImage from '../images/iot.png';

const ProjectsPage = () => {
  const navigate = useNavigate();

  // Project data
  const projects = [
    {
      id: 'chatbot',
      title: 'RAG Chatbot',
      description: 'A Retrieval-Augmented Generation chatbot built using AWS Bedrock and large language models. The chatbot can retrieve relevant information from documents to provide accurate responses.',
      // image: ragChatbotImage,
      technologies: ['AWS Bedrock', 'Python', 'Docker', 'LLMs', 'Vector Embeddings', 'FastAPI'],
      detailPath: '/projects/chatbot',
      githubLink: 'https://github.com/paul1stone/rag-chatbot',
      highlights: [
        'Built during internship at Zeta Global',
        'Containerized microservices architecture',
        'Optimized for retrieval accuracy and response quality'
      ]
    },
    {
      id: 'agario',
      title: 'Agario Game Clone',
      description: 'An online multiplayer game similar to agar.io developed using Angular and TypeScript. Features real-time gameplay through WebSockets and a MongoDB backend for user data.',
      // image: agarioImage,
      technologies: ['Angular', 'TypeScript', 'WebSockets', 'MongoDB', 'Docker'],
      detailPath: '/projects/agario',
      githubLink: 'https://github.com/paul1stone/agario-clone',
      highlights: [
        'Real-time multiplayer functionality',
        'User authentication and leaderboards',
        'Responsive design for all devices'
      ]
    },
    {
      id: 'santa',
      title: 'Secret Santa App',
      description: 'A web application for organizing Secret Santa events with optimal participant matching through Hamiltonian cycles algorithm implementation.',
      // image: secretSantaImage,
      technologies: ['React', 'AWS', 'Firebase', 'FastAPI', 'Agile'],
      detailPath: '/projects/santa',
      githubLink: 'https://github.com/paul1stone/secret-santa',
      highlights: [
        'Team leader for development',
        'Complex matching algorithm implementation',
        'User-friendly interface for event management'
      ]
    },
    {
      id: 'iot',
      title: 'Algorithm Visualization',
      description: 'asdad',
      // image: iotImage,
      technologies: ['C++', 'IoT', 'MQTT', 'Grafana', 'Data Visualization'],
      detailPath: '/projects/algorithm-visualization',
      githubLink: 'https://github.com/paul1stone/iot-energy-monitor',
      highlights: [
        'Research project at Cornell University',
        'Real-time energy usage monitoring',
        'Data-driven optimization for energy efficiency'
      ]
    }
  ];

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
            Projects
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
              My Portfolio
            </Typography>
            <Typography variant="body1" paragraph>
              Below are some of my key projects that showcase my technical skills and problem-solving abilities.
              These projects span various domains including machine learning, web development, and IoT.
            </Typography>
            <Typography variant="body1">
              Each project demonstrates different aspects of my technical expertise, from AI and cloud technologies to
              full-stack development and algorithm implementation. Click on a project to learn more about its
              architecture, technologies, and my specific contributions.
            </Typography>
          </Paper>
        </motion.div>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    },
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                        Key Highlights:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                        {project.highlights.map((highlight, i) => (
                          <Typography component="li" variant="body2" key={i} sx={{ mb: 0.5 }}>
                            {highlight}
                          </Typography>
                        ))}
                      </Box>
                    </Box>

                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Technologies:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech) => (
                        <Chip key={tech} label={tech} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ p: 2 }}>
                    <Button
                      size="small"
                      startIcon={<GitHubIcon />}
                      href={project.githubLink}
                      target="_blank"
                      sx={{ mr: 1 }}
                    >
                      Repository
                    </Button>
                    <Button
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate(project.detailPath)}
                      sx={{ ml: 'auto' }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Other Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Additional Projects
            </Typography>
            <Typography variant="body1" paragraph>
              Beyond my featured projects, I've worked on various smaller-scale applications and
              contributed to open-source projects. These include:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Personal Portfolio Website
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      The website you're currently viewing, built with React and Material UI.
                    </Typography>
                    <Chip label="React" size="small" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Material UI" size="small" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Framer Motion" size="small" sx={{ mb: 1 }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Data Structure Implementations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Implementations of various data structures and algorithms as part of coursework.
                    </Typography>
                    <Chip label="Python" size="small" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Java" size="small" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Algorithms" size="small" sx={{ mb: 1 }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Machine Learning Experiments
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Various ML projects and experiments exploring different algorithms and techniques.
                    </Typography>
                    <Chip label="TensorFlow" size="small" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="PyTorch" size="small" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Scikit-learn" size="small" sx={{ mb: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/paul1stone"
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
                View All Projects on GitHub
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/skills')}
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
            View Skills
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/experience')}
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
            View Experience
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsPage;