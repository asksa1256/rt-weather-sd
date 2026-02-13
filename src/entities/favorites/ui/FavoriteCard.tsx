import { useWeather } from '@/entities/weather/model/useWeather';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import { Check, Edit, X, Trash } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import type { FavoriteLocation } from '../model/types';
import { Button } from '@/shared/ui/button/button';

interface FavoriteCardProps {
  fav: FavoriteLocation;
  onSelect: (fav: FavoriteLocation) => void;
}

const FavoriteCard = ({ fav, onSelect }: FavoriteCardProps) => {
  const { data: weather, isLoading: isWeatherLoading } = useWeather(fav.coords, fav.address);
  const { updateFavorite, removeFavorite } = useFavorites();

  // 즐겨찾기 선택
  const handleClick = () => {
    if (!isEditing) {
      onSelect(fav);
    }
  };

  // 즐겨찾기 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(fav.name);

  const handleUpdate = (e: MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지

    // 최소 1글자 이상 입력 검사 (공백 제외)
    if (editValue.trim().length < 1) {
      alert('최소 1글자 이상 입력해주세요.');
      return;
    }

    updateFavorite.mutate({ id: fav.id, newName: editValue.trim() });
    setIsEditing(false);
  };

  const toggleEditing = (e: MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    setEditValue(fav.name); // 취소 시 원래 이름으로 복구
  };

  // 즐겨찾기 삭제
  const handleDelete = (e: MouseEvent, name: string) => {
    e.stopPropagation();
    if (!window.confirm(`${name} 즐겨찾기를 삭제하시겠습니까?`)) return;
    removeFavorite.mutate(fav.id);
  }

  // 로딩 스켈레톤
  if (isWeatherLoading) {
    return (
      <li className='cursor-pointer rounded-xl border p-4 animate-pulse'>
        <div className='h-6 w-full bg-gray-200 mb-4 rounded'></div>
        <div className='h-4 w-[60%] bg-gray-200 rounded'></div>
      </li>
    );
  }

  if (weather)
    return (
      <li
        className='flex justify-between cursor-pointer rounded-xl border p-4 transition-shadow hover:shadow-md'
        onClick={handleClick}
      >
        <div className='flex flex-col gap-1'>
          {/* 장소명(별칭): 조회/수정 모드 */}
          <div>
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

                {/* 수정 확인 */}
                <button
                  onClick={handleUpdate}
                  className='text-green-600 hover:text-green-700'
                >
                  <Check size={18} />
                </button>

                {/* 수정 취소 */}
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

            {/* 주소 */}
            <h5 className='text-sm text-gray-500'>주소: {fav.address}</h5>
          </div>

          {/* 기온 */}
          {weather && (
            <div>
              <h6>
                <span className='mr-1 text-sm text-gray-500'>현재 기온:</span>
                <span className='font-bold text-blue-900'>
                  {weather.current.temp_c}°
                </span>
              </h6>

              <div className='flex gap-2 text-sm text-gray-400'>
                <span className='text-blue-500'>
                  최저: {weather.forecast.forecastday[0].day.mintemp_c}°
                </span>
                <span className='text-red-500'>
                  최고: {weather.forecast.forecastday[0].day.maxtemp_c}°
                </span>
              </div>
            </div>
          )}
        </div>

        <Button
          variant='ghost'
          size='icon'
          title='즐겨찾기 삭제'
          onClick={(e) => handleDelete(e, fav.name)}
        >
          <Trash className='size-4 text-gray-500' />
        </Button>
      </li>
    );
};

export default FavoriteCard;
