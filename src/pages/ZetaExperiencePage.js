// src/pages/ZetaExperiencePage.js
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CloudIcon from '@mui/icons-material/Cloud';
import DataObjectIcon from '@mui/icons-material/DataObject';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const ZetaExperiencePage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Skills gained during this experience
  const skillsGained = [
    {
      category: "Machine Learning & AI",
      skills: [
        "RAG Architecture Design",
        "LLM Integration",
        "Prompt Engineering",
        "AI Model Evaluation",
        "Context Window Optimization"
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        "AWS Bedrock",
        "Kubernetes",
        "Docker",
        "CI/CD Pipelines",
        "IAM & RBAC"
      ]
    },
    {
      category: "Software Development",
      skills: [
        "Python",
        "Microservices Architecture",
        "API Design",
        "Documentation",
        "Git Workflow"
      ]
    },
    {
      category: "Professional",
      skills: [
        "Technical Communication",
        "Project Management",
        "Agile Methodology",
        "Code Reviews",
        "Collaboration"
      ]
    }
  ];

  // Key projects/tasks
  const keyTasks = [
    {
      title: "RAG-based Chatbot Development",
      description: "Developed and optimized a Retrieval-Augmented Generation chatbot using AWS Bedrock and various LLMs.",
      achievements: [
        "Implemented efficient vector search for document retrieval",
        "Fine-tuned prompt templates for improved response quality",
        "Compared performance across multiple LLM providers",
        "Created flexible integration points for different data sources"
      ]
    },
    {
      title: "Containerized Deployment",
      description: "Built containerized architecture for the chatbot platform using Docker and Kubernetes.",
      achievements: [
        "Designed microservices architecture for the chatbot components",
        "Deployed scalable Kubernetes clusters for handling varying loads",
        "Implemented health checks and monitoring solutions",
        "Optimized container resource allocation for cost efficiency"
      ]
    },
    {
      title: "CI/CD Implementation",
      description: "Created continuous integration and deployment workflows for the project.",
      achievements: [
        "Set up GitHub Actions workflows for automated testing",
        "Implemented model training and deployment pipelines",
        "Created infrastructure as code using Terraform",
        "Established quality gates for deployment approval"
      ]
    },
    {
      title: "AWS Integration",
      description: "Integrated various AWS services into the existing systems architecture.",
      achievements: [
        "Configured S3 for efficient storage of vector embeddings",
        "Set up EC2 instances for compute-intensive operations",
        "Leveraged Lambda functions for serverless components",
        "Implemented IAM roles and RBAC for secure access control"
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
          <Paper
            elevation={3}
            sx={{
              mb: 5,
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #673AB7 0%, #9575CD 100%)',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WorkIcon sx={{ fontSize: 36, mr: 2 }} />
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                Zeta Global
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              Machine Learning Engineer Intern
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              June 2024 - August 2024
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              A summer internship focused on building and optimizing a RAG-based chatbot using
              AWS Bedrock and various Large Language Models. The role involved cloud infrastructure,
              CI/CD implementation, and participation in the full software development lifecycle.
            </Typography>
          </Paper>
        </motion.div>

        {/* Key Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#673AB7' }}>
              Key Responsibilities
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <PsychologyIcon sx={{ color: '#673AB7' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Developed and optimized a RAG-based chatbot using AWS Bedrock and Dockerized microservices for deployment"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DataObjectIcon sx={{ color: '#673AB7' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Compared Assistant services performance across OpenAI/OpenAPI, AWS Bedrock, Claude, and other Large Language Models"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CloudIcon sx={{ color: '#673AB7' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Deployed scalable Kubernetes clusters for handling varying loads"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BuildIcon sx={{ color: '#673AB7' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Worked with CI/CD workflows for model training and deployment using GitHub Actions and Terraform"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupsIcon sx={{ color: '#673AB7' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Took part in daily stand-ups, code reviews, and the software development life cycle (SDLC)"
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        {/* Key Projects/Tasks */}
        <Typography variant="h5" component="h2" gutterBottom sx={{
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          color: '#673AB7',
        }}>
          Key Projects & Achievements
        </Typography>

        <Grid container spacing={4}>
          {keyTasks.map((task, index) => (
            <Grid item xs={12} md={6} key={task.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    borderTop: '4px solid #673AB7'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    {task.description}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Achievements:
                  </Typography>
                  <List dense>
                    {task.achievements.map((achievement, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <CheckCircleIcon fontSize="small" sx={{ color: '#673AB7' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={achievement}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Skills Gained */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#673AB7' }}>
              Skills & Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              During my time at Zeta Global, I gained experience with the following skills and technologies:
            </Typography>

            <Grid container spacing={3}>
              {skillsGained.map((category) => (
                <Grid item xs={12} sm={6} key={category.category}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: '#673AB7' }}>
                        {category.category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(103, 58, 183, 0.1)',
                              color: '#673AB7',
                              mb: 1
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#673AB7' }}>
              Key Takeaways
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <PsychologyIcon sx={{ fontSize: 50, mb: 1, color: '#673AB7' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    AI Development Skills
                  </Typography>
                  <Typography variant="body2">
                    Gained hands-on experience with large language models and RAG architecture, understanding
                    the nuances of prompt engineering and context management.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <CloudIcon sx={{ fontSize: 50, mb: 1, color: '#673AB7' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Cloud Infrastructure
                  </Typography>
                  <Typography variant="body2">
                    Learned to design and implement scalable cloud solutions using containerization and
                    orchestration technologies within the AWS ecosystem.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <GroupsIcon sx={{ fontSize: 50, mb: 1, color: '#673AB7' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Professional Growth
                  </Typography>
                  <Typography variant="body2">
                    Experienced the full software development lifecycle in a professional setting,
                    collaborating with teams and participating in agile development practices.
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
            onClick={() => navigate('/experience')}
            startIcon={<ArrowBackIcon />}
            sx={{
              mx: 1,
              borderColor: '#673AB7',
              color: '#673AB7',
              '&:hover': {
                borderColor: '#5E35B1',
                bgcolor: 'rgba(103, 58, 183, 0.04)'
              }
            }}
          >
            Back to Experience
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/experience/cornell')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              mx: 1,
              borderColor: '#673AB7',
              color: '#673AB7',
              '&:hover': {
                borderColor: '#5E35B1',
                bgcolor: 'rgba(103, 58, 183, 0.04)'
              }
            }}
          >
            Cornell Research Experience
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ZetaExperiencePage;