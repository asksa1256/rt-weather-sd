import MainButton from '@/shared/ui/button/MainButton';
import WeatherForecastWidget from '@/widgets/weather/ui/WeatherForecastWidget';
import { useSearchParams } from 'react-router-dom';

const WeatherDetailPage = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const address = searchParams.get('address') || '';

  const coords = lat && lon ? { lat: Number(lat), lon: Number(lon) } : null;

  return (
    <section className='flex w-full flex-col items-start gap-4'>
      <MainButton />
      <WeatherForecastWidget coords={coords} address={address} />
    </section>
  );
};

export default WeatherDetailPage;
