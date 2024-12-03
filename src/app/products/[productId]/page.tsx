"use client";

import { use, useEffect } from "react";
import ProductDetail from "@/features/product/ui/productDetail";
import { useProductsDetail } from "@/features/product/hooks/useProducts";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useProductStore from "@/features/product/store/ProductStore";

function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const router = useRouter();
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  const { productId } = use(params);
  const productIdNumber = parseInt(productId, 10);

  const { data: product, loading, error } = useProductsDetail(productIdNumber);
  const setProductId = useProductStore((state) => state.setProductId);
  const setProductTitle = useProductStore((state) => state.setProductTitle);
  const setProductDescription = useProductStore(
    (state) => state.setProductDescription
  );
  const setProductImage = useProductStore((state) => state.setProductImage);

  useEffect(() => {
    if (!isNaN(productIdNumber)) {
      setProductId(productIdNumber); // productId 상태 저장
      console.log(productIdNumber);
    }
    if (product) {
      setProductTitle(product.name); // product의 이름 저장
      setProductDescription(product.description); // product의 설명 저장
      setProductImage(product.productImage); // product의 이미지 저장
    }
  }, [
    productIdNumber,
    setProductId,
    product,
    setProductTitle,
    setProductDescription,
    setProductImage,
  ]);

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  if (loading) return <div>상품 데이터를 로딩 중입니다...</div>;
  if (error) {
    console.error("Error fetching product data:", error);
    return <div>상품 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  }
  if (!product) return <div>상품이 존재하지 않습니다.</div>;

  return (
    <>
      <div className="fixed z-10 flex items-center justify-between max-w-[calc(var(--max-width)-2rem)] w-full p-2">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center -ml-2"
          >
            <Image src="/icons/back.svg" alt="back" width={36} height={36} />
          </button>
        </div>
      </div>
      <ProductDetail product={product} />
    </>
  );
}

export default ProductDetailPage;
