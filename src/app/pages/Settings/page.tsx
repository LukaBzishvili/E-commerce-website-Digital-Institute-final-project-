"use client";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import { getUserData, updateUser } from "@/app/helpers/axios/axios";
import { UserDataProps } from "@/app/helpers/Interfaces/Interfaces";
import Container from "@/app/components/Container/Container";
import ThemeButton from "@/app/components/ThemeButton/ThemeButton";
import { useStore } from "../../page";
import LanguageDropDown from "@/app/components/LanguageDropDown/LanguageDropDown";
import Link from "next/link";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import { useTranslation } from "react-i18next";
import { isAuthedGuard } from "@/app/helpers/isAuthed/isAuthed";

const Settings = () => {
  const [userData, setUserData] = useState<UserDataProps>();
  const [isProfileOpen, setProfileIsOpen] = useState(true);
  const { isDark, isAuthed } = useStore();
  const { t } = useTranslation();
  const [profileInputValues, setProfileInputValues] = useState({
    // id: "",
    // created_at: "",
    // updated_at: "",
    first_name: "",
    last_name: "",
    // phone_number: "",
    email: "",
    verified: false,
    // role: "",
    // password: "",
    // refresh_token: "",
  });

  useLanguageInitialization();

  const getUser = async () => {
    try {
      const userData = await getUserData();
      console.log(userData);
      setUserData(userData);
      setProfileInputValues({
        // id: userData.id,
        // created_at: userData.created_at,
        // updated_at: userData.updated_at,
        first_name: userData.first_name,
        last_name: userData.last_name,
        // phone_number: userData.phone_number,
        email: userData.email,
        verified: Boolean(userData.verified),
        // role: userData.role,
        // password: userData.password,
        // refresh_token: userData.refresh_token,
      });
      console.log(userData);
    } catch (error) {
      console.error("Error getting user data", error);
    }
  };

  const changePageToProfile = () => {
    setProfileIsOpen(true);
  };

  const changePageToWebsiteSettings = () => {
    setProfileIsOpen(false);
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setProfileInputValues({
      ...profileInputValues,
      first_name: e.currentTarget.value,
    });
  };

  const handleLastNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setProfileInputValues({
      ...profileInputValues,
      last_name: e.currentTarget.value,
    });
  };

  const handleVerifiedCheckbox = () => {
    setProfileInputValues({
      ...profileInputValues,
      verified: !profileInputValues.verified,
    });
  };

  useEffect(() => {
    console.log(profileInputValues);
  }, [profileInputValues]);

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    setProfileInputValues({
      ...profileInputValues,
      email: e.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(profileInputValues.email)) {
      console.error("Invalid email address");
      return;
    }
    updateUser(profileInputValues);
  };

  useEffect(() => {
    getUser();
    isAuthedGuard(isAuthed);
  }, []);

  const logOut = () => {
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
      changeIsAuthed();
    } else {
      console.log("token is empty");
      console.log(localStorage.getItem("token"));
    }
  };

  return (
    <div>
      <div
        className={`w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row  ${
          isDark ? `text-white` : `text-[#161931]`
        }`}
      >
        <aside className="py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="h-2/3 sticky flex flex-col items-center justify-between gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <div className="flex flex-col items-start justify-start gap-[7px] w-full">
              <h2 className="pl-3 mb-4 text-2xl font-semibold">
                {t("settings.title")}
              </h2>
              <button
                onClick={changePageToProfile}
                className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full w-full"
              >
                {t("settings.publicProfile")}
              </button>
              <button
                onClick={changePageToWebsiteSettings}
                className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full w-full"
              >
                {t("settings.websiteSettings")}
              </button>
              <Link
                href={"/pages/Cart"}
                className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full w-full"
              >
                {t("settings.cart")}
              </Link>
              <Link
                href={"/pages/LikedProducts"}
                className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full w-full"
              >
                {t("settings.likedProducts")}
              </Link>
              <Link
                href={"/pages/AddProduct2"}
                className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full w-full"
              >
                {t("settings.addProduct")}
              </Link>
              <Link
                href={"/pages/Main"}
                className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full w-full"
              >
                {t("settings.mainPage")}
              </Link>
            </div>
            <div>
              <button
                className="px-[10px] py-[7px] rounded-xl bg-red-500 text-lg"
                onClick={logOut}
              >
                {t("settings.logOut")}
              </button>
            </div>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            {isProfileOpen && isAuthed ? (
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                  Public Profile
                </h2>

                <div className="grid max-w-2xl mx-auto mt-8">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <Image
                      width={200}
                      height={200}
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                      alt="Bordered avatar"
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                      }
                    ></Image>
                  </div>

                  <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                    <div className="flex flex-col items-center justify-start gap-[14px]">
                      <div className="w-full">
                        <label
                          className={`block mb-2 text-sm font-medium ${
                            isDark ? `text-white` : `text-indigo-900`
                          } dark:text-white`}
                        >
                          {t("settings.firstName")}
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your first name"
                          value={profileInputValues.first_name}
                          required
                          onChange={handleNameInput}
                        />
                      </div>

                      <div className="w-full">
                        <label
                          className={`block mb-2 text-sm font-medium ${
                            isDark ? `text-white` : `text-indigo-900`
                          } dark:text-white`}
                        >
                          {t("settings.lastName")}
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your last name"
                          value={profileInputValues.last_name}
                          required
                          onChange={handleLastNameInput}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          className={`block mb-2 text-sm font-medium ${
                            isDark ? `text-white` : `text-indigo-900`
                          } dark:text-white`}
                        >
                          {t("settings.email")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your Email"
                          value={profileInputValues.email}
                          required
                          onChange={handleEmailInput}
                        />
                      </div>
                      <div className="self-start bg-indigo-50 border w-fit border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 flex flex-row items-center justify-start">
                        <label
                          className={`block text-sm font-medium text-indigo-900 dark:text-white`}
                        >
                          {t("settings.isVerified")}
                        </label>

                        <input
                          type="checkbox"
                          checked={profileInputValues.verified}
                          onChange={handleVerifiedCheckbox}
                          className="bg-indigo-50 border ml-[30px] border-indigo-300 text-indigo-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        {t("settings.save")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center py-[30px] gap-[10px]">
                <div className="w-full px-[30px] flex flex-row items-center justify-start bg-purple-300 py-[20px]">
                  <h3 className="mr-[25px]">Theme: </h3>
                  <ThemeButton />
                </div>
                <div
                  className={`w-full px-[30px] flex flex-row items-center justify-start bg-purple-300 py-[20px] ${
                    isDark ? `text-white` : `text-[#161931]`
                  }`}
                >
                  <h3 className="mr-[25px]">Language: </h3>
                  <LanguageDropDown />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
function changeIsAuthed() {
  throw new Error("Function not implemented.");
}
