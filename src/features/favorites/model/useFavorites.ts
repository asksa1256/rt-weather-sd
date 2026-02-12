import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { FavoriteLocation } from '../../../entities/favorites/model/types';

const STORAGE_KEY = 'weather_favorites';
const MAX_FAVORITES = 6;

export const useFavorites = () => {
  const queryClient = useQueryClient();

  // 즐겨찾기 목록 조회
  const { data: favorites = [] } = useQuery<FavoriteLocation[]>({
    queryKey: ['favorites'],
    queryFn: () => {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    },
  });

  // 즐겨찾기 추가 (낙관적 업데이트)
  const addFavorite = useMutation({
    mutationFn: async (newLocation: FavoriteLocation) => {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (current.length >= MAX_FAVORITES)
        throw new Error('최대 6개까지만 등록 가능합니다.');

      const updated = [...current, newLocation];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },
    onMutate: async newLocation => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previousFavorites = queryClient.getQueryData(['favorites']);

      // 새 데이터 미리 반영
      queryClient.setQueryData<FavoriteLocation[]>(['favorites'], old => [
        ...(old || []),
        newLocation,
      ]);

      return { previousFavorites };
    },
    onError: (err, _, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
      alert(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  // 즐겨찾기 삭제 (낙관적 업데이트)
  const removeFavorite = useMutation({
    mutationFn: async (id: string) => {
      const current = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      ) as FavoriteLocation[];
      const updated = current.filter(fav => fav.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previousFavorites = queryClient.getQueryData(['favorites']);

      queryClient.setQueryData<FavoriteLocation[]>(['favorites'], old =>
        old?.filter(fav => fav.id !== id),
      );

      return { previousFavorites };
    },
    onError: (_err, _, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return { favorites, addFavorite, removeFavorite };
};
