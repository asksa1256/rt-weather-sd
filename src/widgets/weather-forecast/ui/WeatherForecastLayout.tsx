import type { WeatherResponse } from '@/entities/weather/model/types';
import CurrentWeatherCard from '@/entities/weather/ui/CurrentWeatherCard';
import HourlyForecastItem from '@/entities/weather/ui/HourlyForecastItem';

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
      <div className='mb-6 w-full md:max-w-[600px]'>
        <h2 className='text-2xl font-bold text-gray-800 md:text-3xl'>
          <b className='block text-blue-500'>{address || location.name}</b>
          <span className='text-xl text-gray-700'>실시간 날씨</span>
        </h2>
      </div>

      {/* 현재 날씨 */}
      <div className='w-full md:max-w-[600px]'>
        <CurrentWeatherCard
          temp={current.temp_c}
          condition={current.condition}
          today={today}
        />
      </div>

      {/* 시간대별 예보 */}
      <section className='w-full max-w-[100vw] md:max-w-[600px]'>
        <h3 className='mb-4 text-lg font-bold text-gray-700'>시간대별 예보</h3>
        <div className='scrollbar-hide flex gap-2 overflow-x-auto pb-4'>
          {hourly.map((hour, idx) => (
            <HourlyForecastItem
              key={`${hour.time}_${idx}`}
              time={hour.time}
              icon={hour.condition.icon}
              temp={hour.temp_c}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeatherForecastLayout;
