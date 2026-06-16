import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Box, Button, Link } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';
import CustomCard from '../components/CustomCard';

export const Projects = () => {
  const projects = useSelector((state) => state.portfolio.projects);

  const getProjectActions = (project) => (
    <Box sx={{ display: 'flex', gap: 1.5, mt: 1, pt: 1 }}>
      <Button
        variant="outlined"
        size="small"
        component={Link}
        href={project.github}
        target="_blank"
        startIcon={<GitHub />}
        sx={{
          fontWeight: '700',
          borderRadius: '8px',
          py: 0.6,
          px: 2,
          fontSize: '0.8rem',
          color: 'text.primary',
          borderColor: 'divider',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main',
            bgcolor: 'rgba(99, 102, 241, 0.04)',
            transform: 'translateY(-1px)'
          }
        }}
      >
        Source Code
      </Button>
      {project.demo !== '#' && (
        <Button
          variant="contained"
          size="small"
          component={Link}
          href={project.demo}
          target="_blank"
          startIcon={<Launch />}
          sx={{
            fontWeight: '700',
            borderRadius: '8px',
            py: 0.6,
            px: 2,
            fontSize: '0.8rem',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: (theme) => `0 4px 14px ${theme.palette.primary.main}50`
            }
          }}
        >
          Live Demo
        </Button>
      )}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 10, md: 15 } }}>
      <AnimatedSection direction="up">
        <SectionHeader
          title="Personal Projects"
          subtitle="A selection of independent applications built with React, vanilla JavaScript DOM, and responsive stylesheets."
        />
      </AnimatedSection>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', width: '100%' }}>
            <AnimatedSection
              direction="up"
              delay={index * 0.1}
              style={{ display: 'flex', width: '100%', flexGrow: 1 }}
            >
              <CustomCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                actions={getProjectActions(project)}
                sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
              />
            </AnimatedSection>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
