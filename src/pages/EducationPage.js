// src/pages/EducationPage.js
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

// You can import an image of Cornell University here
// import cornellImage from '../images/cornell.jpg';

const EducationPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Course details with descriptions
  const courseDetails = [
    {
      name: 'Data Structures',
      description: 'Implementation and analysis of fundamental data structures and algorithms, including linked lists, stacks, queues, trees, heaps, and graphs.',
      icon: <StorageIcon color="primary" />
    },
    {
      name: 'Algorithms',
      description: 'Algorithm design paradigms, computational complexity, NP-completeness, and efficient solutions to fundamental algorithmic problems.',
      icon: <CodeIcon color="primary" />
    },
    {
      name: 'Machine Learning',
      description: 'Fundamentals of machine learning including supervised and unsupervised learning, neural networks, and deep learning methodologies.',
      icon: <EqualizerIcon color="primary" />
    },
    {
      name: 'Artificial Intelligence',
      description: 'Core concepts in AI including search algorithms, knowledge representation, reasoning under uncertainty, and reinforcement learning.',
      icon: <ComputerIcon color="primary" />
    },
    {
      name: 'Systems Programming',
      description: 'Development of low-level systems software, operating system internals, memory management, and concurrency.',
      icon: <CodeIcon color="primary" />
    },
    {
      name: 'Database Systems',
      description: 'Design and implementation of database systems, query optimization, transactions, and data models.',
      icon: <StorageIcon color="primary" />
    },
    {
      name: 'PLL',
      description: 'Programming language theory, parsing, semantics, and implementation of programming language features.',
      icon: <MenuBookIcon color="primary" />
    },
    {
      name: 'Deep Learning',
      description: 'A continuation of Machine Learning, exploring the various theories and applications of Deep learning.',
      icon: <MenuBookIcon color="primary" />
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
            Education
          </Typography>
        </motion.div>

        {/* University Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ mb: 5, overflow: 'hidden', borderRadius: 2 }}>
            <Grid container>
              <Grid item xs={12} md={5}>
                <CardMedia
                  component="img"
                  height="100%"
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png"
                  alt="Cornell University"
                  sx={{
                    height: { xs: '200px', md: '100%' },
                    objectFit: 'cover'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Cornell University
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    College of Engineering
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">
                      B.S. in Computer Science (August 2021 - May 2025)
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Pursuing a Bachelor of Science degree in Computer Science with a focus on
                    Machine Learning, Artificial Intelligence, and Cloud Computing technologies.
                    The program emphasizes both theoretical foundations and practical applications
                    in these cutting-edge fields.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Cornell University's Computer Science program is known for its rigorous curriculum
                    and research opportunities, preparing students for careers in software development,
                    data science, and advanced computing technologies.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                    <Chip label="Class of 2025" color="primary" size="small" />
                    <Chip label="Engineering" size="small" />
                    <Chip label="Computer Science" size="small" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Relevant Coursework Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BookIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Relevant Coursework
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              My academic curriculum includes a comprehensive range of computer science courses with
              a special emphasis on AI, ML, and software engineering. Below are some of the key courses
              I've taken:
            </Typography>

            <Grid container spacing={3}>
              {courseDetails.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card
                      elevation={2}
                      sx={{
                        height: '100%',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {course.icon}
                          <Typography variant="h6" sx={{ ml: 1, fontWeight: 'medium' }}>
                            {course.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {course.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Academic Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Academic Achievements
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="College of Engineering"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Development"
                  secondary="Worked on high-level projects with both small and large teams"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ComputerIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Research Project"
                  secondary="Contributed to IoT research project that achieved 10% energy reduction on campus"
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        {/* Related Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
          <Button
            variant="contained"
            onClick={() => navigate('/projects')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              mx: 1,
              bgcolor: '#1A237E',
              '&:hover': {
                bgcolor: '#0D47A1'
              }
            }}
          >
            See Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EducationPage;