import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import HomePage from './pages/HomePage'
import MenuAnalysisPage from './pages/MenuAnalysisPage'
import MenuListPage from './pages/MenuListPage'
import DishDetailPage from './pages/DishDetailPage'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3', // A nice blue color
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF4081', // Pink accent
      light: '#FF80AB',
      dark: '#F50057',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5',
      paper: '#fff',
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFC107',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Prevents all-caps buttons
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.MuiChip-colorWarning': {
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            color: '#B78103',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#2196F3',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<MenuAnalysisPage />} />
          <Route path="/menu" element={<MenuListPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App 