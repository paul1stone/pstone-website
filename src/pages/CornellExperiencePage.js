// src/pages/CornellExperiencePage.js
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
import SchoolIcon from '@mui/icons-material/School';
import MemoryIcon from '@mui/icons-material/Memory';
import DataObjectIcon from '@mui/icons-material/DataObject';
import InsightsIcon from '@mui/icons-material/Insights';
import RouterIcon from '@mui/icons-material/Router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const CornellExperiencePage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Skills gained during this experience
  const skillsGained = [
    {
      category: "IoT Development",
      skills: [
        "Microcontroller Programming",
        "Sensor Integration",
        "Wireless Communication",
        "Low-Power Design",
        "MQTT Protocol"
      ]
    },
    {
      category: "Programming",
      skills: [
        "C/C++",
        "Embedded Systems",
        "Real-time Systems",
        "Data Pipelines",
        "Firmware Development"
      ]
    },
    {
      category: "Data Analysis",
      skills: [
        "Energy Usage Monitoring",
        "Data Visualization",
        "Time Series Analysis",
        "Grafana Dashboards",
        "KPI Tracking"
      ]
    },
    {
      category: "Research Skills",
      skills: [
        "Technical Documentation",
        "Academic Research",
        "Experimental Design",
        "Project Management",
        "Collaboration"
      ]
    }
  ];

  // Key project components
  const projectComponents = [
    {
      title: "Mesh Network Deployment",
      description: "Designed and deployed a distributed mesh network of IoT microcontrollers across the Cornell campus for comprehensive energy monitoring.",
      achievements: [
        "Configured network topology for optimal coverage",
        "Implemented fault-tolerant communication",
        "Optimized device placement for strategic monitoring",
        "Created scalable architecture allowing for future expansion"
      ]
    },
    {
      title: "Microcontroller Software Development",
      description: "Developed efficient, reliable C++ software for the IoT microcontrollers with MQTT-based communication.",
      achievements: [
        "Wrote memory-efficient code for resource-constrained devices",
        "Implemented secure MQTT communication protocol",
        "Created robust error handling and recovery mechanisms",
        "Optimized power consumption for extended battery life"
      ]
    },
    {
      title: "Data Pipeline Implementation",
      description: "Built data pipelines to collect, process, and visualize energy usage data from the distributed network.",
      achievements: [
        "Designed schema for efficient energy data storage",
        "Created automated data processing workflows",
        "Built real-time visualization dashboards with Grafana",
        "Implemented anomaly detection for unusual energy patterns"
      ]
    },
    {
      title: "Energy Waste Reduction Initiative",
      description: "Analyzed collected data to identify and address sources of energy waste across campus.",
      achievements: [
        "Identified key energy waste patterns and locations",
        "Provided actionable recommendations for energy optimization",
        "Achieved 10% reduction in campus energy waste",
        "Created visualizations for stakeholder communication"
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
              background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ fontSize: 36, mr: 2 }} />
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                Cornell University
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              Research Assistant
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              February 2022 - May 2022
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              A research position focused on developing and deploying an IoT energy monitoring system
              across the Cornell campus. The project successfully reduced energy waste by 10% through
              data collection, analysis, and targeted optimization.
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
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              Key Responsibilities
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <RouterIcon sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Deployed a mesh network of distributed Internet of Things (IoT) microcontrollers across the Cornell campus to monitor energy usage"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DataObjectIcon sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Developed the microcontroller software using C++ with MQTT-based communication"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InsightsIcon sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Created data pipelines to visualize the data in graphs through Grafana dashboards"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SaveIcon sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Achieved a 10% reduction in energy waste through monitoring and optimization"
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        {/* Project Components */}
        <Typography variant="h5" component="h2" gutterBottom sx={{
          fontWeight: 'bold',
          mt: 6,
          mb: 3,
          color: '#4CAF50',
        }}>
          Project Components
        </Typography>

        <Grid container spacing={4}>
          {projectComponents.map((component, index) => (
            <Grid item xs={12} md={6} key={component.title}>
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
                    borderTop: '4px solid #4CAF50'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {component.title}
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    {component.description}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Details:
                  </Typography>
                  <List dense>
                    {component.achievements.map((achievement, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <CheckCircleIcon fontSize="small" sx={{ color: '#4CAF50' }} />
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
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              Skills & Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              During this research position, I developed the following skills and worked with these technologies:
            </Typography>

            <Grid container spacing={3}>
              {skillsGained.map((category) => (
                <Grid item xs={12} sm={6} key={category.category}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: '#4CAF50' }}>
                        {category.category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(76, 175, 80, 0.1)',
                              color: '#4CAF50',
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

        {/* Project Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              Project Impact
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <MemoryIcon sx={{ fontSize: 50, mb: 1, color: '#4CAF50' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Technical Achievement
                  </Typography>
                  <Typography variant="body2">
                    Successfully deployed a campus-wide IoT monitoring system that reliably
                    collected and transmitted data in real-time with minimal maintenance requirements.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <SaveIcon sx={{ fontSize: 50, mb: 1, color: '#4CAF50' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Energy Savings
                  </Typography>
                  <Typography variant="body2">
                    Achieved a measurable 10% reduction in energy waste across campus,
                    demonstrating the effectiveness of data-driven optimization approaches.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <InsightsIcon sx={{ fontSize: 50, mb: 1, color: '#4CAF50' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Data Insights
                  </Typography>
                  <Typography variant="body2">
                    Generated valuable insights into energy usage patterns and potential efficiency
                    improvements through comprehensive data collection and visualization.
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
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': {
                borderColor: '#388E3C',
                bgcolor: 'rgba(76, 175, 80, 0.04)'
              }
            }}
          >
            Back to Experience
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/experience/resume')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              mx: 1,
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': {
                borderColor: '#388E3C',
                bgcolor: 'rgba(76, 175, 80, 0.04)'
              }
            }}
          >
            Full Resume
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CornellExperiencePage;