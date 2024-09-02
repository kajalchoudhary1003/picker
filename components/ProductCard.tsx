// components/ProductCard.tsx
import React from "react";
import { IProduct } from "@/app/models/Product";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white/80 relative p-2 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105">
      {product.image && (
        <div className="relative w-full" style={{ paddingBottom: "75%" }}>
          <Image
            src={product.image}
            alt={product.productName}
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={400}
            height={300}
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {product.productName}
        </h2>
        <p className="text-gray-600 mb-2">{product.productDescription}</p>
        <p className="text-gray-600 mb-2">Category: {product.department}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">${product.price}</p>
          <div className="absolute bottom-4 right-4">
            <Link href={`/product/${product.id}`}>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Edit Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
