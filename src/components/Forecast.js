import React from 'react';
import ForecastItem from './ForecastItem';

function Forecast({ data }) {
    // Group forecast by day and get one reading per day
    const dailyForecast = data.list.filter((reading, index) => index % 8 === 0);
    
    return (
        <>
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast">
            {dailyForecast.map((day, index) => (
            <ForecastItem key={index} data={day} />
            ))}
        </div>
        </>
    );
}

export default Forecast;