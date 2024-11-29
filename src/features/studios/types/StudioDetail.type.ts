export interface StudioDetail {
  id: number;
  name: string;
  profileImage: string;
  description: string;
  rating: number;
  reviewCount: number;
  operationHour: string;
  address: string;
  notice: string;
  facilityImageUrls: [string];
  products: [
    {
      id: number;
      name: string;
      description: string;
      productImage: string;
      reviewCount: number;
      standard: number;
      price: number;
    },
  ];
}
