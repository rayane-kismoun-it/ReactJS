import { useState, useEffect } from 'react'
import GeoLocation from './components/GeoLocation'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  const [position, setPosition] = useState(null)
  const [cityInput, setCityInput] = useState("")
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [loadingWeather, setLoadingWeather] = useState(false)

  const API_KEY = import.meta.env.VITE_WEATHER_API_TOKEN;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas prise en charge par votre navigateur")
      return
    }

    setError(null)
    setLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setLoadingLocation(false)
      },
      (err) => {
        setError(`Erreur de géolocalisation: ${err.message}`)
        setLoadingLocation(false)
      }
    )
  }

  const searchCity = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setError(null);
    setLoadingWeather(true);

    Promise.all([
      fetchWeatherByCity(cityInput),
      fetchForecastByCity(cityInput)
    ]).finally(() => {
      setLoadingWeather(false);
    });
  }

  useEffect(() => {
    if (position) {
      Promise.all([
        fetchWeather(position.latitude, position.longitude),
        fetchForecast(position.latitude, position.longitude)
      ]).finally(() => {
        setLoadingWeather(false);
      });
    }
  }, [position]);

  const fetchWeather = async (lat, lon) => {
    setLoadingWeather(true);
    try {
      const response = await fetch(
        `${API_URL}?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Problème lors de la récupération des données météo");
      }

      const data = await response.json();
      setWeather(data);
      return data;
    } catch (err) {
      setError(`Erreur météo: ${err.message}`);
      throw err;
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `${FORECAST_API_URL}?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Problème lors de la récupération des prévisions météo");
      }

      const data = await response.json();
      setForecast(data);
      return data;
    } catch (err) {
      setError(`Erreur prévisions: ${err.message}`);
      throw err;
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Ville non trouvée. Vérifiez l'orthographe.");
        }
        throw new Error("Problème lors de la récupération des données météo");
      }

      const data = await response.json();
      setWeather(data);
      return data;
    } catch (err) {
      setWeather(null);
      setError(`Erreur météo: ${err.message}`);
      throw err;
    }
  };

  const fetchForecastByCity = async (city) => {
    try {
      const response = await fetch(
        `${FORECAST_API_URL}?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Ville non trouvée. Vérifiez l'orthographe.");
        }
        throw new Error("Problème lors de la récupération des prévisions météo");
      }

      const data = await response.json();
      setForecast(data);
      return data;
    } catch (err) {
      setForecast(null);
      setError(`Erreur prévisions: ${err.message}`);
      throw err;
    }
  };

  return (
    <div className="weather-app">
      <div className="search-section">
        <form onSubmit={searchCity} className="city-search-form">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Nom de la ville"
            disabled={loadingWeather || loadingLocation}
            className="city-input"
          />
          <button
            type="submit"
            disabled={loadingWeather || loadingLocation || !cityInput.trim()}
            className="search-btn"
          >
            Rechercher
          </button>
        </form>

        <GeoLocation
          getLocation={getLocation}
          position={position}
          isLoading={loadingLocation}
        />
      </div>

      {(loadingLocation || loadingWeather) && (
        <div className="loader-container">
          <div className="loader-spinner"></div>
          <p className="loading">
            {loadingLocation ? "Recherche de votre position..." : "Chargement des données météo..."}
          </p>
        </div>
      )}

      {!loadingLocation && !loadingWeather && (
        <>
          {weather && <CurrentWeather weather={weather} />}
          {forecast && <ForecastWeather forecast={forecast} />}
        </>
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default App
