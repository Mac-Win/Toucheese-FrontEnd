export type ProductContent = {
  id: number;
  name: string;
  description: string;
  productImage: string;
  price: number;
  reviewCount: number;
  persons: number;
  addons: Addon[];
};
export type Addon = {
  id: number;
  name: string;
  price: number;
};

export type ProductList = {
  content: ProductContent[];
};
