import WeatherCard from "@/entities/weather/ui/WeatherCard";
import { useWeather } from "@/entities/weather/model/useWeather";

const CurrentWeatherContainer = () => {
  const { weather, address, isLoading, error } = useWeather();

  if (error) return <div className="text-sm text-red-500">{error}</div>;
  if (isLoading) return <div className="text-sm text-gray-500">날씨 정보 로딩 중...</div>;
  if (!weather) return <div className="text-sm text-red-500">해당 장소의 정보가 제공되지 않습니다.</div>;

  return <WeatherCard weather={weather} address={address} />;
}

export default CurrentWeatherContainer;