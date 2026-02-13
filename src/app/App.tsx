import LocationSearch from '@/features/search-location/ui/LocationSearch';
import MainPage from '@/pages/home/ui/MainPage';
import WeatherDetailPage from '@/pages/weather-detail/ui/WeatherDetailPage';
import '@/shared/styles/globals.css';
import Header from '@/shared/ui/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className='mx-auto mt-4 flex w-full flex-col items-center justify-center gap-6 px-6 pt-4 md:max-w-[600px] md:px-0'>
        <LocationSearch />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/weather' element={<WeatherDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
