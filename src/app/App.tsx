import './styles/globals.css';
import CurrentWeatherContainer from '@/widgets/current-weather/ui/CurrentWeatherContainer';
import { SearchLocation } from '@/features/search-location/ui/SearchLocation';
import { useLocation } from '@/features/search-location/model/useLocation';

function App() {
  // 초기 위치를 가져오고, 이후 갱신된 위치 상태 관리
  const { coords, setCoords, address, setAddress, error: locationError } = useLocation();

  return (
    <main className='flex flex-col w-full items-center justify-center'>
      <SearchLocation
        onSelectAddress={(newCoords, newAddr) => {
          setCoords(newCoords);
          setAddress(newAddr);
        }}
      />

      {/* 위치 정보 권한 거부 시 에러 표시 */}
      {locationError && <div className="text-sm text-red-500">{locationError}</div>}

      <section className='p-16'>
        <CurrentWeatherContainer
          coords={coords}
          address={address}
        />
      </section>

    </main>
  );
}

export default App;
