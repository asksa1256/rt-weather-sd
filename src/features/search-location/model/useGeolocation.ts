import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';
import { useEffect, useState } from 'react';

// 현재 위치 한국 주소로 변환
export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { isKakaoMapLoaded } = useKakaoMap();

  useEffect(() => {
    if (!isKakaoMapLoaded || !('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lon } = position.coords;
        setCoords({ lat, lon });

        // 카카오맵 API로 한글 지명 매핑
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lon, lat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const addr = result.find(r => r.region_type === 'H');
            if (addr) {
              // 예: 경기도 성남시 분당구
              setAddress(
                `${addr.region_1depth_name} ${addr.region_2depth_name} ${addr.region_3depth_name}`,
              );
            }
          }
        });
      },
      err => {
        setError(`위치 접근이 거부되었습니다: ${err.message}`);
      },
    );
  }, [isKakaoMapLoaded]);

  return { coords, setCoords, address, setAddress, error };
};
