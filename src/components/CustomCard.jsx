import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

export const CustomCard = ({
  title,
  subtitle,
  description,
  tags = [],
  icon,
  actions,
  badge,
  hoverEffect = true,
  onClick,
  sx = {}
}) => {
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
    <Card
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        height: '100%',
        width: '100%', // Enforces proper alignment and same width for all cards
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: 'background.glass',
        backdropFilter: 'blur(16px)',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.25s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.04)'}, transparent 80%)`,
          opacity: isHovered && hoverEffect ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 0
        },
        '&:hover': hoverEffect ? {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 8px 25px -8px rgba(99, 102, 241, 0.2)'
            : '0 8px 25px -8px rgba(99, 102, 241, 0.08)'
        } : {},
        ...sx
      }}
    >
      {badge && (
        <Chip
          label={badge}
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontWeight: '700',
            borderRadius: '6px',
            fontSize: '0.7rem',
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        {(icon || subtitle) && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.75 }}>
            {icon && (
              <Box
                className="card-icon"
                sx={{
                  mr: 1.25,
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {icon}
              </Box>
            )}
            {subtitle && (
              <Typography
                variant="caption"
                color="primary"
                sx={{ fontWeight: '750', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        <Typography variant="h6" component="h3" mb={1.25} sx={{ fontWeight: '800', lineHeight: 1.3, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" color="text.secondary" mb={2.5} sx={{ flexGrow: 1, lineHeight: 1.7, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
            {description}
          </Typography>
        )}

        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  fontFamily: '"JetBrains Mono", monospace',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
                  color: 'primary.main',
                  height: 22,
                  '& .MuiChip-label': { px: 1.25 }
                }}
              />
            ))}
          </Box>
        )}

        {actions && (
          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            {actions}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
