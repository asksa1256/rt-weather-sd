import type { ForecastHour } from '@/entities/weather/model/types';
import HourlyForecastItem from '@/entities/weather/ui/HourlyForecastItem';
import { useRef, useState, type PointerEvent } from 'react';

const HourlyHorizontalScroll = ({ hourly }: { hourly: ForecastHour[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 이동 시작
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    scrollRef.current.setPointerCapture(e.pointerId);

    setStartX(e.clientX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 이동 중
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.clientX - startX; // 이동 거리
    scrollRef.current.scrollLeft = scrollLeft - dx;
  };

  // 이동 완료
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={scrollRef}
      className='scrollbar-hide flex cursor-grab gap-2 overflow-x-auto pb-4 active:cursor-grabbing'
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {hourly.map((hour, idx) => (
        <HourlyForecastItem
          key={`${hour.time}_${idx}`}
          time={hour.time}
          icon={hour.condition.icon}
          temp={hour.temp_c}
        />
      ))}
    </div>
  );
};

export default HourlyHorizontalScroll;
