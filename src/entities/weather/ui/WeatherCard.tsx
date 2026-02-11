import { useState, useEffect } from 'react';
import { WEATHER_API_KEY } from '@/shared/config/constants';
import type { WeatherResponse } from '../model/types';

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = WEATHER_API_KEY;
  const city = "Seoul";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no&lang=ko`;

        const response = await fetch(url);

        // fetch는 404나 500 에러 시에도 에러를 throw하지 않으므로 직접 체크가 필요합니다.
        if (!response.ok) {
          console.log("네트워크 응답 오류:", response.status, response.statusText);
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 에러가 발생했습니다.');
        }
        console.error("에러 상세:", err);
      }
    };

    fetchWeather();
  }, [API_KEY]);

  if (error) return <div>에러 발생: {error}</div>;
  if (!weather) return <div>데이터를 불러오는 중...</div>;

  const current = weather.current;
  const today = weather.forecast.forecastday[0].day;
  const hourly = weather.forecast.forecastday[0].hour;

  return (
    <div className="mx-auto max-w-[600px] p-5 font-sans">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        {weather.location.name} 실시간 날씨
      </h1>

      {/* 현재 날씨 및 요약 */}
      <section className="mb-8 rounded-2xl bg-blue-50 p-6 shadow-sm ring-1 ring-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-6xl font-extrabold text-blue-900">
              {current.temp_c}°
            </h2>
            <p className="mt-2 text-xl font-medium text-blue-700">
              {current.condition.text}
            </p>
          </div>
          <img
            src={current.condition.icon}
            alt="날씨 아이콘"
            className="w-24"
          />
        </div>

        <div className="mt-5 flex gap-5 font-semibold">
          <span className="flex items-center gap-1 text-red-500">
            <span className="text-sm opacity-70">최고</span> {today.maxtemp_c}°
          </span>
          <span className="flex items-center gap-1 text-blue-500">
            <span className="text-sm opacity-70">최저</span> {today.mintemp_c}°
          </span>
        </div>
      </section>

      {/* 시간대별 예보 */}
      <h3 className="mb-4 text-lg font-bold text-gray-700">시간대별 예보</h3>
      <div className="flex overflow-x-auto pb-4 scrollbar-hide">
        {hourly.map((hour, idx) => (
          <div
            key={idx}
            className="flex min-w-20 flex-col items-center"
          >
            <p className="text-xs text-gray-500">
              {hour.time.split(' ')[1]}
            </p>
            <img
              src={hour.condition.icon}
              alt="시간별 아이콘"
              className="my-1 w-10"
            />
            <p className="font-bold text-gray-800">
              {Math.round(hour.temp_c)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;