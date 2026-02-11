import { useState, useMemo } from 'react';
import { Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/ui/command";
import addressData from '@/shared/config/korea_districts.json';
import { useLocation } from "@/features/search-location/model/useLocation";

const MIN_INPUT_LENGTH = 1;
const MAX_SEARCH_RESULTS = 30;

interface SearchLocationProps {
  onSelectAddress: (coords: { lat: number; lon: number }, address: string) => void;
}

export function SearchLocation({ onSelectAddress }: SearchLocationProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { getCoordsFromAddress } = useLocation();

  const filteredAddresses = useMemo(() => {
    // 렌더링 속도 개선을 위해, 상위 30개 검색 결과만 반환
    return addressData
      .filter((addr) => addr.includes(inputValue))
      .slice(0, MAX_SEARCH_RESULTS);
  }, [inputValue]);

  const handleSelect = async (currentValue: string) => {
    try {
      const coords = await getCoordsFromAddress(currentValue);
      const selectedAddress = currentValue.replace(/-/g, ' ');
      onSelectAddress(coords, selectedAddress);

      setInputValue(selectedAddress);
      setCommandOpen(false);
    } catch (err) {
      alert("위치를 찾을 수 없습니다.");
    }
  };

  // 검색 결과 로딩을 줄이기 위해 최소 입력 길이 체크
  const isMinLength = inputValue.length >= MIN_INPUT_LENGTH;

  const handleInputChange = (val: string) => {
    setInputValue(val);

    if (val.length >= MIN_INPUT_LENGTH) {
      setCommandOpen(true);
    } else {
      setCommandOpen(false);
    }
  };

  // 사용자가 검색창 클릭 시 검색 상태 초기화
  const handleInputFocus = () => {
    if (inputValue.length >= MIN_INPUT_LENGTH) {
      setCommandOpen(true);
    }
  };

  return (
    <Command shouldFilter={false} className='w-[400px] mx-auto'>
      <CommandInput
        placeholder="예: 종로구, 청운동"
        value={inputValue}
        onValueChange={handleInputChange}
        onFocus={handleInputFocus} // 포커스 시 자동완성 표시
      />
      {isMinLength && commandOpen && (
        <CommandList>
          {filteredAddresses.length === 0 && <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>}
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {filteredAddresses.map((addr) => (
              <CommandItem
                key={addr}
                value={addr}
                onSelect={() => handleSelect(addr)}
              >
                <Search className="mr-2 h-4 w-4" />
                {addr}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}