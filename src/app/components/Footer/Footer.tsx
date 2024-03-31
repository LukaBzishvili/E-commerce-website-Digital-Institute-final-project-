"use client";
import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { useStore } from "../../page";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";

const Footer = () => {
  const { t } = useTranslation();
  const { isDark } = useStore();

  useLanguageInitialization();

  return (
    <div>
      <footer
        className={`relative ${
          isDark ? `bg-[#2c1650] text-white` : `bg-[#9e69f4] text-white`
        } pt-[60px]`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl fonat-semibold text-blueGray-700">
                {t("footer.title")}
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                {t("footer.description")}
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="flex items-center justify-center">
                    <FaSquareXTwitter className="text-3xl text-black" />
                  </i>
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="flex items-center justify-center">
                    <FaFacebook className="text-3xl text-black" />
                  </i>
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="flex items-center justify-center">
                    <FaInstagram className="text-3xl text-black" />
                  </i>
                </button>
                <button
                  className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="flex items-center justify-center">
                    <SiGithub className="text-3xl text-black" />
                  </i>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Github
                      </a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <hr className="my-6 border-blueGray-300"> */}
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2021</span>
                <button className="text-blueGray-500 hover:text-gray-800"></button>{" "}
                NextJS by{" "}
                <a className="text-blueGray-500 hover:text-blueGray-800">
                  Creative Luka
                </a>
                .
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.7px] my-[30px] bg-gray-400"></div>
        <div>
          <div
            className={`w-full px-[30px] flex flex-row items-center justify-start pb-[50px] ${
              isDark ? `text-white` : `text-[#161931]`
            }`}
          >
            <LanguageDropDown />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
