const CurrentWeatherCardSkeleton = () => (
  <div className='mb-8 rounded-2xl bg-blue-50/50 p-6 shadow-sm ring-1 ring-blue-100'>
    <div className='flex items-center justify-between'>
      <div className='space-y-3'>
        <div className='h-16 w-24 rounded-lg bg-blue-100' /> {/* 온도 숫자 */}
        <div className='h-6 w-20 rounded bg-blue-100' />{' '}
        {/* 날씨 상태 텍스트 */}
      </div>
      <div className='h-24 w-24 rounded-full bg-blue-100' /> {/* 날씨 아이콘 */}
    </div>

    <div className='mt-5 flex gap-5'>
      <div className='h-5 w-16 rounded bg-blue-100' /> {/* 최고 기온 */}
      <div className='h-5 w-16 rounded bg-blue-100' /> {/* 최저 기온 */}
    </div>
  </div>
);

export default CurrentWeatherCardSkeleton;
