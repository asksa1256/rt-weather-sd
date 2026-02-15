const LocationErrorMessage = () => {
  return (
    <div className='flex min-h-50 items-center justify-center'>
      <p className='flex items-center justify-center rounded-2xl bg-red-100 p-4 text-center text-red-800'>
        해당 장소의 정보가 제공되지 않습니다.
      </p>
    </div>
  );
};

export default LocationErrorMessage;
