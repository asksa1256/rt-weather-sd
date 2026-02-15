import { useDebouncedValue } from '@/shared/lib/hooks/useDebouncedValue';
import { useEffect, useMemo, useState } from 'react';

export const useLocationSearch = (minInputLen: number, maxResults: number) => {
  const [locationData, setLocationData] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const debouncedInput = useDebouncedValue(inputValue);

  useEffect(() => {
    const loadLocationData = async () => {
      if (locationData.length > 0) return;
      setIsLocationLoading(true);
      try {
        const module = await import('@/shared/config/korea_districts.json');
        setLocationData(module.default);
      } catch (error) {
        console.error('주소 데이터 로딩 실패:', error);
      } finally {
        setIsLocationLoading(false);
      }
    };

    if (debouncedInput.length >= 1) loadLocationData();
  }, [debouncedInput, locationData.length]);

  const filteredLocations = useMemo(() => {
    if (debouncedInput.length < minInputLen) return [];
    return locationData
      .filter(addr => addr.includes(debouncedInput))
      .slice(0, maxResults);
  }, [debouncedInput, locationData, minInputLen, maxResults]);

  return {
    inputValue,
    setInputValue,
    isLocationLoading,
    filteredLocations,
    clearInput: () => setInputValue(''),
  };
};
