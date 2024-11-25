// 스튜디오 데이터 인터페이스
export interface Studio {
  id: number; // 스튜디오 ID
  name: string; // 스튜디오 이름
  profileImage: string; // 프로필 이미지 URL
  rating: number; // 평점
  price: number; // 가격
  imageUrls: string[]; // 이미지 URL 배열 (갤러리용)
}
