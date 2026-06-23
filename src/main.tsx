import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import './style.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#365f7f'
    },
    secondary: {
      main: '#b55d4c'
    },
    background: {
      default: '#f7f5f0',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: 0
    },
    h2: {
      fontWeight: 700,
      letterSpacing: 0
    }
  },
  shape: {
    borderRadius: 8
  }
});

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root was not found.');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
