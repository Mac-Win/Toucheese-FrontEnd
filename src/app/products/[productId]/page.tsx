"use client";

import { use, useEffect } from "react";
import ProductDetail from "@/features/product/ui/productDetail";
import { useProductsDetail } from "@/features/product/hooks/useProducts";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import useProductStore from "@/features/product/store/ProductStore";
import { TopBar } from "@/features/common/components/topbar";

function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
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
      setProductId(productIdNumber);
      console.log(productIdNumber);
    }
    if (product) {
      setProductTitle(product.name);
      setProductDescription(product.description);
      setProductImage(product.productImage);
    }
  }, [
    productIdNumber,
    product,
    setProductId,
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
      <TopBar showShare={false} />
      <ProductDetail product={product} />
    </>
  );
}

export default ProductDetailPage;
