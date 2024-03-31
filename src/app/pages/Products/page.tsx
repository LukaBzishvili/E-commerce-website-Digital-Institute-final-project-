"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getAllCategories,
  getSpecificProducts,
} from "@/app/helpers/axios/axios";
import { getAllProducts } from "@/app/helpers/axios/axios";
import Link from "next/link";
import { useStore } from "../../page";
import ProductCard2 from "@/app/components/ProductCard2/ProductCard2";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import LoadingScreen from "@/app/components/LoadingScreen/LoadingScreen";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";

const Products = () => {
  const [isLoaded, setisLoaded] = useState(false);
  const searchParams = useSearchParams();
  // const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { isDark } = useStore();

  //Page Translation
  const { t } = useTranslation();

  useEffect(() => {
    // const encodedURL = window.location.href;
    // const decodedURL = decodeURIComponent(encodedURL);
    // const url = new URL(decodedURL);
    // const searchParam = new URLSearchParams(url.search);
    // const categoryURL = searchParams.get("category");
    // setCategoryName(String(categoryURL));
    // console.log(categoryURL);
    fetchProducts();
    setisLoaded(true);
  }, []);

  useLanguageInitialization();

  const fetchProducts = async () => {
    const encodedURL = window.location.href;
    const decodedURL = decodeURIComponent(encodedURL);
    const url = new URL(decodedURL);
    const searchParam = new URLSearchParams(url.search);
    const categoryURL = searchParams.get("category");
    setCategoryName(String(categoryURL));
    const filteredProds = await getSpecificProducts(
      `categoryName=${categoryURL}`
    );
    console.log(categoryName);
    setProducts(filteredProds);
  };

  return (
    <div
      className={`pb-[30px] ${
        isDark ? `bg-[#1e1e1f] text-white` : `bg-slate-200 text-black`
      }`}
    >
      <div className="px-[15px] min-h-screen w-full gap-[20px]">
        <LoadingScreen isLoaded={isLoaded} />
        <div className="flex flex-row w-full justify-between items-center">
          <Link
            className="absolute top-[60px] right-7 bg-blue-400 hover:bg-sky-600 p-3 rounded-xl text-white"
            href={"/"}
          >
            {t("products.goBack")}
          </Link>
        </div>
        <h2 className="text-4xl my-[30px]">{categoryName}</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px] justify-center">
          {products.some(
            (product: ProductProps) => product.category_name === categoryName
          ) ? (
            products
              .filter(
                (product: ProductProps) =>
                  product.category_name === categoryName
              )
              .map((filteredProduct: ProductProps, index: number) => (
                <div className="w-fit m-auto" key={index}>
                  <ProductCard2 product={filteredProduct} />
                </div>
              ))
          ) : (
            <div className="flex items-center justify-center flex-col gap-5">
              <h2 className="text-3xl font-semibold">
                {t("products.noProducts")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
