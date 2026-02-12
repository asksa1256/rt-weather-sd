import type { WeatherResponse } from '../model/types';

interface WeatherCardProps {
  weather: WeatherResponse;
  address: string | null;
}

const WeatherCard = ({ weather, address }: WeatherCardProps) => {
  const current = weather.current;
  const today = weather.forecast.forecastday[0].day;
  const hourly = weather.forecast.forecastday[0].hour;

  return (
    <div className='w-[90%] md:w-full md:max-w-[600px]'>
      <h2 className='mb-6 text-2xl font-bold text-gray-800'>
        {address || weather.location.name} 실시간 날씨
      </h2>

      <section className='mb-8 rounded-2xl bg-blue-50 p-6 shadow-sm ring-1 ring-blue-100'>
        {/* 현재 날씨 */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-6xl font-extrabold text-blue-900'>
              {current.temp_c}°
            </h2>
            <p className='mt-2 text-xl font-medium text-blue-700'>
              {current.condition.text}
            </p>
          </div>
          <img
            src={current.condition.icon}
            alt='날씨 아이콘'
            className='w-24'
          />
        </div>

        {/* 최고/최저 기온 */}
        <div className='mt-5 flex gap-5 font-semibold'>
          <span className='flex items-center gap-1 text-red-500'>
            <span className='text-sm opacity-70'>최고</span> {today.maxtemp_c}°
          </span>
          <span className='flex items-center gap-1 text-blue-500'>
            <span className='text-sm opacity-70'>최저</span> {today.mintemp_c}°
          </span>
        </div>
      </section>

      {/* 시간대별 예보 */}
      <section className='w-full max-w-[100vw] overflow-hidden'>
        <h3 className='mb-4 text-lg font-bold text-gray-700'>시간대별 예보</h3>
        <div className='flex gap-2 overflow-x-auto pb-4'>
          {hourly.map((hour, idx) => (
            <div
              key={`${hour}_${idx}`}
              className='flex min-w-16 shrink-0 flex-col items-center'
            >
              <p className='text-xs text-gray-500'>{hour.time.split(' ')[1]}</p>
              <img
                src={hour.condition.icon}
                alt='시간별 아이콘'
                className='my-1 w-10'
              />
              <p className='font-bold text-gray-800'>
                {Math.round(hour.temp_c)}°
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeatherCard;
