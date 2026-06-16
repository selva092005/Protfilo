import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
  keyframes
} from '@mui/material';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--pulse-color, rgba(99, 102, 241, 0.4));
  }
  70% {
    box-shadow: 0 0 0 8px var(--pulse-color-fade, rgba(99, 102, 241, 0));
  }
  100% {
    box-shadow: 0 0 0 0 var(--pulse-color-fade, rgba(99, 102, 241, 0));
  }
`;
import {
  Person as PersonIcon,
  Fingerprint as FingerprintIcon,
  Badge as BadgeIcon,
  ImportContacts as BookIcon
} from '@mui/icons-material';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiGit,
  SiMysql,
  SiBootstrap,
  SiMui
} from 'react-icons/si';
import {
  FaCss3Alt
} from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';

const SkillCard = ({ skill, index, getSkillIcon }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={4}
      size={{ xs: 12, sm: 12, md: 4 }}
      key={skill.id}
      sx={{ display: 'flex' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
        style={{ width: '100%', display: 'flex' }}
      >
        <Box
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
            borderRadius: '14px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${skill.color}18, transparent 80%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.35s ease',
              pointerEvents: 'none',
              zIndex: 0
            },
            '&:hover': {
              transform: 'translateY(-3px)',
              borderColor: skill.color,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? `0 10px 25px ${skill.color}15`
                : `0 10px 20px ${skill.color}10`,
              '& .skill-icon-box': {
                transform: 'scale(1.08) rotate(3deg)',
                bgcolor: skill.color + '22'
              }
            }
          }}
        >
          {/* Left Icon Container */}
          <Box
            className="skill-icon-box"
            sx={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: skill.color + '14', // ~8% opacity
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              zIndex: 1
            }}
          >
            {getSkillIcon(skill.id, skill.color)}
          </Box>

          {/* Right Text Container */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight="800"
              color="text.primary"
              sx={{ lineHeight: 1.2, mb: 0.3, fontSize: '0.875rem' }}
            >
              {skill.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontSize: '0.675rem'
              }}
            >
              {skill.category}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Grid>
  );
};

export const About = () => {
  const profile = useSelector((state) => state.portfolio.profile);
  const skills = useSelector((state) => state.portfolio.skills);

  const getSkillIcon = (id, color) => {
    const iconStyle = { fontSize: '1.4rem', color: color };
    switch (id) {
      case 'react':
        return <SiReact style={iconStyle} />;
      case 'javascript':
        return <SiJavascript style={iconStyle} />;
      case 'html':
        return <SiHtml5 style={iconStyle} />;
      case 'tailwindcss':
        return <SiTailwindcss style={iconStyle} />;
      case 'nodejs':
        return <SiNodedotjs style={iconStyle} />;
      case 'expressjs':
        return <SiExpress style={iconStyle} />;
      case 'springboot':
        return <SiSpringboot style={iconStyle} />;
      case 'mysql':
        return <SiMysql style={iconStyle} />;
      case 'git':
        return <SiGit style={iconStyle} />;
      case 'css3':
        return <FaCss3Alt style={iconStyle} />;
      case 'bootstrap':
        return <SiBootstrap style={iconStyle} />;
      case 'mui':
        return <SiMui style={iconStyle} />;
      default:
        return <SiReact style={iconStyle} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 10, md: 15 } }}>
      <AnimatedSection direction="up">
        <SectionHeader
          title="About Me"
          subtitle="An overview of my professional story, core info, and technical expertise."
        />
      </AnimatedSection>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
        {/* Biography & Personal Details Row */}
        <Grid item xs={12} size={{ xs: 12 }}>
          <AnimatedSection direction="up" delay={0.15}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: 'background.glass',
                backdropFilter: 'blur(16px)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: (theme) => `radial-gradient(circle at 100% 0%, ${theme.palette.primary.main}0d, transparent 40%)`,
                  opacity: 0,
                  transition: 'opacity 0.4s ease-in-out',
                  pointerEvents: 'none',
                  zIndex: 0
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'primary.main',
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 12px 30px -10px rgba(62, 189, 147, 0.2)'
                    : '0 12px 30px -10px rgba(17, 58, 47, 0.1)'
                },
                '&:hover::before': {
                  opacity: 1
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}1a, ${theme.palette.primary.light}1a)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      animation: `${pulse} 3s infinite ease-in-out`,
                      '--pulse-color': (theme) => `${theme.palette.primary.main}4d`,
                      '--pulse-color-fade': (theme) => `${theme.palette.primary.main}00`
                    }}
                  >
                    <FingerprintIcon sx={{ fontSize: '1.6rem' }} />
                  </Box>
                  <Typography variant="h4" fontWeight="800" color="text.primary" sx={{ lineHeight: 1 }}>
                    Biography
                  </Typography>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontWeight: 500, fontSize: '1rem', textAlign: 'justify' }}>
                  {profile.summary}
                </Typography>
              </Box>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Divider sx={{ mb: 4 }} />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 6, md: 8 }}
                  divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, borderColor: 'divider' }} />}
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 800, letterSpacing: '0.06em', mb: 0.75 }}>
                      CURRENT ROLE
                    </Typography>
                    <Typography variant="body2" fontWeight="700" color="text.primary">
                      {profile.title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 800, letterSpacing: '0.06em', mb: 0.75 }}>
                      LOCATION
                    </Typography>
                    <Typography variant="body2" fontWeight="700" color="text.primary">
                      {profile.location}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 800, letterSpacing: '0.06em', mb: 0.75 }}>
                      PROFILES
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
                      <Typography
                        component="a"
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          color: (theme) => theme.palette.mode === 'dark' ? '#00a0dc' : '#0a66c2', // LinkedIn blue
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                          '&:hover': { color: '#0077b5', textDecoration: 'underline' }
                        }}
                      >
                        LinkedIn
                      </Typography>
                      <Typography variant="body2" fontWeight="700" color="text.secondary">/</Typography>
                      <Typography
                        component="a"
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          color: (theme) => theme.palette.mode === 'dark' ? '#bc8cff' : '#8250df', // GitHub Brand Purple
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                          '&:hover': { color: '#a371f7', textDecoration: 'underline' }
                        }}
                      >
                        GitHub
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </AnimatedSection>
        </Grid>


        {/* Technical Skills Section */}
        <Grid item xs={12} size={{ xs: 12 }} sx={{ mt: { xs: 10, md: 12.5 } }}>
          <AnimatedSection direction="up" delay={0.15}>
            <Typography variant="h4" fontWeight="800" color="text.primary" sx={{ mb: 3 }}>
              Technical Expertise
            </Typography>
          </AnimatedSection>

          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 1.5 }}>
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                getSkillIcon={getSkillIcon}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
