import { useWeather } from '@/entities/weather/model/useWeather';
import { cn } from '@/shared/lib/utils/utils';
import LocationErrorMessage from '@/shared/ui/message/LocationErrorMessage';
import LocationPermissionMessage from '@/shared/ui/message/LocationPermissionMessage';
import WeatherForecastLayout from './WeatherForecastLayout';
import WeatherForecastSkeleton from './WeatherForecastSkeleton';

interface Props {
  coords: { lat: number; lon: number } | null;
  address: string | null;
  className?: string;
}

const WeatherForecastWidget = ({ coords, address, className }: Props) => {
  const {
    data: weather,
    isPending: isWeatherPending,
    isError: isWeatherError,
  } = useWeather(coords, address);

  const renderContent = () => {
    // 위치 권한이 없는 경우 (coords와 address 모두 없음)
    if (!coords && !address) return <LocationPermissionMessage />;

    // 좌표 변환 실패 (주소는 있지만 좌표가 없는 경우)
    if (!coords) return <LocationErrorMessage />;

    if (isWeatherPending) return <WeatherForecastSkeleton />;

    // 날씨 데이터 조회 실패
    if (isWeatherError || !weather) return <LocationErrorMessage />;

    return <WeatherForecastLayout weather={weather} address={address} />;
  };

  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      {renderContent()}
    </div>
  );
};

export default WeatherForecastWidget;
