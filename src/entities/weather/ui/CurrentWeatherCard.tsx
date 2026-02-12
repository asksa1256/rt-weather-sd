interface CurrentWeatherCardProps {
  temp: number; // 현재 온도
  condition: {
    text: string;
    icon: string;
  };
  today: {
    maxtemp_c: number;
    mintemp_c: number;
  };
}

const CurrentWeatherCard = ({
  temp,
  condition,
  today,
}: CurrentWeatherCardProps) => (
  <section className='mb-8 rounded-2xl bg-blue-50 p-6 shadow-sm ring-1 ring-blue-100'>
    <div className='flex items-center justify-between'>
      <div>
        <h2 className='text-6xl font-extrabold text-blue-900'>{temp}°</h2>
        <p className='mt-2 text-xl font-medium text-blue-700'>
          {condition.text}
        </p>
      </div>
      <img src={condition.icon} alt='weather icon' className='w-24' />
    </div>

    <div className='mt-5 flex gap-5 font-semibold'>
      <span className='flex items-center gap-1 text-red-500'>
        <span className='text-sm opacity-70'>최고</span> {today.maxtemp_c}°
      </span>
      <span className='flex items-center gap-1 text-blue-500'>
        <span className='text-sm opacity-70'>최저</span> {today.mintemp_c}°
      </span>
    </div>
  </section>
);

export default CurrentWeatherCard;
