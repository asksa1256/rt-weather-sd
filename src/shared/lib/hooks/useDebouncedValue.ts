import { useEffect, useState } from 'react';

const DEFAULT_DELAY = 300;

/**
 * 입력값 디바운스 유틸 훅
 * @param value 디바운스할 값
 * @param delay 디바운스 지연 시간 (ms)
 */
export const useDebouncedValue = <T>(value: T, delay = DEFAULT_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
