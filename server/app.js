require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
