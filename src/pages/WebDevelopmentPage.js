// src/pages/WebDevelopmentPage.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HtmlIcon from '@mui/icons-material/Html';
import JavascriptIcon from '@mui/icons-material/Javascript';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BuildIcon from '@mui/icons-material/Build';
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';

const WebDevelopmentPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Web technologies proficiency data
  const webTechnologies = [
    {
      category: "Frontend Frameworks & Libraries",
      technologies: [
        {
          name: "React",
          proficiency: 85,
          icon: <CodeIcon />,
          description: "Building interactive user interfaces with components, hooks, and state management",
          projects: "Secret Santa App, Portfolio Website"
        },
        {
          name: "Angular",
          proficiency: 80,
          icon: <CodeIcon />,
          description: "Developing robust SPA applications with TypeScript integration",
          projects: "Agario Game Clone"
        },
        {
          name: "Svelte",
          proficiency: 70,
          icon: <CodeIcon />,
          description: "Creating lightweight interfaces with Svelte's compiled approach",
          projects: "Personal Projects"
        }
      ]
    },
    {
      category: "Backend Technologies",
      technologies: [
        {
          name: "FastAPI",
          proficiency: 85,
          icon: <CloudIcon />,
          description: "Building high-performance Python APIs with automatic documentation",
          projects: "Secret Santa App, RAG Chatbot"
        },
        {
          name: "Firebase",
          proficiency: 80,
          icon: <CloudIcon />,
          description: "Implementing authentication, database, and hosting services",
          projects: "Secret Santa App"
        },
        {
          name: "PHP",
          proficiency: 65,
          icon: <CodeIcon />,
          description: "Server-side scripting for web applications",
          projects: "Academic Projects"
        }
      ]
    },
    {
      category: "Core Web Technologies",
      technologies: [
        {
          name: "HTML/CSS",
          proficiency: 90,
          icon: <HtmlIcon />,
          description: "Creating semantic, accessible markup and responsive styling",
          projects: "All Web Projects"
        },
        {
          name: "JavaScript/TypeScript",
          proficiency: 85,
          icon: <JavascriptIcon />,
          description: "Client-side scripting and type-safe application development",
          projects: "Agario Game Clone, Secret Santa App"
        }
      ]
    }
  ];

  // Web development projects
  const webProjects = [
    {
      name: "Agario Game Clone",
      description: "Online multiplayer game developed with Angular and TypeScript, featuring real-time gameplay through WebSockets and user data management with MongoDB.",
      technologies: ["Angular", "TypeScript", "WebSockets", "MongoDB", "Docker"],
      highlights: [
        "Implemented real-time multiplayer functionality",
        "Created responsive game interfaces",
        "Established database architecture for user data"
      ]
    },
    {
      name: "Secret Santa App",
      description: "Full-stack application for organizing Secret Santa events, featuring optimal participant matching through Hamiltonian cycles algorithm implementation.",
      technologies: ["React", "AWS", "Firebase", "FastAPI"],
      highlights: [
        "Led development team using Agile methodology",
        "Implemented complex matching algorithm",
        "Created secure authentication system"
      ]
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio website showcasing projects, skills, and experience. Built with React and Material UI for a responsive, modern user experience.",
      technologies: ["React", "Material UI", "Responsive Design"],
      highlights: [
        "Implemented responsive layout for all devices",
        "Created smooth animations and transitions",
        "Optimized performance and accessibility"
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
            Web Development
          </Typography>
        </motion.div>

        {/* Introduction Section */}
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
              borderRadius: 2
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Full-Stack Web Development
            </Typography>
            <Typography variant="body1" paragraph>
              I've built a variety of web applications ranging from interactive games to utility applications,
              employing both frontend and backend technologies. My approach to web development focuses on creating
              responsive, user-friendly interfaces supported by robust server-side implementations.
            </Typography>
            <Typography variant="body1">
              Below are the key web technologies in my toolkit, organized by their role in the development stack.
            </Typography>
          </Paper>
        </motion.div>

        {/* Web Technologies Sections */}
        {webTechnologies.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
          >
            <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {category.category}
              </Typography>

              <Grid container spacing={4}>
                {category.technologies.map((tech, techIndex) => (
                  <Grid item xs={12} md={6} key={tech.name}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ color: 'primary.main', mr: 1 }}>
                            {tech.icon}
                          </Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                            {tech.name}
                          </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Proficiency
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {tech.proficiency}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={tech.proficiency}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              bgcolor: 'rgba(0,0,0,0.05)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#1A237E'
                              }
                            }}
                          />
                        </Box>

                        <Typography variant="body2" paragraph>
                          {tech.description}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Projects:</strong> {tech.projects}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        ))}

        {/* Web Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Featured Web Projects
            </Typography>
            <Typography variant="body1" paragraph>
              These projects demonstrate my web development capabilities across different domains and technologies.
            </Typography>

            {webProjects.map((project, index) => (
              <React.Fragment key={project.name}>
                <Card
                  variant="outlined"
                  sx={{
                    mt: 3,
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {project.description}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                          Technologies:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {project.technologies.map(tech => (
                            <Chip key={tech} label={tech} size="small" />
                          ))}
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                          Highlights:
                        </Typography>
                        <List dense disablePadding>
                          {project.highlights.map((highlight, i) => (
                            <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 30 }}>
                                <CheckCircleIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={highlight}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        size="small"
                        onClick={() => navigate(`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`)}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          color: '#1A237E',
                          '&:hover': {
                            bgcolor: 'rgba(26, 35, 126, 0.04)'
                          }
                        }}
                      >
                        View Project Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
                {index < webProjects.length - 1 && <Box sx={{ height: 24 }} />}
              </React.Fragment>
            ))}
          </Paper>
        </motion.div>

        {/* Development Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Web Development Approach
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <DesignServicesIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        User-Centered
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Prioritizing user experience in the design and development process,
                      with a focus on accessibility, responsiveness, and intuitive interfaces.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <BuildIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Component-Based
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Structuring applications with reusable, modular components that
                      promote code reusability, maintainability, and consistent design.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <StorageIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Data-Driven
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Designing systems with efficient data models and state management
                      practices that deliver responsive and consistent user experiences.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CodeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Performance-Focused
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Optimizing application performance through efficient code, asset
                      optimization, and proper caching strategies to deliver fast-loading experiences.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Navigation Buttons */}
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
            Back to Skills
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/skills/ml-ai')}
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
            ML & AI Skills
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WebDevelopmentPage;