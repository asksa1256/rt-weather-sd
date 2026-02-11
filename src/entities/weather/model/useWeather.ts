import { useState, useEffect } from 'react';
import type { WeatherResponse } from './types';
import { WEATHER_API_KEY } from '@/shared/config/constants';

export const useWeather = (coords: { lat: number; lon: number } | null) => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { lat, lon } = coords || {};

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no&lang=ko`);
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(`날씨 정보를 불러오는 중 오류가 발생했습니다: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, isLoading, error };
};