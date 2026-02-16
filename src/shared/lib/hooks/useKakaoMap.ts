import { useEffect, useState } from 'react';

export const useKakaoMap = () => {
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);

  useEffect(() => {
    if (!window.kakao?.maps) {
      console.error('Kakao Maps SDK가 로드되지 않았습니다.');
      return;
    }

    window.kakao.maps.load(() => {
      setIsKakaoMapLoaded(true);
    });
  }, []);

  return { isKakaoMapLoaded };
};
