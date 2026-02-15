import type { WeatherResponse } from '@/entities/weather/model/types';
import CurrentWeatherCard from '@/entities/weather/ui/CurrentWeatherCard';
import AddFavoriteButton from '@/features/favorites/ui/AddFavoriteButton';
import HourlyHorizontalScroll from './HourlyHorizontalScroll';

interface WeatherForecastLayoutProps {
  weather: WeatherResponse;
  address: string | null;
}

const WeatherForecastLayout = ({
  weather,
  address,
}: WeatherForecastLayoutProps) => {
  const { current, forecast, location } = weather;
  const today = forecast.forecastday[0].day;
  const hourly = forecast.forecastday[0].hour;

  return (
    <div className='flex w-full flex-col items-center'>
      {/* 장소 */}
      <section className='mb-6 flex w-full items-start justify-between'>
        <h2 className='text-2xl font-bold text-gray-800 md:text-3xl'>
          <b className='block text-blue-500'>{address || location.name}</b>
          <span className='text-xl text-gray-700'>실시간 날씨</span>
        </h2>

        <AddFavoriteButton
          address={address || location.name}
          coords={{ lat: location.lat, lon: location.lon }}
          className='-mt-1'
        />
      </section>

      {/* 현재 날씨 */}
      <section className='w-full'>
        <CurrentWeatherCard
          temp={current.temp_c}
          condition={current.condition}
          today={today}
        />
      </section>

      {/* 시간대별 예보 */}
      <section className='w-full max-w-[100vw]'>
        <h3 className='mb-4 text-xl font-bold text-gray-700'>시간대별 예보</h3>
        <HourlyHorizontalScroll hourly={hourly} />
      </section>
    </div>
  );
};

export default WeatherForecastLayout;
