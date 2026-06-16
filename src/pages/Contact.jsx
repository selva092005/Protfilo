import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  IconButton,
  Alert,
  Snackbar,
  Grid,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocIcon,
  Send as SendIcon,
  GitHub,
  LinkedIn
} from '@mui/icons-material';
import confetti from 'canvas-confetti';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';

export const Contact = () => {
  const profile = useSelector((state) => state.portfolio.profile);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      // Web3Forms access key from state or fallback (so the user gets a working demo initially)
      const accessKey = profile.web3FormsKey && profile.web3FormsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'
        ? profile.web3FormsKey
        : '5f95ec87-43ca-49d7-84ec-6b1464303493'; // Fallback demo key

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Contact from ${formData.name}`
          })
        });

        const result = await response.json();
        if (response.status === 200 || result.success) {
          setSubmitStatus('success');
          setOpenSnackbar(true);

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });

          setFormData({ name: '', email: '', message: '' });
        } else {
          setSubmitStatus('error');
          setOpenSnackbar(true);
        }
      } catch (err) {
        console.error('Email submission error:', err);
        setSubmitStatus('error');
        setOpenSnackbar(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.45)' : '#ffffff',
      transition: 'all 0.2s ease-in-out',
      '& fieldset': {
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        borderWidth: '1.5px',
      },
      '&.Mui-focused': {
        boxShadow: (theme) => `0 0 0 4px ${theme.palette.primary.main}26`,
      }
    },
    '& .MuiOutlinedInput-input': {
      py: 2, // yielding exactly 56px height including line height
      px: 2,
      fontSize: '0.875rem',
      color: 'text.primary',
    },
    '& .MuiOutlinedInput-multiline': {
      py: 0,
      px: 0,
    },
    '& textarea': {
      py: 2,
      px: 2,
      fontSize: '0.875rem',
      color: 'text.primary',
    }
  };

  const textareaStyles = {
    ...inputStyles,
    '& .MuiOutlinedInput-root': {
      ...inputStyles['& .MuiOutlinedInput-root'],
      height: '180px',
      alignItems: 'flex-start',
    },
    '& textarea': {
      py: 2,
      px: 2,
      fontSize: '0.875rem',
      color: 'text.primary',
      height: '148px !important',
      overflowY: 'auto !important'
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 10, md: 15 }, px: { xs: 4, md: 4 } }}>
      <AnimatedSection direction="up">
        <SectionHeader
          title="Get In Touch"
          subtitle="Feel free to reach out to me for internship opportunities, project collaborations, or general inquiries."
        />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.15}>
        <Paper
          sx={{
            bgcolor: 'background.glass',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 20px 50px rgba(0,0,0,0.3)'
              : '0 10px 40px rgba(0,0,0,0.08)',
            mt: 4,
            maxWidth: '1000px',
            mx: 'auto'
          }}
        >
          {/* Left Panel - Contact Information (44% width) */}
          <Box
            sx={{
              width: { xs: '100%', md: '44%' },
              p: { xs: 3, md: 5 },
              pt: { xs: 5, md: 7.5 },
              pr: { xs: 3, md: 6.25 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              borderRight: { xs: 'none', md: '1px solid' },
              borderBottom: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', flexGrow: 1 }}>
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="700" 
                  color="text.primary" 
                  sx={{ 
                    mb: 2,
                    letterSpacing: '-0.02em', 
                    fontSize: { xs: '1.75rem', md: '2.625rem' }
                  }}
                >
                  Let's Connect
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4,
                    lineHeight: 1.6, 
                    fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    maxWidth: '90%'
                  }}
                >
                  Have an exciting project in mind? Or looking for a passionate developer to join your team? I'm always open to discussing new opportunities.
                </Typography>

                <Stack spacing={2}>
                  {/* Email Item Card */}
                  <Box
                    component="a"
                    href={`mailto:${profile.email}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2.5,
                      borderRadius: '14px',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.015)',
                      border: '1px solid',
                      borderColor: 'divider',
                      textDecoration: 'none',
                      color: 'text.primary',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 8px 25px rgba(0,0,0,0.3)'
                          : '0 8px 25px rgba(15,23,42,0.05)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? `${theme.palette.primary.main}14` : `${theme.palette.primary.main}08`,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        flexShrink: 0
                      }}
                    >
                      <EmailIcon sx={{ fontSize: '1.4rem' }} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 800, letterSpacing: '0.08em', mb: 0.25, fontSize: '0.65rem' }}>EMAIL ME</Typography>
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        color="text.primary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.825rem' },
                          wordBreak: 'break-all',
                          lineHeight: 1.2
                        }}
                      >
                        {profile.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Phone Item Card */}
                  <Box
                    component="a"
                    href={`tel:${profile.phone}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2.5,
                      borderRadius: '14px',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.015)',
                      border: '1px solid',
                      borderColor: 'divider',
                      textDecoration: 'none',
                      color: 'text.primary',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 8px 25px rgba(0,0,0,0.3)'
                          : '0 8px 25px rgba(15,23,42,0.05)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? `${theme.palette.primary.main}14` : `${theme.palette.primary.main}08`,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        flexShrink: 0
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: '1.4rem' }} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 800, letterSpacing: '0.08em', mb: 0.25, fontSize: '0.65rem' }}>CALL ME</Typography>
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        color="text.primary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.825rem' },
                          lineHeight: 1.2
                        }}
                      >
                        {profile.phone}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Location Item Card */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2.5,
                      borderRadius: '14px',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.015)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 8px 25px rgba(0,0,0,0.3)'
                          : '0 8px 25px rgba(15,23,42,0.05)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? `${theme.palette.primary.main}14` : `${theme.palette.primary.main}08`,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        flexShrink: 0
                      }}
                    >
                      <LocIcon sx={{ fontSize: '1.4rem' }} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 800, letterSpacing: '0.08em', mb: 0.25, fontSize: '0.65rem' }}>LOCATION</Typography>
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        color="text.primary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.825rem' },
                          lineHeight: 1.2
                        }}
                      >
                        {profile.location}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ mt: { xs: 4, md: 'auto' }, pt: { md: 4 } }}>
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 800, letterSpacing: '0.08em', mb: 1.5, fontSize: '0.65rem' }}>
                  FIND ME ON
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    href={profile.github}
                    target="_blank"
                    sx={{
                      color: 'text.primary',
                      width: 48,
                      height: 48,
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: '#6366F1',
                        borderColor: '#6366F1',
                        transform: 'scale(1.1) translateY(-2px)'
                      },
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <GitHub sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                  <IconButton
                    href={profile.linkedin}
                    target="_blank"
                    sx={{
                      color: 'text.primary',
                      width: 48,
                      height: 48,
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: '#6366F1',
                        borderColor: '#6366F1',
                        transform: 'scale(1.1) translateY(-2px)'
                      },
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <LinkedIn sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Box>

          {/* Right Panel - Split Contact Form (56% width) */}
          <Box
            sx={{
              width: { xs: '100%', md: '56%' },
              p: { xs: 3, md: 5 },
              pt: { xs: 5, md: 7.5 },
              pl: { xs: 3, md: 6.25 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Typography 
              variant="h3" 
              fontWeight="700" 
              color="text.primary" 
              sx={{ 
                mb: 2,
                letterSpacing: '-0.02em', 
                fontSize: { xs: '1.65rem', md: '2.375rem' }
              }}
            >
              Send a Message
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
              Fill out the form below and I'll get back to you as soon as possible.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}
            >
              {/* Name & Email Group - Responsive Stack */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                    YOUR NAME *
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    placeholder="e.g. John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={inputStyles}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                    EMAIL ADDRESS *
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="e.g. john@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={inputStyles}
                  />
                </Box>
              </Stack>

              {/* Message Group */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                  YOUR MESSAGE *
                </Typography>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="message"
                  placeholder="Type your message here..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={textareaStyles}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                endIcon={!isSubmitting && <SendIcon />}
                sx={{
                  alignSelf: { xs: 'stretch', sm: 'flex-end' },
                  py: 1.5,
                  px: 4.5,
                  borderRadius: '12px',
                  fontWeight: 700,
                  textTransform: 'none'
                }}
              >
                {isSubmitting ? (
                  <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
                    <CircularProgress size={18} color="inherit" />
                    <span>Sending...</span>
                  </Stack>
                ) : (
                  'Send Message'
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </AnimatedSection>

      {/* Snackbar feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={submitStatus === 'success' ? 'success' : 'error'}
          sx={{ width: '100%', borderRadius: 3, fontWeight: '600' }}
        >
          {submitStatus === 'success'
            ? 'Thank you! Your message has been sent successfully.'
            : 'Failed to send message. Please try again or email me directly.'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
