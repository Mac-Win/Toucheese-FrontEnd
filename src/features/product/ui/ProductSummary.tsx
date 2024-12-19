"use client";

import Link from "next/link";
import { ProductDetail } from "@/types/ProductDetail.type";
import Image from "next/image";

interface ProductSummaryProps {
  product: ProductDetail;
  studioId: number | null;
}

const ProductSummary = ({ product, studioId }: ProductSummaryProps) => (
  <div className="mt-4 max-w-sm mx-auto flex flex-col items-center gap-2">
    <h2 className="text-2xl font-bold ">{product.name}</h2>
    <p className="text-gray-700 text-center">{product.description}</p>
    <Link
      href={`/studios/${studioId}/products/${product.id}/reviews`}
      className="relative"
    >
      <span className="inline-flex text-gray-400 text-lg">
        상품리뷰 {product.reviewCount}
        <Image
          src="/icons/arrow_forward_ios.svg"
          alt="바로가기"
          width={10}
          height={10}
        ></Image>
      </span>
    </Link>
  </div>
);

export default ProductSummary;
