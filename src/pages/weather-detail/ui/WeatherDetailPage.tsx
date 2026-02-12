import WeatherForecastWidget from '@/widgets/weather-forecast/ui/WeatherForecastWidget';
import { useSearchParams } from 'react-router-dom';

const WeatherDetailPage = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const address = searchParams.get('address') || '';

  const coords = lat && lon ? { lat: Number(lat), lon: Number(lon) } : null;

  return (
    <div className='flex w-full flex-col gap-8'>
      <WeatherForecastWidget coords={coords} address={address} />
    </div>
  );
};

export default WeatherDetailPage;
