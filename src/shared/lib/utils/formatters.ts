// 포매터 유틸 함수
const formatAddressEnToKo = (lat, lon) => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  geocoder.coord2RegionCode(lon, lat, (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 행정동 주소 정보 (예: 서울특별시 중구 ...)
      console.log('전체 주소:', result[0].address_name);
      console.log('지역명:', result[0].region_1depth_name, result[0].region_2depth_name);
    }
  });
};