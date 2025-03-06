// src/pages/ProgrammingLanguagesPage.js
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
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import JavascriptIcon from '@mui/icons-material/Javascript';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useNavigate } from 'react-router-dom';

const ProgrammingLanguagesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Programming language proficiency data
  const languages = [
    {
      name: "Python",
      proficiency: 100,
      icon: <CodeIcon />,
      description: "My primary language for ML/AI development and data processing. Used extensively during my internship at Zeta Global for RAG-based chatbot development and AWS integration.",
      projects: ["RAG Chatbot", "IoT Energy Monitoring"],
      libraries: ["TensorFlow", "PyTorch", "Pandas", "NumPy", "Flask"]
    },
    {
      name: "JavaScript/TypeScript",
      proficiency: 90,
      icon: <JavascriptIcon />,
      description: "Used for web development projects including frontend frameworks like React and Angular. TypeScript improves my code reliability through static typing.",
      projects: ["Agario Game Clone", "Secret Santa App"],
      libraries: ["React", "Angular", "TypeScript", "Node.js"]
    },
    {
      name: "OCaml",
      proficiency: 85,
      icon: <CodeIcon />,
      description: "Functional programming language used extensively in coursework at Cornell. Strong experience with pattern matching and type inference systems.",
      projects: ["Compiler Design", "Functional Programming Assignments"],
      libraries: ["Core", "Jane Street Libraries"]
    },
    {
      name: "C/C++",
      proficiency: 80,
      icon: <TerminalIcon />,
      description: "Used for systems programming and performance-critical applications. Developed IoT microcontroller software using C++ with MQTT-based communication.",
      projects: ["IoT Energy Monitoring", "Systems Programming Coursework"],
      libraries: ["STL", "Boost", "MQTT"]
    },
    {
      name: "Java",
      proficiency: 90,
      icon: <DataObjectIcon />,
      description: "Object-oriented programming experience for software development. Used in academic settings for algorithm implementation and application development.",
      projects: ["Data Structures Implementations", "Android Development"],
      libraries: ["Spring", "Java Collections", "JUnit"]
    },
    {
      name: "RISCV/x86 Assembly",
      proficiency: 65,
      icon: <TerminalIcon />,
      description: "Low-level programming experience from Computer Architecture coursework. Understanding of processor operations and memory management.",
      projects: ["Computer Architecture Assignments", "Compiler Optimization"],
      libraries: ["Standard Instruction Sets"]
    }
  ];

  // Categories of programming paradigms I'm familiar with
  const programmingParadigms = [
    {
      name: "Object-Oriented Programming",
      languages: ["Java", "C++", "Python", "TypeScript"],
      description: "Experience designing systems using encapsulation, inheritance, and polymorphism"
    },
    {
      name: "Functional Programming",
      languages: ["OCaml", "JavaScript", "Python"],
      description: "Implementing pure functions, higher-order functions, and immutable data structures"
    },
    {
      name: "Procedural Programming",
      languages: ["C", "Python", "JavaScript"],
      description: "Structuring code with procedures and functions with an emphasis on modularity"
    },
    {
      name: "Low-Level Programming",
      languages: ["RISCV", "x86", "C"],
      description: "Working close to the hardware level for performance optimization"
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
            Programming Languages
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
              Technical Proficiency
            </Typography>
            <Typography variant="body1" paragraph>
              I've developed expertise in multiple programming languages through academic coursework at Cornell University,
              professional experience at Zeta Global, and personal projects. My language choices are driven by specific
              project requirements, with a focus on selecting the right tool for each problem domain.
            </Typography>
            <Typography variant="body1">
              Below are the key programming languages in my technical toolkit, along with my relative proficiency
              and experience in each.
            </Typography>
          </Paper>
        </motion.div>

        {/* Language Proficiency Grid */}
        <Grid container spacing={4}>
          {languages.map((language, index) => (
            <Grid item xs={12} md={6} key={language.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 1 }}>
                      {language.icon}
                    </Box>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      {language.name}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Proficiency
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {language.proficiency}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={language.proficiency}
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

                  <Typography variant="body1" paragraph>
                    {language.description}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium', mt: 2 }}>
                    Related Projects:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {language.projects.map(project => (
                      <Chip key={project} label={project} size="small" />
                    ))}
                  </Box>

                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Libraries & Frameworks:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {language.libraries.map(lib => (
                      <Chip
                        key={lib}
                        label={lib}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Programming Paradigms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Programming Paradigms
            </Typography>
            <Typography variant="body1" paragraph>
              My experience spans multiple programming paradigms, allowing me to approach problems from different perspectives
              and choose the most appropriate solution pattern.
            </Typography>

            <Grid container spacing={3}>
              {programmingParadigms.map((paradigm, index) => (
                <Grid item xs={12} sm={6} key={paradigm.name}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                        {paradigm.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {paradigm.description}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Related Languages:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {paradigm.languages.map(lang => (
                          <Chip key={lang} label={lang} size="small" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Academic & Professional Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Learning & Development
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Cornell University Coursework"
                  secondary="Rigorous computer science curriculum covering programming languages, algorithms, and systems design"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Professional Application at Zeta Global"
                  secondary="Applied Python, AWS, and cloud technologies to develop and optimize a RAG-based chatbot"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Personal Projects & Continuous Learning"
                  secondary="Regular development of projects like the Agario Game Clone and Secret Santa App to strengthen skills"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Language Selection Philosophy"
                  secondary="Focused on choosing the appropriate language for each task rather than defaulting to a single language for all problems"
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/projects')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#1A237E',
                  '&:hover': {
                    bgcolor: '#0D47A1'
                  }
                }}
              >
                See Projects Using These Languages
              </Button>
            </Box>
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
            onClick={() => navigate('/skills/web')}
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
            Web Development Skills
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProgrammingLanguagesPage;