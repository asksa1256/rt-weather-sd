import { useState, useEffect } from 'react';
import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';

export const useLocation = () => {
  const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { isKakaoMapLoaded } = useKakaoMap();

  // 카카오맵 API 로드가 완료되었을 때만 주소 -> 좌표 변환 함수를 실행하고자 훅 내부에 정의
  const getCoordsFromAddress = (address: string): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!isKakaoMapLoaded) {
        reject(new Error('카카오맵 SDK가 아직 로드되지 않았습니다.'));
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      const cleanAddress = address.replace(/-/g, ' ');

      geocoder.addressSearch(cleanAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({
            lat: Number(result[0].y),
            lon: Number(result[0].x),
          });
        } else {
          reject(new Error('주소를 찾을 수 없습니다.'));
        }
      });
    });
  };

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
              // 예: 경기도 성남시 분당구
              setAddress(`${addr.region_1depth_name} ${addr.region_2depth_name} ${addr.region_3depth_name}`)
            };
          }
        });
      },
      (err) => {
        setError(`위치 접근이 거부되었습니다: ${err.message}`);
      }
    );
  }, [isKakaoMapLoaded]);

  return { coords, setCoords, address, setAddress, error, getCoordsFromAddress };
};