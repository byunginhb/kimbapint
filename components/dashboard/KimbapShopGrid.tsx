"use client";

import { KimbapShopCard } from "./KimbapShopCard";
import { mockShops } from "@/lib/mock-data";

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
