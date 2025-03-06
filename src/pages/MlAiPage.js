
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
  Button,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const MlAiPage = () => {


  const navigate = useNavigate();


  const mlTechnologies = [
    {
      name: "Large Language Models",
      icon: <PsychologyIcon fontSize="large" />,
      color: "#8E24AA",
      description: "Experience working with various LLMs including OpenAI GPT models, Claude, and other advanced language models through AWS Bedrock.",
      skills: [
        "RAG-based chatbot development",
        "Prompt engineering",
        "Context optimization",
        "Model fine-tuning"
      ],
      projects: [
        "Zeta Global RAG Chatbot"
      ]
    },
    {
      name: "Machine Learning Libraries",
      icon: <MemoryIcon fontSize="large" />,
      color: "#43A047",
      description: "Proficiency with Python-based machine learning frameworks for building and training models.",
      skills: [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Neural network architectures",
        "Model evaluation and optimization"
      ],
      projects: [
        "ML coursework at Cornell",
        "Personal ML projects"
      ]
    },
    {
      name: "Data Processing",
      icon: <StorageIcon fontSize="large" />,
      color: "#FB8C00",
      description: "Experience with data manipulation, preprocessing, and analysis for machine learning applications.",
      skills: [
        "Pandas",
        "NumPy",
        "Data cleaning and preprocessing",
        "Feature engineering",
        "Data visualization"
      ],
      projects: [
        "IoT Energy Monitoring",
        "Data analysis projects"
      ]
    },
    {
      name: "Cloud AI Services",
      icon: <CloudIcon fontSize="large" />,
      color: "#039BE5",
      description: "Working with cloud-based AI/ML services and deployment platforms.",
      skills: [
        "AWS Bedrock",
        "Containerized ML deployment",
        "Kubernetes for ML services",
        "Serverless AI applications"
      ],
      projects: [
        "Zeta Global RAG Chatbot"
      ]
    }
  ];


  const mlExperience = [
    {
      title: "Machine Learning Engineer Intern",
      company: "Zeta Global",
      period: "June 2024 - August 2024",
      description: "Developed and optimized a RAG-based chatbot using AWS Bedrock and Dockerized microservices for deployment. Compared Assistant services performance across OpenAI, AWS Bedrock, Claude, and other Large Language Models.",
      technologies: ["AWS Bedrock", "RAG", "LLMs", "Docker", "Kubernetes", "CI/CD"],
      achievements: [
        "Implemented efficient retrieval mechanisms for improved context handling",
        "Optimized performance across different LLM platforms",
        "Created deployment infrastructure using containerization"
      ]
    },
    {
      title: "Machine Learning Coursework",
      company: "Cornell University",
      period: "2021 - Present",
      description: "Comprehensive curriculum in machine learning and artificial intelligence as part of Computer Science degree.",
      technologies: ["TensorFlow", "PyTorch", "Neural Networks", "NLP"],
      achievements: [
        "Implemented various machine learning algorithms from scratch",
        "Developed neural network models for complex classification tasks",
        "Applied AI techniques to real-world problem sets"
      ]
    }
  ];


  const mlProjects = [
    {
      title: "RAG-based Chatbot",
      description: "Developed a Retrieval-Augmented Generation chatbot during my internship at Zeta Global, leveraging AWS Bedrock services and optimizing for context handling and response quality.",
      technologies: ["AWS Bedrock", "LLMs", "Python", "Docker", "FastAPI"],
      highlights: [
        "Implemented vector search for efficient document retrieval",
        "Optimized context window usage for improved responses",
        "Containerized deployment for scalability",
        "Designed reusable architecture for different knowledge domains"
      ]
    }
  ];


  const aiTrends = [
    {
      trend: "Multimodal AI",
      description: "Systems that can process and generate multiple types of media (text, images, audio)"
    },
    {
      trend: "Retrieval-Augmented Generation",
      description: "Enhancing LLMs with external knowledge through efficient document retrieval techniques"
    },
    {
      trend: "AI Agents & Autonomous Systems",
      description: "Self-directing AI systems that can plan and execute complex tasks"
    },
    {
      trend: "Small Language Models",
      description: "Efficient, specialized models for specific domains that can run with fewer resources"
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
            Machine Learning & AI
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
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)',
              color: 'white'
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  AI & Machine Learning Expertise
                </Typography>
                <Typography variant="body1" paragraph>
                  My experience in Machine Learning and AI encompasses both academic training at Cornell University
                  and practical application during my internship at Zeta Global, where I developed a RAG-based chatbot
                  using AWS Bedrock and various Large Language Models.
                </Typography>
                <Typography variant="body1">
                  I'm particularly interested in the practical applications of LLMs, retrieval-augmented generation,
                  and the deployment of ML systems in production environments using cloud technologies and containerization.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  sx={{
                    width: { xs: 120, md: 160 },
                    height: { xs: 120, md: 160 },
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <PsychologyIcon sx={{ fontSize: { xs: 80, md: 100 } }} />
                </Avatar>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* ML/AI Technologies Grid */}
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          color: '#1A237E',
        }}>
          Technologies & Skills
        </Typography>

        <Grid container spacing={4}>
          {mlTechnologies.map((tech, index) => (
            <Grid item xs={12} md={6} key={tech.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
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
                  <Box sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: tech.color,
                    color: 'white'
                  }}>
                    <Box sx={{ mr: 2 }}>
                      {tech.icon}
                    </Box>
                    <Typography variant="h5" component="h2">
                      {tech.name}
                    </Typography>
                  </Box>

                  <CardContent>
                    <Typography variant="body1" paragraph>
                      {tech.description}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Key Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {tech.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            bgcolor: `${tech.color}20`,
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
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Experience Section */}
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          color: '#1A237E',
        }}>
          ML/AI Experience
        </Typography>

        {mlExperience.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar sx={{ bgcolor: index === 0 ? '#8E24AA' : '#1A237E', mr: 2 }}>
                  {index === 0 ? <WorkIcon /> : <SchoolIcon />}
                </Avatar>
                <Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {exp.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {exp.company} | {exp.period}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                {exp.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Technologies:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {exp.technologies.map((tech) => (
                    <Chip key={tech} label={tech} size="small" />
                  ))}
                </Box>
              </Box>

              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                Key Achievements:
              </Typography>
              <List dense>
                {exp.achievements.map((achievement, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </motion.div>
        ))}

        {/* Projects Section */}
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          color: '#1A237E',
        }}>
          ML/AI Projects
        </Typography>

        {mlProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                borderLeft: '6px solid #8E24AA'
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                {project.title}
              </Typography>

              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                {project.description}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Technologies:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.map((tech) => (
                      <Chip key={tech} label={tech} size="small" />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Highlights:
                  </Typography>
                  <List dense>
                    {project.highlights.map((highlight, i) => (
                      <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircleIcon sx={{ fontSize: 20, color: '#8E24AA' }} />
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
                  onClick={() => navigate('/projects/chatbot')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    color: '#8E24AA',
                    '&:hover': {
                      bgcolor: 'rgba(142, 36, 170, 0.08)'
                    }
                  }}
                >
                  View Project Details
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ))}

        {/* Interest Areas Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mt: 5,
              borderRadius: 2
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              AI Trends & Areas of Interest
            </Typography>
            <Typography variant="body1" paragraph>
              I actively follow developments in these emerging areas of AI and machine learning:
            </Typography>

            <Grid container spacing={3}>
              {aiTrends.map((item) => (
                <Grid item xs={12} sm={6} key={item.trend}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: '#1A237E' }}>
                        {item.trend}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
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
              borderColor: '#8E24AA',
              color: '#8E24AA',
              '&:hover': {
                borderColor: '#7B1FA2',
                bgcolor: 'rgba(142, 36, 170, 0.04)'
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

export default MlAiPage;