const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/favorites', favoritesRoutes); 

// Routes
app.use('/users', userRoutes);     // Base path for user-related routes
app.use('/artists', artistRoutes); // Base path for artist-related routes

app.use('/artists', artistRoutes); // Artist routes
app.use('/albums', albumRoutes);  // Album routes

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found',
    data: null,
    error: null,
  });
});

module.exports = app;
