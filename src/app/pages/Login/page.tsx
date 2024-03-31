"use client";
import { useEffect, useState } from "react";
import { useStore } from "../../page";
import { LoginUser } from "../../helpers/axios/axios";
import { isAuthedGuard } from "../../helpers/isAuthed/isAuthed";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import LoadingScreen from "@/app/components/LoadingScreen/LoadingScreen";

const LogIn = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const { t } = useTranslation();
  const { isDark } = useStore();
  const { isAuthed, changeIsAuthed } = useStore();
  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });

  useLanguageInitialization();

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginInputValues({ ...loginInputValues, email: e.currentTarget.value });
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginInputValues({
      ...loginInputValues,
      password: e.currentTarget.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(loginInputValues);

    try {
      const loginSuccessful = await LoginUser(loginInputValues);

      if (loginSuccessful) {
        setIsLoaded(false);
        changeIsAuthed();
        isAuthedGuard(isAuthed);
        console.log("User logged in successfully!");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    isAuthedGuard(isAuthed);
  }, [isAuthed]);

  return (
    <div
      className={`w-full py-[200px]  
       flex flex-col items-center justify-center pt-[50px] gap-[50px]`}
    >
      <LoadingScreen isLoaded={isLoaded} />
      <h1 className="text-4xl text-white font-bold">{t("logIn.title")}</h1>
      <div className="w-fit flex flex-wrap items-center justify-center rounded-xl bg-[#333] text-white px-[14px] py-[10px]">
        <form action="">
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="email">
              {t("logIn.email")}
            </label>
            <input
              onChange={(e) => handleEmailInput(e)}
              className="bg-[#555] rounded-md px-[15px] py-[5px]"
              type="email"
              id="email"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="password">
              {t("logIn.password")}
            </label>
            <input
              onChange={(e) => handlePasswordInput(e)}
              className="bg-[#555] rounded-md px-[15px] py-[5px] "
              type="password"
              id="password"
              autoComplete="password"
            />
          </div>
          <input
            onClick={(e) => handleSubmit(e)}
            className="hover:bg-[#8c5fb2] bg-[#b38bff] cursor-pointer text-black w-full self-center py-[10px] rounded-md mt-[15px]"
            type="submit"
            value={`${t("logIn.submit")}`}
          />
        </form>
        {/* <button onClick={() => refreshToken()}>Refresh</button> */}
      </div>
    </div>
  );
};

export default LogIn;
