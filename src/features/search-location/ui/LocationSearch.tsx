import addressData from '@/shared/config/korea_districts.json';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCoordinate } from '../model/useCoordinate';

const MAX_SEARCH_RESULTS = 30;
const MIN_INPUT_LENGTH = 2;

interface LocationSearchProps {
  onSelectAddress: (
    coords: { lat: number; lon: number },
    address: string,
  ) => void;
}

const LocationSearch = ({ onSelectAddress }: LocationSearchProps) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { fetchCoords } = useCoordinate();

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setCommandOpen(val.length >= MIN_INPUT_LENGTH);
  };

  const handleInputFocus = () => {
    if (inputValue.length >= MIN_INPUT_LENGTH) {
      setCommandOpen(true);
    }
  };

  const filteredAddresses = useMemo(() => {
    if (inputValue.length < MIN_INPUT_LENGTH) return [];
    return addressData
      .filter(addr => addr.includes(inputValue))
      .slice(0, MAX_SEARCH_RESULTS); // 렌더링 속도 개선을 위해 상위 30개 검색 결과만 반환
  }, [inputValue]);

  const handleSelect = async (currentValue: string) => {
    try {
      const coords = await fetchCoords(currentValue);
      const selectedAddress = currentValue.replace(/-/g, ' ');

      // App으로 선택된 좌표와 주소 전달
      onSelectAddress(coords, selectedAddress);

      setInputValue(selectedAddress);
      setCommandOpen(false);
    } catch (err) {
      alert(`해당 위치를 찾지 못했습니다: ${(err as Error).message}`);
    }
  };

  const isMinLength = inputValue.length >= MIN_INPUT_LENGTH;

  return (
    <Command shouldFilter={false} className='mx-auto w-[90%] md:max-w-[600px]'>
      <CommandInput
        placeholder='예: 종로구, 청운동'
        value={inputValue}
        onValueChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      {isMinLength && commandOpen && (
        <CommandList>
          {filteredAddresses.length === 0 && (
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          )}
          <CommandGroup className='max-h-[300px] overflow-y-auto'>
            {filteredAddresses.map(addr => (
              <CommandItem
                key={addr}
                value={addr}
                onSelect={() => handleSelect(addr)}
              >
                <Search className='mr-2 h-4 w-4' />
                {addr}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default LocationSearch;
