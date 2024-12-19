"use client";

import Image from "next/image";
import { ProductDetail } from "../../../types/ProductDetail.type";

interface ProductImageProps {
  product: ProductDetail;
}

const ProductCoverImage = ({ product }: ProductImageProps) => (
  <div className="relative aspect-3/4 w-1/3 bg-gray-200 rounded-md shadow-sm overflow-hidden">
    <Image
      src={product.productImage}
      alt={product.name}
      className="object-cover"
      fill
    />
  </div>
);

export default ProductCoverImage;
