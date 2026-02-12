export interface FavoriteLocation {
  id: string; // 주소를 ID로 사용
  address: string;
  name: string; // 별칭 (기본값: 주소)
  coords: { lat: number; lon: number };
}
