import { WEATHER_API_KEY } from '@/shared/config/constants';
import type { WeatherResponse } from './types';

export const fetchWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherResponse> => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no&lang=ko`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('날씨 데이터를 불러오지 못했습니다.');
  }

  return response.json();
};
