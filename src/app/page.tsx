"use client";
import { useState, useLayoutEffect, useEffect, SetStateAction } from "react";
import { create } from "zustand";
import {
  getAllCategories,
  getAllProducts,
  getSaleProducts,
  getSpecificProducts,
  removeProduct,
} from "./helpers/axios/axios";
import { isAuthedGuard } from "./helpers/isAuthed/isAuthed";
import Navigation from "./components/Navigation/Navigation";
import MainComponent from "./components/MainComponent/MainComponent";
import Container from "./components/Container/Container";
import SalesCard from "./components/SalesCard/SalesCard";
import iphone from "../../public/images/iphone.webp";
import headphones from "../../public/images/headphone.webp";
import { useTranslation } from "react-i18next";
import "../i18n";
import useLanguageInitialization from "./helpers/Language/Language";
import { ProductProps, useStoreState } from "./helpers/Interfaces/Interfaces";
import Carousel from "./components/Carousel/Carousel";
import Image from "next/image";
import Link from "next/link";
//////////////////////////////////////////////////////////////Zustand

export const checkThemeStateOnOpen = () => {
  const localThemeState = localStorage.getItem("isDark");
  if (localThemeState !== null) {
    return JSON.parse(localThemeState);
  } else {
    console.log("Local Theme is Empty");
    localStorage.setItem("isDark", "false");
    return false;
  }
};

export const checkIsAuthedStateOnOpen = () => {
  const localToken = localStorage.getItem("token");
  if (localToken !== null) {
    return true;
  } else {
    console.log("Token is Empty");
    return false;
  }
};

export const checkLanguageStateOnOpen = () => {
  const localLanguage = localStorage.getItem("language");
  if (localLanguage !== null) {
    return JSON.parse(localLanguage);
  } else {
    console.log("Token is Empty");
    localStorage.setItem("language", `${true}`);
    return false;
  }
};

export const useStore = create<useStoreState>()((set) => ({
  isDark: checkThemeStateOnOpen(),
  isAuthed: checkIsAuthedStateOnOpen(),
  isEnglish: checkLanguageStateOnOpen(),
  isSlidingCartOpen: false,
  changeSlidingCartState: () =>
    set((state) => ({ isSlidingCartOpen: !state.isSlidingCartOpen })),
  changeTheme: () => set((state) => ({ isDark: !state.isDark })),
  changeIsAuthed: () => set((state) => ({ isAuthed: !state.isAuthed })),
  changeLang: () => set((state) => ({ isEnglish: !state.isEnglish })),
}));

///////////////////////////////////////////////////////////////////////////

export default function Home() {
  const [themeState, setThemeState] = useState(checkThemeStateOnOpen());
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDark, isAuthed, changeIsAuthed } = useStore();
  const { t } = useTranslation();

  const logOut = () => {
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
      changeIsAuthed();
    } else {
      console.log("token is empty");
      console.log(localStorage.getItem("token"));
    }
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

  const fetchSaleProducts = async () => {
    const saleProds = await getSpecificProducts("onlySales=true");
    setSaleProducts(saleProds);
    console.log(saleProds);
  };

  useLayoutEffect(() => {
    ////////////////Getting Data
    // isAuthedGuard(isAuthed);
    fetchCategories();
    // fetchAllProducts();
    fetchSaleProducts();
    ///////////////////Checking Theme
    const themeVar = checkThemeStateOnOpen();
    if (themeVar !== null) {
      setThemeState(themeVar);
    }
    ///////////////////Checking For Sale Products

    //////////////////
    setIsLoaded(true);
    console.log(
      "sale Prodssssssssssssssssssssssssssssssssssssssssssssssssssss:" +
        saleProducts
    );
    /////////////////refreshing token
  }, []);

  const slides = saleProducts.map((product: ProductProps) => (
    <Link
      href={`/pages/ProductPage?id=${product.id}`}
      className="relative flex flex-col items-center justify-center border-[1px] h-[350px] border-gray-300 border-solid"
    >
      <div className="absolute top-0 p-[10px] self-center rounded-b-lg bg-green-400 text-white">
        <span className="text-2xl">For Sale!</span>
      </div>
      <Image
        src={product.image}
        alt="saleProduct"
        width={200}
        height={170}
        className="bg-white w-full h-[250px]"
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
        <span className="font-bold text-xl line-through">{product.price}$</span>
        <span className="font-bold text-xl ml-[20px]">
          {product.salePrice}$
        </span>
      </div>
    </Link>
  ));

  const removeProd = () => {
    removeProduct("4d4b3d5a-5dc1-4f2b-ab23-c093a4f6e531");
  };

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
      <div>
        <button className="cursor-pointer" onClick={removeProd}>
          Remove product
        </button>
      </div>
      <button onClick={logOut}>{t("main.logOut")}</button>
      <div className="flex flex-wrap gap-[20px] items-center justify-evenly w-full flex-row my-[70px]">
        <SalesCard
          link="/pages/Products?category=გეიმინგი"
          image={headphones}
        />
        <SalesCard link="/pages/Products?category=სმარტფონები" image={iphone} />
      </div>
      <div className="pb-[70px]">
        {" "}
        {slides[0] ? <Carousel slides={slides} /> : undefined}
      </div>
    </div>
  );
}
