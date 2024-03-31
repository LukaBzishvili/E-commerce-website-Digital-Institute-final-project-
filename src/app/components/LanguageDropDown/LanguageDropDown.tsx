import React, { useEffect, useState } from "react";
import { useStore } from "../../page";

const LanguageDropDown = () => {
  const { isEnglish, changeLang } = useStore();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isEn, setIsEn] = useState(isEnglish);

  const handleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLanguageChange = (isEngl: boolean) => {
    setIsEn(isEngl);
    setIsDropDownOpen(false);
    changeLang();
    localStorage.setItem("language", `${!isEnglish}`);
    location.reload();
  };

  return (
    <div
      className={`relative text-black bg-gray-100 px-[7px] py-[3px] rounded-sm`}
    >
      <div>
        <button onClick={handleDropDown}>
          {!isEn ? "Georgian" : "English: US"}
        </button>
      </div>
      {isDropDownOpen ? (
        <div className="absolute top-[30px] left-[-10px] w-[120px] h-[50px] bg-gray-200 rounded-sm">
          <button
            onClick={() => handleLanguageChange(false)}
            className="px-[10px]"
          >
            Georgian
          </button>
          <button
            onClick={() => handleLanguageChange(true)}
            className="px-[10px]"
          >
            English: US
          </button>
        </div>
      ) : undefined}
    </div>
  );
};

export default LanguageDropDown;
