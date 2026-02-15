import CurrentWeatherCardSkeleton from '@/entities/weather/ui/CurrentWeatherCardSkeleton';
import HourlyForecastItemSkeleton from '@/entities/weather/ui/HourlyForecastItemSkeleton';

const WeatherForecastSkeleton = () => {
  return (
    <div className='flex w-full animate-pulse flex-col items-center'>
      {/* 장소명 스켈레톤 */}
      <div className='mb-6 flex w-full items-start justify-between'>
        <div className='space-y-2'>
          {/* 주소 */}
          <div className='h-8 w-48 rounded bg-gray-200 md:h-9' />
          {/* 실시간 날씨 */}
          <div className='h-6 w-24 rounded bg-gray-200' />
        </div>
        {/* 즐겨찾기 버튼 */}
        <div className='h-8 w-8 rounded-full bg-gray-200' />
      </div>

      {/* 현재 날씨 스켈레톤 */}
      <div className='w-full'>
        <CurrentWeatherCardSkeleton />
      </div>

      {/* 시간대별 예보 스켈레톤 */}
      <div className='mt-4 w-full max-w-[100vw]'>
        <div className='mb-4 h-7 w-32 rounded bg-gray-200' />
        <div className='flex gap-2 overflow-x-hidden pb-4'>
          {[...Array(8)].map((_, i) => (
            <HourlyForecastItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastSkeleton;
