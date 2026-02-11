import { useState, useEffect } from 'react';
import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';

export const useLocation = () => {
  const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { isKakaoMapLoaded } = useKakaoMap();

  useEffect(() => {
    if (!isKakaoMapLoaded || !('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setCoords({ lat, lon });

        // 카카오맵 API로 한글 지명 매핑(역지오코딩)
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lon, lat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const addr = result.find((r) => r.region_type === 'H');
            if (addr) {
              // 예: 경기도 성남시
              setAddress(`${addr.region_1depth_name} ${addr.region_2depth_name}`)
            };
          }
        });
      },
      (err) => {
        setError(`위치 접근이 거부되었습니다: ${err.message}`);
      }
    );
  }, [isKakaoMapLoaded]);

  return { coords, address, error };
};