import WeatherCard from "@/entities/weather/ui/WeatherCard";
import { useWeather } from "@/entities/weather/model/useWeather";

interface CurrentWeatherContainerProps {
  coords: { lat: number; lon: number } | null;
  address: string;
}

const CurrentWeatherContainer = ({ coords, address }: CurrentWeatherContainerProps) => {
  const { weather, isLoading: isWeatherLoading, error: weatherError } = useWeather(coords);

  const renderContent = () => {
    if (!coords) return <div className="text-sm text-gray-500">위치 정보를 확인하고 있습니다...</div>;
    if (isWeatherLoading) return <div className="text-sm text-gray-500">날씨 정보 로딩 중...</div>;
    if (weatherError) return <div className="text-sm text-red-500">{weatherError}</div>;
    if (!weather) return <div className="text-sm text-red-500">해당 장소의 정보가 제공되지 않습니다.</div>;

    return <WeatherCard weather={weather} address={address} />;
  };

  return <div className="flex min-h-[400px] justify-center items-center">
    {renderContent()}
  </div>
}

export default CurrentWeatherContainer;