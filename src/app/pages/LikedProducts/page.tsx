"use client";
import { getFavouriteProducts } from "@/app/helpers/axios/axios";
import React, { useEffect, useState } from "react";
import ProductCard2 from "@/app/components/ProductCard2/ProductCard2";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { useStore } from "../../page";

interface LikedProduct {
  likedProduct: ProductProps;
}

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);
  const { isDark } = useStore();

  const getLikedProducts = async () => {
    try {
      const likedProds = await getFavouriteProducts();
      setLikedProducts(likedProds || []);
      console.log(likedProds);
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  };

  useEffect(() => {
    getLikedProducts();
  }, []);

  return (
    <div className="w-full p-[30px]">
      <h2
        className={`${
          isDark ? `text-white` : `text-black`
        } text-start w-full text-4xl font-bold px-[20px] py-[10px]`}
      >
        Liked Products
      </h2>
      <div className="w-full h-full grid grid-cols-3 gap-[20px] pt-[20px]">
        {likedProducts.length > 0 ? (
          likedProducts.map((likedProduct: LikedProduct, index: number) => (
            <div key={index} className="text-black w-[98%] m-auto">
              <ProductCard2 product={likedProduct.likedProduct} />
            </div>
          ))
        ) : (
          <div className="h-[450px] flex items-center justify-center">
            <p className={`text-3xl ${isDark ? `text-white` : `text-black`}`}>
              No liked products found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;
