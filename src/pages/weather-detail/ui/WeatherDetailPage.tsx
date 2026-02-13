import WeatherForecastWidget from '@/widgets/weather-forecast/ui/WeatherForecastWidget';
import { useSearchParams } from 'react-router-dom';
import MainButton from '@/shared/ui/button/MainButton';

const WeatherDetailPage = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const address = searchParams.get('address') || '';

  const coords = lat && lon ? { lat: Number(lat), lon: Number(lon) } : null;

  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex justify-end'>
        <MainButton />
      </div>
      <WeatherForecastWidget coords={coords} address={address} />
    </section>
  );
};

export default WeatherDetailPage;
