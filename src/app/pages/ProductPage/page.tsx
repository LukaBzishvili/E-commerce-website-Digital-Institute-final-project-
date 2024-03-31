"use client";
import React, { useEffect, useState } from "react";
import { AddProductToCart, getAllProducts } from "@/app/helpers/axios/axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import RecommendedProducts from "@/app/components/RecommendedProducts/RecommendedProducts";
import { useStore } from "../../page";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";

interface ProductElementProps {
  title: string;
  category_name: string;
  description: string;
  image: string;
  salePrice: number | null;
  price: number;
  id: string;
}

const ProductPage = () => {
  const { isDark } = useStore();
  const [product, setProduct] = useState<ProductElementProps>({
    title: "",
    category_name: "",
    description: "",
    image: "",
    salePrice: 0,
    price: 0,
    id: "",
  });
  const [productId, setProductId] = useState<string | null>(null);
  const [productsData, setProductsData] = useState([]);
  const searchParams = useSearchParams();

  ///////Translation
  const { t } = useTranslation();
  useLanguageInitialization();
  //////////////////

  useEffect(() => {
    const encodedURL = window.location.href;
    const decodedURL = decodeURIComponent(encodedURL);
    const url = new URL(decodedURL);
    const searchParam = new URLSearchParams(url.search);
    const productIdFromURL = searchParams.get("id");
    setProductId(productIdFromURL);
    fetchSpecificProduct(productIdFromURL);
  }, []);

  const fetchSpecificProduct = async (productId: string | null) => {
    try {
      const productsData = await getAllProducts();
      const filteredProduct = productsData.filter(
        (product: ProductElementProps) => product.id == productId
      );
      setProductsData(productsData);
      setProduct({
        title: filteredProduct[0].title,
        category_name: filteredProduct[0].category_name,
        description: filteredProduct[0].description,
        image: filteredProduct[0].image,
        salePrice: filteredProduct[0].salePrice,
        price: filteredProduct[0].price,
        id: filteredProduct[0].id,
      });
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  const addProdToCart = async () => {
    if (product.title !== "") {
      await AddProductToCart(product.id);
    } else {
      console.log("Product could not be found");
    }
  };

  return (
    <div
      className={`w-full max-w-screen-2xl h-fit pb-[40px] ${
        isDark ? `text-white` : `text-black`
      }`}
    >
      <div className="w-full h-fit m-auto flex flex-col gap-[50px] lg:flex-row items-start justify-center px-[15px]">
        <div className="px-[7px] bg-white rounded-xl mx-[15px]">
          <Image src={product.image} alt="product" width={550} height={400} />
        </div>
        <div className="w-1/2">
          <h2
            className={`text-4xl font-extrabold ${
              isDark ? `text-white` : `text-gray-800`
            }`}
          >
            {product.title}
          </h2>
          <div className="mt-8">
            <h3
              className={`text-lg font-bold ${
                isDark ? `text-white` : `text-gray-800`
              }`}
            >
              {t("product.about")}
            </h3>
            <p>{product.description}</p>
          </div>
          <div className="mt-8 max-w-md">
            <h3
              className={`text-lg font-bold ${
                isDark ? `text-white` : `text-gray-800`
              }`}
            >
              {t("product.reviews")}(10)
            </h3>
            <div className="space-y-3 mt-4">
              <div className="flex items-center">
                <p
                  className={`text-sm font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  }`}
                >
                  5.0
                </p>
                <svg
                  className="w-5 fill-gray-800 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={`${isDark ? `fill-white` : ``}`}
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div
                    className={`w-2/3 h-full rounded ${
                      isDark ? `bg-red-400` : `bg-gray-800 `
                    }`}
                  ></div>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? `text-white` : `text-gray-800`
                  } font-bold ml-3`}
                >
                  66%
                </p>
              </div>
              <div className="flex items-center">
                <p
                  className={`text-sm ${
                    isDark ? `text-white` : `text-gray-800`
                  } font-bold`}
                >
                  4.0
                </p>
                <svg
                  className="w-5 fill-gray-800 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={`${isDark ? `fill-white` : ``}`}
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div
                    className={`w-1/3 h-full rounded ${
                      isDark ? `bg-red-400` : `bg-gray-800`
                    }`}
                  ></div>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? `text-white` : `text-gray-800`
                  } font-bold ml-3`}
                >
                  33%
                </p>
              </div>
              <div className="flex items-center">
                <p
                  className={`text-sm text-gray-800 font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  }`}
                >
                  3.0
                </p>
                <svg
                  className="w-5 fill-gray-800 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={`${isDark ? `fill-white` : ``}`}
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div
                    className={`w-1/6 h-full rounded ${
                      isDark ? `bg-red-400` : `bg-gray-800`
                    }`}
                  ></div>
                </div>
                <p
                  className={`text-sm text-gray-800 font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  } ml-3`}
                >
                  16%
                </p>
              </div>
              <div className="flex items-center">
                <p
                  className={`text-sm text-gray-800 font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  }`}
                >
                  2.0
                </p>
                <svg
                  className="w-5 fill-gray-800 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={`${isDark ? `fill-white` : ``}`}
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div
                    className={`w-1/12 h-full rounded bg-gray-800 ${
                      isDark ? `bg-red-400` : `bg-gray-800`
                    }`}
                  ></div>
                </div>
                <p
                  className={`text-sm text-gray-800 font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  } ml-3`}
                >
                  8%
                </p>
              </div>
              <div className="flex items-center">
                <p
                  className={`text-sm text-gray-800 font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  }`}
                >
                  1.0
                </p>
                <svg
                  className="w-5 fill-gray-800 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={`${isDark ? `fill-white` : ``}`}
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  />
                </svg>
                <div className="bg-gray-300 rounded w-full h-2 ml-3">
                  <div
                    className={`w-[6%] h-full rounded ${
                      isDark ? `bg-red-400` : `bg-gray-800`
                    }`}
                  ></div>
                </div>
                <p
                  className={`text-sm text-gray-800 font-bold ${
                    isDark ? `text-white` : `text-gray-800`
                  } ml-3`}
                >
                  6%
                </p>
              </div>
            </div>
            <button
              onClick={addProdToCart}
              type="button"
              className={`w-full mt-8 px-4 py-2 bg-transparent border-2  font-bold rounded ${
                isDark
                  ? `border-white text-white hover:bg-white hover:text-black`
                  : `border-gray-800 text-gray-800 hover:bg-black hover:text-white`
              }`}
            >
              {t("product.addToCart")}
            </button>
          </div>
        </div>
      </div>
      {productsData ? (
        <RecommendedProducts
          activeProductId={productId}
          products={productsData}
          category={product.category_name}
        />
      ) : undefined}
    </div>
  );
};

export default ProductPage;
