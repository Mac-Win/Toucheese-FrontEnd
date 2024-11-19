export interface Studio {
  _id: string;
  name: string;
  rating: number;
  profileImage: string;
  galleryImages: string[];
  price: string;
  bookmark: boolean;
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
      "/gallery/gallery1.png",
    ],
    price: "10,000원 부터",
    bookmark: true,
  },
  {
    _id: "2",
    name: "화이트 드림",
    rating: 4.8,
    profileImage: "/studio/studio2.png",
    galleryImages: [
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
      "/gallery/gallery6.png",
      "/gallery/gallery4.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
  },
  {
    _id: "3",
    name: "클래식&모던",
    rating: 4.6,
    profileImage: "/studio/studio3.png",
    galleryImages: [
      "/gallery/gallery7.png",
      "/gallery/gallery8.png",
      "/gallery/gallery9.png",
      "/gallery/gallery7.png",
      "/gallery/gallery2.png",
      "/gallery/gallery3.png",
    ],
    price: "10,000원 부터",
    bookmark: false,
  },
];
