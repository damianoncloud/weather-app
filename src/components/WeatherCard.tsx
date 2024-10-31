import { useEffect, useState } from "react";
import { WeatherData } from "../App";

const weatherIconsMap = new Map<number, string>([
  [0, "clear_sky.png"],
  [1, "partly_cloudy.png"],
  [2, "partly_cloudy.png"],
  [3, "overcast.png"],
  [45, "fog.png"],
  [48, "fog.png"],
  [51, "drizzle_light.png"],
  [53, "drizzle_moderate.png"],
  [55, "drizzle_dense.png"],
  [56, "freezing_drizzle_light.png"],
  [57, "freezing_drizzle_dense.png"],
  [61, "rain_slight.png"],
  [63, "rain_moderate.png"],
  [65, "rain_heavy.png"],
  [66, "freezing_rain_light.png"],
  [67, "freezing_rain_heavy.png"],
  [71, "snow_light.png"],
  [73, "snow_moderate.png"],
  [75, "snow_heavy.png"],
  [77, "snow_grains.png"],
  [80, "rain_showers_slight.png"],
  [81, "rain_showers_moderate.png"],
  [82, "rain_showers_violent.png"],
  [85, "snow_showers_slight.png"],
  [86, "snow_showers_heavy.png"],
  [95, "thunderstorm_slight.png"],
  [96, "thunderstorm_hail_slight.png"],
  [99, "thunderstorm_hail_heavy.png"],
]);

export { weatherIconsMap };

const getWeatherIcon = (weatherCode: number): string => {
  return weatherIconsMap.get(weatherCode) || "default-icon.png";
};

export { getWeatherIcon };

interface WeatherCardProps {
  temperature: number;
  windspeed: number;
  humidity: number;
  cityName: string;
  weatherCode: number;
  favouriteCities: WeatherData[];
  setFavouriteCities: (weatherData: WeatherData[]) => void;
}

const WeatherCard = (props: WeatherCardProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  // UseEffect to check if the city belongs to favourites
  useEffect(() => {
    const cityIsFavourite = props.favouriteCities.some(
      (city) => city.cityName === props.cityName
    );
    setIsFavourite(cityIsFavourite);
  }, [props.cityName, props.favouriteCities]);

  const weatherIcon = getWeatherIcon(props.weatherCode);

  const handleFavouriteClick = () => {
    if (!isFavourite) {
      // Adding the city to favourites
      props.setFavouriteCities([
        ...props.favouriteCities,
        {
          temperature: props.temperature,
          windspeed: props.windspeed,
          humidity: props.humidity,
          weatherCode: props.weatherCode,
          cityName: props.cityName,
        },
      ]);
      // Saving favourite cities into LocalStorage
      // Creating an array with favourite city names
      const favouriteCitiesLocalStorage = [
        ...props.favouriteCities.map((city) => city.cityName),
        props.cityName,
      ];
      // Saving the array to LocalStorage after converting it to string
      localStorage.setItem(
        "favouriteCitiesLocalStorage",
        JSON.stringify(favouriteCitiesLocalStorage)
      );
    } else {
      // Removing the city from favourites
      props.setFavouriteCities(
        props.favouriteCities.filter(
          (favouriteCity) => favouriteCity.cityName !== props.cityName
        )
      );
      // Updating LocalStorage
      const updatedFavouriteCities = props.favouriteCities.filter(
        (city) => city.cityName !== props.cityName
      );
      localStorage.setItem(
        "favouriteCitiesLocalStorage",
        JSON.stringify(updatedFavouriteCities)
      );
    }
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="text-white border border-gray-400 p-6 rounded">
      <div className="flex justify-between mb-6">
        <p className="text-xl">{props.cityName}</p>
        <img
          onClick={handleFavouriteClick}
          src={isFavourite ? "./star-filled.png" : "./star.png"}
          alt="favourite icon"
          width={24}
        />
      </div>
      <div className="">
        <div className="flex gap-4 mb-6">
          <img src={`icons/${weatherIcon}`} alt="Weather icon" width={70} />
          <div className="flex items-center gap-2">
            <p>Temperature</p>
            <p>{props.temperature}°</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <img src="./Wind-2.png" alt="Wind icon" width={70} />
        <div className="">
          <p>Wind</p>
          <p>{props.windspeed} km/h</p>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <img src="./Humidity.png" alt="Wind icon" width={70} />
        <div className="">
          <p>Humidity</p>
          <p>{props.humidity} %</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
