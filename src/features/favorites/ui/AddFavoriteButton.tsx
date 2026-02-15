import { useFavorites } from '@/features/favorites/model/useFavorites';
import { cn } from '@/shared/lib/utils/utils';
import { Star } from 'lucide-react';

interface AddFavoriteButtonProps {
  address: string;
  coords: { lat: number; lon: number };
  className?: string;
}

const AddFavoriteButton = ({
  address,
  coords,
  className,
}: AddFavoriteButtonProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorited = favorites.some(fav => fav.address === address);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      const target = favorites.find(fav => fav.address === address);
      if (target) removeFavorite.mutate(target.id);
    } else {
      if (favorites.length >= 6) {
        alert('즐겨찾기는 최대 6개까지만 가능합니다.');
        return;
      }
      addFavorite.mutate({
        id: crypto.randomUUID(),
        address,
        name: address,
        coords,
      });
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={cn(
        'rounded-full p-2 transition-colors hover:bg-gray-100',
        className,
      )}
    >
      <Star
        className={`h-8 w-8 ${isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    </button>
  );
};

export default AddFavoriteButton;
