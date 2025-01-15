document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
        const data = await response.json();

        const weather = data.weather;
        const airQuality = data.airQuality;
        const currency = data.currency;

        document.getElementById('weatherResult').innerHTML = `
            <h2>Weather in ${city}</h2>
            <p><img src="${weather.icon}" alt="Weather Icon"> ${weather.description}</p>
            <p>Temperature: ${weather.temperature}°C (Feels like: ${weather.feels_like}°C)</p>
            <p>Humidity: ${weather.humidity}%</p>
            <p>Pressure: ${weather.pressure} hPa</p>
            <p>Wind Speed: ${weather.wind_speed} m/s</p>
            <p>Rain Volume (last 3 hours): ${weather.rain_volume} mm</p>
            <h2>Air Quality</h2>
            <p>Pollution Level: ${airQuality.aqius}</p>
            <h2>Currency Exchange Rates</h2>
            <pre>${JSON.stringify(currency, null, 2)}</pre>
        `;
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
    }
});
