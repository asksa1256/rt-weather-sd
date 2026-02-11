import { useEffect, useState } from 'react';

export const useKakaoMap = () => {
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const [loadKakaoMapError, setLoadKakaoMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      setLoadKakaoMapError('Kakao Maps SDK를 불러올 수 없습니다. 네트워크 연결을 확인해주세요.');
      return;
    }

    try {
      window.kakao.maps.load(() => {
        setIsKakaoMapLoaded(true);
      });
    } catch (err) {
      setLoadKakaoMapError('Kakao Maps 초기화 중 오류가 발생했습니다.');
      console.error('Kakao Maps 로드 에러:', err);
    }
  }, []);

  return { isKakaoMapLoaded, loadKakaoMapError };
};