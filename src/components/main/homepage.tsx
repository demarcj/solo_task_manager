'use client';

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BrushIcon from '@mui/icons-material/Brush';
import PaletteIcon from '@mui/icons-material/Palette';

const topics = [
  {
    icon: <BrushIcon aria-hidden="true" />,
    title: 'Aesthetic Judgment',
    body: 'Compare theories of beauty, taste, expression, and interpretation.'
  },
  {
    icon: <PaletteIcon aria-hidden="true" />,
    title: 'Medium And Meaning',
    body: 'Trace how painting, music, film, and digital work shape what art can say.'
  },
  {
    icon: <AutoStoriesIcon aria-hidden="true" />,
    title: 'Texts And Notes',
    body: 'Build a compact study surface for readings, arguments, and examples.'
  }
];

export const Homepage = () => {
  return (
    <Box>
      <Box component="div">
        <Container className="hero" maxWidth="lg">
          <Box>
            <Box>
              <Typography variant="overline" color="secondary">
                React SPA + Material UI
              </Typography>
              <Typography variant="h1" className="hero-title">
                Weekly Progress
              </Typography>
              <Typography variant="body1" className="hero-copy">
                1 hr
              </Typography>
              <Typography variant="h2" className="hero-title">
                Yesterday Progress
              </Typography>
              <Typography variant="body1" className="hero-copy">
                1 hr
              </Typography>
              <Typography variant="h2" className="hero-title">
                Task
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="hero-actions">
                <Button component={NextLink} href="/task/111111" variant="contained" size="large">
                  Explore Topics
                </Button>
                <Button variant="outlined" size="large">
                  View Reading List
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
        <Box className="topic-band">
          <Container maxWidth="lg">
            <Box className="topics-grid">
              {topics.map((topic) => (
                <Box key={topic.title}>
                  <Paper className="topic-card" elevation={0}>
                    <Box className="topic-icon">{topic.icon}</Box>
                    <Typography variant="h6">{topic.title}</Typography>
                    <Typography variant="body2">{topic.body}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
