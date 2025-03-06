// src/pages/ResumePage.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import WebIcon from '@mui/icons-material/Web';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import { useNavigate } from 'react-router-dom';

// Import profile image
import profilePhoto from '../images/hs.jpeg';
import ResumeViewer from '../components/ResumeViewer';

const ResumePage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [viewerOpen, setViewerOpen] = useState(false);
  // Education data
  const education = {
    institution: "Cornell University, College of Engineering",
    degree: "B.S. in Computer Science",
    duration: "August 2021 - May 2025",
    coursework: "Data Structures, Algorithms, Machine Learning, Artificial Intelligence, Systems Programming, Database Systems, PLL"
  };

  // Experience data
  const experiences = [
    {
      position: "Machine Learning Engineer Intern",
      company: "Zeta Global",
      duration: "June 2024 - August 2024",
      responsibilities: [
        "Developed and optimized a RAG-based chat-bot using AWS Bedrock and Dockerized microservices for deployment",
        "Compared Assistant services performance across OpenAI/OpenAPI, AWS Bedrock, Claude, and other Large Language Models (LLM)",
        "Deployed scalable Kubernetes clusters",
        "Worked with CI/CD workflows for model training and deployment using GitHub Actions and Terraform",
        "Worked closely with other engineers to integrate AWS services (S3, EC2, Lambda) into existing systems using IAM roles and role-based access control (RBAC)",
        "Took part in daily stand-ups, code reviews, and the software development life cycle (SDLC)",
        "Created an in-depth guide for future maintenance and upgrades on the chat-bot development process"
      ]
    },
    {
      position: "Research Assistant",
      company: "Cornell University",
      location: "Ithaca, NY",
      duration: "February 2022 - May 2022",
      responsibilities: [
        "Deployed a mesh network of distributed Internet of Things (IoT) microcontrollers across the Cornell campus to monitor energy usage which led to a 10% reduction in energy waste",
        "Developed the microcontroller software using C++ with MQTT-based communication",
        "Using data pipelines, I was able to visualize the data in graphs through Grafana dashboards"
      ]
    }
  ];

  // Projects data
  const projects = [
    {
      name: "Agario Game Clone",
      duration: "Spring 2021 - Fall 2023",
      description: [
        "Developed an online game similar to agar.io using Angular and TypeScript",
        "Implemented server communication through WebSockets which allowed for real-time gameplay",
        "Created a robust database using MongoDB to manage users, scores, and game statistics",
        "A local version was built using Docker which allowed for seamless unit tests and integration"
      ],
      technologies: ["Angular", "TypeScript", "WebSockets", "MongoDB", "Docker"]
    },
    {
      name: "Secret Santa App",
      duration: "Fall 2021 - Spring 2022",
      description: [
        "Led a team of developers in designing a Secret Santa app using Agile methodology",
        "Created Hamiltonian cycles to ensure that participant matching was optimal",
        "Utilized React, AWS, Firebase, and FastAPI to build the backend",
        "Created APIs and different design patterns to ensure perfect matching"
      ],
      technologies: ["React", "AWS", "Firebase", "FastAPI", "Agile Methodology"]
    }
  ];

  // Skills data
  const skills = {
    programmingLanguages: ["Python", "OCaml", "RISCV", "x86", "C/C++", "Java", "JavaScript", "TypeScript"],
    webDevelopment: ["HTML", "CSS", "PHP", "Svelte", "React", "Angular", "FastAPI", "Firebase"],
    databases: ["MongoDB", "SQL", "MySQL", "NoSQL"],
    cloudServices: ["AWS (S3, EC2, Lambda)", "Docker", "Kubernetes"],
    tools: ["Vim", "VSCode", "Git", "JIRA"],
    technicalKnowledge: ["Networks", "Functional Programming", "Computer Architecture", "Artificial Intelligence", "Machine Learning", "System Design", "OpenAI", "LLMs"]
  };

  // Extracurricular activities
  const extracurricular = {
    activity: "Varsity, Heavyweight Rowing, Cornell University",
    details: [
      "Competed at the highest level of collegiate rowing",
      "Worked closely with my team to achieve results both on and off the water"
    ]
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Page Title & Download Options */}
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
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 3, md: 0 } }}>
              <Box
                component="img"
                src={profilePhoto}
                alt="Paul Stone"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  mr: 3
                }}
              />
              <Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                  Paul Stone
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Computer Science Student | Machine Learning Engineer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  pws59@cornell.edu | 540-395-6720
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<PictureAsPdfIcon />}
                onClick={() => setViewerOpen(true)} // Opens the modal
                sx={{
                  borderColor: '#1A237E',
                  color: '#1A237E',
                  '&:hover': {
                    borderColor: '#0D47A1',
                    bgcolor: 'rgba(26, 35, 126, 0.04)'
                  }
                }}
              >
                View PDF
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                component="a"
                href="/resume.pdf"
                download
                sx={{
                  bgcolor: '#1A237E',
                  '&:hover': {
                    bgcolor: '#0D47A1'
                  }
                }}
              >
                Download
              </Button>
            </Box>

          </Paper>
        </motion.div>
        <ResumeViewer open={viewerOpen} onClose={() => setViewerOpen(false)} />

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon sx={{ color: '#1A237E', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Education
              </Typography>
            </Box>

            <Box sx={{ pl: { xs: 0, md: 5 } }}>
              <Typography variant="h6" gutterBottom>
                {education.institution}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {education.degree} | {education.duration}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Relevant Coursework:</strong> {education.coursework}
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <WorkIcon sx={{ color: '#1A237E', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Experience
              </Typography>
            </Box>

            {experiences.map((exp, index) => (
              <Box key={exp.position} sx={{ pl: { xs: 0, md: 5 }, mb: index < experiences.length - 1 ? 4 : 0 }}>
                <Typography variant="h6" gutterBottom>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''} | {exp.duration}
                </Typography>
                <List dense>
                  {exp.responsibilities.map((responsibility, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircleIcon fontSize="small" sx={{ color: '#1A237E' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={responsibility}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
                {index < experiences.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Paper>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CodeIcon sx={{ color: '#1A237E', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Projects
              </Typography>
            </Box>

            {projects.map((project, index) => (
              <Box key={project.name} sx={{ pl: { xs: 0, md: 5 }, mb: index < projects.length - 1 ? 4 : 0 }}>
                <Typography variant="h6" gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  {project.duration}
                </Typography>

                <List dense>
                  {project.description.map((detail, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircleIcon fontSize="small" sx={{ color: '#1A237E' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={detail}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(26, 35, 126, 0.08)',
                        color: '#1A237E'
                      }}
                    />
                  ))}
                </Box>

                {index < projects.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/paul1stone"
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
                View Projects on GitHub
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ComputerIcon sx={{ color: '#1A237E', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Technical Skills
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ pl: { xs: 0, md: 5 } }}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CodeIcon sx={{ color: '#1A237E', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        Programming Languages
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.programmingLanguages.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WebIcon sx={{ color: '#1A237E', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        Web Development
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.webDevelopment.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StorageIcon sx={{ color: '#1A237E', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        Databases
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.databases.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CloudIcon sx={{ color: '#1A237E', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        Cloud Services
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.cloudServices.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <BuildIcon sx={{ color: '#1A237E', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        Tools & IDEs
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.tools.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ComputerIcon sx={{ color: '#1A237E', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        Technical Knowledge
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.technicalKnowledge.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Extracurricular Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SportsCricketIcon sx={{ color: '#1A237E', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Extracurricular Activities
              </Typography>
            </Box>

            <Box sx={{ pl: { xs: 0, md: 5 } }}>
              <Typography variant="h6" gutterBottom>
                {extracurricular.activity}
              </Typography>
              <List dense>
                {extracurricular.details.map((detail, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircleIcon fontSize="small" sx={{ color: '#1A237E' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={detail}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/rowing')}
                  sx={{
                    borderColor: '#1A237E',
                    color: '#1A237E',
                    '&:hover': {
                      borderColor: '#0D47A1',
                      bgcolor: 'rgba(26, 35, 126, 0.04)'
                    }
                  }}
                >
                  Learn More About My Rowing Experience
                </Button>
              </Box>
            </Box>
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
              borderColor: '#1A237E',
              color: '#1A237E',
              '&:hover': {
                borderColor: '#0D47A1',
                bgcolor: 'rgba(26, 35, 126, 0.04)'
              }
            }}
          >
            Back to Experience
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ResumePage;