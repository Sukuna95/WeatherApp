import React from "react";

const weatherIcons = {
    "01d": "fas fa-sun",
    "01n": "fas fa-moon",
    // ... other icons
};

function CurrentWeather({ data }) {
    const { name, main, weather, wind, sys } = data;
    const currentWeather = weather[0];
    const iconClass = weatherIcons[currentWeather.icon] || "fas fa-cloud";

    // Format date
    const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="current-weather">
        <h2 className="location">
            {name}, {sys.country}
        </h2>
        <p className="date">{date}</p>

        <div className="weather-icon">
            <i className={iconClass}></i>
        </div>

        <h1 className="temperature">{Math.round(main.temp)}°C</h1>
        <p className="weather-description">{currentWeather.description}</p>

        <div className="weather-details">
            <div className="detail">
            <i className="fas fa-temperature-high"></i>
            <p>Feels like</p>
            <p>{Math.round(main.feels_like)}°C</p>
            </div>

            <div className="detail">
            <i className="fas fa-tint"></i>
            <p>Humidity</p>
            <p>{main.humidity}%</p>
            </div>

            <div className="detail">
            <i className="fas fa-wind"></i>
            <p>Wind Speed</p>
            <p>{wind.speed} m/s</p>
            </div>
        </div>
        </div>
    );
}

export default CurrentWeather;
