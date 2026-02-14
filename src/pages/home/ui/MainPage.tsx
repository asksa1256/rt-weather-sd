import { useGeolocation } from '@/features/search-location/model/useGeolocation';
import WeatherForecastWidget from '@/widgets/weather/ui/WeatherForecastWidget';

const MainPage = () => {
  // 현재 위치 가져오기
  const { coords, address, error } = useGeolocation();

  return (
    <div className='flex w-full flex-col gap-8'>
      {error && <div className='text-center text-sm text-red-500'>{error}</div>}
      <WeatherForecastWidget coords={coords} address={address} />
    </div>
  );
};

export default MainPage;
