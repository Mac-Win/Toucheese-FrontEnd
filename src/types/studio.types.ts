// 스튜디오 데이터 인터페이스
export interface Studio {
  id: string; // 스튜디오 ID
  name: string; // 스튜디오 이름
  profileImage: string; // 프로필 이미지 URL
  rating: number; // 평점
  price: number; // 가격
  region: string; // 지역
  imageUrls: string[]; // 이미지 URL 배열 (갤러리용)
  bookmark: boolean; // 북마크 여부
}

export interface StudiosByConceptResponse {
  content: Studio[]; // 스튜디오 데이터 배열
  pageable: {
    pageNumber: number; // 현재 페이지 번호
    pageSize: number; // 한 페이지에 포함된 데이터 개수
    sort: {
      empty: boolean; // 정렬 조건이 비어 있는지 여부
      sorted: boolean; // 정렬 여부
      unsorted: boolean; // 정렬되지 않은 상태 여부
    };
    offset: number; // 페이지 오프셋
    paged: boolean; // 페이지가 적용된 상태인지 여부
    unpaged: boolean; // 페이지가 적용되지 않은 상태인지 여부
  };
  last: boolean; // 마지막 페이지 여부
  totalPages: number; // 총 페이지 수
  totalElements: number; // 총 데이터 개수
  first: boolean; // 첫 번째 페이지 여부
  size: number; // 페이지 크기
  number: number; // 현재 페이지 번호
  sort: {
    empty: boolean; // 정렬 조건이 비어 있는지 여부
    sorted: boolean; // 정렬 여부
    unsorted: boolean; // 정렬되지 않은 상태 여부
  };
  numberOfElements: number; // 현재 페이지의 데이터 개수
  empty: boolean; // 데이터가 비어 있는지 여부
}

// 스튜디오 키워드 검색 API 응답 타입
export type StudiosByKeywordResponse = Studio[]; // 스튜디오 데이터 배열 형태로 반환
