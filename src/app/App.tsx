import './styles/globals.css';
import CurrentTemperature from '@/widgets/current-temperature/ui/CurrentTemperature';

function App() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <CurrentTemperature />
    </div>
  );
}

export default App;
