import { useGeolocation } from '@/features/search-location/model/useGeolocation';
import WeatherForecastWidget from '@/widgets/weather/ui/WeatherForecastWidget';
import { MapPin } from 'lucide-react';

const MainPage = () => {
  // 현재 위치 가져오기
  const { coords, address, error: gelolocationError } = useGeolocation();

  if (gelolocationError) return;
  <div className='text-center text-sm text-red-500'>{gelolocationError}</div>;

  return (
    <section className='w-full'>
      <h3 className='mb-3 flex items-center gap-1 text-sm font-medium text-gray-500'>
        <MapPin className='size-4' />
        현재 위치
      </h3>
      <WeatherForecastWidget coords={coords} address={address} />
    </section>
  );
};

export default MainPage;
