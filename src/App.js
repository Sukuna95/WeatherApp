import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './styles/App.css';

const API_KEY = '3b7ad78f347d75f75cf2ff649fd2f5a7';
const API_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  // Fetch weather data from API
  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const currentResponse = await fetch(
        `${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
          throw new Error('City not found. Please try again.');
        } else if (currentResponse.status === 401) {
          throw new Error('API key issue. Please try again later.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch forecast
      const forecastResponse = await fetch(
        `${API_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data.');
      }
      
      const forecastData = await forecastResponse.json();
      
      setWeatherData(currentData);
      setForecastData(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (searchValue) {
      setCity(searchValue);
      fetchWeatherData(searchValue);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  return (
    <div className="container">
      <header className="app-header">
        <h1>Weather Forecast</h1>
        <p>Get real-time weather updates</p>
      </header>
      
      <form onSubmit={handleSearch} className="search-container">
        <input 
          type="text" 
          name="search"
          className="search-input" 
          placeholder="Enter city name..." 
          defaultValue={city}
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i> Search
        </button>
      </form>
      
      <div className="weather-container">
        {loading && <div className="loading">Loading weather data...</div>}
        
        {error && (
          <div className="error">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
          </div>
        )}
        
        {weatherData && !loading && !error && (
          <>
            <CurrentWeather data={weatherData} />
            <Forecast data={forecastData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;