import { Loader2, X } from 'lucide-react';

interface SearchStatusProps {
  isLoading: boolean;
  hasInput: boolean;
  onClear: () => void;
}

const SearchStatus = ({ isLoading, hasInput, onClear }: SearchStatusProps) => {
  if (isLoading) {
    return (
      <div className='absolute top-1/2 right-3 -translate-y-1/2'>
        <Loader2 className='size-5 animate-spin text-gray-400' />
      </div>
    );
  }

  if (hasInput) {
    return (
      <button
        type='button'
        aria-label='검색어 초기화'
        className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 z-10 -translate-y-1/2 p-1 transition-colors'
        onClick={() => onClear()}
      >
        <X className='size-5' />
      </button>
    );
  }

  return null;
};

export default SearchStatus;
