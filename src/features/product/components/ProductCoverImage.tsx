"use client";

import Image from "next/image";
import { ProductDetailItems } from "@/types/ProductDetail.type";

interface ProductImageProps {
  product: ProductDetailItems;
}

const ProductCoverImage = ({ product }: ProductImageProps) => (
  <div className="relative aspect-3/4 w-1/3 bg-gray-200 rounded-md shadow-sm overflow-hidden mx-auto">
    <Image
      src={product.productImage}
      alt={product.name}
      className="object-cover"
      fill
    />
  </div>
);

export default ProductCoverImage;
