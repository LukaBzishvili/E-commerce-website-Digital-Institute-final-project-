import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  AddProductToCart,
  addFavoriteProduct,
  getFavouriteProducts,
  removeLikedProduct,
} from "@/app/helpers/axios/axios";
import Link from "next/link";
import {
  likedProduct,
  ProductProps,
} from "@/app/helpers/Interfaces/Interfaces";
import { useStore } from "../../page";

interface ProductCard2Props {
  product: ProductProps;
}

const ProductCard2: React.FC<ProductCard2Props> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [favProductId, setFavProductId] = useState("");
  const { isDark } = useStore();

  const handleLikeProduct = async () => {
    if (!isLiked) {
      setIsLiked(true);
      addFavoriteProduct(product.id);
    } else {
      setIsLiked(false);
      removeLikedProduct(favProductId);
    }
  };

  const getLikedProduct = async () => {
    const likedProds = await getFavouriteProducts();

    likedProds.map((favProduct: likedProduct) => {
      if (String(favProduct.likedProduct.id) === product.id) {
        setIsLiked(true);
        setFavProductId(favProduct.id);
      } else {
        // console.log(favProduct.likedProduct.id);
        // console.log(product.id);
        // setIsLiked(false);
      }
    });
  };

  useEffect(() => {
    console.log(product.salePrice);
  }, []);

  const addToCart = () => {
    AddProductToCart(product.id);
  };

  useEffect(() => {
    getLikedProduct();
  }, []);

  return (
    <Link
      href={`/pages/ProductPage?id=${product.id}`}
      className="w-[330px] cursor-pointer"
    >
      <div className="w-[330px] h-[510px] flex flex-col items-start justify-start gap-[20px] border-2 border-white border-solid">
        <Image
          src={product.image}
          alt="product"
          width={330}
          height={250}
          // className="w-full sm:w-[250px]"
        ></Image>
        <div className="px-[15px] items-start justify-center flex-col">
          <h3
            className={` ${
              isDark ? `text-white` : `text-black`
            } text-2xl mt-[25px] md:text-3xl lg:text-4xl`}
          >
            {product.title}
          </h3>
          <p
            className={`text-xs ${
              isDark ? `text-gray-300` : `text-black`
            } mt-[10px] md:text-sm lg:text-md`}
          >
            {product.category_name}
          </p>
          <span className="my-[17px]">
            {product.salePrice !== 0 && product.salePrice !== null ? (
              <div>
                <span
                  className={`line-through	${
                    isDark ? `text-white` : `text-gray-400`
                  }`}
                >
                  {product.price}$
                </span>
                <span
                  className={`ml-[14px] ${
                    isDark ? `text-white` : `text-black`
                  }`}
                >
                  {product.salePrice}$
                </span>
              </div>
            ) : (
              <span className={`${isDark ? `text-white` : `text-black`}`}>
                {product.price}$
              </span>
            )}
          </span>
          {/* <p>{product.description}</p> */}
        </div>
        <div className="flex items-center justify-center h-[128px] m-auto">
          <div onClick={handleLikeProduct}>
            {isLiked ? (
              <FaHeart className="mr-[10px] cursor-pointer fill-red-500" />
            ) : (
              <FaRegHeart className="mr-[10px] cursor-pointer" />
            )}
          </div>

          <button
            onClick={addToCart}
            className="p-2 px:4 dm:px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm min-w-[100px] mr-[10px] sm:text-md"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
