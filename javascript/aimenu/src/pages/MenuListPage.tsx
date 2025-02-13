import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { dataService } from '../services/dataService'

interface MenuItem {
  name: string
  price: string
  description: string
  ingredients: string[]
  allergens: string[]
  imageUrls?: string[]
}

interface MenuCategory {
  name: string
  items: MenuItem[]
}

interface MenuData {
  categories: MenuCategory[]
  timestamp: number
}

const MenuListPage = () => {
  const navigate = useNavigate()
  const [menuData, setMenuData] = useState<MenuData | null>(null)

  useEffect(() => {
    const data = dataService.getMenuData()
    if (!data) {
      navigate('/')
      return
    }
    setMenuData(data)
  }, [navigate])

  const handleItemClick = (item: MenuItem) => {
    navigate(`/dish/${encodeURIComponent(item.name)}`, { state: { item } })
  }

  if (!menuData) return null

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantMenuIcon color="primary" />
          </Box>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/')}
          >
            New Search
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {menuData.categories.map((category) => (
          <Box key={category.name} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {category.name}
            </Typography>
            <Grid container spacing={2}>
              {category.items.map((item, index) => (
                <Grid item xs={12} sm={6} key={`${category.name}-${item.name}-${index}`}>
                  <Card 
                    onClick={() => handleItemClick(item)}
                    sx={{ 
                      cursor: 'pointer',
                      aspectRatio: '1/1',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.imageUrls?.[0] || '/placeholder.png'}
                      alt=""
                      sx={{
                        height: '75%',
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Price: {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  )
}

export default MenuListPage 