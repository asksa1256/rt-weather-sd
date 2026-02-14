import type { FavoriteLocation } from '@/entities/favorites/model/types';
import FavoriteCard from '@/entities/favorites/ui/FavoriteCard';
import { useNavigate } from 'react-router-dom';

interface FavoriteListProps {
  favorites: FavoriteLocation[];
  onCloseDrawer?: () => void;
}

const FavoriteList = ({ favorites, onCloseDrawer }: FavoriteListProps) => {
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

  return (
    <ul className='space-y-4'>
      {favorites.map(fav => (
        <FavoriteCard key={fav.id} fav={fav} onSelect={handleSelectFavorite} />
      ))}
    </ul>
  );
};

export default FavoriteList;
