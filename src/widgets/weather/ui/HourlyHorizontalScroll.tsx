import type { ForecastHour } from '@/entities/weather/model/types';
import HourlyForecastItem from '@/entities/weather/ui/HourlyForecastItem';
import { useRef, useState, type PointerEvent } from 'react';

const HourlyHorizontalScroll = ({ hourly }: { hourly: ForecastHour[] }) => {
  const [isDragging, setIsDragging] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const lastTime = useRef(0);

  const friction = 0.95; // 감속 계수
  const minVelocity = 0.5; // 멈춤 기준

  // 스크롤 관성 적용
  const startInertia = () => {
    if (!scrollRef.current) return;

    const step = () => {
      if (!scrollRef.current) return;

      velocity.current *= friction;

      scrollRef.current.scrollLeft -= velocity.current * 16; // 16ms = 약 1프레임 (60fps)

      if (Math.abs(velocity.current) > minVelocity) {
        animationFrame.current = requestAnimationFrame(step);
      }
    };

    animationFrame.current = requestAnimationFrame(step);
  };

  // 스크롤 관성 해제
  const stopInertia = () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };

  // 이동 시작
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault(); // 커서를 뗀 이후에도 드래그 스크롤이 계속 되는 현상 방지
    if (!scrollRef.current) return;

    stopInertia();

    setIsDragging(true);
    scrollRef.current.setPointerCapture(e.pointerId);

    startX.current = e.clientX;
    lastX.current = e.clientX;
    velocity.current = 0;
    lastTime.current = performance.now();

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  // 이동 중
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;

    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = now - lastTime.current;

    scrollRef.current.scrollLeft -= dx;

    velocity.current = dx / dt; // px per ms

    lastX.current = e.clientX;
    lastTime.current = now;
  };

  // 이동 완료
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    setIsDragging(false);
    scrollRef.current.releasePointerCapture(e.pointerId);

    startInertia();
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
