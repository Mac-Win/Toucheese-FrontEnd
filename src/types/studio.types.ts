export interface StudiosByConceptResponse {
  content: Studio[]; // 스튜디오 데이터 배열
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
export interface Studio {
  id: string;
  name: string;
  profileImage: string;
  address: string;
  rating: number;
  price: number;
  region: string;
  bookmark: boolean;
  images: string[];
}
