"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SelectedFilters } from "@/features/studios/types/filters.type";
import { filterConfigs } from "@/api/constants/filterConfigs";

const FilterGroup = ({
  filters,
  onApplyFilters,
}: {
  filters: SelectedFilters;
  onApplyFilters: (newFilters: SelectedFilters) => void;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [tempFilters, setTempFilters] = useState<SelectedFilters>(filters);

  useEffect(() => {
    setTempFilters(filters); // 부모로부터 전달된 필터값을 tempFilters에 반영
  }, [filters]);

  const updateTempFilter = (key: keyof SelectedFilters, value: string) => {
    const newFilters = {
      ...tempFilters,
      [key]:
        key === "locations"
          ? value === "전체"
            ? [] // "전체" 선택 시 빈 배열로 설정
            : tempFilters[key]?.includes(value)
              ? tempFilters[key].filter((v) => v !== value)
              : [...(tempFilters[key] || []), value]
          : value === "전체"
            ? [] // 단일 선택 필터(rating, price)도 빈 배열로 설정
            : [value],
    };

    setTempFilters(newFilters);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    setActiveDropdown(null);
  };

  return (
    <div className="flex gap-4 mb-4 relative">
      {filterConfigs.map((config) => (
        <div key={config.key}>
          <button
            className="px-4 py-2 rounded-full bg-gray-1 text-gray-8 flex items-center gap-1"
            onClick={() => toggleDropdown(config.key)}
          >
            {config.label}
            <Image
              src="/icons/keyboard_arrow_down.svg"
              alt="필터메뉴버튼"
              width={20}
              height={20}
            />
          </button>
          {activeDropdown === config.key && (
            <ul className="absolute z-20 w-full flex flex-wrap gap-4 left-0 mt-2 bg-gray-1 shadow rounded px-2 py-4">
              {config.options.map((option) => (
                <li key={option.value} className="min-w-24">
                  {config.key === "locations" ? (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={tempFilters[config.key]?.includes(
                          option.value
                        )}
                        onChange={() =>
                          updateTempFilter(config.key, option.value)
                        }
                      />
                      {option.label}
                    </label>
                  ) : (
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={config.key}
                        value={option.value}
                        checked={tempFilters[config.key]?.[0] === option.value}
                        onChange={() =>
                          updateTempFilter(config.key, option.value)
                        }
                      />
                      {option.label}
                    </label>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <button
        className="px-6 py-2 bg-gray-100 rounded-full"
        onClick={handleApply}
      >
        필터 적용
      </button>
    </div>
  );
};

export default FilterGroup;
