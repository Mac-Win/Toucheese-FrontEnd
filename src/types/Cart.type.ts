export interface AddOption {
  id: number;
  optionPrice: number;
  optionName: string;
}
export interface ReservationTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface CartItem {
  cartId: string;
  studioName: string;
  studioImage: string;
  productName: string;
  personnel: number;
  reservationDate: string;
  reservationTime: string;
  productImage: string;
  totalPrice: number;
  addOptions: AddOption[];
}
