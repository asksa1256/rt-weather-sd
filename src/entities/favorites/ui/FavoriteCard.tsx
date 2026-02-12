import { useWeather } from '@/entities/weather/model/useWeather';
import type { FavoriteLocation } from '../model/types';

const FavoriteCard = ({ fav }: { fav: FavoriteLocation }) => {
  const { data: weather } = useWeather(fav.coords, fav.address);

  return (
    <div
      className='cursor-pointer rounded-xl border p-4 transition-shadow hover:shadow-md'
      onClick={() => console.log('Clicked favorite:', fav.address)}
    >
      <div className='flex items-start justify-between'>
        <span className='text-lg font-bold'>{fav.name}</span>
        {weather && (
          <span className='font-bold text-blue-500'>
            {weather.current.temp_c}°
          </span>
        )}
      </div>
      {weather && (
        <div className='mt-2 text-sm text-gray-500'>
          최저: {weather.forecast.forecastday[0].day.mintemp_c}° 최고:{' '}
          {weather.forecast.forecastday[0].day.maxtemp_c}°
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;
