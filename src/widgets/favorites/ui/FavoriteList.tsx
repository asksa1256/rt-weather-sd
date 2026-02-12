import FavoriteCard from '@/entities/favorites/ui/FavoriteCard';
import { useFavorites } from '@/features/favorites/model/useFavorites';

const FavoriteList = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-gray-400'>
        <p>등록된 즐겨찾기가 없습니다.</p>
        <p className='text-sm'>장소를 즐겨찾기 해보세요!</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {favorites.map(fav => (
        <FavoriteCard key={fav.id} fav={fav} />
      ))}
    </div>
  );
};

export default FavoriteList;
