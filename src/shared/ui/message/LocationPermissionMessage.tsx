const LocationPermissionMessage = () => {
  return (
    <div className='flex min-h-50 items-center justify-center'>
      <p className='flex items-center justify-center rounded-2xl bg-yellow-100 p-4 text-center text-yellow-800'>
        위치 권한 허용이 필요합니다.
      </p>
    </div>
  );
};

export default LocationPermissionMessage;
