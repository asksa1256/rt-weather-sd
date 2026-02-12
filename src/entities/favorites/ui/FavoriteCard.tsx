import { useWeather } from '@/entities/weather/model/useWeather';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import { Check, Edit, X } from 'lucide-react';
import { useState } from 'react';
import type { FavoriteLocation } from '../model/types';

interface FavoriteCardProps {
  fav: FavoriteLocation;
  onSelect: (fav: FavoriteLocation) => void;
}

const FavoriteCard = ({ fav, onSelect }: FavoriteCardProps) => {
  const { data: weather } = useWeather(fav.coords, fav.address);
  const { updateFavorite } = useFavorites();

  // 즐겨찾기 선택
  const handleClick = () => {
    if (!isEditing) {
      onSelect(fav);
    }
  };

  // 즐겨찾기 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(fav.name);

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지

    // 최소 1글자 이상 입력 검사 (공백 제외)
    if (editValue.trim().length < 1) {
      alert('최소 1글자 이상 입력해주세요.');
      return;
    }

    updateFavorite.mutate({ id: fav.id, newName: editValue.trim() });
    setIsEditing(false);
  };

  const toggleEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    setEditValue(fav.name); // 취소 시 원래 이름으로 복구
  };

  return (
    <li
      className='cursor-pointer rounded-xl border p-4 transition-shadow hover:shadow-md'
      onClick={handleClick}
    >
      <div className='flex flex-col items-start justify-between'>
        {/* 장소명(별칭): 조회/수정 모드 토글 */}
        <div className='mb-2 flex w-full items-center gap-2'>
          {isEditing ? (
            <div
              className='flex w-full items-center gap-2'
              onClick={e => e.stopPropagation()}
            >
              <input
                autoFocus
                className='flex-1 rounded border px-2 py-1 text-sm outline-blue-500'
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onPointerDown={e => e.stopPropagation()}
              />
              <button
                onClick={handleUpdate}
                className='text-green-600 hover:text-green-700'
              >
                <Check size={18} />
              </button>
              <button
                onClick={toggleEditing}
                className='text-red-500 hover:text-red-600'
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <h4 className='truncate text-lg font-bold'>{fav.name}</h4>
              <button
                onClick={toggleEditing}
                className='text-gray-400 hover:text-blue-500'
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>

        {/* 현재 기온 */}
        {weather && (
          <h6>
            <span className='mr-1 text-sm text-gray-500'>현재 기온:</span>
            <span className='font-bold text-blue-900'>
              {weather.current.temp_c}°
            </span>
          </h6>
        )}
      </div>

      {/* 최저/최고 기온 */}
      {weather && (
        <div className='flex gap-2 text-sm text-gray-500'>
          <span className='text-blue-500'>
            최저: {weather.forecast.forecastday[0].day.mintemp_c}°
          </span>
          <span className='text-red-500'>
            최고: {weather.forecast.forecastday[0].day.maxtemp_c}°
          </span>
        </div>
      )}
    </li>
  );
};

export default FavoriteCard;
