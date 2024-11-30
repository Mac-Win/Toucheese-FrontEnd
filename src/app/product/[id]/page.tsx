"use client";

import { use } from "react";
import { TopBar } from "@/features/common/components/topbar";
import ProductDetail from "@/features/product/components/productDetail";
import { useProductsDetail } from "@/features/product/hooks/useProducts";

function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // `params` 언래핑
  const productIdNumber = parseInt(id, 10);

  const { data: product, loading, error } = useProductsDetail(productIdNumber);

  // 로딩 중 처리
  if (loading) {
    return <div>상품 데이터를 로딩 중입니다...</div>;
  }

  // 에러 처리
  if (error) {
    return <div>상품 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  }

  // 데이터가 없을 경우 처리
  if (!product) {
    return <div>상품이 존재하지 않습니다.</div>;
  }

  // 데이터가 정상적으로 로드된 경우
  return (
    <>
      <TopBar />
      <ProductDetail product={product} />
    </>
  );
}

export default ProductDetailPage;
