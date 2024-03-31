"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { create } from "zustand";
import { isAuthedGuard } from "@/app/helpers/isAuthed/isAuthed";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import { useTranslation } from "react-i18next";
import Product from "@/app/components/Product/Product";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import MainComponent from "@/app/components/MainComponent/MainComponent";
import Navigation from "@/app/components/Navigation/Navigation";
import {
  getAllCategories,
  getAllProducts,
  refreshToken,
} from "@/app/helpers/axios/axios";
import {
  ProductProps,
  useStoreState,
} from "@/app/helpers/Interfaces/Interfaces";
import Image from "next/image";
import headphones from "../../../../public/images/headphone.webp";
import iphone from "../../../../public/images/iphone.webp";

////////////////////////////////////////////////////////////Zustand
import { useStore } from "../../page";
import { checkThemeStateOnOpen } from "../../page";
import { checkIsAuthedStateOnOpen } from "../../page";
import { productsData } from "@/app/Utils";
import Carousel from "@/app/components/Carousel/Carousel";
import SalesCard from "@/app/components/SalesCard/SalesCard";
// export const checkThemeStateOnOpen = () => {
//   // if (typeof window !== undefined) {
//   const localThemeState = localStorage.getItem("isDark");
//   if (localThemeState !== null) {
//     return JSON.parse(localThemeState);
//   } else {
//     console.log("Local Theme is Empty");
//     localStorage.setItem("isDark", "false");
//     return false;
//   }
// };
// // return false;
// // };

// export const checkIsAuthedStateOnOpen = () => {
//   const localToken = localStorage.getItem("token");
//   if (localToken !== null) {
//     return true;
//   } else {
//     console.log("Token is Empty");
//     return false;
//   }
// };

// export const useStore = create<useStoreState>()((set) => ({
//   isDark: checkThemeStateOnOpen(),
//   isAuthed: checkIsAuthedStateOnOpen(),
//   lang: "en",
//   changeTheme: () => set((state) => ({ isDark: !state.isDark })),
//   changeIsAuthed: () => set((state) => ({ isAuthed: !state.isAuthed })),
//   changeLang: () =>
//     set((state) => ({ lang: state.lang == "en" ? "ka" : "en" })),
// }));

/////////////////////////////////////////////////////////////////////////

const Main = () => {
  const [themeState, setThemeState] = useState(checkThemeStateOnOpen());
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHamburgerActive, setISHamburgerActive] = useState(false);
  const { isDark, isAuthed, changeIsAuthed } = useStore();
  const { t } = useTranslation();

  const handleHamburger = () => {
    setISHamburgerActive(!isHamburgerActive);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    changeIsAuthed();
    isAuthedGuard(isAuthed);
    window.location.reload();
  };

  useEffect(() => {
    isAuthedGuard(isAuthed);
    console.log(localStorage.getItem("token"));
  }, []);

  useLanguageInitialization();

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      console.log(productsData);
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  useLayoutEffect(() => {
    ////////////////Getting Data
    isAuthedGuard(isAuthed);
    fetchCategories();
    fetchAllProducts();
    ///////////////////Checking Theme
    const themeVar = checkThemeStateOnOpen();
    if (themeVar !== null) {
      setThemeState(themeVar);
    }
    ///////////////////Checking For Sale Products
    getAllProducts().then((products: Array<any>) => {
      const saleProducts = products.filter(
        (product) => product.salePrice !== null
      );
    });
    //////////////////
    setIsLoaded(true);
    /////////////////refreshing token
    // const intervalId = setInterval(refreshToken, 2 * 60 * 1000);
    // return () => {
    // clearInterval(intervalId);
    // };
  }, []);

  const slides = products.map((product: ProductProps) => (
    <div className="relative flex flex-col items-center justify-center border-[1px] border-gray-300 border-solid">
      <div className="absolute top-0 p-[10px] self-center rounded-b-lg bg-green-400 text-white">
        <span className="text-2xl">For Sale!</span>
      </div>
      <Image
        src={product.image}
        alt="saleProduct"
        width={200}
        height={170}
        className="bg-white w-full"
      />
      <div
        className={`w-full text-start p-[7px] ${
          isDark ? `text-white` : `text-black`
        }`}
      >
        <p className={`${isDark ? `text-gray-200` : `text-gray-700`} text-md`}>
          {product.category_name}
        </p>
        <h5 className="text-2xl">{product.title}</h5>
        <span className="font-bold text-xl">{product.price}$</span>
      </div>
    </div>
  ));

  return (
    <div
      className={`${
        isDark ? `bg-[#252424] text-white` : `bg-[#f1f3f6] text-black`
      } h-full`}
    >
      <div className="flex items-center justify-center w-full">
        <MainComponent />
      </div>
      <div className="w-full">
        <Navigation list={categories} />
      </div>
      <button onClick={logOut}>{t("main.logOut")}</button>
      <div className="flex flex-wrap gap-[20px] items-center justify-evenly w-full flex-row my-[70px]">
        <SalesCard
          link="/pages/Products?category=გეიმინგი"
          image={headphones}
        />
        <SalesCard link="/pages/Products?category=სმარტფონები" image={iphone} />
      </div>
      <div>
        <Carousel slides={slides} />
      </div>
    </div>
  );
};

export default Main;
