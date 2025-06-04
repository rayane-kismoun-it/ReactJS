const CurrentWeather = ({ weather }) => {
  return (
    <div className="weather-section">
      <h3>Météo à {weather.name}</h3>
      <div className="weather-info">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <div>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;