// 카카오 주소 검색 결과 타입
interface KakaoRegionResult {
  region_type: 'H' | 'B'; // H: 행정동, B: 법정동
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
  x: number;
  y: number;
}

type KakaoStatusType = 'OK' | 'ZERO_RESULT' | 'ERROR';

// window 객체 확장
declare global {
  interface Window {
    kakao: typeof kakao;
  }
}