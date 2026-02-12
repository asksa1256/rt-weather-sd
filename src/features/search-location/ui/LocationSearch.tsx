import addressData from '@/shared/config/korea_districts.json';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Popover, PopoverAnchor, PopoverContent } from '@/shared/ui/popover';
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

  return (
    <div className='mx-auto w-[90%] md:max-w-[600px]'>
      <Popover open={commandOpen} onOpenChange={setCommandOpen}>
        <Command shouldFilter={false}>
          {/* PopoverAnchor: input 너비에 맞춰 리스트 정렬 */}
          <PopoverAnchor asChild>
            <CommandInput
              placeholder='예: 종로구, 청운동'
              value={inputValue}
              onValueChange={handleInputChange}
              className='rounded-2xl px-4 py-3 [&_input]:text-lg'
            />
          </PopoverAnchor>

          <PopoverContent
            className='w-(--radix-popover-trigger-width) p-0'
            onOpenAutoFocus={e => e.preventDefault()} // 입력할 동안 input 포커스 유지
          >
            <CommandList>
              {filteredAddresses.length === 0 ? (
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              ) : (
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
              )}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
};

export default LocationSearch;
