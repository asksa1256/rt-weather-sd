const HourlyForecastItemSkeleton = () => (
  <div className='flex min-w-16 shrink-0 flex-col items-center space-y-2'>
    <div className='h-3 w-8 rounded bg-gray-200' /> {/* 시간 */}
    <div className='my-1 h-10 w-10 rounded-full bg-gray-200' /> {/* 아이콘 */}
    <div className='h-4 w-6 rounded bg-gray-200' /> {/* 온도 */}
  </div>
);

export default HourlyForecastItemSkeleton;
