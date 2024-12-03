"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/Product.type";

export function StudioProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4">촬영 상품</h2>
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
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
              <p className="text-sm text-gray-700">
                ❤️ 리뷰 {product.reviewCount}개
              </p>
              <p className="text-lg font-bold ml-auto">
                {product.price.toLocaleString()}원
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
