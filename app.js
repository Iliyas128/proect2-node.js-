const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

const timeZoneApiUrl = 'http://api.timezonedb.com/v2.1/get-time-zone';

// Your OpenWeatherMap API key
const API_KEY = 'a983878d6fef354f029edc91f88d0567';
const NEWS_API_KEY = '7eaf4e9b6f4b4489be4770e646870ae3';
const timeZoneApiKey = 'YYXCAL79DX96'; 


app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: 'City name is required' });
    }

    try {
        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            },
        });

        const weatherData = weatherResponse.data;
        const { country } = weatherData.sys; // Extract country code

        // Fetch time zone data
        const responseTime = await axios.get(timeZoneApiUrl, {
            params: {
                key: timeZoneApiKey,
                format: 'json',
                by: 'position',
                lat: weatherData.coord.lat,
                lng: weatherData.coord.lon,
            },
        });
        const localTime = responseTime.data.formatted;
        const timeZone = responseTime.data.zoneName;

        // Fetch news data
        const newsResponse = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: country.toLowerCase(), // Convert country code to lowercase for NewsAPI
                apiKey: NEWS_API_KEY,
            },
        });
        const newsData = newsResponse.data;

        // Send combined data as response
        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            windSpeed: weatherData.wind.speed,
            countryCode: country,
            rainVolume: weatherData.rain ? weatherData.rain['3h'] || 0 : 0, // Safely check rain volume
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
            localTime: localTime,
            timeZone: timeZone,
            news: newsData.articles.slice(0, 5), // Limit to top 5 articles
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
