import { useWeather } from '@/entities/weather/model/useWeather';
import type { FavoriteLocation } from '../model/types';

const FavoriteCard = ({ fav }: { fav: FavoriteLocation }) => {
  const { data: weather } = useWeather(fav.coords, fav.address);

  return (
    <div
      className='cursor-pointer rounded-xl border p-4 transition-shadow hover:shadow-md'
      onClick={() => console.log('Clicked favorite:', fav.address)}
    >
      <div className='flex flex-col items-start justify-between'>
        <h4 className='text-lg font-bold'>{fav.name}</h4>
        {weather && (
          <h6>
            <span className='mr-1 text-sm text-gray-500'>현재 기온:</span>
            <span className='font-bold text-blue-900'>
              {weather.current.temp_c}°
            </span>
          </h6>
        )}
      </div>
      {weather && (
        <div className='flex gap-2 text-sm text-gray-500'>
          <span className='text-blue-500'>
            최저: {weather.forecast.forecastday[0].day.mintemp_c}°
          </span>
          <span className='text-red-500'>
            최고: {weather.forecast.forecastday[0].day.maxtemp_c}°
          </span>
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;
