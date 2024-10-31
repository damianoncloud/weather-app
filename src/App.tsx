import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
// import WeatherCard from "./components/WeatherCard";
import { ChangeEvent, useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import FavouriteCityCard from "./components/FavouriteCityCard";

export interface WeatherData {
  temperature: number;
  windspeed: number;
  humidity: number;
  weatherCode: number;
  cityName: string;
}

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [favouriteCities, setFavouriteCities] = useState<WeatherData[]>([]);

  useEffect(() => {
    const storedCities = localStorage.getItem("favouriteCitiesLocalStorage");
    if (storedCities) {
      const cityNames = JSON.parse(storedCities);

      // Fetching weather for each favourite city
      const fetchWeatherDataForCities = async () => {
        const favouriteCitiesWeatherData = await Promise.all(
          cityNames.map(async (cityName: string) => {
            const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`;
            const response = await fetch(geocodingUrl);
            const data = await response.json();
            const { lat, lon } = data[0];

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            const humidityValues = weatherData.hourly.relative_humidity_2m;
            const dailyAverageHumidity =
              humidityValues.reduce(
                (acc: number, val: number) => acc + val,
                0
              ) / humidityValues.length;

            return {
              temperature: weatherData.current_weather.temperature,
              windspeed: weatherData.current_weather.windspeed,
              humidity: Math.round(dailyAverageHumidity),
              weatherCode: weatherData.current_weather.weathercode,
              cityName: cityName,
            };
          })
        );
        // Updating favouritCities array
        setFavouriteCities(favouriteCitiesWeatherData);
      };

      fetchWeatherDataForCities();
    }
  }, []);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const getCityWeather = async () => {
    const city = userInput;
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      const { lat, lon } = data[0];

      // Fetching WeatherData from Open Meteo API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&&hourly=relative_humidity_2m`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      const humidityValues = weatherData.hourly.relative_humidity_2m;
      const dailyAverageHumidity =
        humidityValues.reduce((acc: number, val: number) => acc + val, 0) /
        humidityValues.length;

      // Saving data in weatherData
      setWeatherData({
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        humidity: Math.round(dailyAverageHumidity),
        weatherCode: weatherData.current_weather.weathercode,
        cityName: city,
      });

      setCurrentCity(userInput);

      // Input field reset
      setUserInput("");
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <>
      <h1 className="text-white mb-8">Weather App</h1>
      <div className="flex items-center gap-2 mb-8">
        <Input
          placeholder="Search for cities"
          onChange={inputHandler}
          value={userInput}
        />
        <Button onClick={getCityWeather} />
      </div>
      {weatherData && (
        <WeatherCard
          temperature={weatherData.temperature}
          windspeed={weatherData.windspeed}
          humidity={weatherData.humidity}
          cityName={currentCity}
          weatherCode={weatherData.weatherCode}
          favouriteCities={favouriteCities}
          setFavouriteCities={setFavouriteCities}
        />
      )}
      {favouriteCities.length > 0 && (
        <>
          <p className="text-gray-100 my-8">Favourite Cities are: </p>
          {favouriteCities.map((favouriteCity, index) => (
            <FavouriteCityCard
              cityName={favouriteCity.cityName}
              temperature={favouriteCity.temperature}
              weatherCode={favouriteCity.weatherCode}
              key={index}
            />
          ))}
        </>
      )}
    </>
  );
}

export default App;
