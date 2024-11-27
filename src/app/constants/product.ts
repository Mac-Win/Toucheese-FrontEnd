export type Addon = {
  id: string;
  name: string;
  price: number;
};

// 샘플 데이터
export const product = {
  id: "1",
  name: "증명사진",
  store: "소회모먼트 용산점",
  description: `신원 확인이 주된 목적인 사진입니다. 주로 공식 문서 및 신분증에 사용되며 여권, 운전면허증, 학생증 등과 함께 활용됩니다.`,
  productImage: "/gallery/gallery1.png",
  price: 75000,
  reviews: 108,
  addons: [
    { id: "1", name: "보정 사진 추가", price: 30000 },
    { id: "2", name: "원본 전체 받기", price: 10000 },
    { id: "3", name: "액자 프린팅", price: 15000 },
  ] as Addon[],
};
