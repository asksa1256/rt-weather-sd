import { useState, useEffect } from 'react';
import { WEATHER_API_KEY } from '@/shared/config/constants';
import type { WeatherResponse } from '../model/types';
import { useKakaoMap } from '@/shared/lib/hooks/useKakaoMap';

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const { isLoaded } = useKakaoMap();
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const API_KEY = WEATHER_API_KEY;

  useEffect(() => {
    // SDK가 로드되지 않았으면 실행하지 않음
    if (!isLoaded) return;

    if (!("geolocation" in navigator)) {
      setError("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        try {
          // 날씨 데이터 가져오기
          const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no&lang=ko`;
          const weatherRes = await fetch(weatherUrl);
          if (!weatherRes.ok) throw new Error("날씨 데이터를 불러오지 못했습니다.");
          const weatherData = await weatherRes.json();
          setWeather(weatherData);

          // 카카오 API로 한글 지명 가져오기 (UI 표시용)
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2RegionCode(lon, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              // 행정동 주소 추출 (예: 서울특별시 중구)
              const addr = result.find(r => r.region_type === 'H');
              if (addr) setAddress(`${addr.region_1depth_name} ${addr.region_2depth_name}`);
            }
          });

        } catch (err) {
          setError(err instanceof Error ? err.message : "데이터 로드 실패");
        }
      },
      (err) => {
        setError(`위치 접근 거부: ${err.message}`);
      }
    );
  }, [isLoaded, API_KEY]);

  // 로딩 상태
  if (!isLoaded) return <div className="loading">지도 SDK 로딩 중...</div>;
  if (error) return <div className="error-box">{error}</div>;
  if (!weather) return <div className="loading">위치 및 날씨 정보를 불러오는 중...</div>;

  const current = weather.current;
  const today = weather.forecast.forecastday[0].day;
  const hourly = weather.forecast.forecastday[0].hour;

  return (
    <div className="mx-auto max-w-[600px] p-5 font-sans">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        {address || weather.location.name} 실시간 날씨
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