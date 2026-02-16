# 지역별 날씨 정보 조회 서비스

## ⛅ 프로젝트 개요

날씨 API를 활용해 지역별 날씨 정보를 조회하는 웹 애플리케이션입니다.
현재 위치와 지역별 날씨를 확인할 수 있고, 즐겨찾기 등록으로 자주 찾는 장소들의 날씨를 모아볼 수 있습니다.


## 1️⃣ 주요 기능
- 날씨 조회
  - 현재 기온, 당일 최저 기온, 당일 최고 기온, 시간대 별 기온 조회
- 장소 즐겨찾기 
- 날씨 상세 조회

## 2️⃣ 구현 기능 상세
#### ✅ 날씨 조회
<details>
  <summary>앱 첫 진입 시 사용자의 현재 위치를 감지하여 그 위치의 날씨 정보를 보여줍니다.</summary>
  <video src="https://github.com/user-attachments/assets/f650c7bf-0f65-4abe-bf81-de2ee16ad779" controls width="100%">
      Your browser does not support the video tag.
  </video>
</details>

<details>
  <summary>유저가 원하는 장소를 검색(기초자치단체, 구, 동에 상관없이 검색 가능)하고 그 장소의 날씨 정보를 조회합니다. </summary>
  <video src="https://github.com/user-attachments/assets/f459c088-3e21-4401-a2a1-5372b815648e" controls width="100%">
      Your browser does not support the video tag.
  </video>
</details>

<details>
  <summary>해당 장소의 날씨 정보가 없는 경우 “해당 장소의 정보가 제공되지 않습니다.” 를 UI에 명시합니다. </summary>
  <video src="https://github.com/user-attachments/assets/1f5c4fc8-32dd-4c61-aa6c-5cf62c87b404" controls width="100%">
      Your browser does not support the video tag.
  </video>
</details>

#### ✅ 장소 즐겨찾기
<details>
  <summary>즐겨찾기에는 최대 6개의 장소를 추가할 수 있고, 추가한 장소는 카드 UI 형태로 등록됩니다.<br/>
    즐겨찾기에 추가된 장소 카드에는 현재 날씨 정보, 당일의 기온(최저, 최고)을 보여줍니다.
  </summary>
  <video src="https://github.com/user-attachments/assets/854be831-401d-480b-b534-6f02dd4a13f3" controls width="100%">
      Your browser does not support the video tag.
  </video>
</details>


<details>
  <summary>즐겨찾기에 추가된 장소의 이름(별칭)을 수정할 수 있습니다. </summary>
  <video src="https://github.com/user-attachments/assets/3741947a-262e-4a51-a895-3bb2f458154c" controls width="100%">
      Your browser does not support the video tag.
  </video>
</details>

<details>
  <summary>즐겨찾기 카드를 클릭하면 해당 장소의 상세 페이지로 이동하고, 상세 페이지에 날씨 정보를 표시합니다.</summary>
  <video src="https://github.com/user-attachments/assets/9ef45c6c-41c4-4d3a-97ab-fe2549785547" controls width="100%">
      Your browser does not support the video tag.
  </video>
</details>


## 3️⃣ 기술적 의사결정
#### ✅ 장소 검색 시, 최대 노출 갯수 30개 제한 
- Situation: 검색할 때마다 대량의 주소 데이터(`korea_districts.json`) 전체를 필터링할 경우, 처리가 오래 걸려 화면이 멈춘 듯한 렌더링 지연 현상이 발생
- Action: 필터링 결과가 최대 노출 갯수를 넘어갈 경우, 상위 30개 결과만 보여주고 안내 문구를 표시하여 사용자의 구체적 지명 입력 유도
- Result: 검색 결과 렌더링 지연 문제 해결
  
<details>
  <summary>Before:</summary>
  <img src="https://github.com/user-attachments/assets/df2e9859-4f4b-4f20-9b7c-ee522053162b" alt="" />
</details>
    
<details>
  <summary>After:</summary>
  <img src="https://github.com/user-attachments/assets/172bc585-9207-47c5-b973-185dfa51285d" alt="" />
</details>
  
#### ✅ 주소 검색 시 URL 파라미터 활용
- 날씨 데이터가 있는 장소의 좌표값과 주소명이 `/weather` 상세 페이지에 쿼리 파라미터로 추가되도록 하여, 새로고침 후에도 사용자가 보고 있던 페이지 유지
  
#### ✅ 현재 위치: 세션 스토리지 활용
- 앱 진입 시 현재 위치를 세션 스토리지에 저장하여, 전역적으로 현재 위치 정보를 저장하고 새로고침 후에도 사용자의 현재 위치 유지
- 사용자가 탭을 닫았을 때만 현재 위치가 초기화 됩니다.
  
#### ✅ 쿼리 키 관리:
- 장소별 날씨 데이터는 `weather`, 좌표 데이터는 `coords` 쿼리 키로 관리 (좌표 데이터의 경우, 해당 위치를 국내 지명으로 변환 시 카카오맵 api 요청 횟수를 최적화하기 위해 설정)
- 쿼리 키 파라미터로 좌표값 대신 '주소값' 지정
  - Situation: 브라우저가 받은 좌표값과 카카오맵 api가 리턴하는 좌표값이 달라서, 좌표값을 쿼리 키 파라미터로 담을 경우 '동일한 장소의 좌표 쿼리 키가 2개로 분할되는 문제' 발생
  - Action: 장소별 날씨, 좌표 데이터를 `[weather, '서울특별시']`, `[coords, '서울특별시']` 형태의 쿼리 키로 저장
  - Result: 장소별 날씨, 좌표 쿼리 키를 1개씩 관리하여 상태 일관성 유지 
   
