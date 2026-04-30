import { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import StatusMessage from './components/StatusMessage';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    setCityName("");

    try {
      
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
      
      if (!geoResponse.ok) {
        throw new Error("Failed to fetch location data.");
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Could not find city: "${city}". Please check the spelling.`);
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      const displayName = `${name}, ${country}`;

      
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      
      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const weatherDataResult = await weatherResponse.json();
      
      setWeatherData(weatherDataResult);
      setCityName(displayName);
      
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Weather App</h1>
        <p>Find current weather conditions for any city</p>
      </header>
      
      <main className="app-main">
        <SearchForm onSearch={handleSearch} />
        
        <StatusMessage loading={loading} error={error} />
        
        {!loading && !error && weatherData && (
          <WeatherCard weatherData={weatherData} cityName={cityName} />
        )}
      </main>
    </div>
  );
}

export default App;
