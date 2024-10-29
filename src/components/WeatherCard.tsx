const WeatherCard = () => {
  return (
    <div className="text-white border border-gray-400 p-6 rounded">
      <div className="flex justify-between mb-6">
        <p className="text-xl">Milan</p>
        <img src="./star.png" alt="favourite icon" width={24} />
      </div>
      <div className="">
        <div className="flex gap-4 mb-6">
          <img src="./SunCloud.png" alt="Weather icon" width={70} />
          <div className="flex items-center gap-2">
            <p>Temperature</p>
            <p>20°</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <img src="./Wind-2.png" alt="Wind icon" width={70} />
        <div className="">
          <p>Wind</p>
          <p>9 km/h</p>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <img src="./Humidity.png" alt="Wind icon" width={70} />
        <div className="">
          <p>Humidity</p>
          <p>46 %</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
