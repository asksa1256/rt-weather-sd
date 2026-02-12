import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';
import { useQueryClient } from '@tanstack/react-query';

// 좌표별 장소 캐싱 훅
export function useCoordinate() {
  const queryClient = useQueryClient();
  const { isKakaoMapLoaded } = useKakaoMap();

  const fetchCoords = async (address: string) => {
    return await queryClient.fetchQuery({
      queryKey: ['coords', address], // ['coords', '경기도 성남시 분당구']
      queryFn: () => {
        return new Promise<{ lat: number; lon: number }>((resolve, reject) => {
          // 카카오맵 API 로드가 완료되었을 때만 주소 -> 좌표 변환
          if (!isKakaoMapLoaded) {
            return reject(new Error('카카오맵 SDK가 로드되지 않았습니다.'));
          }

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result, status) => {
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
      },
      staleTime: Infinity,
    });
  };

  return { fetchCoords };
}
