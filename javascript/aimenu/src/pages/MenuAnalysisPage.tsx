import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Box, 
  CircularProgress, 
  Typography, 
  TextField,
  Button,
  Paper,
  Alert,
  Card,
  CardMedia,
} from '@mui/material'
import { analyzeMenu } from '../services/menuService'
import { dataService } from '../services/dataService'

const API_KEY_STORAGE_KEY = 'openai_api_key'

const MenuAnalysisPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showApiInput, setShowApiInput] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const image = location.state?.image as File
    if (image) {
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(image)
      setImagePreview(previewUrl)
      
      // Cleanup preview URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl)
    }
  }, [location.state?.image])

  useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY)
    if (storedApiKey) {
      setApiKey(storedApiKey)
      startAnalysis(storedApiKey)
    } else {
      setShowApiInput(true)
    }
  }, [])

  const startAnalysis = async (key: string) => {
    try {
      setIsAnalyzing(true)
      setError(null)
      const image = location.state?.image
      
      if (!image) {
        throw new Error('No image provided')
      }

      const menuData = await analyzeMenu(image, key)
      localStorage.setItem(API_KEY_STORAGE_KEY, key)
      await dataService.setMenuData(menuData)
      navigate('/menu')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      if (errorMessage.includes('API key')) {
        setShowApiInput(true)
        localStorage.removeItem(API_KEY_STORAGE_KEY)
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      startAnalysis(apiKey.trim())
    }
  }

  if (!location.state?.image) {
    navigate('/')
    return null
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        gap: 4,
      }}
    >
      {showApiInput ? (
        <Paper 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ p: 3, width: '100%', maxWidth: 400 }}
        >
          <Typography variant="h6" gutterBottom>
            Enter OpenAI API Key
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Your API key will be stored locally for future use
          </Typography>
          <TextField
            fullWidth
            label="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit"
            disabled={!apiKey.trim() || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Menu'}
          </Button>
        </Paper>
      ) : isAnalyzing ? (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Analyzing menu...
            </Typography>
          </Box>
          {imagePreview && (
            <Card 
              sx={{ 
                maxWidth: 400, 
                width: '100%',
                overflow: 'hidden',
                opacity: 0.8, // Slightly dim the image during analysis
                transition: 'opacity 0.3s ease',
              }}
            >
              <CardMedia
                component="img"
                image={imagePreview}
                alt="Menu preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '60vh',
                  objectFit: 'contain',
                }}
              />
            </Card>
          )}
        </>
      ) : error ? (
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => {
                setError(null)
                setShowApiInput(true)
              }}
            >
              Try Again
            </Button>
          }
        >
          {error}
        </Alert>
      ) : null}
    </Box>
  )
}

export default MenuAnalysisPage 