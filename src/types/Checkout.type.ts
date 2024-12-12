export interface CartPaymentItem {
  cartId: number;
  studioName: string;
  productImage: string;
  productName: string;
  productPrice: number;
  personnel: number;
  reservationDate: string;
  reservationTime: string;
  totalPrice: number;
  selectAddOptions: {
    selectOptionId: number;
    selectOptionName: string;
    selectOptionPrice: number;
  }[];
}

export interface MemberContactInfo {
  email: string;
  name: string;
  phone: string;
}

export interface CheckoutResponse {
  CheckoutCartItems: CartPaymentItem[];
  memberContactInfo: MemberContactInfo;
}
