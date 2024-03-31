"use client";
import { useEffect, useState } from "react";
import { registerUser } from "../../helpers/axios/axios";
import { useStore } from "../../page";
import { isAuthedGuard } from "../../helpers/isAuthed/isAuthed";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";

const Register = () => {
  const { isDark, changeIsAuthed } = useStore();
  const { isAuthed } = useStore();
  const [signUpValues, setSignUpValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const { t } = useTranslation();
  const [confirmPassword, setConfirmPassword] = useState("");

  useLanguageInitialization();

  useEffect(() => {
    isAuthedGuard(isAuthed);
  }, []);

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpValues({
      ...signUpValues,
      first_name: e.currentTarget.value,
    });
  };

  const handleLastNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpValues({
      ...signUpValues,
      last_name: e.currentTarget.value,
    });
  };

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpValues({
      ...signUpValues,
      email: e.currentTarget.value,
    });
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpValues({
      ...signUpValues,
      password: e.currentTarget.value,
    });
  };

  const handleConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const handlePhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpValues({
      ...signUpValues,
      phone_number: e.currentTarget.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      !signUpValues.first_name ||
      !signUpValues.last_name ||
      !signUpValues.email ||
      !signUpValues.password ||
      !confirmPassword ||
      !signUpValues.phone_number
    ) {
      console.error("Please fill in all fields");
      return;
    }

    if (signUpValues.password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(signUpValues.email)) {
      console.error("Invalid email address");
      return;
    }
    //(?=.*[@$!%*?&])
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(signUpValues.password)) {
      console.error(
        "Invalid password. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }

    const phoneNumberPattern = /^[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}$/;
    if (!phoneNumberPattern.test(signUpValues.phone_number)) {
      console.error(
        "Invalid phone number format. Please use the format: 599-44-32-22"
      );
      return;
    }

    // const phoneNumberPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
    // if (!phoneNumberPattern.test(signUpValues.phone_number)) {
    //   console.error(
    //     "Invalid phone number format. Please use the format: 599-44-32-22"
    //   );
    //   return;
    // }

    changeIsAuthed();
    registerUser(signUpValues);
  };

  return (
    <div
      className={`w-screen h-screen ${
        isDark ? `bg-[#1e293b]` : `bg-slate-200`
      } flex flex-col pt-[50px] items-center justify-center`}
    >
      <h1 className="text-4xl text-white font-bold">{t("register.signUp")}</h1>
      {/* bg-neutral-500 */}
      <div className="w-fit m-auto flex items-center justify-center   px-[14px] py-[10px] rounded-xl bg-[#333] text-white">
        <form action="">
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="name">
              {t("register.name")}
            </label>
            <input
              onChange={(e) => handleNameInput(e)}
              className="bg-[#555] px-[15px] py-[5px] rounded-md"
              type="text"
              id="name"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="lastName">
              {t("register.lastName")}
            </label>
            <input
              onChange={(e) => handleLastNameInput(e)}
              className="bg-[#555] px-[15px] py-[5px] rounded-md"
              type="text"
              id="lastName"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="email">
              {t("register.email")}
            </label>
            <input
              onChange={(e) => handleEmailInput(e)}
              className="bg-[#555] px-[15px] py-[5px] rounded-md"
              type="email"
              id="email"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="password">
              {t("register.password")}
            </label>
            <input
              onChange={(e) => handlePasswordInput(e)}
              className="bg-[#555] px-[15px] py-[5px] rounded-md"
              type="password"
              id="password"
              autoComplete="password"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="password">
              {t("register.confirmPassword")}
            </label>
            <input
              onChange={(e) => handleConfirmPassword(e)}
              className="bg-[#555] px-[15px] py-[5px] rounded-md"
              type="password"
              id="confirm-password"
              autoComplete="confirm password"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-[7px]">
            <label className="text-start w-full mt-[10px]" htmlFor="tel">
              {t("register.phoneNumber")}
            </label>
            <input
              onChange={(e) => handlePhoneNumber(e)}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
              placeholder="599-00-00-00"
              className="bg-[#555] px-[15px] py-[5px] rounded-md"
              type="number"
              id="number"
            />
          </div>
          <input
            onClick={(e) => handleSubmit(e)}
            className="hover:bg-[#8c5fb2] bg-[#b38bff] cursor-pointer text-black w-full self-center py-[10px] rounded-md mt-[15px]"
            type="submit"
            value={`${t("register.submit")}`}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
