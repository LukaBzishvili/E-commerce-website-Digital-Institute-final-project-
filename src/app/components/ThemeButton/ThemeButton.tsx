"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/page";

const ThemeButton = () => {
  const { isDark, changeTheme } = useStore();
  const [isLight, setIsLight] = useState(isDark);

  useEffect(() => {
    setIsLight(isDark);
  }, [isDark]);

  const handleThemeButton = () => {
    setIsLight(!isDark);
    localStorage.setItem("isDark", `${!isDark}`);
    changeTheme();
  };

  return (
    <div
      className={`cursor-pointer relative w-[47px] h-[29px] rounded-xl ${
        isLight! ? `bg-black` : `bg-white`
      } border-[2px] flex border-white border-solid transition-all duration-500`}
      onClick={handleThemeButton}
    >
      <div
        className={`transition-all duration-500 absolute top-[0.4px] w-[24px] h-[24px] rounded-full z-[1] ${
          isLight ? `bg-white left-[1.4px]` : `left-[19px] bg-black`
        }`}
      ></div>
    </div>
  );
};

export default ThemeButton;
