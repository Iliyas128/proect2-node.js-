# Weather Application with News and Timezone Features

This is a Node.js-based weather application that uses the OpenWeatherMap API, WorldTimeAPI, and NewsAPI to display real-time weather data, local time, and the latest news for any city. The app also includes a map to show the city's location visually.

## Features

- **Weather Data**: Displays temperature, weather description, "feels like" temperature, humidity, pressure, wind speed, rain volume, and country code.
- **Time Zone**: Shows the current local time and timezone for the selected city.
- **News Updates**: Fetches and displays the top 5 news headlines based on the city's country.
- **Interactive Map**: Displays the city's location on an interactive map with a marker.

## Technologies Used

- **Backend**: Node.js with Express
- **APIs**:
  - [OpenWeatherMap API](https://openweathermap.org/) for weather data
  - [WorldTimeAPI](http://worldtimeapi.org/) for timezone and local time data
  - [NewsAPI](https://newsapi.org/) for fetching top news headlines
- **Frontend**: HTML, CSS, JavaScript
- **Map Library**: Leaflet.js for interactive maps
- **HTTP Client**: Axios for API requests

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
