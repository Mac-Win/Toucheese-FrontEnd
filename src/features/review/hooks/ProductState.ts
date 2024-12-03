import useFetch from "@/features/common/hooks/useFetch";
import useProductStore from "@/features/product/store/ProductStore";
import useStudioStore from "@/features/studios/store/StudioStore";

export interface Review {
  id: number;
  firstImage: string;
}

export function ProductState() {
  const studioId = useStudioStore((state) => state.studioId);
  const productId = useProductStore((state) => state.productId);

  return useFetch<Review[]>(
    `/v1/studios/${studioId}/products/${productId}/reviews`
  );
}
