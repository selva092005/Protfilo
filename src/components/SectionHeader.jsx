import React from 'react';
import { Box, Typography } from '@mui/material';

export const SectionHeader = ({ title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';

  return (
    <Box 
      sx={{ 
        mb: { xs: 5, md: 8 }, 
        textAlign: align,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : 'flex-start'
      }}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 800, 
          position: 'relative',
          display: 'inline-block',
          pb: 1.5,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: isCenter ? '50%' : 0,
            transform: isCenter ? 'translateX(-50%)' : 'none',
            width: '60px',
            height: '4px',
            borderRadius: '2px',
            background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mt: 2, 
            maxWidth: '600px', 
            fontWeight: 500,
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
