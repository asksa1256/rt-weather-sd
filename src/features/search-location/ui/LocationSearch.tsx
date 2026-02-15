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
import { Info, Search, X } from 'lucide-react';
import { useMemo, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoordinate } from '../model/useCoordinate';

const MAX_SEARCH_RESULTS = 30;
const MIN_INPUT_LENGTH = 2;

const LocationSearch = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { fetchCoords } = useCoordinate();

  const navigate = useNavigate();

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

      // 선택한 주소로 url 파라미터 생성 (검색 후 상세 페이지 데이터 전달)
      const params = new URLSearchParams({
        lat: coords.lat.toString(),
        lon: coords.lon.toString(),
        address: selectedAddress,
      });

      // 검색창 초기화, 자동완성 목록 닫기
      setInputValue(selectedAddress);
      setCommandOpen(false);

      // 상세 페이지로 이동
      navigate(`/weather?${params.toString()}`);
    } catch (err) {
      alert(`해당 위치를 찾지 못했습니다: ${(err as Error).message}`);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setCommandOpen(false);
  };

  const handleEnterClear = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setInputValue('');
      setCommandOpen(false);
    }
  };

  return (
    <div className='w-full'>
      <Popover open={commandOpen} onOpenChange={setCommandOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <div className='relative'>
              <CommandInput
                placeholder='예: 종로구, 청운동'
                value={inputValue}
                onValueChange={handleInputChange}
                className='rounded-2xl px-4 py-3 [&_input]:text-lg'
              />

              {/* 검색어가 있을 때만 지우기 버튼 표시 */}
              {inputValue.length > 0 && (
                <button
                  aria-label='검색어 초기화'
                  className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 z-1 -translate-y-1/2 p-1 transition-colors'
                  onClick={handleClear}
                  onKeyDown={e => handleEnterClear(e)}
                >
                  <X className='size-5' />
                </button>
              )}
            </div>
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
                  {filteredAddresses.length >= MAX_SEARCH_RESULTS && (
                    <p className='flex items-center gap-1 p-2 text-sm text-gray-500'>
                      <Info className='size-3.5' /> 검색 결과는{' '}
                      {MAX_SEARCH_RESULTS}개까지 표시됩니다.
                    </p>
                  )}
                  {filteredAddresses.map(addr => (
                    <CommandItem
                      key={addr}
                      value={addr}
                      className='cursor-pointer'
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
