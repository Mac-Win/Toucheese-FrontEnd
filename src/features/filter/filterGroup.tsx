"use client";

import { useState } from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterConfig = {
  label: string;
  key: string;
  options: FilterOption[];
};

type SelectedFilters = Record<string, string[]>;

const FilterGroup = ({
  filters,
  onFilterChange,
}: {
  filters: SelectedFilters;
  onFilterChange: (newFilters: SelectedFilters) => void;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filterConfigs: FilterConfig[] = [
    {
      label: "지역순",
      key: "region",
      options: [
        { label: "강남", value: "강남" },
        { label: "서초", value: "서초" },
        { label: "송파", value: "송파" },
        { label: "강서", value: "강서" },
        { label: "마포", value: "마포" },
        { label: "영등포", value: "영등포" },
        { label: "강북", value: "강북" },
        { label: "용산", value: "용산" },
        { label: "성동", value: "성동" },
      ],
    },
    {
      label: "인기순",
      key: "popularity",
      options: [
        { label: "3.0 이상", value: "3.0 이상" },
        { label: "4.0 이상", value: "4.0 이상" },
        { label: "4.5 이상", value: "4.5 이상" },
      ],
    },
    {
      label: "가격순",
      key: "price",
      options: [
        { label: "10만원 미만", value: "10만원 미만" },
        { label: "20만원 미만", value: "20만원 미만" },
        { label: "20만원 이상", value: "20만원 이상" },
      ],
    },
  ];

  const updateFilter = (key: string, value: string) => {
    const newFilters = {
      ...filters,
      [key]: filters[key]?.includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...(filters[key] || []), value],
    };
    onFilterChange(newFilters);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex gap-4 mb-4 relative">
      {filterConfigs.map((config) => (
        <div key={config.key}>
          <button
            className="px-4 py-2 rounded-full bg-yellow-200 text-black"
            onClick={() => toggleDropdown(config.key)}
          >
            {config.label}
          </button>
          {activeDropdown === config.key && (
            <ul className="absolute top-full left-0 z-40 flex py-4 justify-around flex-wrap gap-4 mt-2 rounded-md bg-custom-bg shadow-lg w-full">
              {config.options.map((option) => (
                <li
                  key={option.value}
                  className="flex items-center flex-col gap-2 p-2 hover:bg-yellow-200 cursor-pointer min-w-24"
                >
                  <input
                    type="checkbox"
                    name={config.key}
                    id={`${config.key}-${option.value}`}
                    value={option.value}
                    checked={
                      filters[config.key]?.includes(option.value) ?? false
                    }
                    onChange={() => updateFilter(config.key, option.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`${config.key}-${option.value}`}>
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterGroup;
