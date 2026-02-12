interface HourlyForecastItemProps {
  time: string; // 시간
  icon: string; // 날씨 아이콘 URL
  temp: number; // 시간대별 온도
}

const HourlyForecastItem = ({ time, icon, temp }: HourlyForecastItemProps) => (
  <div className='flex min-w-16 shrink-0 flex-col items-center'>
    <p className='text-xs text-gray-500'>{time.split(' ')[1]}</p>
    <img src={icon} alt='시간대별 날씨 아이콘' className='my-1 w-10' />
    <p className='font-bold text-gray-800'>{Math.round(temp)}°</p>
  </div>
);

export default HourlyForecastItem;
