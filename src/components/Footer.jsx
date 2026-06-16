import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Typography } from '@mui/material';

export const Footer = () => {
  const { name } = useSelector((state) => state.portfolio.profile);

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 2, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        background: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(248, 250, 252, 0.4)',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontWeight: 500, fontSize: '0.85rem' }}
        >
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
