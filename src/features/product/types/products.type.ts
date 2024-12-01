export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  productImage: string;
  reviewCount: number;
  standard: number;
  price: number;
  studioId?: number; // studioId를 선택적 속성으로 설정
  addOptions: {
    name: string;
    price: number;
  }[];
}
