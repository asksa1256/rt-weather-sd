import { useWeather } from '@/entities/weather/model/useWeather';
import { cn } from '@/shared/lib/utils/utils';
import LocationPermissionMessage from '@/shared/ui/message/LocationPermissionMessage';
import WeatherForecastLayout from './WeatherForecastLayout';

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
    error,
  } = useWeather(coords, address);

  const renderContent = () => {
    if (!coords) return <LocationPermissionMessage />;

    if (isWeatherPending)
      return (
        <div className='text-sm text-gray-500'>날씨 정보 불러오는 중...</div>
      );

    if (isWeatherError)
      return (
        <div className='text-sm text-red-500'>
          {error.message || '날씨 정보를 불러오는 중 오류가 발생했습니다.'}
        </div>
      );

    if (!weather)
      return (
        <div className='text-sm text-red-500'>
          해당 장소의 정보가 제공되지 않습니다.
        </div>
      );

    return <WeatherForecastLayout weather={weather} address={address} />;
  };

  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      {renderContent()}
    </div>
  );
};

export default WeatherForecastWidget;
