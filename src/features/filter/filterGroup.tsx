"use client";

import { useState } from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterButtonProps = {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  isActive: boolean;
  onToggle: () => void;
};

const FilterButton = ({
  label,
  options,
  selectedValue,
  onChange,
  isActive,
  onToggle,
}: FilterButtonProps) => {
  return (
    <div className="inline-block">
      {/* 버튼 */}
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-full ${
          selectedValue === label
            ? "bg-yellow-500 text-white"
            : "bg-yellow-200 text-black"
        } flex items-center gap-2`}
      >
        {selectedValue || label}
        <span>▼</span>
      </button>

      {/* 드롭다운 */}
      {isActive && (
        <ul className="absolute top-full -left-2 z-40  flex justify-around items-center rounded-md bg-yellow-100 w-[calc(var(--max-width)-20px)]  h-[calc(var(--max-width)-420px)]">
          {options.map((option) => (
            <li key={option.value} className="flex flex-col items-center gap-2">
              <label htmlFor={option.value}>{option.label}</label>
              <input
                type="radio"
                id={option.value}
                name={label}
                value={option.value}
                checked={option.value === selectedValue}
                onChange={() => {
                  onChange(option.value);
                  onToggle();
                }}
                className="appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:bg-yellow-500 checked:border-yellow-500"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FilterGroup = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    price: "가격순",
    popularity: "인기순",
    region: "지역선택",
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const updateFilter = (key: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative">
      <div className="flex gap-2 z-40">
        <FilterButton
          label="가격순"
          options={[
            { label: "가격순", value: "가격순" },
            { label: "높은 가격순", value: "높은 가격순" },
            { label: "낮은 가격순", value: "낮은 가격순" },
          ]}
          selectedValue={selectedFilters.price}
          onChange={(value) => updateFilter("price", value)}
          isActive={activeDropdown === "price"}
          onToggle={() =>
            setActiveDropdown(activeDropdown === "price" ? null : "price")
          }
        />
        <FilterButton
          label="인기순"
          options={[
            { label: "인기순", value: "인기순" },
            { label: "최신순", value: "최신순" },
          ]}
          selectedValue={selectedFilters.popularity}
          onChange={(value) => updateFilter("popularity", value)}
          isActive={activeDropdown === "popularity"}
          onToggle={() =>
            setActiveDropdown(
              activeDropdown === "popularity" ? null : "popularity"
            )
          }
        />
        <FilterButton
          label="지역선택"
          options={[
            { label: "서울", value: "서울" },
            { label: "부산", value: "부산" },
            { label: "제주", value: "제주" },
          ]}
          selectedValue={selectedFilters.region}
          onChange={(value) => updateFilter("region", value)}
          isActive={activeDropdown === "region"}
          onToggle={() =>
            setActiveDropdown(activeDropdown === "region" ? null : "region")
          }
        />
      </div>
    </div>
  );
};

export default FilterGroup;
