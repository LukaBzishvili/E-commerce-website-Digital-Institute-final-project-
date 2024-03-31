import React from "react";
import Image from "next/image";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { AddProductToCart } from "@/app/helpers/axios/axios";
import { useStore } from "../../page";
import Link from "next/link";

const ProductCard: React.FC<ProductProps> = ({
  salePrice,
  price,
  title,
  image,
  id,
}) => {
  const { isDark } = useStore();
  const addToCart = () => {
    AddProductToCart(id);
  };

  return (
    <Link
      href={`/pages/ProductPage?id=${id}`}
      className=" flex flex-col items-center justify-between p-5 h-[400px] py-10 bg-blue-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer"
    >
      <Image
        src={image}
        alt="product"
        width={300}
        height={500}
        className="h-[150px] w-[200px]"
      ></Image>

      <div className="w-full flex items-center mt-[14px] justify-start">
        {salePrice !== 0 && salePrice !== null ? (
          <div>
            <span
              className={`line-through	${
                isDark ? `text-black` : `text-gray-400`
              }`}
            >
              {price}$
            </span>
            <span className="ml-[14px] text-black">{salePrice}$</span>
          </div>
        ) : (
          <span className="text-black w-full text-start">{price}$</span>
        )}
      </div>
      <h1 className="text-gray-800 text-md my-5">{title}</h1>
      <button
        onClick={addToCart}
        className="p-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add To Cart
      </button>
    </Link>
  );
};

export default ProductCard;
