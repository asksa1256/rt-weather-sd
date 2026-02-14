import { useWeather } from '@/entities/weather/model/useWeather';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import EditFavoriteNameDialog from '@/features/favorites/ui/EditFavoriteNameDialog';
import { Button } from '@/shared/ui/button/button';
import { Edit, Trash } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import type { FavoriteLocation } from '../model/types';

interface FavoriteCardProps {
  fav: FavoriteLocation;
  onSelect: (fav: FavoriteLocation) => void;
}

const FavoriteCard = ({ fav, onSelect }: FavoriteCardProps) => {
  const { data: weather, isLoading: isWeatherLoading } = useWeather(
    fav.coords,
    fav.address,
  );
  const { updateFavorite, removeFavorite } = useFavorites();

  // 즐겨찾기 수정
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = (newName: string) => {
    updateFavorite.mutate(
      { id: fav.id, newName },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
        },
      },
    );
  };

  // 즐겨찾기 삭제
  const handleDelete = (e: MouseEvent, name: string) => {
    e.stopPropagation();
    if (!window.confirm(`${name} 즐겨찾기를 삭제하시겠습니까?`)) return;
    removeFavorite.mutate(fav.id);
  };

  // 로딩 스켈레톤
  if (isWeatherLoading) {
    return (
      <li className='animate-pulse cursor-pointer rounded-xl border p-4'>
        <div className='mb-4 h-6 w-full rounded bg-gray-200'></div>
        <div className='h-4 w-[60%] rounded bg-gray-200'></div>
      </li>
    );
  }

  if (weather)
    return (
      <>
        <li
          className='flex cursor-pointer justify-between rounded-xl border p-4 transition-shadow hover:shadow-md'
          onClick={() => onSelect(fav)}
        >
          <div className='flex max-w-[80%] flex-col gap-1'>
            {/* 장소명(별칭) */}
            <div>
              <div className='flex items-center gap-2'>
                <h4 className='truncate text-lg font-bold'>{fav.name}</h4>
                <Button
                  variant='ghost'
                  size='icon'
                  title='즐겨찾기 수정'
                  className='size-4 text-gray-400 hover:text-blue-500'
                  onClick={handleEditModalOpen}
                >
                  <Edit size={16} />
                </Button>
              </div>

              {/* 주소 */}
              <h5 className='text-sm break-keep text-gray-500'>
                <span className='hidden sm:inline-block'>주소:</span>{' '}
                {fav.address}
              </h5>
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
            className='group size-7'
            onClick={e => handleDelete(e, fav.name)}
          >
            <Trash className='size-4 text-gray-400 group-hover:text-red-400' />
          </Button>
        </li>

        {isEditModalOpen && (
          <EditFavoriteNameDialog
            initialName={fav.name}
            open={isEditModalOpen}
            isSubmitting={updateFavorite.isPending}
            onClose={() => setIsEditModalOpen(false)}
            onConfirm={handleConfirmEdit}
          />
        )}
      </>
    );
};

export default FavoriteCard;
