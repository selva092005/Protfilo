import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  keyframes
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  WorkspacePremium as CertIcon,
  CalendarToday as DateIcon,
  LocationOn as LocIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';

const pulsePrimary = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(62, 189, 147, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(62, 189, 147, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(62, 189, 147, 0);
  }
`;

const pulseSecondary = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(236, 72, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
  }
`;

const TimelineItem = ({ item, index, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEducation = item.type === 'education';

  return (
    <Box 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ mb: isLast ? 0 : 5, position: 'relative' }}
    >
      <AnimatedSection direction="right" delay={0.1 + index * 0.1}>
        {/* Timeline Dot with Icon */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '-39px', sm: '-51px' },
            top: 4,
            width: isHovered ? 36 : 32,
            height: isHovered ? 36 : 32,
            transform: isHovered ? 'translateY(-2px)' : 'none',
            borderRadius: '50%',
            bgcolor: isHovered 
              ? (isEducation ? 'secondary.main' : 'primary.main')
              : 'background.default',
            color: isHovered 
              ? 'primary.contrastText' 
              : (isEducation ? 'secondary.main' : 'primary.main'),
            border: '2px solid',
            borderColor: isEducation ? 'secondary.main' : 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isHovered 
              ? `${isEducation ? pulseSecondary : pulsePrimary} 1.5s infinite ease-in-out`
              : `${isEducation ? pulseSecondary : pulsePrimary} 3.s infinite ease-in-out`,
            boxShadow: isHovered 
              ? (isEducation ? '0 0 15px rgba(236, 72, 153, 0.5)' : '0 0 15px rgba(62, 189, 147, 0.5)')
              : 'none',
            zIndex: 2,
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {isEducation ? <SchoolIcon sx={{ fontSize: isHovered ? '1.2rem' : '1.1rem', transition: 'all 0.3s' }} /> : <WorkIcon sx={{ fontSize: isHovered ? '1rem' : '0.9rem', transition: 'all 0.3s' }} />}
        </Box>

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            bgcolor: 'background.glass',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: isHovered 
              ? (isEducation ? 'secondary.main' : 'primary.main') 
              : 'divider',
            position: 'relative',
            overflow: 'hidden',
            transform: isHovered ? 'translateY(-4px)' : 'none',
            boxShadow: isHovered 
              ? (theme) => theme.palette.mode === 'dark'
                ? `0 12px 30px -10px ${isEducation ? 'rgba(236, 72, 153, 0.25)' : 'rgba(62, 189, 147, 0.3)'}`
                : `0 12px 30px -10px ${isEducation ? 'rgba(236, 72, 153, 0.12)' : 'rgba(17, 58, 47, 0.15)'}`
              : 'none',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: (theme) => `radial-gradient(circle at 100% 0%, ${isEducation ? theme.palette.secondary.main : theme.palette.primary.main}0d, transparent 50%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
              pointerEvents: 'none',
              zIndex: 0
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={1.5} spacing={1}>
              <Typography variant="h5" fontWeight="800">
                {isEducation ? item.degree : item.role}
              </Typography>
              <Chip
                label={item.duration}
                size="small"
                color={isEducation ? 'secondary' : 'primary'}
                variant="outlined"
                icon={<DateIcon sx={{ fontSize: '0.8rem !important' }} />}
                sx={{ fontWeight: '700', borderRadius: '8px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-0.02em', fontSize: '0.725rem' }}
              />
            </Stack>

            <Typography
              variant="subtitle1"
              color={isEducation ? 'text.primary' : 'secondary.main'}
              fontWeight="700"
              display="flex"
              alignItems="center"
              gap={0.5}
              mb={isEducation ? 0 : 2}
            >
              {isEducation ? item.institution : `${item.company} • `}
              {!isEducation && <LocIcon sx={{ fontSize: '1rem' }} />}
              {!isEducation && ` ${item.location}`}
            </Typography>

            {isEducation ? (
              <>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary" fontWeight="600">
                    Academic Grade
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: '800' }}>
                    {item.gradeType}: {item.grade}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {item.description}
              </Typography>
            )}
          </Box>
        </Paper>
      </AnimatedSection>
    </Box>
  );
};

export const Experience = () => {
  const internships = useSelector((state) => state.portfolio.internships);
  const education = useSelector((state) => state.portfolio.education);
  const certifications = useSelector((state) => state.portfolio.certifications);

  // Combined and custom ordered career path timeline:
  // 1. Secondary Education
  // 2. Higher Secondary Education
  // 3. College (BE ECE)
  // 4. Python Developer Intern (under Zealous Tech Corp)
  // 5. React Developer Intern (under Cavin Infotech)
  const combinedTimeline = [];
  if (education && education.length >= 3) {
    combinedTimeline.push({ ...education[0], type: 'education' });
    combinedTimeline.push({ ...education[1], type: 'education' });
    combinedTimeline.push({ ...education[2], type: 'education' });
  }
  if (internships && internships.length >= 2) {
    combinedTimeline.push({ ...internships[1], type: 'internship' });
    combinedTimeline.push({ ...internships[0], type: 'internship' });
  }

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 10, md: 15 } }}>
      <AnimatedSection direction="up">
        <SectionHeader
          title="Experience & Education"
          subtitle="A summary of my professional internship, academic background, and relevant technical certifications."
        />
      </AnimatedSection>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
        {/* Internship & Education Timeline */}
        <Grid item xs={12} md={12} size={{ xs: 12, md: 12 }} sx={{ mb: 6 }}>
          <AnimatedSection direction="up" delay={0.15}>
            <Typography 
              variant="h4" 
              fontWeight="800" 
              sx={{ 
                mb: 4, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5 
              }}
            >
              <WorkIcon color="primary" /> Career Path
            </Typography>
          </AnimatedSection>

          <Box
            sx={{
              position: 'relative',
              pl: { xs: 3, sm: 4.5 },
              ml: 2,
              pt: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '2px',
                bgcolor: 'divider',
                zIndex: 0
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '2px',
                background: (theme) => `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 60%, ${theme.palette.divider} 100%)`,
                zIndex: 1
              }
            }}
          >
            {/* Combined Career Timeline */}
            {combinedTimeline.map((item, index) => (
              <TimelineItem 
                item={item} 
                index={index} 
                isLast={index === combinedTimeline.length - 1} 
                key={index} 
              />
            ))}
          </Box>
        </Grid>

        {/* Certifications Grid */}
        <Grid item xs={12} md={12} size={{ xs: 12, md: 12 }} sx={{ mt: { xs: 8, md: 10 } }}>
          <AnimatedSection direction="up" delay={0.15}>
            <Typography 
              variant="h4" 
              fontWeight="800" 
              sx={{ 
                mb: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5 
              }}
            >
              <CertIcon color="primary" /> Certifications
            </Typography>
          </AnimatedSection>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {certifications.map((cert, index) => (
              <Grid item xs={12} sm={6} md={6} size={{ xs: 12, sm: 6, md: 6 }} key={`cert-${index}`} sx={{ display: 'flex', width: '100%' }}>
                <AnimatedSection direction="left" delay={0.1 + index * 0.1} style={{ display: 'flex', width: '100%' }}>
                  <Card
                    sx={{
                      bgcolor: 'background.glass',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '16px',
                      height: 'auto',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      p: { xs: 3, md: 4 },
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-3px)',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 10px 25px -8px rgba(56, 189, 248, 0.25)'
                          : '0 10px 25px -8px rgba(2, 132, 199, 0.08)',
                        '& .watermark-icon': {
                          transform: 'rotate(0deg) scale(1.15)',
                          opacity: 0.25,
                          color: 'primary.main'
                        }
                      }
                    }}
                  >
                    {/* Giant Faded Watermark Icon */}
                    <CertIcon
                      className="watermark-icon"
                      sx={{
                        position: 'absolute',
                        right: -12,
                        bottom: -15,
                        fontSize: '6rem',
                        opacity: (theme) => theme.palette.mode === 'dark' ? 0.12 : 0.05,
                        color: 'primary.main',
                        pointerEvents: 'none',
                        transform: 'rotate(-15deg)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />

                    {/* Left Accent bar */}
                    <Box
                      sx={{
                        width: 3,
                        alignSelf: 'stretch',
                        bgcolor: 'primary.main',
                        borderRadius: '4px',
                        mr: { xs: 2, md: 2.5 },
                        flexShrink: 0
                      }}
                    />

                    {/* Content */}
                    <Box sx={{ flexGrow: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="800"
                        color="text.primary"
                        sx={{ fontSize: '0.925rem', mb: 0.5, lineHeight: 1.3 }}
                      >
                        {cert.title}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="600"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {cert.issuer}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="secondary.main"
                        fontWeight="700"
                        sx={{ display: 'block', fontSize: '0.7rem', fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        {cert.duration}
                      </Typography>
                    </Box>
                  </Card>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Experience;
