const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Your OpenWeatherMap API key
const API_KEY = 'a983878d6fef354f029edc91f88d0567';

// Endpoint to get weather data
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: 'City name is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            },
        });

        const weatherData = response.data;
        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            windSpeed: weatherData.wind.speed,
            countryCode: weatherData.sys.country,
            rainVolume: weatherData.rain ? weatherData.rain['3h'] : 0,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
