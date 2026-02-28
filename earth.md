# PRD: 예견 글로브 — 실시간 예측 마켓 지구본 시각화

## 1. 개요

### 1.1 한 줄 정의

예견(Yegeon) 플랫폼의 예측 마켓 데이터를 3D 지구본 위에 실시간으로 시각화하고, 거래 발생 시 네온 빔 효과로 표현하는 인터랙티브 글로브 페이지.

### 1.2 레퍼런스

- PizzINT Polyglobe (https://www.pizzint.watch/polyglobe) — Polymarket 거래를 지구본 위에 "orbital laser beam"으로 시각화
- MapLibre GL JS Globe Projection 예제 (https://maplibre.org/maplibre-gl-js/docs/examples/)

### 1.3 목표

- 예견 플랫폼의 예측 마켓을 지리적 위치 기반으로 글로브에 매핑
- 실시간 거래(베팅) 발생 시 네온 빔 애니메이션으로 시각적 피드백
- 마켓 클릭 시 상세 정보 카드 표시
- "운영 상황실" 느낌의 몰입감 있는 대시보드 제공

---

## 2. 기술 스택

### 2.1 기존 프로젝트 스택 (예견)

| 영역       | 기술                     |
| ---------- | ------------------------ |
| Framework  | Next.js 14+ (App Router) |
| Language   | TypeScript               |
| UI Library | MUI v5                   |
| 상태 관리  | Zustand + TanStack Query |
| ORM        | Prisma                   |
| DB         | SQLite                   |
| 배포       | Ubuntu VPS               |

### 2.2 글로브 기능 추가 스택

| 영역        | 기술               | 용도                                  |
| ----------- | ------------------ | ------------------------------------- |
| 지도 렌더링 | MapLibre GL JS v5+ | 3D Globe projection, 벡터 타일 렌더링 |
| 3D 그래픽   | Three.js (r170+)   | 빔 효과 렌더링용 Custom Layer         |
| 실시간 통신 | WebSocket (native) | 거래 이벤트 실시간 수신               |
| 타일 소스   | 무료 타일 서버     | 위성/다크 스타일 지구본 베이스맵      |

### 2.3 패키지 설치

```bash
npm install maplibre-gl three @types/three
```

---

## 3. 기능 명세

### 3.1 Phase 1 — 기본 글로브 + 마켓 포인트 (1주)

#### 3.1.1 글로브 렌더링

- MapLibre GL JS의 Globe Projection으로 3D 지구본 표시
- 다크 테마 위성 배경 (eox.at 무료 위성 타일 또는 CARTO dark-matter)
- 대기(atmosphere) 효과 활성화
- 배경색 `#000000` (우주 느낌)

```typescript
// 핵심 설정 구조
const map = new maplibregl.Map({
  container: "globe-container",
  zoom: 1.5,
  center: [127, 37], // 한국 중심 초기 뷰
  style: {
    version: 8,
    projection: { type: "globe" },
    sources: {
      satellite: {
        tiles: [
          "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
        ],
        type: "raster",
      },
    },
    layers: [{ id: "satellite", type: "raster", source: "satellite" }],
    sky: {
      "atmosphere-blend": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        5,
        1,
        7,
        0,
      ],
    },
    light: { anchor: "map", position: [1.5, 90, 80] },
  },
});
```

#### 3.1.2 마켓 포인트 표시

- 각 예측 마켓의 위치(경위도)를 GeoJSON 소스로 등록
- circle 레이어로 포인트 표시
- 색상: 마켓 상태에 따라 구분
  - 활성(진행중): `#00ff88` (네온 그린)
  - 종료(resolved): `#666666` (회색)
  - 핫(거래량 많음): `#ff4444` (레드) + 펄스 애니메이션
- 크기: 거래량(volume) 비례 스케일링 (최소 6px ~ 최대 20px)
- 호버 시 마켓명 툴팁

```typescript
// GeoJSON 소스 구조
interface MarketGeoJSON {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number]; // [lng, lat]
    };
    properties: {
      id: string;
      title: string;
      probability: number; // 0~1
      volume: number; // 총 거래량
      status: "active" | "resolved";
      category: string; // 정치, 경제, 스포츠, 기술 등
      country: string;
      lastTradeAt: string; // ISO timestamp
    };
  }>;
}
```

#### 3.1.3 마켓 상세 카드

- 마켓 포인트 클릭 시 팝업/사이드 카드 표시
- 표시 정보: 마켓명, 현재 확률, 거래량, 최근 거래, 카테고리
- MUI Card 컴포넌트 기반, 글래스모피즘 스타일
- 드래그 가능 (Polyglobe처럼)

#### 3.1.4 카테고리 필터

- 상단 또는 좌측에 카테고리 필터 칩
- 카테고리: 정치, 경제, 스포츠, 기술, 사회, 문화
- 다중 선택 가능
- 필터 적용 시 GeoJSON 소스 업데이트

### 3.2 Phase 2 — 실시간 빔 효과 (1주)

#### 3.2.1 WebSocket 연결

- 예견 API 서버에서 거래 이벤트를 WebSocket으로 브로드캐스트
- 이벤트 페이로드:

```typescript
interface TradeEvent {
  id: string;
  marketId: string;
  type: "YES" | "NO"; // YES=매수(긍정), NO=매도(부정)
  amount: number; // 거래 금액 (포인트)
  probability: number; // 거래 후 확률
  location: [number, number]; // [lng, lat]
  timestamp: string;
}
```

- 연결 끊김 시 자동 재연결 (exponential backoff)
- 연결 상태 표시 (하단 인디케이터)

#### 3.2.2 네온 빔 렌더링 (핵심 기능)

MapLibre의 `CustomLayerInterface` + Three.js를 조합하여 구현.

**빔 동작 규칙:**
| 거래 타입 | 빔 방향 | 색상 |
|-----------|---------|------|
| YES (긍정 베팅) | 우주 → 지표 (하강) | `#00ff88` (네온 그린) |
| NO (부정 베팅) | 지표 → 우주 (상승) | `#ff4466` (네온 레드) |

**빔 속성:**
| 속성 | 로직 |
|------|------|
| 두께 | `Math.max(2, Math.log2(amount) * 1.5)` px — 금액에 비례 |
| 지속시간 | 소액(< 100): 500ms / 중간(100~1000): 1000ms / 대형(> 1000): 2000ms |
| 높이 | 지표에서 카메라 기준 약 2~5배 지구 반지름 높이까지 |
| 불투명도 | 시작 1.0 → 종료 0.0 (ease-out 감쇠) |
| Glow | Additive blending으로 네온 발광 효과 |

**구현 접근 (Three.js Custom Layer):**

```typescript
// 핵심 구조 — MapLibre Custom Layer + Three.js
const beamLayer: maplibregl.CustomLayerInterface = {
  id: "beam-layer",
  type: "custom",
  renderingMode: "3d",

  onAdd(map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    });
    this.renderer.autoClear = false;
    this.map = map;
    this.activeBeams = [];
  },

  render(gl, args) {
    // 1. MapLibre의 projection matrix를 Three.js 카메라에 동기화
    const m = new THREE.Matrix4().fromArray(
      args.defaultProjectionData.mainMatrix,
    );
    this.camera.projectionMatrix = m;

    // 2. 활성 빔 업데이트 및 렌더링
    const now = Date.now();
    this.activeBeams = this.activeBeams.filter((beam) => {
      const progress = (now - beam.startTime) / beam.duration;
      if (progress >= 1) {
        this.scene.remove(beam.mesh);
        beam.mesh.geometry.dispose();
        beam.mesh.material.dispose();
        return false;
      }
      // 빔 애니메이션 업데이트
      updateBeamAnimation(beam, progress);
      return true;
    });

    this.renderer.resetState();
    this.renderer.render(this.scene, this.camera);
  },
};
```

**빔 지오메트리 생성:**

```typescript
function createBeam(trade: TradeEvent): BeamMesh {
  const mercator = maplibregl.MercatorCoordinate.fromLngLat({
    lng: trade.location[0],
    lat: trade.location[1],
  });

  // 빔 = 얇은 실린더 또는 Line2
  const height = mercator.meterInMercatorCoordinateUnits() * 500000; // ~500km 높이
  const geometry = new THREE.CylinderGeometry(
    0.00001 * Math.log2(trade.amount), // 상단 반지름
    0.00003 * Math.log2(trade.amount), // 하단 반지름
    height,
    8, // segments
  );

  const material = new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      u_color: {
        value: new THREE.Color(trade.type === "YES" ? 0x00ff88 : 0xff4466),
      },
      u_progress: { value: 0.0 },
      u_direction: { value: trade.type === "YES" ? -1.0 : 1.0 },
    },
    vertexShader: BEAM_VERTEX_SHADER,
    fragmentShader: BEAM_FRAGMENT_SHADER,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(mercator.x, mercator.y, mercator.z || 0);

  return {
    mesh,
    startTime: Date.now(),
    duration: getBeamDuration(trade.amount),
    trade,
  };
}
```

**빔 셰이더 (Fragment):**

```glsl
// BEAM_FRAGMENT_SHADER
uniform vec3 u_color;
uniform float u_progress;
uniform float u_direction;
varying float v_height; // 0.0 = 지표, 1.0 = 끝

void main() {
  // 빔 진행 방향에 따른 알파
  float headPosition = u_direction > 0.0
    ? u_progress           // 상승: 아래→위
    : 1.0 - u_progress;    // 하강: 위→아래

  // 빔 헤드 주변만 밝게
  float distFromHead = abs(v_height - headPosition);
  float alpha = smoothstep(0.3, 0.0, distFromHead);

  // 중심부 밝게, 가장자리 페이드
  alpha *= (1.0 - u_progress); // 전체적으로 페이드아웃

  // Glow 효과
  float glow = exp(-distFromHead * 5.0) * 0.5;
  alpha += glow;

  gl_FragColor = vec4(u_color, alpha * 0.8);
}
```

#### 3.2.3 화면 밖 거래 표시

- 현재 뷰포트 밖에서 발생한 거래는 화면 가장자리에 글로우 림(glow rim)으로 표시
- 방향: 거래 발생 위치 방향의 화면 가장자리
- 색상: 거래 타입에 따라 그린/레드
- CSS radial-gradient 오버레이로 구현 (Canvas 불필요)

```typescript
function getEdgeGlowPosition(
  tradeLngLat: [number, number],
  map: maplibregl.Map,
): EdgeGlow | null {
  const point = map.project(tradeLngLat);
  const canvas = map.getCanvas();
  const w = canvas.width;
  const h = canvas.height;

  // 화면 안이면 null
  if (point.x >= 0 && point.x <= w && point.y >= 0 && point.y <= h) return null;

  // 화면 가장자리 좌표 계산
  const centerX = w / 2;
  const centerY = h / 2;
  const angle = Math.atan2(point.y - centerY, point.x - centerX);

  return {
    x: centerX + Math.cos(angle) * (w / 2),
    y: centerY + Math.sin(angle) * (h / 2),
    angle,
    color: trade.type === "YES" ? "#00ff88" : "#ff4466",
  };
}
```

#### 3.2.4 거래 피드 (사이드패널)

- 우측에 최근 거래 실시간 피드 (최대 50개)
- 각 항목: 마켓명, 금액, YES/NO, 시간
- 새 거래 시 상단에 슬라이드인 애니메이션
- 항목 클릭 시 해당 마켓으로 글로브 flyTo

### 3.3 Phase 3 — 고급 기능 (1주)

#### 3.3.1 히트맵 모드

- 토글로 히트맵 표시 전환
- 최근 N시간 거래량 기준 히트맵 오버레이
- MapLibre의 heatmap 레이어 사용

#### 3.3.2 통계 오버레이

- 좌측 하단: 현재 활성 마켓 수, 24시간 거래량, 실시간 거래 속도 (TPS)
- 글래스모피즘 스타일 카드

#### 3.3.3 자동 회전

- 아이들 상태(터치/마우스 없음 30초) 시 지구본 자동 회전
- 사용자 인터랙션 시 즉시 중단

#### 3.3.4 시간대 슬라이더

- 하단에 타임라인 슬라이더
- 과거 N시간 거래를 리플레이

---

## 4. 데이터 모델

### 4.1 DB 스키마 (Prisma — 추가분)

```prisma
// 마켓에 위치 정보 추가
model Market {
  // ... 기존 필드
  latitude   Float?
  longitude  Float?
  country    String?
  // ... 기존 관계
}

// 거래 로그 (빔 효과용)
model Trade {
  id          String   @id @default(cuid())
  marketId    String
  market      Market   @relation(fields: [marketId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        String   // 'YES' | 'NO'
  amount      Int      // 포인트
  probability Float    // 거래 후 확률
  createdAt   DateTime @default(now())

  @@index([marketId, createdAt])
  @@index([createdAt])
}
```

### 4.2 API 엔드포인트 (추가분)

```
GET  /api/globe/markets          — 글로브 표시용 마켓 GeoJSON
GET  /api/globe/markets/:id      — 마켓 상세 (팝업 카드용)
GET  /api/globe/stats            — 글로브 통계 (활성 마켓 수, 24h 거래량 등)
WS   /api/globe/trades           — 실시간 거래 이벤트 스트림
GET  /api/globe/heatmap?hours=24 — 히트맵용 집계 데이터
```

---

## 5. 컴포넌트 구조 (FSD 아키텍처)

```
src/
├── app/
│   └── globe/
│       └── page.tsx                    # 글로브 페이지 라우트
│
├── widgets/
│   └── globe-dashboard/
│       ├── ui/
│       │   └── GlobeDashboard.tsx      # 글로브 + 사이드패널 + 오버레이 조립
│       └── index.ts
│
├── features/
│   ├── globe-map/
│   │   ├── ui/
│   │   │   ├── GlobeMap.tsx            # MapLibre 글로브 핵심 컴포넌트
│   │   │   ├── GlobeControls.tsx       # 줌/회전/필터 컨트롤
│   │   │   └── CategoryFilter.tsx      # 카테고리 필터 칩
│   │   ├── lib/
│   │   │   ├── mapSetup.ts            # MapLibre 초기화 설정
│   │   │   ├── beamLayer.ts           # Three.js 빔 커스텀 레이어
│   │   │   ├── beamShaders.ts         # GLSL 셰이더 코드
│   │   │   ├── beamAnimation.ts       # 빔 생성/업데이트/소멸 로직
│   │   │   └── edgeGlow.ts            # 화면 밖 거래 글로우 계산
│   │   ├── model/
│   │   │   ├── types.ts               # Globe 관련 타입
│   │   │   ├── useGlobeStore.ts       # Zustand — 글로브 상태 (필터, 선택 마켓 등)
│   │   │   └── useTradeWebSocket.ts   # WebSocket 훅
│   │   ├── api/
│   │   │   └── globeApi.ts            # API 호출 함수
│   │   └── index.ts
│   │
│   ├── trade-feed/
│   │   ├── ui/
│   │   │   ├── TradeFeed.tsx           # 실시간 거래 피드 패널
│   │   │   └── TradeItem.tsx           # 개별 거래 항목
│   │   └── index.ts
│   │
│   └── market-detail/
│       ├── ui/
│       │   └── MarketDetailCard.tsx     # 마켓 상세 팝업 카드
│       └── index.ts
│
├── entities/
│   ├── market/
│   │   ├── model/
│   │   │   └── market.ts              # Market 엔티티 타입
│   │   └── ui/
│   │       └── MarketBadge.tsx         # 마켓 상태 배지
│   └── trade/
│       └── model/
│           └── trade.ts               # Trade 엔티티 타입
│
└── shared/
    ├── lib/
    │   └── websocket.ts               # WebSocket 유틸리티 (재연결 로직)
    └── ui/
        ├── GlassmorphismCard/         # 글래스모피즘 MUI 카드
        └── PulseIndicator/            # 연결 상태 표시
```

---

## 6. 핵심 구현 가이드

### 6.1 MapLibre Globe 기본 설정

참고 예제: `display-a-globe-with-an-atmosphere` + `display-a-globe-with-a-vector-map`

```typescript
// features/globe-map/lib/mapSetup.ts
import maplibregl from "maplibre-gl";

export function initGlobe(container: HTMLElement): maplibregl.Map {
  const map = new maplibregl.Map({
    container,
    zoom: 1.5,
    center: [127, 37],
    pitch: 0,
    antialias: true,
    style: {
      version: 8,
      projection: { type: "globe" },
      sources: {
        // 다크 위성 타일 (무료)
        satellite: {
          tiles: [
            "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
          ],
          type: "raster",
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "satellite",
          type: "raster",
          source: "satellite",
          paint: {
            "raster-brightness-max": 0.4, // 어둡게 처리 (군사 느낌)
            "raster-contrast": 0.3,
            "raster-saturation": -0.5,
          },
        },
      ],
      sky: {
        "atmosphere-blend": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          5,
          1,
          7,
          0,
        ],
      },
      light: {
        anchor: "map",
        position: [1.5, 90, 80],
      },
    },
  });

  // 마켓 소스/레이어 추가
  map.on("style.load", () => {
    addMarketLayers(map);
    addBeamLayer(map);
  });

  return map;
}
```

### 6.2 Three.js Custom Layer 등록

참고 예제: `add-a-3d-model-to-globe-using-threejs`

```typescript
// features/globe-map/lib/beamLayer.ts
import * as THREE from "three";
import maplibregl from "maplibre-gl";
import { BEAM_VERTEX_SHADER, BEAM_FRAGMENT_SHADER } from "./beamShaders";

interface ActiveBeam {
  mesh: THREE.Mesh;
  startTime: number;
  duration: number;
  trade: TradeEvent;
}

export function createBeamLayer(): maplibregl.CustomLayerInterface {
  let camera: THREE.Camera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let map: maplibregl.Map;
  let activeBeams: ActiveBeam[] = [];

  return {
    id: "beam-layer",
    type: "custom",
    renderingMode: "3d", // 필수: globe depth buffer 사용

    onAdd(_map, gl) {
      map = _map;
      camera = new THREE.Camera();
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });
      renderer.autoClear = false;
    },

    render(gl, args) {
      // MapLibre projection → Three.js camera 동기화
      camera.projectionMatrix = new THREE.Matrix4().fromArray(
        args.defaultProjectionData.mainMatrix,
      );

      // 빔 업데이트
      const now = Date.now();
      activeBeams = activeBeams.filter((beam) => {
        const progress = (now - beam.startTime) / beam.duration;
        if (progress >= 1.0) {
          scene.remove(beam.mesh);
          beam.mesh.geometry.dispose();
          (beam.mesh.material as THREE.ShaderMaterial).dispose();
          return false;
        }
        // 셰이더 uniform 업데이트
        (beam.mesh.material as THREE.ShaderMaterial).uniforms.u_progress.value =
          progress;
        return true;
      });

      renderer.resetState();
      renderer.render(scene, camera);

      // 다음 프레임 요청 (빔이 있을 때만)
      if (activeBeams.length > 0) {
        map.triggerRepaint();
      }
    },

    // 외부에서 빔 추가
    addBeam(trade: TradeEvent) {
      const beam = createBeamMesh(trade, map);
      scene.add(beam.mesh);
      activeBeams.push(beam);
      map.triggerRepaint();
    },
  };
}
```

### 6.3 WebSocket 연결

```typescript
// features/globe-map/model/useTradeWebSocket.ts
import { useEffect, useRef, useCallback } from "react";
import { useGlobeStore } from "./useGlobeStore";

export function useTradeWebSocket(onTrade: (trade: TradeEvent) => void) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number>(0);
  const setConnectionStatus = useGlobeStore((s) => s.setConnectionStatus);

  const connect = useCallback(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/api/globe/trades`,
    );

    ws.onopen = () => {
      setConnectionStatus("connected");
      reconnectTimeoutRef.current = 0; // 리셋
    };

    ws.onmessage = (event) => {
      const trade: TradeEvent = JSON.parse(event.data);
      onTrade(trade);
    };

    ws.onclose = () => {
      setConnectionStatus("disconnected");
      // Exponential backoff 재연결
      const delay = Math.min(1000 * 2 ** reconnectTimeoutRef.current, 30000);
      reconnectTimeoutRef.current++;
      setTimeout(connect, delay);
    };

    ws.onerror = () => ws.close();
    wsRef.current = ws;
  }, [onTrade, setConnectionStatus]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);
}
```

### 6.4 서버사이드 WebSocket (Next.js API Route)

```typescript
// app/api/globe/trades/route.ts
// Next.js는 기본적으로 WebSocket을 지원하지 않으므로,
// 별도 WS 서버를 운영하거나 아래 방식 중 택 1:
//
// Option A: 별도 ws 서버 (추천 — VPS 배포이므로)
//   - server.ts에서 ws 패키지로 WebSocket 서버 구동
//   - 거래 발생 시 모든 연결된 클라이언트에 broadcast
//
// Option B: SSE (Server-Sent Events) 폴백
//   - Next.js Route Handler에서 ReadableStream 반환
//   - 단방향이지만 구현 간단
//
// Option C: Supabase Realtime (향후 DB 마이그레이션 시)

