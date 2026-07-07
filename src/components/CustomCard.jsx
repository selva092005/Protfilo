import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

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
  image,
  imageLink,
  featured = false,
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

  const renderDescription = (text) => {
    if (!text) return null;
    const noteRegex = /(\*Note on Live Demo:[\s\S]+?\*)/;
    const parts = text.split(noteRegex);
    return parts.map((part, index) => {
      if (noteRegex.test(part)) {
        const cleanNote = part.replace(/\*/g, '');
        const prefix = "Note on Live Demo:";
        let bodyText = cleanNote;
        let hasPrefix = false;
        if (cleanNote.startsWith(prefix)) {
          bodyText = cleanNote.substring(prefix.length);
          hasPrefix = true;
        }
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              gap: 1.5,
              mt: 2.5,
              p: 2,
              borderRadius: '8px',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.02)',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.08)',
              borderLeft: '4px solid',
              borderLeftColor: (theme) => theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
            }}
          >
            <InfoIcon
              sx={{
                fontSize: '1.15rem',
                color: (theme) => theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
                mt: '2px',
                flexShrink: 0
              }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: '0.825rem',
                color: 'text.secondary',
                fontWeight: 500,
                lineHeight: 1.55,
                textAlign: 'justify'
              }}
            >
              {hasPrefix && (
                <span style={{ fontWeight: 700, color: (theme) => theme.palette.mode === 'dark' ? '#f87171' : '#dc2626', marginRight: '4px' }}>
                  {prefix}
                </span>
              )}
              {bodyText}
            </Typography>
          </Box>
        );
      }
      return (
        <span key={index}>{part}</span>
      );
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
          background: (theme) => `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${theme.palette.mode === 'dark' ? `${theme.palette.primary.main}1a` : `${theme.palette.primary.main}0a`}, transparent 80%)`,
          opacity: isHovered && hoverEffect ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 0
        },
        '&:hover': hoverEffect ? {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? `0 8px 25px -8px ${theme.palette.primary.main}40`
            : `0 8px 25px -8px ${theme.palette.primary.main}14`
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
            zIndex: 2,
          }}
        />
      )}
      {image && (
        <Box sx={{ width: '100%', overflow: 'hidden', borderBottom: '1px solid', borderColor: 'divider', zIndex: 1 }}>
          {imageLink ? (
            <Box
              component="a"
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'block', width: '100%', cursor: 'pointer', overflow: 'hidden' }}
            >
              <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                  width: '100%',
                  height: featured ? { xs: 200, sm: 320, md: 420 } : { xs: 200, sm: 240, md: 260 },
                  objectFit: 'contain',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(248, 250, 252, 0.6)',
                  display: 'block',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'scale(1.025)'
                  }
                }}
              />
            </Box>
          ) : (
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                width: '100%',
                height: featured ? { xs: 200, sm: 320, md: 420 } : { xs: 200, sm: 240, md: 260 },
                objectFit: 'contain',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(248, 250, 252, 0.6)',
                display: 'block'
              }}
            />
          )}
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 3, md: 4 }, pb: { xs: 4, md: 5 }, position: 'relative', zIndex: 1 }}>
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

        <Typography variant="h6" component="h3" sx={{ mb: '24px', fontWeight: '800', lineHeight: 1.3, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            component="div"
            sx={{
              mb: 4,
              flexGrow: 1,
              lineHeight: 1.8,
              fontWeight: 500,
              fontSize: '1rem',
              textAlign: 'justify',
              whiteSpace: 'pre-line'
            }}
          >
            {renderDescription(description)}
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
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? `${theme.palette.primary.main}14` : `${theme.palette.primary.main}0a`,
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
