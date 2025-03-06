// src/pages/RowingPage.js

import React from 'react';
import cornellRowingImage from '../images/cornell_rowing.jpg';
import hillRowingImage from '../images/hill_rowing.png';
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
  Divider,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import SportsIcon from '@mui/icons-material/Sports';
import { useNavigate } from 'react-router-dom';

// Import profile photo if needed
import profilePhoto from '../images/hs.jpeg';

// You can add rowing-specific images here
// import cornellRowingImage from '../images/cornell-rowing.jpg';
// import hillSchoolRowingImage from '../images/hill-school-rowing.jpg';

const RowingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Cornell rowing stats (update with your actual stats)
  const cornellStats = [
    { stat: "Position", value: "Heavyweight Rower" },
    { stat: "Years", value: "4 Years (2021-2025)" },
    { stat: "Team", value: "Varsity Heavyweight Rowing" },
    { stat: "Height", value: "6'4\"" },
    { stat: "Weight", value: "215 lbs" }
  ];

  // Hill School rowing stats
  const hillSchoolStats = [
    { stat: "Position", value: "Varsity Rower" },
    { stat: "Years", value: "4 Years (2017-2021)" },
    { stat: "Recognition", value: "Outstanding Contribution Award" }
  ];

  // Rowing career achievements
  const achievements = [
    {
      title: "Cornell University Varsity Heavyweight",
      description: "Competed at the highest level of collegiate rowing"
    },
    {
      title: "The Hill School Varsity Team",
      description: "Recognized for outstanding contributions to the rowing program"
    },
    {
      title: "Eastern Sprints",
      description: "Competed in one of rowing's premier collegiate regattas"
    },
    {
      title: "IRA National Championship",
      description: "Participated in the national championship regatta"
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
            Rowing Career
          </Typography>
        </motion.div>

        {/* Hero Section */}
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
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)',
              color: 'white',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 6 },
                position: 'relative',
                zIndex: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                8 Years of Competitive Rowing
              </Typography>
              <Typography variant="h6" gutterBottom>
                From The Hill School to Cornell University
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '800px', mb: 3 }}>
                My rowing journey spans eight years of dedication, discipline, and teamwork.
                Starting at The Hill School and continuing through Cornell University, rowing has been
                a fundamental part of my development both as an athlete and as a person.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                <Chip
                  label="Varsity Athlete"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  label="Team Leadership"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  label="Competitive Racing"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </Box>

            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.1)',
                zIndex: 1
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 150,
                height: 150,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.05)',
                zIndex: 1
              }}
            />
          </Paper>
        </motion.div>

        {/* Cornell University Rowing Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper elevation={3} sx={{ p: 4, mb: { xs: 4, md: 0 }, borderRadius: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SportsIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Cornell University Rowing
                  </Typography>
                </Box>

                <Typography variant="body1" paragraph>
                  As a member of Cornell's Varsity Heavyweight Rowing team, I've competed at the highest
                  level of collegiate rowing. The program is known for its rigorous training regimen and
                  competitive spirit in the Ivy League and beyond.
                </Typography>

                <Typography variant="body1" paragraph>
                  Rowing for Cornell has taught me invaluable lessons about perseverance, teamwork, and
                  pushing beyond perceived limitations. Every day on the water requires perfect synchronization
                  with teammates and unwavering commitment to collective success.
                </Typography>

                <Typography variant="body1" paragraph>
                  Our team competes in prestigious regattas including Eastern Sprints and the IRA National Championship,
                  facing off against the best crews in the country.
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Key Competitions
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEventsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Eastern Sprints"
                        secondary="Annual championship regatta for eastern collegiate rowing programs"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEventsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="IRA National Championship"
                        secondary="Premier rowing event determining the national champions"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEventsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Ivy League Championships"
                        secondary="Competition among all Ivy League rowing programs"
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    href="https://cornellbigred.com/sports/rowing/roster/paul-stone/78596"
                    target="_blank"
                    sx={{
                      mt: 2,
                      borderColor: '#1A237E',
                      color: '#1A237E',
                      '&:hover': {
                        borderColor: '#0D47A1',
                        bgcolor: 'rgba(26, 35, 126, 0.04)'
                      }
                    }}
                  >
                    View Cornell Profile
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Cornell Rowing Stats
                </Typography>

                <List>
                  {cornellStats.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ py: 1 }}>
                        <ListItemText
                          primary={item.stat}
                          secondary={item.value}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.secondary'
                          }}
                          secondaryTypographyProps={{
                            variant: 'body1',
                            fontWeight: 'medium',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      {index < cornellStats.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>

                {/* Image placeholder - replace with actual Cornell rowing image */}

                {/* Replace this placeholder Box */}
                <Box
                  component="img"
                  src={cornellRowingImage}
                  alt="Cornell Rowing"
                  sx={{
                    width: '100%',
                    height: 200,
                    borderRadius: 1,
                    objectFit: 'cover',
                    mt: 2
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Cornell Rowing Image
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* The Hill School Rowing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                The Hill School Rowing
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography variant="body1" paragraph>
                  My rowing career began at The Hill School, where I was a four-year member of the rowing
                  program. The foundation of my rowing technique, discipline, and work ethic was established
                  during these formative years.
                </Typography>

                <Typography variant="body1" paragraph>
                  At The Hill School, I was recognized for outstanding contributions to the rowing program,
                  developing from a novice rower to a key member of the varsity squad. The experience taught me
                  fundamental skills that would serve me well at the collegiate level.
                </Typography>

                <Typography variant="body1" paragraph>
                  The Hill School's rowing program competed in various scholastic regattas, providing
                  valuable racing experience and competitive development opportunities.
                </Typography>

                <List>
                  {hillSchoolStats.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <SportsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.stat}
                        secondary={item.value}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    href="https://www.thehill.org/about-us/news/detail/~board/archive-news/post/spring-student-athletes-recognized-for-outstanding-contributions"
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
                    View Hill School Recognition
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                {/* Image placeholder - replace with actual Hill School rowing image */}
                <Box
                  component="img"
                  src={hillRowingImage}
                  alt="Hill Rowing"
                  sx={{
                    width: '100%',
                    height: 200,
                    borderRadius: 1,
                    objectFit: 'cover',
                    mt: 2
                  }}
                />

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                      Skills Developed
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip size="small" label="Teamwork" />
                      <Chip size="small" label="Discipline" />
                      <Chip size="small" label="Time Management" />
                      <Chip size="small" label="Technical Proficiency" />
                      <Chip size="small" label="Physical Conditioning" />
                      <Chip size="small" label="Mental Toughness" />
                      <Chip size="small" label="Leadership" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Impact on Professional Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              How Rowing Shaped My Professional Development
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <GroupsIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Teamwork
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Rowing demands perfect synchronization among crew members. This taught me how
                      to effectively collaborate in team environments, coordinate with others, and
                      contribute to collective goals - skills directly applicable to software development
                      and engineering projects.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <FitnessCenterIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Discipline
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      The rigorous training schedule of collegiate rowing instilled exceptional
                      discipline and work ethic. Early morning practices, regardless of weather conditions,
                      taught me to consistently show up and perform at my best - a mindset I bring to
                      my technical work and academic pursuits.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #1A237E' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Time Management
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Balancing the demands of varsity athletics with Cornell's rigorous CS curriculum
                      required exceptional time management skills. This ability to prioritize tasks,
                      plan effectively, and maximize productivity has been invaluable in managing
                      complex projects and meeting deadlines.
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
            Back to About
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

export default RowingPage;