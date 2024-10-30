import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
// import WeatherCard from "./components/WeatherCard";
import { ChangeEvent, useState } from "react";
import WeatherCard from "./components/WeatherCard";

interface WeatherData {
  temperature: number;
  windspeed: number;
  humidity: number;
}

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState<string>("");

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    console.log("User input is: ", event.target.value);
  };

  const getCityWeather = async () => {
    const city = userInput;
    console.log("City: ", city);
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      const { lat, lon } = data[0];
      console.log(`Latitudine: ${lat}, Longitudine: ${lon}`);

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
      });

      setCurrentCity(userInput);

      console.log(weatherData);

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
      {userInput}
      {console.log(weatherData)}
      {weatherData && (
        <div className="weather-info">
          <p>Temperatura: {weatherData.temperature}°C</p>
          <p>Velocità del vento: {weatherData.windspeed} km/h</p>
          <p>Umidità: {weatherData.humidity}%</p>
        </div>
      )}

      {weatherData && (
        <WeatherCard
          temperature={weatherData.temperature}
          windspeed={weatherData.windspeed}
          humidity={weatherData.humidity}
          cityName={currentCity}
        />
      )}
    </>
  );
}

export default App;
