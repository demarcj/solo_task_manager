import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { Timer } from './timer';
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

export const MainSection = () => {
  return (
    <main>
      <Timer />
      <Box className="app-shell">
        <Box component="div">
          <Container className="hero" maxWidth="lg">
            <Box>
              <Box>
                <Typography variant="overline" color="secondary">
                  React SPA + Material UI
                </Typography>
                <Typography variant="h1" className="hero-title">
                  A clean starting point for art, ideas, and interpretation.
                </Typography>
                <Typography variant="body1" className="hero-copy">
                  This starter app is wired with React, Vite, and Material UI so it can run locally
                  during development and build to static HTML assets for deployment.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="hero-actions">
                  <Button variant="contained" size="large">
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
    </main>
  )
}