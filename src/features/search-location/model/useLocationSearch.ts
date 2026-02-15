import { useEffect, useMemo, useState } from 'react';

export const useLocationSearch = (minInputLen: number, maxResults: number) => {
  const [locationData, setLocationData] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

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

    if (inputValue.length >= 1) loadLocationData(); // 검색어 입력 시 주소 데이터 로드
  }, [inputValue, locationData.length]);

  const filteredLocations = useMemo(() => {
    if (inputValue.length < minInputLen) return [];
    return locationData
      .filter(addr => addr.includes(inputValue))
      .slice(0, maxResults);
  }, [inputValue, locationData, minInputLen, maxResults]);

  return {
    inputValue,
    setInputValue,
    isLocationLoading,
    filteredLocations,
    clearInput: () => setInputValue(''),
  };
};
