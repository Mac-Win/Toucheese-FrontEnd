"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/features/header/header";
import FilterGroup from "@/features/filter/filterGroup";
import StudioDisplay from "@/features/studios/studioDisplay";

const StudiosPage = () => {
  const searchParams = useSearchParams();
  const conceptIdParam = searchParams?.get("conceptId");
  const conceptId =
    conceptIdParam && !isNaN(parseInt(conceptIdParam, 10))
      ? parseInt(conceptIdParam, 10)
      : null;

  const [filters, setFilters] = useState<{
    price?: number;
    rating?: number;
    locations: string[];
  }>({
    price: undefined,
    rating: undefined,
    locations: [],
  });

  // 필터 적용 핸들러
  const handleApplyFilters = (newFilters: {
    price?: string[];
    rating?: string[];
    locations?: string[];
  }) => {
    setFilters({
      price:
        newFilters.price?.length && newFilters.price[0] !== ""
          ? Number(newFilters.price[0])
          : undefined,
      rating:
        newFilters.rating?.length && newFilters.rating[0] !== ""
          ? Number(newFilters.rating[0])
          : undefined,
      locations: newFilters.locations?.includes("")
        ? []
        : newFilters.locations || [],
    });
  };

  if (!conceptId) {
    return (
      <div>
        <Header />
        <div className="text-center mt-10 text-red-500">
          conceptId가 유효하지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <FilterGroup
        filters={{
          price: filters.price ? [filters.price.toString()] : [],
          rating: filters.rating ? [filters.rating.toString()] : [],
          locations: filters.locations || [],
        }}
        onApplyFilters={handleApplyFilters}
      />

      <StudioDisplay
        conceptId={conceptId}
        filters={{
          price: filters.price,
          rating: filters.rating,
          locations: filters.locations,
        }}
      />
    </div>
  );
};

export default StudiosPage;
