import { useState, useEffect } from 'react';
import { WEATHER_API_KEY } from '@/shared/config/constants';
import type { WeatherResponse } from './types';
import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';

// 현재 위치, 날씨 조회 훅
export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isKakaoMapLoaded, loadKakaoMapError } = useKakaoMap();

  useEffect(() => {
    if (loadKakaoMapError) {
      setError(loadKakaoMapError);
      return;
    }

    if (!('geolocation' in navigator)) {
      setError('브라우저가 위치 정보를 지원하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        try {
          // 날씨 데이터 가져오기 (weatherapi.com)
          const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no&lang=ko`;
          const weatherRes = await fetch(weatherUrl);

          if (!weatherRes.ok) {
            throw new Error('날씨 데이터를 불러오지 못했습니다.');
          }

          const weatherData = await weatherRes.json();
          setWeather(weatherData);

          // 카카오맵 API로 한글 지명 매핑
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2RegionCode(lon, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result.find((r) => r.region_type === 'H');
              if (addr) {
                // 예: 경기도 성남시
                setAddress(`${addr.region_1depth_name} ${addr.region_2depth_name}`);
              }
            }

            // 지오코딩까지 완료 후에 로딩 완료 처리
            setIsLoading(false);
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : '날씨 데이터 로드에 실패했습니다.');
          setIsLoading(false);
        }
      },

      (err) => {
        setError(`위치 접근이 거부되었습니다: ${err.message}`);
        setIsLoading(false);
      }
    );
  }, [isKakaoMapLoaded, loadKakaoMapError]);

  return { weather, address, isLoading, error };
};