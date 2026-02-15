import {
  MAX_SEARCH_RESULTS,
  MIN_INPUT_LENGTH,
} from '@/shared/config/constants';
import { Command, CommandInput } from '@/shared/ui/command';
import { Popover, PopoverAnchor, PopoverContent } from '@/shared/ui/popover';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoordinate } from '../model/useCoordinate';
import { useLocationSearch } from '../model/useLocationSearch';
import SearchResult from './SearchResults';
import SearchStatus from './SearchStatus';

const LocationSearch = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const { fetchCoords } = useCoordinate();
  const navigate = useNavigate();

  const {
    inputValue,
    setInputValue,
    isLocationLoading,
    filteredLocations,
    clearInput,
  } = useLocationSearch(MIN_INPUT_LENGTH, MAX_SEARCH_RESULTS);

  const handleSelect = async (addr: string) => {
    try {
      const coords = await fetchCoords(addr);

      const params = new URLSearchParams({
        lat: coords.lat.toString(),
        lon: coords.lon.toString(),
        address: addr,
      });

      setInputValue(addr);
      setCommandOpen(false);
      navigate(`/weather?${params.toString()}`);
    } catch {
      // 좌표 변환 실패 시 coords 없이 상세 페이지로 라우팅 및 에러 ui 표시
      const params = new URLSearchParams({ address: addr });

      setInputValue(addr);
      setCommandOpen(false);
      navigate(`/weather?${params.toString()}`);
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
                className='rounded-2xl px-4 py-3 [&_input]:text-lg'
                onValueChange={val => {
                  setInputValue(val);
                  setCommandOpen(val.length >= MIN_INPUT_LENGTH);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    e.preventDefault();
                    handleSelect(inputValue.trim());
                  }
                }}
              />
              <SearchStatus
                isLoading={isLocationLoading}
                hasInput={inputValue.length > 0}
                onClear={clearInput}
              />
            </div>
          </PopoverAnchor>

          <PopoverContent
            className='w-(--radix-popover-trigger-width) p-0'
            onOpenAutoFocus={e => e.preventDefault()}
          >
            <SearchResult
              isLoading={isLocationLoading}
              results={filteredLocations}
              onSelect={handleSelect}
              maxResults={MAX_SEARCH_RESULTS}
            />
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
};

export default LocationSearch;
