import WeatherCard from "@/entities/weather/ui/WeatherCard";
import { useLocation } from "@/features/search-location/model/useLocation";
import { useWeather } from "@/entities/weather/model/useWeather";

interface CurrentWeatherContainerProps {
  coords: { lat: number; lon: number } | null;
  address: string;
}

const CurrentWeatherContainer = ({ coords, address }: CurrentWeatherContainerProps) => {
  const { weather, isLoading: isWeatherLoading, error: weatherError } = useWeather(coords);

  if (!coords) {
    return <div className="text-sm text-gray-500">위치 정보를 확인하고 있습니다...</div>;
  }

  // 위치 정보는 있지만 날씨 정보를 받아오는 중일 때
  if (isWeatherLoading) return <div className="text-sm text-gray-500">날씨 정보 로딩 중...</div>;

  // 날씨 정보 로드 에러 처리
  if (weatherError) return <div className="text-sm text-red-500">{weatherError}</div>;

  // 모든 데이터가 정상적으로 왔고, 날씨 정보가 없을 때
  if (!weather) return <div className="text-sm text-red-500">해당 장소의 정보가 제공되지 않습니다.</div>;

  return <WeatherCard weather={weather} address={address} />;
}

export default CurrentWeatherContainer;