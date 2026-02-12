import { useGeolocation } from '@/features/search-location/model/useGeolocation';
import LocationSearch from '@/features/search-location/ui/LocationSearch';
import '@/shared/styles/globals.css';
import CurrentWeatherContainer from '@/widgets/current-weather/ui/CurrentWeatherContainer';

const App = () => {
  // weatherapi.com에서 좌표별 지역명을 영어로 제공 -> 한글명으로 통일
  const {
    coords,
    setCoords,
    address,
    setAddress,
    error: locationError,
  } = useGeolocation();

  return (
    <main className='mx-auto flex w-full flex-col items-center justify-center px-4 pt-16'>
      <LocationSearch
        onSelectAddress={(newCoords, newAddr) => {
          setCoords(newCoords);
          setAddress(newAddr);
        }}
      />

      {/* 위치 정보 권한 거부 시 에러 표시 */}
      {locationError && (
        <div className='text-sm text-red-500'>{locationError}</div>
      )}

      <CurrentWeatherContainer
        coords={coords}
        address={address}
        className='mt-8'
      />
    </main>
  );
};

export default App;
