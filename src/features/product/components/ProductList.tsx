import Image from "next/image";
import { Product } from "@/types/Product.type";

function ProductList({ product }: { product: Product }) {
  return (
    <>
      <div className="flex gap-4 border-b hover:shadow-lg p-4 -mx-4">
        <div className="relative max-w-32 w-full aspect-3/4 overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={product.productImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-sm text-gray-700 flex items-center gap-1">
            <Image
              src="/icons/product/Chat_Circle_Dots.svg"
              alt="리뷰"
              width={20}
              height={20}
            />
            리뷰 {product.reviewCount}개
          </p>
          <p className="text-xl font-bold mt-auto">
            {product.price.toLocaleString()}원
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductList;
