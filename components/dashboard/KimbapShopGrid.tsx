"use client";

import { KimbapShopCard } from "./KimbapShopCard";

const mockShops = [
  {
    id: "1",
    name: "국방부 김밥천국",
    status: "NOMINAL" as const,
    distance: "0.3 km",
    statusText: "평소와 비슷함",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: Math.floor(Math.random() * 80) + 20,
    })),
  },
  {
    id: "2",
    name: "용산 맛있는 김밥",
    status: "CLOSED" as const,
    distance: "0.5 km",
    statusText: "영업 종료",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: i >= 22 || i < 6 ? 0 : Math.floor(Math.random() * 60) + 10,
    })),
  },
  {
    id: "3",
    name: "합참 김밥나라",
    status: "CLOSED" as const,
    distance: "0.8 km",
    statusText: "영업 종료",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: i >= 21 || i < 7 ? 0 : Math.floor(Math.random() * 70) + 15,
    })),
  },
  {
    id: "4",
    name: "육본 김밥",
    status: "SPIKE" as const,
    distance: "1.2 km",
    statusText: "평소보다 매우 바쁨",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: Math.floor(Math.random() * 100) + 50,
    })),
  },
  {
    id: "5",
    name: "공군본부 김밥집",
    status: "BUSY" as const,
    distance: "1.5 km",
    statusText: "평소보다 바쁨",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: Math.floor(Math.random() * 90) + 30,
    })),
  },
  {
    id: "6",
    name: "THE 김밥",
    status: "NOMINAL" as const,
    distance: "1.8 km",
    statusText: "평소와 비슷함",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: Math.floor(Math.random() * 70) + 25,
    })),
  },
  {
    id: "7",
    name: "바른김밥 용산점",
    status: "BUSY" as const,
    distance: "2.0 km",
    statusText: "평소보다 바쁨",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: Math.floor(Math.random() * 85) + 35,
    })),
  },
  {
    id: "8",
    name: "청와대 앞 김밥",
    status: "CLOSED" as const,
    distance: "2.5 km",
    statusText: "영업 종료",
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: i >= 20 || i < 8 ? 0 : Math.floor(Math.random() * 65) + 20,
    })),
  },
];

export function KimbapShopGrid() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockShops.map((shop) => (
          <KimbapShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
