document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    console.log(data);  // Log the data for debugging

    if (data.city) {
        document.getElementById('weatherResult').style.display = 'block';
        document.getElementById('cityName').textContent = `City: ${data.city}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.temperature}°C`;
        document.getElementById('description').textContent = `Description: ${data.description}`;
        document.getElementById('feelsLike').textContent = `Feels Like: ${data.feelsLike}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
        document.getElementById('pressure').textContent = `Pressure: ${data.pressure} hPa`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${data.windSpeed} m/s`;
        document.getElementById('countryCode').textContent = `Country: ${data.countryCode}`;
        document.getElementById('rainVolume').textContent = `Rain Volume (last 3h): ${data.rainVolume} mm`;

        document.getElementById('localTime').textContent = `Local Time: ${data.localTime}`;
        document.getElementById('timeZone').textContent = `Time Zone: ${data.timeZone}`;

        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';
        data.news.forEach(article => {
            const listItem = document.createElement('li');
            listItem.textContent = article.title;
            newsList.appendChild(listItem);
        });

        // Initialize the map with the city's coordinates
        const map = L.map('map').setView([data.lat, data.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([data.lat, data.lon]).addTo(map)
            .bindPopup(`<b>${data.city}</b><br>${data.temperature}°C`)
            .openPopup();
    } else {
        alert('City not found!');
    }
});