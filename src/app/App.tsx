import { useGeolocation } from '@/features/search-location/model/useGeolocation';
import LocationSearch from '@/features/search-location/ui/LocationSearch';
import '@/shared/styles/globals.css';
import Header from '@/shared/ui/Header';
import WeatherForecastWidget from '@/widgets/weather-forecast/ui/WeatherForecastWidget';

const App = () => {
  // 현재 위치, 검색 위치 상태 관리
  const {
    coords,
    setCoords,
    address,
    setAddress,
    error: locationError,
  } = useGeolocation();

  return (
    <>
      <Header />
      <main className='mx-auto mt-4 flex w-full flex-col items-center justify-center p-6'>
        <div className='flex w-full flex-col gap-12 md:max-w-[600px]'>
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

          <WeatherForecastWidget coords={coords} address={address} />
        </div>
      </main>
    </>
  );
};

export default App;