#### ✅ 기능별 리액트 쿼리 전략
- 날씨 조회: `useQuery 'weather'` 쿼리 키로 장소별 날씨 30분 간 캐싱
  - 날씨 정보는 자주 바뀌지 않으므로 `staleTime`을 길게 설정
- 국내 지명 조회(좌표 → 주소 변환): 동일한 장소를 국내 지명으로 매번 새로 변환할 필요가 없으므로, `useQuery 'coords'` 쿼리 키로 주소별 국내 지명 캐싱
  - 좌표 데이터는 변하지 않는 고정 값이므로 `staleTime`을 `Infinity`로 설정
- 즐겨찾기: `useQuery 'favorites'` 쿼리 키로 장소 즐겨찾기 캐싱
  - 사용자가 직접 등록/수정/삭제하므로, `useMutation`으로 낙관적 업데이트
  - 로컬 스토리지에서 불러오기 때문에 `staleTime`을 `Infinity`로 설정 (`invalidateQueries`로만 갱신)

## 4️⃣ 기술 스택
- `React.js`: 컴포넌트 기반 선언적 UI 개발
- `TypeScript`: 런타임 에러 방지 및 정적 타이핑을 통한 코드 안정성 확보
- `Tailwind CSS`: 유틸리티 클래스 기반의 개발 생산성 향상
- `React Query`: 날씨 API, 카카오맵 API에서 받아온 날씨, 좌표 서버 데이터 관리
- `React Router DOM`: SPA 구현을 위한 클라이언트 사이드 라우팅
- `Shadcn/ui`: Button, Dialog와 같은 공용 컴포넌트의 개발 생산성과 접근성 확보
- `Vite`: 빠른 빌드 및 HMR(Hot Module Refresh) 지원 도구
- `Vercel`: GitHub 연동 배포
- `pnpm`: 효율적 의존성 관리를 위한 패키지 매니저
- 외부 API
  - 날씨 API: `weatherapi.com`
    - 좌표별 날씨 데이터 조회
  - Geocoding API: `카카오맵 API`
    - 좌표를 국내 지명으로 변환(weatherapi가 반환하는 날씨 데이터의 영어 주소명에 대응)
    - 주소 검색 시 좌표로 변환

## 5️⃣ 폴더 구조
- FSD 아키텍처 사용
```
src/
├── app/                  # App 레이어: 애플리케이션 진입점 및 전역 설정
│   ├── providers/        # QueryClient 전역 Provider 
│   ├── App.tsx           # 라우팅 및 레이아웃 구성
│   └── main.tsx          # 리액트 마운트 지점
│
├── pages/                # Pages 레이어: 라우팅 진입점, widgets 조합 계층
│   ├── home/             # 메인 
│   ├── weather-detail/   # 날씨 상세 
│   └── not-found/        # 404 페이지
│
├── widgets/              # Widgets 레이어: entities + features를 조합한 독립적인 UI 블록
│   ├── favorites/        # 즐겨찾기 위젯
│   └── weather/          # 날씨 정보 표시 위젯
│
├── features/             # Features 레이어: 사용자 행동(인터랙션) 중심 기능 단위 컴포넌트
│   ├── favorites/        # 즐겨찾기 추가/삭제 (model, ui)
│   └── search-location/  # 위치 검색 (model, ui)
│
├── entities/             # Entities 레이어: 도메인 개념 단위 컴포넌트
│   ├── favorites/        
│   └── weather/          
│
└── shared/               # Shared 레이어: 비즈니스 의미가 없는 범용 모듈 (UI, 유틸, 설정 등)
    ├── config/           # 상수, 주소 데이터 json 파일
    ├── lib/              # 공통 hooks, 유틸리티 함수
    ├── types/            # 전역 타입 정의 
    └── ui/               # 공통 UI 컴포넌트 (Button, Dialog 등)
```

## 6️⃣ 상태 관리 다이어그램
<img width="1472" height="1418" alt="상태관리 다이어그램" src="https://github.com/user-attachments/assets/13630fdd-cd6a-47e8-9775-a23f9ffcf4df" />


## 7️⃣ 프로젝트 실행 방법

이 프로젝트는 **pnpm**을 패키지 매니저로 사용합니다.

1. 프로젝트를 클론하고, 의존성을 설치한 뒤 실행합니다.

```
git clone [https://github.com/asksa1256/rt-weather-sd.git](https://github.com/asksa1256/rt-weather-sd.git)
cd rt-weather-sd
pnpm install
```

2. 루트 디렉토리에 `.env` 파일을 생성하고, 환경 변수를 입력합니다.
- weatherapi.com API 키:
```
VITE_WEATHER_KEY=your_weatherapi_key
```

- Kakao Maps API 키:
```
VITE_KAKAO_MAP_KEY=your_kakao_map_api_key
```

3. 개발 서버를 실행합니다. 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.
```
pnpm dev
```
