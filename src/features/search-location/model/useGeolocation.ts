import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';
import { useEffect, useState } from 'react';

const COORDS_KEY = 'user_initial_coords';
const ADDR_KEY = 'user_initial_address';

const getStoredInitialLocation = () => {
  const coords = sessionStorage.getItem(COORDS_KEY);
  const address = sessionStorage.getItem(ADDR_KEY);
  return {
    coords: coords ? JSON.parse(coords) : null,
    address: address || null,
  };
};

// 현재 위치 한국 주소로 변환
export const useGeolocation = () => {
  const storedInitialLocation = getStoredInitialLocation();

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    storedInitialLocation.coords,
  );
  const [address, setAddress] = useState<string | null>(
    storedInitialLocation.address,
  );
  const [error, setError] = useState<string | null>(null);
  const { isKakaoMapLoaded } = useKakaoMap();

  useEffect(() => {
    // 브라우저 위치 확인 지원 체크
    if (!isKakaoMapLoaded || !('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lon } = position.coords;
        const newCoords = { lat, lon };

        setCoords(newCoords);
        sessionStorage.setItem(COORDS_KEY, JSON.stringify(newCoords));

        // 카카오맵 api 로드 완료 시 한글 주소로 변환
        if (isKakaoMapLoaded && window.kakao?.maps?.services) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2RegionCode(lon, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result.find(r => r.region_type === 'H');
              if (addr) {
                // 예: 경기도 성남시 분당구
                const fullAddress = `${addr.region_1depth_name} ${addr.region_2depth_name} ${addr.region_3depth_name}`;
                setAddress(fullAddress);
                sessionStorage.setItem(ADDR_KEY, fullAddress); // 주소도 세션 스토리지에 저장
              }
            }
          });
        }
      },
      err => {
        setError(`위치 접근이 거부되었습니다: ${err.message}`);
      },
    );
  }, [isKakaoMapLoaded]);

  return { coords, setCoords, address, setAddress, error };
};
