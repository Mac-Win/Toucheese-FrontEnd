export type FilterOption = {
  label: string;
  value: string;
};
// filter 기본속성

export type SelectedFilters = {
  price: string[];
  rating: string[];
  locations: string[];
};

export type FilterConfig = {
  label: string;
  key: keyof SelectedFilters;
  options: FilterOption[];
};
