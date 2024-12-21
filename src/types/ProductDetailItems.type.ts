export interface ProductDetailItems {
  id: number;
  name: string;
  description: string;
  productImage: string;
  reviewCount: number;
  standard: number;
  price: number;
  studioId?: number;
  addOptions: {
    id: number;
    name: string;
    price: number;
  }[];
  availableStartTimes: [];
}
