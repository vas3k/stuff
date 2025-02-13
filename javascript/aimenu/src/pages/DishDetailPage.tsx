import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { dataService } from '../services/dataService'
import { MenuItem } from '../services/dataService'

const DishDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    if (!id) {
      navigate('/menu')
      return
    }

    const menuItem = dataService.getMenuItem(decodeURIComponent(id))
    if (!menuItem) {
      navigate('/menu')
      return
    }

    setItem(menuItem)
  }, [id, navigate])

  if (!item) return null

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        {item.imageUrls && item.imageUrls.length > 0 ? (
          <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
            <ImageList sx={{ width: '100%' }} cols={3} gap={8}>
              {item.imageUrls.map((img, index))) => (
                <ImageListItem key={index}>
                  <img
                    src={img}
                    alt={`${item.name} ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        ) : null}

        <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
          {item.name}
        </Typography>

        <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
          Price: {item.price}
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography>{item.description}</Typography>
        </Paper>

        <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom>
            History
          </Typography>
          <Typography sx={{ 
            lineHeight: 1.8,
            fontStyle: 'italic',
            color: 'text.secondary'
          }}>
            {item.history}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {item.ingredients.map((ingredient: string) => (
              <Chip key={ingredient} label={ingredient} />
            ))}
          </Box>
        </Paper>

        {item.allergens.length > 0 && (
          <Paper sx={{ p: 3, bgcolor: '#fff3e0' }}>
            <Typography variant="h6" gutterBottom>
              Allergens
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {item.allergens.map((allergen: string) => (
                <Chip
                  key={allergen}
                  label={allergen}
                  color="warning"
                />
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  )
}

export default DishDetailPage 