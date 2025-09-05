import React from 'react';

const weatherIcons = {
  '01d': 'fas fa-sun',
  '01n': 'fas fa-moon',
  '02d': 'fas fa-cloud-sun',
  '02n': 'fas fa-cloud-moon',
  '03d': 'fas fa-cloud',
  '03n': 'fas fa-cloud',
  '04d': 'fas fa-cloud',
  '04n': 'fas fa-cloud',
  '09d': 'fas fa-cloud-showers-heavy',
  '09n': 'fas fa-cloud-showers-heavy',
  '10d': 'fas fa-cloud-sun-rain',
  '10n': 'fas fa-cloud-moon-rain',
  '11d': 'fas fa-bolt',
  '11n': 'fas fa-bolt',
  '13d': 'fas fa-snowflake',
  '13n': 'fas fa-snowflake',
  '50d': 'fas fa-smog',
  '50n': 'fas fa-smog'
};

function ForecastItem({ data }) {
    const { dt, main, weather } = data;
    const forecastWeather = weather[0];
    const iconClass = weatherIcons[forecastWeather.icon] || 'fas fa-cloud';
    
    // Format date
    const date = new Date(dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    
    return (
        <div className="forecast-item">
        <p className="forecast-date">{date}</p>
        <div className="forecast-icon">
            <i className={iconClass}></i>
        </div>
        <p className="forecast-temp">{Math.round(main.temp)}°C</p>
        <p>{forecastWeather.description}</p>
        </div>
    );
}

export default ForecastItem;