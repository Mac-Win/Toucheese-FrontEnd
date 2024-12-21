import ProductWrapper from "@/features/product/ui/ProductWrapper";

async function ProductRoutePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productIdNumber = parseInt((await params).productId, 10);

  if (isNaN(productIdNumber)) {
    return <div>유효하지 않은 상품 ID입니다.</div>;
  }

  return <ProductWrapper productId={productIdNumber} />;
}
export default ProductRoutePage;
