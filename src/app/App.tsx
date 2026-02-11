import './styles/globals.css';
import CurrentWeatherContainer from '@/widgets/current-weather/ui/CurrentWeatherContainer';

function App() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <CurrentWeatherContainer />
    </div>
  );
}

export default App;
