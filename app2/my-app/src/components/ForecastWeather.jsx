const ForecastWeather = ({ forecast }) => {
  const formatDateTime = (dtTxt) => {
    const date = new Date(dtTxt);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="forecast-section">
      <h3>Prévisions sur 5 jours</h3>
      <div className="forecast-list">
        {forecast.list.map((item, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-date">{formatDateTime(item.dt_txt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
            <p className="forecast-desc">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWeather;