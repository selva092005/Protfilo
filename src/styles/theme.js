import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#38bdf8' : '#0284c7', // Electric Sky Blue vs Ocean Sky Blue
        contrastText: isDark ? '#030712' : '#ffffff',
      },
      secondary: {
        main: isDark ? '#2dd4bf' : '#0d9488', // Electric Teal vs Teal Green
      },
      background: {
        default: isDark ? '#030712' : '#f8fafc', // Rich Ink Black vs Slate-white
        paper: isDark ? '#0b0f19' : '#ffffff',   // Deep Slate vs Pure White
        gradient: isDark 
          ? 'radial-gradient(circle at 50% 0%, #0f172a 0%, #030712 80%)' // Subtle Slate Glow vs Ash Slate
          : 'radial-gradient(circle at 50% 0%, #f1f5f9 0%, #f8fafc 100%)',
        glass: isDark 
          ? 'rgba(11, 15, 25, 0.75)' 
          : 'rgba(255, 255, 255, 0.75)',
        cardGradient: isDark
          ? 'linear-gradient(145deg, #0b0f19 0%, #030712 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',  // Off-white vs Navy-black
        secondary: isDark ? '#94a3b8' : '#475569', // Muted slate vs Charcoal
      },
      divider: isDark ? 'rgba(248, 250, 252, 0.06)' : 'rgba(15, 23, 42, 0.06)',
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 800,
        fontSize: '2.15rem',
        '@media (min-width:600px)': {
          fontSize: '2.85rem',
        },
        letterSpacing: '-0.03em',
        lineHeight: 1.2,
        color: isDark ? '#f8fafc' : '#0f172a',
      },
      h2: {
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 800,
        fontSize: '1.65rem',
        '@media (min-width:600px)': {
          fontSize: '2rem',
        },
        letterSpacing: '-0.02em',
        color: isDark ? '#f8fafc' : '#0f172a',
      },
      h3: {
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 750,
        fontSize: '1.25rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
        letterSpacing: '-0.015em',
        color: isDark ? '#f8fafc' : '#0f172a',
      },
      h4: {
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 750,
        fontSize: '1.1rem',
        '@media (min-width:600px)': {
          fontSize: '1.25rem',
        },
        letterSpacing: '-0.01em',
        color: isDark ? '#f8fafc' : '#0f172a',
      },
      body1: {
        fontSize: '0.925rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.825rem',
        lineHeight: 1.55,
      },
      button: {
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '0.85rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      isDark 
        ? '0 4px 30px rgba(0, 0, 0, 0.4)' 
        : '0 4px 30px rgba(15, 23, 42, 0.02)',
      isDark 
        ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
        : '0 10px 40px rgba(15, 23, 42, 0.04)',
      ...Array(22).fill('none'),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 20px',
            fontSize: '0.925rem',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
          },
          containedPrimary: {
            background: isDark ? '#38bdf8' : '#0284c7',
            color: isDark ? '#030712' : '#ffffff',
            '&:hover': {
              background: isDark ? '#0ea5e9' : '#0369a1',
            },
          },
          outlined: {
            borderWidth: '1px',
            borderColor: isDark ? 'rgba(248, 250, 252, 0.15)' : 'rgba(15, 23, 42, 0.15)',
            color: isDark ? '#f8fafc' : '#0f172a',
            '&:hover': {
              borderWidth: '1px',
              borderColor: isDark ? '#38bdf8' : '#0284c7',
              bgcolor: isDark ? 'rgba(56, 189, 248, 0.06)' : 'rgba(2, 132, 199, 0.04)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: '1px solid',
            borderColor: isDark ? 'rgba(248, 250, 252, 0.08)' : 'rgba(15, 23, 42, 0.06)',
            boxShadow: 'none',
          },
        },
      },
    },
  });
};
