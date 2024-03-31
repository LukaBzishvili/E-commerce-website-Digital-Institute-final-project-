"use client";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { useEffect, useState, useRef } from "react";
import { useStore } from "../../page";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import { getAllProducts } from "@/app/helpers/axios/axios";

interface SearchInputProps {
  placeholder: string;
  products: ProductProps[];
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, products }) => {
  const { isDark } = useStore();
  const [searchedProds, setSearchedProds] = useState<ProductProps[]>([]);
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  // const [prodData, setProdData] = useState<ProductProps[]>([]);

  useLanguageInitialization();

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   const prods = await getAllProducts();
  //   setProdData(prods);
  //   console.log(prods);
  // };

  // const handleInputChange = async (event: any) => {
  //   const searchTerm = event.currentTarget.value.trim().toLowerCase();
  //   setInputValue(searchTerm);
  //   if (searchTerm.length > 2) {
  //     const filteredProds = fetchProducts(searchTerm);
  //     setSearchedProds(await filteredProds);
  //   } else {
  //     console.log("Search terms length should be longer or equal to 3");
  //   }
  // };

  const handleInputChange = (event: any) => {
    const searchTerm = event.currentTarget.value.trim().toLowerCase();
    setInputValue(searchTerm);
    if (searchTerm.length > 2) {
      const filteredProds = products.filter((product: ProductProps) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      setSearchedProds(filteredProds);
    } else {
      console.log("Search terms length should be longer or equal to 3");
    }
  };

  //////
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setSearchedProds([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [componentRef]);

  return (
    <div
      ref={componentRef}
      className="relative flex flex-col items-center justify-center"
    >
      <div className="font-sans text-black lg:w-[570px] md:w-[300px] sm:w-full hidden bg-white sm:flex items-center justify-center h-[40px] md:rounded-lg overflow-hidden">
        <div className="w-full">
          <div className="w-full">
            <form className="w-full">
              <input
                onChange={handleInputChange}
                type="text"
                placeholder={placeholder}
                className="inline w-full outline-none border-none bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:placeholder-gray-400 sm:text-sm"
              />
            </form>
          </div>
        </div>
        <button className="flex items-center justify-center px-4 border-l">
          <svg
            className="h-4 w-4 text-grey-dark"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div>
      <div
        className={`z-[999] absolute top-[40px] left-0 lg:w-[568px] md:w-[298px] rounded-xl border-2 border-gray-700 border-solid sm:w-full ${
          isDark ? `bg-[#363535] text-white` : `bg-slate-100`
        }`}
      >
        {searchedProds?.length > 1 ? (
          <div className="w-full">
            <Link
              href={`/pages/AllProducts?inputValue=${inputValue}`}
              className="text-white mt-[7px] px-[4px] cursor-pointer py-[3px] bg-gray-500 rounded-lg w-fit"
            >
              {t("searchInput.seeAll")}
            </Link>
            {searchedProds?.map((searchedProd: ProductProps, index: number) =>
              index < 4 ? (
                <Link
                  key={searchedProd.id}
                  href={`/pages/ProductPage?id=${searchedProd.id}`}
                  className="flex flex-row items-center justify-between border-[1px] border-solid border-gray-400 rounded-xl my-[7px]"
                >
                  <h4 key={searchedProd.id}>{searchedProd.title}</h4>
                  <Image
                    src={searchedProd.image}
                    alt="product"
                    width={50}
                    height={50}
                  />
                </Link>
              ) : undefined
            )}
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default SearchInput;
