import ProductDetail from "@/features/product/productDetail";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "상품 상세 페이지",
  description: "상품 상세 페이지입니다.",
};

const ProductPage = ({ params }: PageProps) => {
  const productid = parseInt(params.id, 10);

  if (isNaN(productid)) {
    return <div>유효하지 않은 상품 ID입니다.</div>;
  }

  return <ProductDetail productid={productid} />;
};

export default ProductPage;
