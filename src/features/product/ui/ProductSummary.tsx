"use client";

import Link from "next/link";
import { ProductDetail } from "../../../types/ProductDetail.type";

interface ProductSummaryProps {
  product: ProductDetail;
  studioId: number | null;
}

const ProductSummary = ({ product, studioId }: ProductSummaryProps) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold">{product.name}</h2>
    <p className="text-gray-700">{product.description}</p>
    <Link href={`/studios/${studioId}/products/${product.id}/reviews`}>
      상품리뷰 {product.reviewCount}개 보기
    </Link>
  </div>
);

export default ProductSummary;
