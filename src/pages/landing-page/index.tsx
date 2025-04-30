
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useImageCache } from '../../hooks/useImageCache';
import { galleryData } from '../../data/galleryData';

const LandingPage = () => {
  const { getCachedImage } = useImageCache();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Mark images as loaded when component mounts
  useEffect(() => {
    setImagesLoaded(true);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          variant="text"
          sx={{ mr: 2, color: 'text.primary' }}
        >
          Back to Home
        </Button>
      </Box>

      <Typography variant="h2" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', mb: 1 }}>
        Image Gallery
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }} align="left">
        All images are locally stored and properly cached to reduce bandwidth usage.
      </Typography>

      <Grid container spacing={3}>
        {galleryData.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3,
              }
            }}>
              <CardMedia
                component="img"
                height="250"
                image={getCachedImage(`/images/${item.image}`)}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" align="left">
                  {item.title}
                </Typography>
                <Typography align="left" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingPage;
