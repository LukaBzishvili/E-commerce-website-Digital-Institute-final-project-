"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { getFavouriteProducts } from "@/app/helpers/axios/axios";

interface RecommendedProductCardProps {
  product: ProductProps;
}

const RecommendedProductCard: React.FC<RecommendedProductCardProps> = ({
  product,
}) => {
  return (
    <div className="bg-slate-200 rounded-md p-[5px] shadow-md hover:scale-105 hover:shadow-xl duration-500 my-[10px] mx-[20px]">
      <Link
        href={`/pages/ProductPage?id=${product.id}`}
        as={`/pages/ProductPage?id=${product.id}`}
      >
        <Image
          className="rounded-xl m-auto"
          src={product.image}
          alt={"Recommended Product"}
          width={220}
          height={200}
        />
        <div className="px-4 py-3 w-full">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {product.category_name}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.title}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {product.price}$
            </p>
            <del></del>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecommendedProductCard;
