import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { setActiveTabFromScroll } from './features/portfolio/portfolioSlice';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

export const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const scrollTarget = useSelector((state) => state.portfolio.scrollTarget);

  const muiTheme = getTheme(mode);

  // Handle smooth scrolling when scrollTarget changes
  useEffect(() => {
    if (scrollTarget && scrollTarget.id) {
      const element = document.getElementById(scrollTarget.id);
      if (element) {
        window.isProgrammaticScroll = true;
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const timer = setTimeout(() => {
          window.isProgrammaticScroll = false;
        }, 800); // Wait for the smooth scroll to finish

        return () => clearTimeout(timer);
      }
    }
  }, [scrollTarget]);

  // Scroll Spy using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];

    const observerOptions = {
      root: null,
      // Target area is a band starting 120px from top (below header) to 50% height
      rootMargin: '-120px 0px -50% 0px',
      threshold: 0.05
    };

    const observerCallback = (entries) => {
      if (window.isProgrammaticScroll) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dispatch(setActiveTabFromScroll(entry.target.id));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [dispatch]);

  const sectionStyle = {
    scrollMarginTop: { xs: '88px', md: '104px' }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: muiTheme.palette.background.gradient,
          color: 'text.primary',
          transition: 'background 0.3s ease, color 0.3s ease',
        }}
      >
        <Navbar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: { xs: 11, md: 13 } }}>
          <Box id="home" sx={sectionStyle}>
            <Home />
          </Box>
          <Box id="about" sx={sectionStyle}>
            <About />
          </Box>
          <Box id="experience" sx={sectionStyle}>
            <Experience />
          </Box>
          <Box id="projects" sx={sectionStyle}>
            <Projects />
          </Box>
          <Box id="contact" sx={sectionStyle}>
            <Contact />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
