import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Paper, Tabs, Tab } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from './theme/CustomThemeProvider';
import Gallery from './components/Gallery/Gallery';
import AlertsGallery from './components/Alerts/AlertsGallery';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default', color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary" elevation={2} sx={{ borderRadius: 4, mt: 2, mx: 'auto', maxWidth: 1400, width: '100%' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setCurrentPageIndex(0)} sx={{ mr: 2 }}>
            <img src="./logo.jpg" alt="logo" width={44} height={44} style={{ borderRadius: '8px' }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            CV Image Inspection
          </Typography>
          <Tabs value={currentPageIndex} onChange={(_, v) => setCurrentPageIndex(v)} textColor="inherit" indicatorColor="secondary" sx={{ minHeight: 48 }}>
            <Tab label="Галерея" sx={{ fontWeight: 500, minWidth: 100 }} />
            <Tab label="Предупреждения" sx={{ fontWeight: 500, minWidth: 140 }} />
          </Tabs>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, p: { xs: 1, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {currentPageIndex === 1 ? <AlertsGallery /> : <Gallery />}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;