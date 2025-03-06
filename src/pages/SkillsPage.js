
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const SkillsPage = () => {


  const navigate = useNavigate();


  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <CodeIcon fontSize="large" />,
      iconColor: "#673AB7",
      description: "Proficient in a variety of programming languages including Python, OCaml, C/C++, Java, JavaScript, TypeScript, RISCV, and x86.",
      keySkills: ["Python", "TypeScript", "C++", "Java", "OCaml"],
      path: "/skills/programming"
    },
    {
      title: "Web Development",
      icon: <WebIcon fontSize="large" />,
      iconColor: "#2196F3",
      description: "Experience building responsive web applications using modern frameworks and libraries with a focus on performance and user experience.",
      keySkills: ["React", "Angular", "HTML/CSS", "Svelte", "FastAPI", "Firebase"],
      path: "/skills/web"
    },
    {
      title: "Machine Learning & AI",
      icon: <PsychologyIcon fontSize="large" />,
      iconColor: "#4CAF50",
      description: "Applying artificial intelligence and machine learning techniques to solve complex problems, with experience in building RAG-based chatbots.",
      keySkills: ["TensorFlow", "PyTorch", "Large Language Models", "RAG", "OpenAI"],
      path: "/skills/ml-ai"
    },
    {
      title: "Databases",
      icon: <StorageIcon fontSize="large" />,
      iconColor: "#FF9800",
      description: "Designing and implementing efficient database solutions for data storage, retrieval, and analysis across different database systems.",
      keySkills: ["MongoDB", "SQL", "MySQL", "NoSQL"],
      path: "/skills/databases"
    },
    {
      title: "Cloud & DevOps",
      icon: <CloudIcon fontSize="large" />,
      iconColor: "#03A9F4",
      description: "Building and deploying applications in cloud environments with CI/CD pipelines, containerization, and infrastructure as code.",
      keySkills: ["AWS (S3, EC2, Lambda)", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
      path: "/skills/cloud"
    },
    {
      title: "Tools & Development",
      icon: <BuildIcon fontSize="large" />,
      iconColor: "#F44336",
      description: "Utilizing a variety of development tools and methodologies to streamline the software development process and ensure code quality.",
      keySkills: ["Git", "Vim", "VSCode", "JIRA", "Agile Methodology"],
      path: "/skills/tools"
    }
  ];


  const technicalStrengths = [
    {
      name: "Full-Stack Development",
      description: "Building end-to-end applications with both frontend and backend components"
    },
    {
      name: "Machine Learning Engineering",
      description: "Applying ML models to production systems with scalable infrastructure"
    },
    {
      name: "Cloud Infrastructure",
      description: "Designing and implementing solutions using AWS services and containerization"
    },
    {
      name: "System Design",
      description: "Creating scalable, maintainable, and efficient software architectures"
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
            Technical Skills
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
              Skill Overview
            </Typography>
            <Typography variant="body1" paragraph>
              As a Computer Science student at Cornell University with professional experience at Zeta Global,
              I've developed a comprehensive set of technical skills across multiple domains. My focus areas include
              machine learning, cloud technologies, and full-stack development, with a particular interest in building
              AI-powered applications.
            </Typography>
            <Typography variant="body1">
              Below you'll find my key technical skill categories. Click on any category to explore my specific
              expertise and experience in that area.
            </Typography>
          </Paper>
        </motion.div>

        {/* Skill Categories Grid */}
        <Grid container spacing={4}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={6} lg={4} key={category.title}>
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
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(0,0,0,0.08)'
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: category.iconColor,
                        mr: 2
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      {category.title}
                    </Typography>
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                      {category.description}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Key Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {category.keySkills.map(skill => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      onClick={() => navigate(category.path)}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        ml: 'auto',
                        color: category.iconColor
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Technical Strengths Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Technical Strengths
            </Typography>
            <Typography variant="body1" paragraph>
              Beyond specific technologies, I've developed broader technical capabilities that allow me to tackle
              complex problems across different domains:
            </Typography>

            <Grid container spacing={3}>
              {technicalStrengths.map((strength, index) => (
                <Grid item xs={12} sm={6} md={3} key={strength.name}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      boxShadow: 'none',
                      border: '1px solid rgba(0,0,0,0.12)',
                      transition: 'border-color 0.2s',
                      '&:hover': {
                        borderColor: '#1A237E'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
                        {strength.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {strength.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Professional Development */}
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
              Continuous Learning
            </Typography>
            <Typography variant="body1" paragraph>
              I'm committed to continuous skill development through coursework, personal projects, and professional experience.
              My approach involves staying current with emerging technologies while building a strong foundation in computer science fundamentals.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/projects')}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: '#1A237E',
                  '&:hover': {
                    bgcolor: 'white',
                  }
                }}
              >
                See Skills in Action
              </Button>
            </Box>
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
            variant="contained"
            onClick={() => navigate('/projects')}
            sx={{
              mx: 1,
              bgcolor: '#1A237E',
              '&:hover': {
                bgcolor: '#0D47A1'
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

export default SkillsPage;