import { useEffect, useState } from "react";
import { apiRequest } from "@/api/apiRequest";
import { CartItem } from "@/types/Cart.type";

export function useCart() {
  const [cartData, setCartData] = useState<CartItem[]>([]); // 배열로 변경
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

  const fetchCartData = async () => {
    setLoading(true);
    setError(null);

    try {
      // API 요청
      const data = await apiRequest<CartItem[]>(
        "GET",
        `/v1/members/carts/list`
      ); // CartItem 배열로 처리
      setCartData(data);
    } catch (err) {
      // 오류 처리
      if (err instanceof Error) {
        // setError(err.message); // 오류 메시지를 상태로 설정
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchCartData();
  }, []);

  return { cartData, loading, error, refetch: fetchCartData };
}
