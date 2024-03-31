import React from "react";
import "../CheckmarkAnimation/checkmarkAnimation.css";

const CheckmarkAnimation = () => {
  return (
    <div className="wrapper w-[300px] h-[300px] rounded-lg bg-slate-100 flex justify-center items-center">
      <div className="wrapper flex flex-col gap-[25px]">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
        <h3 className="text-2xl text-gray-500">Success!</h3>
      </div>
    </div>
  );
};

export default CheckmarkAnimation;
