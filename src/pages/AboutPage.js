// src/pages/AboutPage.js
import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';

// Import your profile image
import profilePhoto from '../images/hs.jpeg';

const AboutPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
            About Me
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Left Column - Profile Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                {/* Profile Image */}
                <Box
                  sx={{
                    position: 'relative',
                    height: 260,
                    bgcolor: '#1A237E',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    pt: 2
                  }}
                >
                  <Box
                    component="img"
                    src={profilePhoto}
                    alt="Paul Stone"
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      border: '5px solid white',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      objectFit: 'cover',
                      mb: -8,
                      zIndex: 2
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      color: 'white',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Chip
                      label="Computer Science"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        mb: 1,
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </Box>

                {/* Profile Info */}
                <CardContent sx={{ pt: 10 }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Paul Stone
                  </Typography>
                  <Typography color="textSecondary" gutterBottom sx={{ textAlign: 'center' }}>
                    Machine Learning Engineer & CS Student
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
                    Cornell University
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Email: pws59@cornell.edu
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Phone: 540-395-6720
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    Key Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    <Chip size="small" label="Python" />
                    <Chip size="small" label="Machine Learning" />
                    <Chip size="small" label="AWS" />
                    <Chip size="small" label="React" />
                    <Chip size="small" label="TypeScript" />
                    <Chip size="small" label="Docker" />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/chat')}
                    sx={{
                      mt: 2,
                      bgcolor: '#1A237E',
                      '&:hover': {
                        bgcolor: '#0D47A1'
                      }
                    }}
                  >
                    Contact Me
                  </Button>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right Column - About Content */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PersonIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Biography
                  </Typography>
                </Box>

                <Typography variant="body1" paragraph>
                  I'm a Computer Science student at Cornell University with a passion for machine learning
                  and artificial intelligence. My academic journey has focused on developing practical
                  applications that leverage AI technologies to solve real-world problems.
                </Typography>

                <Typography variant="body1" paragraph>
                  During my time at Zeta Global as a Machine Learning Engineer Intern, I developed a
                  RAG-based chatbot using AWS Bedrock and worked with various LLM platforms to optimize
                  assistant services. This experience deepened my understanding of how AI can be effectively
                  deployed in production environments.
                </Typography>

                <Typography variant="body1" paragraph>
                  Beyond technical skills, I value collaborative problem-solving and clean, efficient code.
                  My background in competitive rowing has instilled discipline and teamwork values that
                  I bring to all my technical projects.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SchoolIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Education
                  </Typography>
                </Box>

                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Cornell University, College of Engineering
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      B.S. in Computer Science (August 2021 - May 2025)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Focusing on Machine Learning, AI, and Cloud Computing technologies
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Relevant Coursework
                    </Typography>
                    <Grid container spacing={1}>
                      {['Data Structures', 'Algorithms', 'Machine Learning',
                        'Artificial Intelligence', 'Systems Programming', 'Database Systems'].map((course) => (
                          <Grid item key={course}>
                            <Chip
                              label={course}
                              size="small"
                              variant="outlined"
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </CardContent>
                </Card>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <FitnessCenterIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Athletics & Interests
                  </Typography>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SportsCricketIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Varsity Heavyweight Rowing"
                      secondary="Cornell University - Competing at the highest level of collegiate rowing"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Open Source Contribution"
                      secondary="Contributing to Python libraries and AI tools"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="AI Research"
                      secondary="Following latest developments in LLMs and neural network architectures"
                    />
                  </ListItem>
                </List>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/experience')}
                    sx={{
                      mr: 2,
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
                  <Button
                    variant="contained"
                    onClick={() => navigate('/projects')}
                    sx={{
                      bgcolor: '#1A237E',
                      '&:hover': {
                        bgcolor: '#0D47A1'
                      }
                    }}
                  >
                    See Projects
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;