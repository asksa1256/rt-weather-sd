import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Info, Loader2, Search } from 'lucide-react';

interface SearchResultProps {
  isLoading: boolean;
  results: string[];
  maxResults?: number;
  onSelect: (addr: string) => void;
}

const SearchResult = ({
  isLoading,
  results,
  onSelect,
  maxResults,
}: SearchResultProps) => {
  const hasMoreResults = maxResults && results.length >= maxResults;

  return (
    <CommandList>
      {isLoading ? (
        <div className='flex items-center justify-center p-4 text-sm text-gray-500'>
          <Loader2 className='mr-2 size-4 animate-spin' />
          데이터를 불러오는 중...
        </div>
      ) : results.length === 0 ? (
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
      ) : (
        <CommandGroup className='max-h-[300px] overflow-y-auto'>
          {hasMoreResults && (
            <p className='flex items-center gap-1 p-2 text-xs text-gray-500'>
              <Info className='size-3.5' /> 검색 결과는 {maxResults}개까지
              표시됩니다.
            </p>
          )}
          {results.map(addr => (
            <CommandItem
              key={addr}
              value={addr}
              className='cursor-pointer'
              onSelect={() => onSelect(addr)}
            >
              <Search className='mr-2 h-4 w-4' />
              {addr}
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default SearchResult;
