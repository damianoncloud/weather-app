import { getWeatherIcon } from "./WeatherCard";

interface FavouriteCityCardProps {
  cityName: string;
  temperature: number;
  weatherCode: number;
}

const FavouriteCityCard = (props: FavouriteCityCardProps) => {
  const weatherIcon = getWeatherIcon(props.weatherCode);

  return (
    <div className="flex justify-between items-center mb-4 border border-gray-100 p-4 rounded">
      <p>{props.cityName}</p>
      <img src={`icons/${weatherIcon}`} alt={weatherIcon} width={45} />
      <p>{props.temperature} C°</p>
    </div>
  );
};

export default FavouriteCityCard;
