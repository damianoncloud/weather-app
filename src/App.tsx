import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
// import WeatherCard from "./components/WeatherCard";
import { ChangeEvent, useState } from "react";

function App() {
  const [userInput, setUserInput] = useState<string>("");

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    console.log("User input is: ", event.target.value);
  };

  const getCityWeather = () => {
    const city = userInput;
    console.log("City: ", city);
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;

    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0];
        console.log(`Latitudine: ${lat}, Longitudine: ${lon}`);
        setUserInput("");
        // getWeather(lat, lon);
      })
      .catch((error) => console.error("Errore nel geocoding:", error));
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
      {/* <WeatherCard /> */}
    </>
  );
}

export default App;
