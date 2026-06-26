"use client";
import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export const Header = () => {
  return (
    <header>
      <nav>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box>
                <Button
                  component={Link} 
                  href="/"
                  size="large"
                  sx={{ color: 'white' }}
                >
                  Home
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </nav>
    </header>
  )
}