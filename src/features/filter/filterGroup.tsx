"use client";

import { useState, useEffect } from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterConfig = {
  label: string;
  key: keyof SelectedFilters;
  options: FilterOption[];
};

type SelectedFilters = {
  price: string[];
  rating: string[];
  locations: string[];
};

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

  const filterConfigs: FilterConfig[] = [
    {
      label: "지역별",
      key: "locations",
      options: [
        { label: "전체", value: "" },
        { label: "강남구", value: "강남" },
        { label: "서초구", value: "서초" },
        { label: "송파구", value: "송파" },
        { label: "강서구", value: "강서" },
        { label: "마포구", value: "마포" },
        { label: "영등포구", value: "영등포" },
        { label: "강북구", value: "강북" },
        { label: "용산구", value: "용산" },
        { label: "성동구", value: "성동" },
      ],
    },
    {
      label: "평점순",
      key: "rating",
      options: [
        { label: "전체", value: "" },
        { label: "3.0 이상", value: "3.0" },
        { label: "4.0 이상", value: "4.0" },
        { label: "4.5 이상", value: "4.5" },
      ],
    },
    {
      label: "가격순",
      key: "price",
      options: [
        { label: "전체", value: "" },
        { label: "10만원 미만", value: "99999" },
        { label: "20만원 미만", value: "199999" },
        { label: "20만원 이상", value: "200000" },
      ],
    },
  ];

  const updateTempFilter = (key: keyof SelectedFilters, value: string) => {
    const newFilters = {
      ...tempFilters,
      [key]:
        key === "locations"
          ? value === "전체"
            ? ["전체"]
            : tempFilters[key]?.includes(value)
            ? tempFilters[key].filter((v) => v !== value && v !== "전체")
            : [...(tempFilters[key] || []).filter((v) => v !== "전체"), value]
          : [value], // 단일 선택 필터 (rating, price)
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
            className="px-4 py-2 rounded-full bg-yellow-300 text-white"
            onClick={() => toggleDropdown(config.key)}
          >
            {config.label}
          </button>
          {activeDropdown === config.key && (
            <ul className="absolute z-10 w-full flex flex-wrap gap-4 left-0 mt-2 bg-custom-bg shadow rounded px-2 py-4">
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
