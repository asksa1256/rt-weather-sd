const LocationPermissionMessage = () => {
  return (
    <div className='flex min-h-50 items-center justify-center'>
      <p className='flex items-center justify-center rounded-2xl bg-yellow-100 p-4 text-center text-yellow-800'>
        위치 정보가 필요합니다. 위치 확인 요청을 허용해주세요.
      </p>
    </div>
  );
};

export default LocationPermissionMessage;
