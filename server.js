const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/artists', require('./routes/artistRoutes'));
app.use('/api/v1/albums', require('./routes/albumRoutes'));
app.use('/api/v1/tracks', require('./routes/trackRoutes'));
app.use('/api/v1/favorites', require('./routes/favoriteRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
