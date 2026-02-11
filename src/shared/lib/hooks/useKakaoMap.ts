import { useEffect, useState } from 'react';

export const useKakaoMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkKakaoMaps = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsLoaded(true);
        });
      } else {
        // SDK가 아직 로드되지 않았으면 100ms 후 재시도
        setTimeout(checkKakaoMaps, 100);
      }
    };

    checkKakaoMaps();
  }, []);

  return { isLoaded, error };
};