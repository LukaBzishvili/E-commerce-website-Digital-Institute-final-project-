"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../page";

const useLanguageInitialization = () => {
  const { isEnglish } = useStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      if (isEnglish == false) {
        await i18n.changeLanguage("ka");
      } else if (isEnglish == true) {
        await i18n.changeLanguage("en");
      }
    };

    loadLanguage();
  }, [i18n]);

  return i18n;
};

export default useLanguageInitialization;
