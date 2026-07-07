import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { setActiveTab } from '../features/portfolio/portfolioSlice';
import { toggleTheme } from '../features/theme/themeSlice';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const LetterFlipLogo = ({ text }) => {
  const theme = useTheme();
  const letters = Array.from(text);

  const letterVariants = {
    initial: { rotateY: 0, color: 'inherit' },
    hover: (i) => ({
      rotateY: 360,
      color: theme.palette.primary.main,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 12,
        delay: i * 0.04,
      }
    })
  };

  return (
    <Box
      component={motion.div}
      initial="initial"
      whileHover="hover"
      sx={{
        display: 'inline-flex',
        flexWrap: 'nowrap',
        fontWeight: 900,
        letterSpacing: '-0.02em',
        fontSize: '0.95rem',
        color: 'text.primary',
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {char}
        </motion.span>
      ))}
    </Box>
  );
};

export const Navbar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.portfolio.activeTab);
  const themeMode = useSelector((state) => state.theme.mode);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (tabId) => {
    dispatch(setActiveTab(tabId));
    if (mobileOpen) setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        py: 3
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" px={3} mb={3}>
          <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-0.02em' }}>
            Selva Bharathi
          </Typography>
        </Box>

        <Divider sx={{ mx: 2, mb: 2 }} />

        <List sx={{ px: 1.5 }}>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavClick(item.id)}
                selected={activeTab === item.id}
                sx={{
                  borderRadius: '8px',
                  py: 1,
                  color: activeTab === item.id ? 'primary.main' : 'text.secondary',
                  bgcolor: activeTab === item.id
                    ? (theme) => theme.palette.mode === 'dark' ? 'rgba(62, 189, 147, 0.08)' : 'rgba(17, 58, 47, 0.05)'
                    : 'transparent',
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(62, 189, 147, 0.08)' : 'rgba(17, 58, 47, 0.05)',
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(62, 189, 147, 0.12)' : 'rgba(17, 58, 47, 0.08)',
                    }
                  }
                }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>


    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: 20,
        left: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        px: 2
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          maxWidth: { xs: '100%', md: 1200 },
          width: '100%',
          borderRadius: '30px', // Pill shape
          bgcolor: 'background.glass',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(22, 33, 30, 0.05)',
          transition: 'all 0.3s ease'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 58,
            minHeight: '58px !important',
            px: { xs: 2.5, md: 3.5 }
          }}
        >
          {/* Brand - Left */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer', py: 0.5 }}
            onClick={() => handleNavClick('home')}
          >
            <LetterFlipLogo text="SELVA BHARATHI V" />
          </Box>

          {/* Links - Center (Desktop) */}
          {!isMobile && (
            <Box
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                px: 0.75,
                py: 0.5,
                borderRadius: '20px',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  sx={{
                    color: activeTab === item.id ? 'primary.main' : 'text.secondary',
                    fontWeight: 750,
                    fontSize: '0.775rem',
                    px: 2.25,
                    py: 0.5,
                    borderRadius: '16px',
                    position: 'relative',
                    bgcolor: 'transparent',
                    transition: 'color 0.3s ease',
                    zIndex: 1,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  {/* Sliding Background Indicator */}
                  {activeTab === item.id && (
                    <Box
                      component={motion.div}
                      layoutId="activeTabIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                        borderRadius: '16px',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? 'none'
                          : '0 2px 8px rgba(0,0,0,0.04)',
                        zIndex: -1
                      }}
                    />
                  )}
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Actions - Right */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Always visible Theme Toggle */}
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              color="inherit"
              sx={{
                color: 'text.primary',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: '50%',
                p: 0.75,
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                }
              }}
            >
              {themeMode === 'dark' ? <LightIcon sx={{ fontSize: '1rem' }} /> : <DarkIcon sx={{ fontSize: '1rem' }} />}
            </IconButton>

            {/* Menu icon - Mobile */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '50%',
                  p: 0.75,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  }
                }}
              >
                <MenuIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, border: 'none' },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
