import type { FavoriteLocation } from '@/entities/favorites/model/types';
import { useWeather } from '@/entities/weather/model/useWeather';
// import LoadingSpinner from "@/shared/ui/LoadingSpinner";

const WeatherDetail = ({
  favoriteItem,
}: {
  favoriteItem: FavoriteLocation;
}) => {
  // 저장된 좌표와 주소를 그대로 useWeather에 전달
  // 이미 메인에서 조회를 했었다면, 리액트 쿼리가 캐시된 데이터를 즉시 반환
  const { data: weather, isPending: isWeatherPending } = useWeather(
    favoriteItem.coords,
    favoriteItem.address,
  );

  if (isWeatherPending) return <div className='pt-20'>로딩중...</div>;

  if (weather)
    return (
      <div>
        <h2>{favoriteItem.name} 날씨</h2>
        <p>{favoriteItem.address}</p>
        <div className='temp'>{weather.current.temp_c}°C</div>
        {/* ... 나머지 날씨 UI */}
      </div>
    );
};

export default WeatherDetail;
