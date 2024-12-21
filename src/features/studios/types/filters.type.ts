export type FilterOption = {
  label: string;
  value: string;
};

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
