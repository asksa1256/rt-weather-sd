import { useGeolocation } from '@/features/search-location/model/useGeolocation';
import { SearchLocation } from '@/features/search-location/ui/SearchLocation';
import CurrentWeatherContainer from '@/widgets/current-weather/ui/CurrentWeatherContainer';
import './styles/globals.css';

function App() {
  // weatherapi.com에서 좌표별 지역명을 영어로 제공 -> 한글명으로 통일
  const {
    coords,
    setCoords,
    address,
    setAddress,
    error: locationError,
  } = useGeolocation();

  return (
    <main className='flex w-full flex-col items-center justify-center'>
      <SearchLocation
        onSelectAddress={(newCoords, newAddr) => {
          setCoords(newCoords);
          setAddress(newAddr);
        }}
      />

      {/* 위치 정보 권한 거부 시 에러 표시 */}
      {locationError && (
        <div className='text-sm text-red-500'>{locationError}</div>
      )}

      <section className='p-16'>
        <CurrentWeatherContainer coords={coords} address={address} />
      </section>
    </main>
  );
}

export default App;
