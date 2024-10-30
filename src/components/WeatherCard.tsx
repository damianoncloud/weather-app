interface WeatherCardProps {
  temperature: number;
  windspeed: number;
  humidity: number;
  cityName: string;
  weatherCode: number;
}

const WeatherCard = (props: WeatherCardProps) => {
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

  const getWeatherIcon = (weatherCode: number): string => {
    return weatherIconsMap.get(weatherCode) || "default-icon.png";
  };

  const weatherIcon = getWeatherIcon(props.weatherCode);

  return (
    <div className="text-white border border-gray-400 p-6 rounded">
      <div className="flex justify-between mb-6">
        <p className="text-xl">{props.cityName}</p>
        <img src="./star.png" alt="favourite icon" width={24} />
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
