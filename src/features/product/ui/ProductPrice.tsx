"use client";

import ProductQuantity from "./ProductQuantity";
import { ProductDetail } from "@/types/ProductDetail.type";

interface ProductPriceProps {
  product: ProductDetail;
}

const ProductPrice = ({ product }: ProductPriceProps) => (
  <div>
    <div className="flex justify-between items-center border-b py-4">
      <h3 className="text-lg font-semibold">가격</h3>
      <p className="font-bold text-lg">
        <span className="text-sm font-normal mr-2 text-gray-400">
          {product.standard}인 기준
        </span>
        {product.price.toLocaleString()}원
      </p>
    </div>
    <div className="flex justify-between items-center py-4">
      <h3 className="text-lg font-semibold">인원</h3>
      <div className="flex items-center space-x-2">
        <ProductQuantity product={product} />
      </div>
    </div>
  </div>
);

export default ProductPrice;
