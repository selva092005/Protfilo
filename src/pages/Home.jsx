import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Button, Stack, IconButton, useTheme, Paper, Divider, Chip, Dialog, ButtonBase } from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  ArrowForward,
  Verified as VerifiedIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { setActiveTab } from '../features/portfolio/portfolioSlice';
import profileImg from '../assets/with court 1.png';

import ThreeDTextReveal from '../components/ThreeDTextReveal';



export const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isImgExpanded, setIsImgExpanded] = useState(false);

  // Select data from Redux slice
  const { name, title, summary, github, linkedin, email } = useSelector((state) => state.portfolio.profile);
  const internships = useSelector((state) => state.portfolio.internships);

  // Active internship details (Cavin Infotech)
  const currentInternship = internships.find(i => i.company === 'Cavin Infotech') || internships[0];

  // Framer Motion entry animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 15 }
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%' }}
      >
        <Stack spacing={4} alignItems="center" textAlign="center" width="100%">

          {/* Circular Profile Picture */}
          <motion.div variants={itemVariants} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>

              {/* Atmospheric Background Glows (Static, no keyframe animations) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-5%',
                  left: '-5%',
                  right: '-5%',
                  bottom: '-5%',
                  borderRadius: '50%',
                  background: (theme) => `radial-gradient(circle, ${theme.palette.secondary.main} 0%, transparent 70%)`,
                  filter: 'blur(35px)',
                  opacity: (theme) => theme.palette.mode === 'dark' ? 0.25 : 0.12,
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* Intersecting Orbit Crescent (Primary-to-Secondary Gradient Line) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  left: -8,
                  width: { xs: 196, sm: 236, md: 266 },
                  height: { xs: 196, sm: 236, md: 266 },
                  borderRadius: '50%',
                  border: '2.5px solid',
                  borderColor: 'secondary.main',
                  background: 'transparent',
                  // Only show the left-to-bottom crescent arc
                  clipPath: 'polygon(0 0, 60% 0, 10% 100%, 0 100%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* Main Image Button (Perfect Circle) */}
              <ButtonBase
                onClick={() => setIsImgExpanded(true)}
                sx={{
                  width: { xs: 180, sm: 220, md: 250 },
                  height: { xs: 180, sm: 220, md: 250 },
                  borderRadius: '50%',
                  p: 0,
                  border: '2px solid',
                  borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.85)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 12px 40px rgba(0, 0, 0, 0.4)' : '0 12px 30px rgba(15, 23, 42, 0.05)',
                  zIndex: 1,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    borderColor: 'primary.main',
                    boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 16px 48px rgba(129, 140, 248, 0.2)' : '0 16px 36px rgba(79, 70, 229, 0.12)'
                  }
                }}
              >
                <Box
                  component="img"
                  src={profileImg}
                  alt={name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center', // Center the 1:1 image perfectly
                    imageRendering: '-webkit-optimize-contrast', // Enhance sharpness on downscaling
                    transform: 'translate3d(0, 0, 0)', // Enable GPU rendering for smoother interpolation
                    backfaceVisibility: 'hidden',
                  }}
                />
              </ButtonBase>

              {/* Status Badge: Available for Work */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.8,
                  py: 0.7,
                  borderRadius: '20px',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                  pointerEvents: 'none',
                }}
              >
                {/* Glowing status dot */}
                <Box sx={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                      opacity: 0.75,
                      animation: 'radar 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
                      '@keyframes radar': {
                        '0%': { transform: 'scale(1)', opacity: 0.8 },
                        '100%': { transform: 'scale(3.5)', opacity: 0 }
                      }
                    }}
                  />
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                      zIndex: 1
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.675rem',
                    fontWeight: 750,
                    color: 'text.primary',
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Open to Work
                </Typography>
              </Box>

            </Box>
          </motion.div>

          {/* Welcome Badge */}
          <motion.div variants={itemVariants}>
            <Box>
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.08)' : 'rgba(79, 70, 229, 0.04)',
                  px: 2.2,
                  py: 0.8,
                  borderRadius: '10px',
                  display: 'inline-block'
                }}
              >
                Welcome to my portfolio
              </Typography>
            </Box>
          </motion.div>

          {/* Name & Title Header */}
          <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Stack spacing={1} alignItems="center">
              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  color: 'text.primary',
                  fontSize: { xs: '2.5rem', sm: '3.4rem', md: '3.8rem' },
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15
                }}
              >
                <ThreeDTextReveal text={name} delay={0.4} />
              </Typography>

              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: '1.35rem', sm: '1.75rem' },
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: 'primary.main',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {title}
                </Box>
              </Typography>
            </Stack>
          </motion.div>

          {/* Description Paragraph */}
          <motion.div variants={itemVariants}>
            <Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: '650px',
                  fontWeight: 500,
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  mx: 'auto',
                  textAlign: 'justify'
                }}
              >
                {summary}
              </Typography>
            </Box>
          </motion.div>

          {/* Rectangular Glass Status Ribbon */}
          {currentInternship && (
            <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: '520px' }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  bgcolor: 'background.glass',
                  backdropFilter: 'blur(20px)',
                  px: 2.5,
                  py: 1.75,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 20px rgba(15,23,42,0.04)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '3px',
                    background: (theme) => `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                  }
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1.5, sm: 2 }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  sx={{ pl: 1 }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {/* Status Badge */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        px: 1.25,
                        py: 0.5,
                        borderRadius: '6px',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                        border: '1px solid rgba(34, 197, 94, 0.15)'
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: '#22c55e',
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
                            '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 4px rgba(34, 197, 94, 0)' },
                            '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' }
                          }
                        }}
                      />
                      <Typography variant="caption" color="#22c55e" fontWeight="800" sx={{ fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Active
                      </Typography>
                    </Box>

                    {/* Role & Company info */}
                    <Typography variant="body2" fontWeight="800" color="text.primary" sx={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                      Frontend Developer Intern{' '}
                      <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>
                        @ Cavin Infotech
                      </Box>
                      <VerifiedIcon sx={{ fontSize: '0.9rem', color: '#3897f0' }} />
                    </Typography>
                  </Stack>

                  {/* Metadata */}
                  <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ fontSize: '0.725rem', whiteSpace: 'nowrap' }}>
                    Remote &bull; {currentInternship.duration}
                  </Typography>
                </Stack>
              </Paper>
            </motion.div>
          )}

          {/* Call-to-Action Buttons */}
          <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2.2}
              justifyContent="center"
              alignItems="center"
              sx={{ flexWrap: 'wrap' }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => dispatch(setActiveTab('projects'))}
                sx={{ py: 1.5, px: 4.5, borderRadius: '12px', fontWeight: 700 }}
              >
                Explore Projects
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => dispatch(setActiveTab('contact'))}
                sx={{
                  py: 1.5,
                  px: 4.5,
                  borderRadius: '12px',
                  fontWeight: 700,
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'text.primary',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Get in Touch
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component="a"
                href="/resume.pdf"
                target="_blank"
                startIcon={<ViewIcon sx={{ fontSize: '1.2rem' }} />}
                sx={{
                  py: 1.5,
                  px: 3.5,
                  borderRadius: '12px',
                  fontWeight: 700,
                  borderColor: 'divider',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                View CV
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component="a"
                href="/resume.pdf"
                download="Selva_Bharathi_Resume.pdf"
                startIcon={<DownloadIcon sx={{ fontSize: '1.2rem' }} />}
                sx={{
                  py: 1.5,
                  px: 3.5,
                  borderRadius: '12px',
                  fontWeight: 700,
                  borderColor: 'divider',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Download CV
              </Button>
            </Stack>
          </motion.div>

          {/* Social Profiles Row */}
          <motion.div variants={itemVariants}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={3} pt={2} pb={{ xs: 2, md: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: '0.08em', fontSize: '0.725rem', textTransform: 'uppercase' }}>
                Connect with me
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  href={github}
                  target="_blank"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: 'divider',
                    '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' },
                    transition: 'all 0.2s',
                    p: 1
                  }}
                >
                  <GitHub sx={{ fontSize: '1.1rem' }} />
                </IconButton>
                <IconButton
                  href={linkedin}
                  target="_blank"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: 'divider',
                    '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' },
                    transition: 'all 0.2s',
                    p: 1
                  }}
                >
                  <LinkedIn sx={{ fontSize: '1.1rem' }} />
                </IconButton>
                <IconButton
                  href={`mailto:${email}`}
                  sx={{
                    color: 'text.secondary',
                    bgcolor: 'divider',
                    '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' },
                    transition: 'all 0.2s',
                    p: 1
                  }}
                >
                  <Email sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Stack>
            </Box>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: 'easeOut' }}
            style={{ marginTop: 'auto', paddingTop: '1.5rem' }}
          >
            <Box
              onClick={() => dispatch(setActiveTab('about'))}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.3s',
                '&:hover': { opacity: 1 }
              }}
            >
              <Box
                sx={{
                  width: 22,
                  height: 36,
                  borderRadius: 11,
                  border: '2px solid',
                  borderColor: 'text.secondary',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 1.25,
                  boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 0 10px rgba(56, 189, 248, 0.1)' : 'none'
                }}
              >
                <Box
                  component={motion.div}
                  animate={{
                    y: [2, 12, 2],
                    opacity: [1, 0, 1]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  sx={{
                    width: 4,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    position: 'absolute',
                    top: 4
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" fontWeight="800" sx={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
                Scroll Down
              </Typography>
            </Box>
          </motion.div>

        </Stack>
      </motion.div>

      {/* Expanded Circular Image Dialog */}
      <Dialog
        open={isImgExpanded}
        onClose={() => setIsImgExpanded(false)}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          }
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            p: 0, // Remove the whitespace gap
            border: '3px solid', // 3px border for the larger dialog view
            borderColor: 'secondary.main', // Teal/Cyan color
            boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 24px 60px rgba(0, 0, 0, 0.5)' : '0 24px 60px rgba(15, 23, 42, 0.08)',
          }}
        >
          <Box
            component="img"
            src={profileImg}
            alt={name}
            sx={{
              width: { xs: '280px', sm: '380px', md: '450px' },
              height: { xs: '280px', sm: '380px', md: '450px' },
              borderRadius: '50%',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'center', // Center the 1:1 image perfectly
              imageRendering: '-webkit-optimize-contrast',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default Home;
