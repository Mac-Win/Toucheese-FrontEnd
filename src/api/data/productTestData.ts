export type ProductContent = {
  id: number;
  name: string;
  store: string;
  description: string;
  productImage: string;
  price: number;
  reviews: number;
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

// 샘플 데이터
export const product: ProductList = {
  content: [
    {
      id: 1,
      name: "증명사진",
      store: "소회모먼트 용산점",
      description: `신원 확인이 주된 목적인 사진입니다.`,
      productImage: "/gallery/gallery1.png",
      price: 75000,
      reviews: 108,
      persons: 1,
      addons: [
        { id: 1, name: "보정 사진 추가", price: 30000 },
        { id: 2, name: "원본 전체 받기", price: 10000 },
        { id: 3, name: "액자 프린팅", price: 15000 },
      ],
    },
    {
      id: 2,
      name: "가족 사진",
      store: "소회모먼트 강남점",
      description: `가족 간의 따뜻한 순간을 기록하는 사진입니다.`,
      productImage: "/gallery/gallery3.png",
      price: 150000,
      persons: 4,
      reviews: 250,
      addons: [
        { id: 4, name: "보정 사진 추가", price: 50000 },
        { id: 5, name: "원본 전체 받기", price: 20000 },
        { id: 6, name: "액자 프린팅", price: 30000 },
      ],
    },
  ],
};
