import type { FavoriteLocation } from '@/entities/favorites/model/types';
import FavoriteCard from '@/entities/favorites/ui/FavoriteCard';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import { useNavigate } from 'react-router-dom';

interface FavoriteListProps {
  onCloseDrawer?: () => void;
}

const FavoriteList = ({ onCloseDrawer }: FavoriteListProps) => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleSelectFavorite = (fav: FavoriteLocation) => {
    onCloseDrawer?.();

    // 즐겨찾기 선택 시 장소 상세 페이지로 이동
    const params = new URLSearchParams({
      lat: fav.coords.lat.toString(),
      lon: fav.coords.lon.toString(),
      address: fav.address,
    });

    navigate(`/weather?${params.toString()}`);
  };

  if (favorites.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-gray-400'>
        <p>등록된 즐겨찾기가 없습니다.</p>
        <p className='text-sm'>장소를 즐겨찾기 해보세요!</p>
      </div>
    );
  }

  return (
    <ul className='space-y-4'>
      {favorites.map(fav => (
        <FavoriteCard key={fav.id} fav={fav} onSelect={handleSelectFavorite} />
      ))}
    </ul>
  );
};

export default FavoriteList;
