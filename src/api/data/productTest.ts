import { ProductDetail } from "@/features/product/types/products.type";

// 샘플 데이터
export const products: ProductDetail[] = [
  {
    id: 1,
    name: "소회 시그니처",
    description:
      "50컷 내 촬영 / 현장 보정 보정된 파일 1장 제공 소형 액자사이즈 1장, 중형 사이즈 8장 인화본 제공",
    productImage: "https://i.imgur.com/6NGTVfB.jpeg",
    reviewCount: 3,
    standard: 1, // persons -> standard로 변경
    price: 100000,
    addOptions: [
      { name: "보정 사진 추가", price: 30000 },
      { name: "원본 전체 받기", price: 10000 },
      { name: "액자 프린팅", price: 15000 },
    ],
  },
  {
    id: 2,
    name: "갤러리 증명사진",
    description:
      "주민등록증, 운전면허증 사용 가능 15컷 내 촬영 / 현장 보정 보정된 파일 1장 제공 / 중형사이즈 8장 인화본 제공",
    productImage: "https://i.imgur.com/kFbYpHz.jpeg",
    reviewCount: 0,
    standard: 1,
    price: 60000,
    addOptions: [
      { name: "보정 사진 추가", price: 50000 },
      { name: "원본 전체 받기", price: 20000 },
      { name: "액자 프린팅", price: 30000 },
    ],
  },
  {
    id: 3,
    name: "규격사진",
    description:
      "증명/신분확인/여권/비자/명함판 15컷 내 촬영 / 현장 보정 보정된 파일 1장 제공 / 규격에 맞는 인화본 8장 제공",
    productImage: "https://i.imgur.com/67SUT6B.jpeg",
    reviewCount: 0,
    standard: 1,
    price: 40000,
    addOptions: [
      { name: "보정 사진 추가", price: 50000 },
      { name: "원본 전체 받기", price: 20000 },
      { name: "액자 프린팅", price: 30000 },
    ],
  },
];
