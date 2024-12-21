import ProductQuantity from "./ProductQuantity";
import { ProductDetailItems } from "@/types/ProductDetailItems.type";

interface ProductPriceProps {
  product: ProductDetailItems;
}

const ProductPrice = ({ product }: ProductPriceProps) => (
  <div className="border-t mt-4">
    <div className="flex justify-between items-center  py-4">
      <h3 className="text-lg font-semibold">가격</h3>
      <p className="font-bold text-lg">
        <span className="text-sm font-normal text-right text-gray-400 block">
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
