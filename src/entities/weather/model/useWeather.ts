import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from './fetchWeather';

export const useWeather = (
  coords: { lat: number; lon: number } | null,
  address: string,
) => {
  return useQuery({
    queryKey: ['weather', address],
    queryFn: () => fetchWeather(coords!.lat, coords!.lon), // coords가 있을 때만 fetch
    enabled: !!coords, // coords가 null이 아닐 때만 쿼리 활성화
    staleTime: 1000 * 60 * 30, // 30분 (지역별 날씨 데이터는 자주 변하지 않으므로, staleTime을 길게 설정)
    gcTime: 1000 * 60 * 60, // 1시간
    retry: 1,
  });
};
