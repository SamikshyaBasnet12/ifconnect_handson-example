import React from 'react';

const getWeatherIcon = (code) => {
  if (code === 0) return '☀️'; 
  if (code === 1 || code === 2 || code === 3) return '⛅'; 
  if (code === 45 || code === 48) return '🌫️'; 
  if (code >= 51 && code <= 67) return '🌧️'; 
  if (code >= 71 && code <= 77) return '❄️'; 
  if (code >= 80 && code <= 82) return '🌦️'; 
  if (code >= 85 && code <= 86) return '🌨️'; 
  if (code >= 95 && code <= 99) return '⛈️'; 
  return '❓';
};

const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear sky';
  if (code === 1 || code === 2 || code === 3) return 'Cloudy';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 67) return 'Rainy';
  if (code >= 71 && code <= 77) return 'Snowy';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 85 && code <= 86) return 'Snow Showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown condition';
};

function WeatherCard({ weatherData, cityName }) {
  if (!weatherData) return null;

  const { temperature, windspeed, weathercode } = weatherData.current_weather;

  return (
    <div className="weather-card">
      <h2 className="city-name">{cityName}</h2>
      <div className="weather-icon">{getWeatherIcon(weathercode)}</div>
      <p className="temperature">{temperature}°C</p>
      <p className="condition">{getWeatherCondition(weathercode)}</p>
      <div className="weather-details">
        <span>💨 Wind: {windspeed} km/h</span>
      </div>
    </div>
  );
}

export default WeatherCard;
