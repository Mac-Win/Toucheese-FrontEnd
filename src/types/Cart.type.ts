export interface AddOption {
  id: number;
  price: number; // 데이터에 맞게 수정 (optionPrice → price)
  name: string; // 데이터에 맞게 수정 (optionName → name)
}

export interface SelectAddOption {
  selectOptionId: number;
  selectOptionPrice: number;
  selectOptionName: string;
}

export interface ReservationTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface CartItem {
  cartId: number; // 데이터에 맞게 number로 수정
  studioName: string;
  studioImage: string;
  productName: string;
  productPrice: number;
  productStandard: number;
  personnel: number;
  reservationDate: string;
  reservationTime: string;
  productImage: string;
  totalPrice: number;
  addOptions: AddOption[]; // 수정된 AddOption 사용
  selectAddOptions: SelectAddOption[]; // 수정된 SelectAddOption 사용
}
