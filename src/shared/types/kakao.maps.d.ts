declare namespace kakao.maps {
  class LatLng {
    constructor(latitude: number, longitude: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    getCenter(): LatLng;
    setLevel(level: number, options?: { animate?: boolean }): void;
    getLevel(): number;
  }

  interface MapOptions {
    center: LatLng;
    level?: number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
  }

  namespace services {
    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: AddressSearchResult[], status: Status) => void
      ): void;

      coord2Address(
        lng: number,
        lat: number,
        callback: (result: Coord2AddressResult[], status: Status) => void
      ): void;

      coord2RegionCode(
        lng: number,
        lat: number,
        callback: (result: RegionCodeResult[], status: Status) => void
      ): void;
    }

    interface AddressSearchResult {
      address_name: string;
      x: string;
      y: string;
    }

    interface Coord2AddressResult {
      address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
      } | null;
      road_address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        road_name: string;
        building_name: string;
      } | null;
    }

    interface RegionCodeResult {
      region_type: 'H' | 'B';  // H: 행정동, B: 법정동
      address_name: string;
      region_1depth_name: string;  // 시/도
      region_2depth_name: string;  // 구/군
      region_3depth_name: string;  // 동/읍/면
      region_4depth_name: string;  // 리
      code: string;
      x: number;
      y: number;
    }

    enum Status {
      OK = 'OK',
      ZERO_RESULT = 'ZERO_RESULT',
      ERROR = 'ERROR',
    }
  }

  function load(callback: () => void): void;
}

declare global {
  interface Window {
    kakao: {
      maps: typeof kakao.maps;
    };
  }
}