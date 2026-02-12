import { useWeather } from '@/entities/weather/model/useWeather';
import WeatherForecastWidget from '@/widgets/weather-forecast/ui/WeatherForecastWidget';
import { useSearchParams } from 'react-router-dom';

const WeatherDetailPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');
  const address = searchParams.get('address') || '';

  const coords = lat && lon ? { lat: Number(lat), lon: Number(lon) } : null;

  const { data: weather, isPending } = useWeather(coords, address);

  if (isPending) return <div className='pt-20'>날씨 정보를 가져오는 중...</div>;

  if (!weather) return <div className='pt-20'>정보를 찾을 수 없습니다.</div>;

  if (weather)
    return (
      <div className='flex w-full flex-col gap-12 md:max-w-[600px]'>
        <WeatherForecastWidget coords={coords} address={address} />
      </div>
    );
};

export default WeatherDetailPage;
