
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Image Gallery Showcase
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            A demo of locally stored and cached images
          </Typography>
          <Button 
            component={Link} 
            to="/landing-page" 
            variant="contained" 
            size="large"
            color="primary"
          >
            View Gallery
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Index;
