"use client";
import { useState, useEffect } from "react";
import React from "react";
import ThemeButton from "../ThemeButton/ThemeButton";
import { useStore } from "@/app/page";
import Link from "next/link";
import { FaCog } from "react-icons/fa";
import SearchInput from "../SearchInput/SearchInput";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";

interface HeaderProps {
  products: ProductProps[];
}

const Header: React.FC<HeaderProps> = ({ products }) => {
  const [isHamburgerActive, setHamburgerActivity] = useState(false);
  const { isDark, isAuthed, changeSlidingCartState } = useStore();
  const { t } = useTranslation();

  useLanguageInitialization();

  const handleHamburgerActivity = () => {
    setHamburgerActivity(!isHamburgerActive);
  };

  const handleCartClick = () => {
    changeSlidingCartState();
  };

  useEffect(() => {
    setHamburgerActivity(false);
  }, []);

  return (
    <header
      className={`relative px-3 py-2 flex flex-col items-center justify-center mb-[100px]`}
    >
      <nav
        className={`flex justify-between fixed py-[20px] z-[10] shadow-lg max-w-screen-xl px-[25px] top-[0] w-full ${
          isDark ? `bg-[#363535]` : `bg-[#f1f3f6]`
        }`}
      >
        <div className="w-[130px] md:w-[200px] flex items-center">
          <Link href={"/"}>
            <h1
              className={`${
                isDark ? `text-white` : `text-black`
              } text-2xl font-bold`}
            >
              ECOMMERCE
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex w-full items-center justify-center">
          <SearchInput products={products} placeholder="search..." />
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`navLinks ${
              isHamburgerActive ? `w-[300px]` : `w-[0] p-[0]`
            } ${
              isDark ? `bg-[#363535] text-white` : `bg-slate-100`
            } z-[999] top-[82px] transition-all duration-700 overflow-hidden absolute md:bg-transparent md:static md:h-auto md:w-full h-[100vh] flex md:items-center gap-[1.5vw] left-[0] md:px-5 py-0 md:py-5 `}
          >
            <ul className="w-full sm:pt-0 pt-[30px] flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
              <li className="ml-[15px] relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                <Link href="/">{t("header.home")}</Link>
              </li>
              <li className="md:hidden pl-[15px] bg-pink-200 w-full py-[7px] flex flex-row items-center juesify-start gap-[15px]">
                {t("header.theme")} <ThemeButton />
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            {!isAuthed ? (
              <div>
                <Link
                  href={"/pages/Login"}
                  type="button"
                  className="hover:bg-clip-text hover:text-transparent bg-gradient-to-br from-[#2b68e0] to-[#ef74f1] border-solid border-2 border-[#5356e3] font-bold text-white px-5 py-2 rounded-full "
                >
                  {t("header.logIn")}
                </Link>
              </div>
            ) : (
              <div className="flex flex-row gap-[12px] items-center justify-center">
                <div
                  onClick={handleCartClick}
                  className="bg-white cursor-pointer text-black shadow-md px-[15px] py-[8px] rounded-xl mr-[20px] hidden md:block"
                >
                  {t("header.cart")}
                </div>
                <Link href={"/pages/Settings"}>
                  <FaCog className="text-[30px]" />
                </Link>
              </div>
            )}
            <div
              className="ml-[20px] md:hidden cursor-pointer w-[40px] h-[42px] flex flex-col items-center justify-evenly"
              onClick={handleHamburgerActivity}
            >
              <div
                className={`w-full ${
                  isDark ? `bg-white` : `bg-slate-400`
                } h-[7px] rounded-xl`}
              ></div>
              <div
                className={`w-full ${
                  isDark ? `bg-white` : `bg-slate-400`
                } h-[7px] rounded-xl`}
              ></div>
              <div
                className={`w-full ${
                  isDark ? `bg-white` : `bg-slate-400`
                } h-[7px] rounded-xl`}
              ></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
