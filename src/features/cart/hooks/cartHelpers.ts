import { SelectAddOption } from "@/types/Cart.type";
import useRequest from "@/features/common/hooks/useRequest";

export const useCartHelpers = () => {
  const { handleRequest } = useRequest();

  const deleteCartItem = async (cartId: number) => {
    return handleRequest("DELETE", `/v1/members/carts/${cartId}`);
  };

  const saveCartItemChanges = async (
    cartId: number,
    data: {
      totalPrice: number;
      personnel: number;
      selectAddOptions: SelectAddOption[];
    }
  ) => {
    const apiData = {
      totalPrice: data.totalPrice,
      personnel: data.personnel,
      addOptions: data.selectAddOptions.map((option) => option.selectOptionId),
    };

    return handleRequest("PUT", `/v1/members/carts/${cartId}`, apiData);
  };

  return { deleteCartItem, saveCartItemChanges };
};
