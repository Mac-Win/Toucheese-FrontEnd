export interface Studio {
  _id: string;
  name: string;
  rating: number;
  profileImage: string;
  galleryImages: string[];
  price: string;
  bookmark: boolean;
  region: string; // 지역
  styles: string[]; // 스타일
  priceCategory: string; // 가격대
}

export const studios: Studio[] = [
  {
    _id: "1",
    name: "퓨어&플라워",
    rating: 4.4,
    profileImage: "/studio/studio1.png",
    galleryImages: [
      "/gallery/gallery1.png",
      "/gallery/gallery2.png",
      "/gallery/gallery3.png",
    ],
    price: "10,000원 부터",
    bookmark: true,
    region: "강남",
    styles: ["모던", "플라워"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "2",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "서초",
    styles: ["심플", "화이트"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "3",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery5.png",
      "/gallery/gallery6.png",
      "/gallery/gallery7.png",
      "/gallery/gallery7.png",
      "/gallery/gallery8.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "송파",
    styles: ["심플", "화이트"],
    priceCategory: "20만원 이상",
  },
  {
    _id: "4",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "강서",
    styles: ["심플", "화이트"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "5",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "마포",
    styles: ["심플", "화이트"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "6",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "영등포",
    styles: ["심플", "화이트"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "7",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "강북",
    styles: ["심플", "화이트"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "8",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "용산",
    styles: ["심플", "화이트"],
    priceCategory: "10만원 미만",
  },
  {
    _id: "9",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "성동",
    styles: ["심플", "화이트"],
    priceCategory: "20만원 미만",
  },
  {
    _id: "10",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery3.png",
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
    region: "강남",
    styles: ["심플", "화이트"],
    priceCategory: "20만원 미만",
  },
];
