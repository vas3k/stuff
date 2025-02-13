import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Typography,
  styled,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'

const Logo = styled('img')({
  width: '200px',
  height: '200px',
  marginBottom: '2rem',
})

const HomePage = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      navigate('/analysis', { state: { image: e.target.files[0] } })
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Logo src="/logo.png" alt="Menu Translator" />
        <Typography variant="h4" gutterBottom>
          Menu Translator
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}>
          <Button
            variant="contained"
            component="label"
            size="large"
            startIcon={<CameraAltIcon />}
            sx={{ fontSize: '1.2rem', py: 2 }}
          >
            Take Photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handleCapture}
            />
          </Button>

          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoLibraryIcon />}
          >
            Choose from Gallery
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleCapture}
            />
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage 