

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
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import SportsIcon from '@mui/icons-material/Sports';
import { useNavigate } from 'react-router-dom';








const RowingPage = () => {


  const navigate = useNavigate();


  const cornellStats = [
    { stat: "Position", value: "Heavyweight Rower" },
    { stat: "Years", value: "4 Years (2021-2025)" },
    { stat: "Team", value: "Varsity Heavyweight Rowing" },
    { stat: "Height", value: "6'4\"" },
    { stat: "Weight", value: "215 lbs" }
  ];


  const hillSchoolStats = [
    { stat: "Position", value: "Varsity Rower" },
    { stat: "Years", value: "4 Years (2017-2021)" },
    { stat: "Recognition", value: "Outstanding Contribution Award" }
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
                I have rowed for 8 years now which has given me a new understanding of dedication, discipline, and teamwork. When I started at The Hill School I was a freshman in highschool and now I have continued to row through Cornell which has given me a fundamental understanding of how to see things through.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                <Chip
                  label="Varsity Athlete"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  label="Leadership"
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

                  While on the Cornell Heavyweight Rowing team I have competed at the highest
                  level of collegiate rowing. To get there, we trained both our bodies and mindset to the absolute limit.
                </Typography>

                <Typography variant="body1" paragraph>
                  While rowing for Cornell I have been taught invaluable lessons about teamwork, perseverance, and
                  pushing beyond my limitations.
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
                        primary="Head of the Charles"
                        secondary="5k head race on the Charles in boston"
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
                  When I walked onto the Hill School rowing team, it was still in its early stages of development. The team was quite small with no notable wins or placements under its belt. I knew coming in that we would face challenges due to all of this, but instead of shying away from greatness, we as a team hit it head on and learned valuable lessons. The very foundation of my rowing technique, discipline, and work ethic was established during these times.
                </Typography>

                <Typography variant="body1" paragraph>
                  While rowing at The Hill School, I was recognized for my outstanding contributions to the rowing program,
                  developing from a novice rower to a key member of the varsity squad.
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