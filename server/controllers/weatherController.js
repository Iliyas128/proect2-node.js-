const axios = require('axios');

const getWeatherData = async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: 'City is required' });

    try {
        // OpenWeather API
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric',
            },
        });

        const { coord, weather, main, wind, sys, rain } = weatherResponse.data;

        // Air Quality API
        const airQualityResponse = await axios.get(`https://api.airvisual.com/v2/nearest_city`, {
            params: {
                lat: coord.lat,
                lon: coord.lon,
                key: process.env.AIR_QUALITY_API_KEY,
            },
        });

        const { pollution } = airQualityResponse.data.data.current;

        // Currency API
        const country = sys.country;
        const currencyResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/${country}`);

        const exchangeRates = currencyResponse.data.conversion_rates;

        // Consolidate data
        const responseData = {
            weather: {
                temperature: main.temp,
                feels_like: main.feels_like,
                description: weather[0].description,
                icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
                humidity: main.humidity,
                pressure: main.pressure,
                wind_speed: wind.speed,
                country,
                rain_volume: rain ? rain['3h'] : 0,
                coordinates: coord,
            },
            airQuality: pollution,
            currency: exchangeRates,
        };

        res.json(responseData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

module.exports = { getWeatherData };
