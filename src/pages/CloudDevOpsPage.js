// src/pages/CloudDevOpsPage.js
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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DevicesIcon from '@mui/icons-material/Devices';
import SyncIcon from '@mui/icons-material/Sync';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const CloudDevOpsPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // AWS Services experience
  const awsServices = [
    {
      name: "S3 (Simple Storage Service)",
      description: "Experience with object storage for static assets, backups, and data lakes.",
      uses: ["Static website hosting", "Application asset storage", "Data backup"]
    },
    {
      name: "EC2 (Elastic Compute Cloud)",
      description: "Virtual server deployment and management for application hosting.",
      uses: ["Application servers", "Development environments", "Backend services"]
    },
    {
      name: "Lambda",
      description: "Serverless function deployment for event-driven architecture.",
      uses: ["API endpoints", "Event processing", "Scheduled tasks"]
    },
    {
      name: "Bedrock",
      description: "Foundation model APIs for building generative AI applications.",
      uses: ["RAG-based chatbot development", "AI service integration"]
    },
    {
      name: "IAM (Identity and Access Management)",
      description: "Secure resource access control through roles and permissions.",
      uses: ["Role-based access control", "Security policy implementation"]
    }
  ];

  // DevOps technologies
  const devOpsTechnologies = [
    {
      name: "Docker",
      icon: <DevicesIcon />,
      color: "#2496ED", // Docker blue
      description: "Container technology for application packaging and deployment.",
      skills: [
        "Dockerfile creation",
        "Multi-stage builds",
        "Container orchestration",
        "Development environments"
      ],
      projects: [
        "RAG Chatbot containerization",
        "Agario Game Clone local development"
      ]
    },
    {
      name: "Kubernetes",
      icon: <AutorenewIcon />,
      color: "#326CE5", // Kubernetes blue
      description: "Container orchestration platform for managing deployments at scale.",
      skills: [
        "Cluster deployment",
        "Pod management",
        "Service configuration",
        "Scaling configuration"
      ],
      projects: [
        "Deployed scalable clusters at Zeta Global"
      ]
    },
    {
      name: "CI/CD Pipelines",
      icon: <SyncIcon />,
      color: "#FF6D00", // Orange
      description: "Continuous integration and deployment workflows for automated testing and deployment.",
      skills: [
        "GitHub Actions",
        "Automated testing",
        "Deployment pipelines",
        "Terraform integration"
      ],
      projects: [
        "Model training and deployment workflows at Zeta Global"
      ]
    },
    {
      name: "Infrastructure as Code",
      icon: <SettingsSuggestIcon />,
      color: "#7B1FA2", // Purple
      description: "Managing and provisioning infrastructure through code rather than manual processes.",
      skills: [
        "Terraform",
        "Resource definition",
        "Environment configuration",
        "State management"
      ],
      projects: [
        "AWS resource provisioning for chatbot infrastructure"
      ]
    }
  ];

  // Project implementations
  const projectImplementations = [
    {
      name: "RAG-based Chatbot Cloud Infrastructure",
      description: "Designed and implemented cloud infrastructure for a production-ready chatbot using AWS services, containerization, and CI/CD pipelines.",
      technologies: ["AWS Bedrock", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
      details: [
        "Containerized microservices architecture for the chatbot backend",
        "Deployed scalable Kubernetes clusters for handling varying loads",
        "Implemented CI/CD workflows for model training and deployment",
        "Configured IAM roles for secure access between services",
        "Utilized Terraform for infrastructure provisioning"
      ]
    },
    {
      name: "Agario Game Clone Deployment",
      description: "Developed local containerized environment for seamless development and testing of the multiplayer game.",
      technologies: ["Docker", "MongoDB", "WebSockets"],
      details: [
        "Created Docker Compose setup for local development",
        "Configured container networking for WebSocket communication",
        "Set up persistent volume for database storage",
        "Implemented automated testing in containerized environment"
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
            Cloud & DevOps
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
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            <Grid container>
              <Grid item xs={12} md={8}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Cloud & DevOps Experience
                  </Typography>
                  <Typography variant="body1" paragraph>
                    My experience with cloud technologies and DevOps practices includes working with AWS services,
                    containerization, infrastructure as code, and CI/CD pipelines. I've applied these technologies
                    during my internship at Zeta Global and in personal projects.
                  </Typography>
                  <Typography variant="body1">
                    I focus on creating scalable, maintainable infrastructure that supports modern application
                    requirements while following best practices for security and efficiency.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                    <Chip label="AWS" color="primary" size="small" />
                    <Chip label="Docker" color="primary" size="small" />
                    <Chip label="Kubernetes" color="primary" size="small" />
                    <Chip label="CI/CD" color="primary" size="small" />
                    <Chip label="Terraform" color="primary" size="small" />
                    <Chip label="IAM/RBAC" color="primary" size="small" />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{
                display: { xs: 'none', md: 'flex' },
                bgcolor: 'primary.main',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4
              }}>
                <CloudIcon sx={{ fontSize: 160, color: 'rgba(255, 255, 255, 0.8)' }} />
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* AWS Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: '#FF9900', mr: 2 }}>
                <CloudIcon />
              </Avatar>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                AWS Services
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              Experience with various AWS services for building scalable, cloud-native applications:
            </Typography>

            <Grid container spacing={3}>
              {awsServices.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={service.name}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FF9900' }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {service.description}
                      </Typography>

                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                        Use Cases:
                      </Typography>
                      <List dense disablePadding>
                        {service.uses.map((use, i) => (
                          <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: '#FF9900' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={use}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* DevOps Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              DevOps Technologies
            </Typography>

            <Grid container spacing={4}>
              {devOpsTechnologies.map((tech, index) => (
                <Grid item xs={12} md={6} key={tech.name}>
                  <Card
                    sx={{
                      height: '100%',
                      boxShadow: 2,
                      borderTop: `4px solid ${tech.color}`
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: tech.color, mr: 2 }}>
                          {tech.icon}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {tech.name}
                        </Typography>
                      </Box>

                      <Typography variant="body2" paragraph>
                        {tech.description}
                      </Typography>

                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                        Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {tech.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: `${tech.color}15`,
                              color: tech.color,
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Box>

                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                        Applied In:
                      </Typography>
                      <List dense>
                        {tech.projects.map((project) => (
                          <ListItem key={project} disablePadding sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircleIcon sx={{ fontSize: 20, color: tech.color }} />
                            </ListItemIcon>
                            <ListItemText primary={project} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Project Implementations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Project Implementations
            </Typography>
            <Typography variant="body1" paragraph>
              Real-world examples of cloud and DevOps implementations in my projects:
            </Typography>

            {projectImplementations.map((project, index) => (
              <Box key={project.name} sx={{ mb: index < projectImplementations.length - 1 ? 4 : 0 }}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {project.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {project.technologies.map((tech) => (
                        <Chip key={tech} label={tech} size="small" />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Implementation Details:
                    </Typography>
                    <List>
                      {project.details.map((detail, i) => (
                        <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={detail}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
                {index < projectImplementations.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </motion.div>

        {/* DevOps Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              DevOps Philosophy
            </Typography>
            <Typography variant="body1" paragraph>
              My approach to DevOps is centered around these core principles:
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <IntegrationInstructionsIcon sx={{ fontSize: 50, mb: 1, color: 'rgba(255,255,255,0.9)' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Automation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Automating repetitive tasks to increase efficiency and reduce human error
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <SecurityIcon sx={{ fontSize: 50, mb: 1, color: 'rgba(255,255,255,0.9)' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Security
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Implementing security at every stage of the development lifecycle
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <SyncIcon sx={{ fontSize: 50, mb: 1, color: 'rgba(255,255,255,0.9)' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Continuous Integration
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Regular code integration with automated testing for early problem detection
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <StorageIcon sx={{ fontSize: 50, mb: 1, color: 'rgba(255,255,255,0.9)' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Infrastructure as Code
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Managing infrastructure with version-controlled code for consistency and reproducibility
                  </Typography>
                </Box>
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
            onClick={() => navigate('/projects/chatbot')}
            endIcon={<ArrowForwardIcon />}
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
            View RAG Chatbot Project
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CloudDevOpsPage;