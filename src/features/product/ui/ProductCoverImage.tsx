"use client";

import Image from "next/image";
import { ProductDetail } from "../../../types/ProductDetail.type";

interface ProductImageProps {
  product: ProductDetail;
}

const ProductCoverImage = ({ product }: ProductImageProps) => (
  <div className="flex flex-col items-center bg-custom-bg -m-4 p-4 pt-20">
    <div className="relative aspect-[3/4] w-1/2 bg-gray-200 rounded-md overflow-hidden">
      <Image
        src={product.productImage}
        alt={product.name}
        className="object-cover"
        fill
      />
    </div>
  </div>
);

export default ProductCoverImage;