// === Option A 예시 (별도 server.ts) ===
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3001 });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

// 거래 발생 시 호출
export function broadcastTrade(trade: TradeEvent) {
  const data = JSON.stringify(trade);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
```

---

## 7. UI/UX 가이드

### 7.1 레이아웃

```
┌─────────────────────────────────────────────────────────────┐
│ [카테고리 필터 칩] [정치] [경제] [스포츠] [기술] [전체]       │
├──────────────────────────────────┬──────────────────────────┤
│                                  │  실시간 거래 피드         │
│                                  │  ┌────────────────────┐  │
│        3D 글로브                 │  │ 🟢 한국 대선 2027   │  │
│        (전체 화면)               │  │    YES 500p  12:03  │  │
│                                  │  │ 🔴 비트코인 $200K   │  │
│                                  │  │    NO 200p   12:02  │  │
│                                  │  │ ...                  │  │
│                                  │  └────────────────────┘  │
├──────────────────────────────────┴──────────────────────────┤
│ [활성 마켓: 128] [24h 거래량: 45,230] [TPS: 2.3]  🟢연결중 │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 색상 팔레트

| 용도             | 색상      | HEX                      |
| ---------------- | --------- | ------------------------ |
| 배경 (우주)      | 검정      | `#000000`                |
| YES 빔/포인트    | 네온 그린 | `#00ff88`                |
| NO 빔/포인트     | 네온 레드 | `#ff4466`                |
| 활성 마켓 포인트 | 시안      | `#00d4ff`                |
| 핫 마켓 포인트   | 오렌지    | `#ff8800`                |
| 텍스트           | 흰색      | `#ffffff`                |
| 서브텍스트       | 회색      | `#888888`                |
| 카드 배경        | 글래스    | `rgba(20, 20, 40, 0.8)`  |
| 카드 보더        | 네온 블루 | `rgba(0, 150, 255, 0.3)` |

### 7.3 애니메이션

- 글로브 로딩: 0.5초간 줌인 (zoom 0 → 1.5)
- 마켓 flyTo: `map.flyTo({ center, zoom: 4, duration: 1500 })`
- 빔: 커스텀 셰이더 애니메이션 (6.2 참조)
- 거래 피드: MUI Slide transition
- 필터 전환: 포인트 opacity 0→1 (300ms ease)

---

## 8. 성능 고려사항

### 8.1 최적화 전략

- 빔 메시 풀링: 최대 50개 동시 빔 제한, 초과 시 가장 오래된 것부터 제거
- GeoJSON 업데이트: `map.getSource('markets').setData()` 배치 처리 (100ms 디바운스)
- Three.js geometry 재사용: CylinderGeometry를 미리 생성해두고 clone하여 사용
- WebSocket 메시지 throttle: 초당 최대 30개 이벤트 처리 (나머지 큐잉)
- 뷰포트 밖 마켓 포인트는 symbol 레이어에서 자동 컬링 (MapLibre 내장)
- globe projection 자체의 backface culling으로 지구 뒷면 렌더링 제외

### 8.2 메모리 관리

- 빔 소멸 시 geometry.dispose() + material.dispose() 필수 호출
- 거래 피드 최대 50개 유지, 초과 시 하단부터 제거
- 히트맵 데이터 캐싱 (5분 TTL)

### 8.3 목표 성능

| 지표               | 목표    |
| ------------------ | ------- |
| FPS (빔 10개 동시) | ≥ 30fps |
| FPS (유휴 상태)    | ≥ 60fps |
| 초기 로딩          | < 3초   |
| WebSocket 지연     | < 500ms |
| 메모리 사용량      | < 300MB |

---

## 9. 마켓 위치 매핑 전략

### 9.1 위치 결정 규칙

마켓 생성 시 관련 지역의 경위도를 할당:

| 마켓 유형                | 위치 결정                       |
| ------------------------ | ------------------------------- |
| 국가 관련 (대선, 정책)   | 수도 좌표                       |
| 도시 관련 (올림픽, 지진) | 해당 도시 좌표                  |
| 기업 관련 (실적, 인수)   | 본사 소재지                     |
| 글로벌 (비트코인, AI)    | 주요 거래 시장 또는 [0, 0] 표시 |
| 스포츠 (월드컵, 올림픽)  | 개최지                          |

### 9.2 좌표 Seed 데이터

```typescript
// shared/config/geoDefaults.ts
export const COUNTRY_COORDS: Record<string, [number, number]> = {
  KR: [126.978, 37.566], // 서울
  US: [-77.037, 38.907], // 워싱턴DC
  JP: [139.692, 35.69], // 도쿄
  CN: [116.407, 39.904], // 베이징
  GB: [-0.128, 51.507], // 런던
  DE: [13.405, 52.52], // 베를린
  FR: [2.352, 48.857], // 파리
  // ... 확장
};
```

---

## 10. 개발 일정

| Phase   | 기간 | 내용                                        | 산출물                    |
| ------- | ---- | ------------------------------------------- | ------------------------- |
| Phase 1 | 1주  | 글로브 + 마켓 포인트 + 상세카드 + 필터      | `/globe` 페이지 기본 동작 |
| Phase 2 | 1주  | WebSocket + 빔 효과 + 거래피드 + 엣지글로우 | 실시간 거래 시각화        |
| Phase 3 | 1주  | 히트맵 + 통계 + 자동회전 + 타임슬라이더     | 완성된 대시보드           |

---

## 11. MVP 제외 (향후)

- 다중 사용자별 포지션 시각화
- AI 기반 뉴스 자동 geo-tagging
- 마켓 간 상관관계 아크(arc) 표시
- 모바일 터치 최적화
- 소셜 기능 (공유, 임베드)

---

## 12. 참고 자료

### MapLibre 핵심 예제

1. **Display a globe with an atmosphere** — 글로브 + 대기 효과 기본 설정
2. **Display a globe with a vector map** — `setProjection({ type: 'globe' })` 패턴
3. **Add a simple custom layer on a globe** — `CustomLayerInterface` + WebGL on globe
4. **Add a 3D model to globe using three.js** — Three.js + MapLibre globe 통합 패턴
5. **Animate a line** — GeoJSON 소스 실시간 업데이트 패턴
