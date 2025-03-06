// src/components/Navbar.js
import React, { useState, useRef, useMemo } from 'react';
import profilePhoto from '../images/hs.jpeg';
import {
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  TextField,
  Box,
  Popper,
  Paper,
  Grow,
  MenuList,
  Typography,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

// 1) Define the list of pages/routes you want to search
const PAGES = [
  { name: "Home", route: "/" },
  { name: "About Me", route: "/about" },
  { name: "Education", route: "/education" },
  { name: "Rowing", route: "/rowing" },
  { name: "Programming Languages", route: "/skills/programming" },
  { name: "Web Development", route: "/skills/web" },
  { name: "Machine Learning & AI", route: "/skills/ml-ai" },
  { name: "Cloud & DevOps", route: "/skills/cloud" },
  { name: "Projects", route: "/projects" },
  { name: "RAG Chatbot", route: "/projects/chatbot" },
  { name: "Agario Game Clone", route: "/projects/agario" },
  { name: "Secret Santa App", route: "/projects/santa" },
  { name: "Algorithm Visualization", route: "/projects/algorithm-visualization" },
  { name: "Experience", route: "/experience" },
  { name: "Zeta Global", route: "/experience/zeta" },
  { name: "Cornell Research", route: "/experience/cornell" },
  { name: "Full Resume", route: "/experience/resume" },
  { name: "Chat with AI Paul", route: "/chat" }
];

// 2) Fuse.js options
const fuseOptions = {
  includeScore: true,     // Provides a 'score' for how close the match is
  threshold: 0.3,         // Lower = stricter matching; Higher = fuzzier
  keys: ['name']          // Fields in 'PAGES' to match against
};

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for each dropdown menu
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // References for buttons
  const buttonRefs = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    chat: useRef(null)
  };

  // Handle mouse enter (desktop)
  const handleMouseEnter = (menuId) => () => {
    if (!isMobile) {
      setOpenMenu(menuId);
    }
  };

  // Handle button click (mobile)
  const handleButtonClick = (menuId) => () => {
    if (isMobile) {
      setOpenMenu(openMenu === menuId ? null : menuId);
    }
  };

  // Handle mouse leave (desktop)
  const handleNavMouseLeave = () => {
    if (!isMobile) {
      setOpenMenu(null);
    }
  };

  // Handle navigation
  const handleMenuItemClick = (path) => () => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    navigate(path);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (openMenu) {
      setOpenMenu(null);
    }
  };

  // ---------------------------------------
  // SEARCH STATE & FUSE.JS
  // ---------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  // Create the Fuse instance once (with useMemo) to avoid recreating it on every render
  const fuse = useMemo(() => new Fuse(PAGES, fuseOptions), []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      // If empty, clear results
      setSearchResults([]);
      return;
    }

    // Use Fuse.js to get fuzzy matches
    const results = fuse.search(value).map((result) => result.item);
    setSearchResults(results);
  };

  // Main navbar content
  const navbarContent = (
    <>
      {/* About Me */}
      <div onMouseEnter={handleMouseEnter('about')}>
        <Button
          ref={buttonRefs.about}
          color="inherit"
          onClick={handleMenuItemClick('/about')}
          onMouseDown={(e) => {
            // Prevent immediate navigation if tapping to open dropdown on mobile
            if (isMobile) {
              e.preventDefault();
              handleButtonClick('about')();
            }
          }}
          startIcon={<PersonIcon />}
          sx={{ mx: 1 }}
        >
          About Me
        </Button>
        <Popper
          open={openMenu === 'about'}
          anchorEl={buttonRefs.about.current}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
              <Paper sx={{ mt: 0.5, width: 200 }}>
                <MenuList>
                  <MenuItem onClick={handleMenuItemClick('/about')}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/education')}>Education</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/rowing')}>Rowing</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* Technical Skills */}
      <div onMouseEnter={handleMouseEnter('skills')}>
        <Button
          ref={buttonRefs.skills}
          color="inherit"
          onClick={handleMenuItemClick('/skills')}
          onMouseDown={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleButtonClick('skills')();
            }
          }}
          startIcon={<CodeIcon />}
          sx={{ mx: 1 }}
        >
          Skills
        </Button>
        <Popper
          open={openMenu === 'skills'}
          anchorEl={buttonRefs.skills.current}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
              <Paper sx={{ mt: 0.5, width: 220 }}>
                <MenuList>
                  <MenuItem onClick={handleMenuItemClick('/skills/programming')}>Programming Languages</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/skills/web')}>Web Development</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/skills/ml-ai')}>Machine Learning & AI</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/skills/cloud')}>Cloud & DevOps</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* Projects */}
      <div onMouseEnter={handleMouseEnter('projects')}>
        <Button
          ref={buttonRefs.projects}
          color="inherit"
          onClick={handleMenuItemClick('/projects')}
          onMouseDown={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleButtonClick('projects')();
            }
          }}
          startIcon={<GitHubIcon />}
          sx={{ mx: 1 }}
        >
          Projects
        </Button>
        <Popper
          open={openMenu === 'projects'}
          anchorEl={buttonRefs.projects.current}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
              <Paper sx={{ mt: 0.5, width: 200 }}>
                <MenuList>
                  <MenuItem onClick={handleMenuItemClick('/projects/chatbot')}>RAG Chatbot</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/projects/agario')}>Agario Game Clone</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/projects/santa')}>Secret Santa App</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/projects/algorithm-visualization')}>Algorithm Visualization</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* Experience */}
      <div onMouseEnter={handleMouseEnter('experience')}>
        <Button
          ref={buttonRefs.experience}
          color="inherit"
          onClick={handleMenuItemClick('/experience')}
          onMouseDown={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleButtonClick('experience')();
            }
          }}
          startIcon={<WorkIcon />}
          sx={{ mx: 1 }}
        >
          Experience
        </Button>
        <Popper
          open={openMenu === 'experience'}
          anchorEl={buttonRefs.experience.current}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
              <Paper sx={{ mt: 0.5, width: 200 }}>
                <MenuList>
                  <MenuItem onClick={handleMenuItemClick('/experience/zeta')}>Zeta Global</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/experience/cornell')}>Cornell Research</MenuItem>
                  <MenuItem onClick={handleMenuItemClick('/experience/resume')}>Full Resume</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* Chat with AI */}
      <div onMouseEnter={handleMouseEnter('chat')}>
        <Button
          ref={buttonRefs.chat}
          color="inherit"
          onClick={handleMenuItemClick('/chat')}
          startIcon={<ChatIcon />}
          sx={{
            mx: 1,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'white'
          }}
        >
          Chat with AI Paul
        </Button>
      </div>
    </>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1A237E' }}>
      <Toolbar>
        {/* Logo and Name */}
        <Box
          onClick={handleMenuItemClick('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 2
          }}
        >
          <Avatar
            alt="Paul Stone"
            src={profilePhoto}
            sx={{ width: 40, height: 40, mr: 1, bgcolor: '#3F51B5' }}
          >
            PS
          </Avatar>
          <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Paul Stone
          </Typography>
        </Box>

        {/* Mobile menu toggle */}
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {/* Direct Chat Button for Mobile */}
            <Button
              color="inherit"
              onClick={handleMenuItemClick('/chat')}
              startIcon={<ChatIcon />}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: 'white'
              }}
            >
              Chat
            </Button>
          </>
        ) : (
          // Desktop menu
          <Box sx={{ display: 'flex' }} onMouseLeave={handleNavMouseLeave}>
            {navbarContent}
          </Box>
        )}

        {/* Mobile menu dropdown (only visible when mobileMenuOpen is true) */}
        {isMobile && mobileMenuOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              bgcolor: '#1A237E',
              zIndex: 1000,
              boxShadow: 3,
              padding: 2
            }}
          >
            {navbarContent}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Social Icons (hidden on mobile for space) */}
        {!isMobile && (
          <Box sx={{ display: 'flex' }}>
            <IconButton color="inherit" href="https://github.com/paul1stone" target="_blank" sx={{ ml: 1 }}>
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com/in/paul-stone-207b85225/" target="_blank" sx={{ ml: 1 }}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        )}

        {/* Search Bar */}
        <TextField
          inputRef={searchInputRef}
          placeholder="Search..."
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            ml: 2,
            width: { xs: '100px', sm: '150px', md: '200px' },
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            }
          }}
        />

        {/* Popper to show search results */}
        <Popper
          open={searchResults.length > 0 && !!searchTerm}
          anchorEl={searchInputRef.current}
          placement="bottom-start"
          transition
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper sx={{ width: { xs: '150px', sm: '200px', md: '250px' } }}>
                <List dense>
                  {searchResults.map((item) => (
                    <ListItemButton
                      key={item.route}
                      onClick={() => {
                        navigate(item.route);
                        // Clear the search after navigating
                        setSearchTerm("");
                        setSearchResults([]);
                      }}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
