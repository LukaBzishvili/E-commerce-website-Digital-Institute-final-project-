"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "../../page";
import { isAuthedGuard } from "@/app/helpers/isAuthed/isAuthed";
import CheckmarkAnimation from "@/app/helpers/CheckmarkAnimation/CheckmarkAnimation";

const PaymentForm: React.FC = () => {
  const { isDark, isAuthed } = useStore();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [inputValues, setInputValues] = useState({
    name: "",
    cardNumber: "",
    expirationDateDM: "",
    expirationDateY: "",
    securityCode: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues: any) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value.replace(/\D/g, "").substring(0, 16);
    const cardNumberWithSpaces = input.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(cardNumberWithSpaces);
    setInputValues((prevInputValues: any) => ({
      ...prevInputValues,
      cardNumber: cardNumberWithSpaces,
    }));
  };

  const handleSubmit = () => {
    const {
      name,
      cardNumber,
      expirationDateDM,
      expirationDateY,
      securityCode,
    } = inputValues;
    if (
      name &&
      cardNumber &&
      expirationDateDM &&
      expirationDateY &&
      securityCode
    ) {
      setIsSubmitted(true);
    } else {
      console.error("Please fill in all fields");
      console.log(inputValues);
    }
  };

  useEffect(() => {
    isAuthedGuard(isAuthed);
  }, []);

  return (
    <div
      className={`${
        isDark ? `bg-[#252424]` : `bg-gray-200`
      } min-w-screen min-h-screen  flex items-center justify-center px-5 pb-10 pt-16`}
    >
      {isSubmitted ? (
        <div className="w-full h-full pb-[300px] flex items-center justify-center absolute top-0 left-0">
          <CheckmarkAnimation />
        </div>
      ) : undefined}
      <div
        className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
        style={{ maxWidth: "600px" }}
      >
        <div className="w-full pt-1 pb-5">
          <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <i className="mdi mdi-credit-card-outline text-3xl"></i>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">
            Secure payment info
          </h1>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="John Smith"
              type="text"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Card number</label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="0000 0000 0000 0000"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
        </div>
        <div className="mb-3 -mx-2 flex items-end">
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1">
              Expiration date
            </label>
            <div>
              <select
                className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                name="expirationDateDM"
                value={inputValues.expirationDateDM}
                onChange={handleInputChange}
              >
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>
          </div>
          <div className="px-2 w-1/2">
            <select
              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              name="expirationDateY"
              value={inputValues.expirationDateY}
              onChange={handleInputChange}
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>
        <div className="mb-10">
          <label className="font-bold text-sm mb-2 ml-1">Security code</label>
          <div>
            <input
              className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="000"
              type="text"
              name="securityCode"
              value={inputValues.securityCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
