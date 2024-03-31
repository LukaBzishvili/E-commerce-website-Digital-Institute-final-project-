"use client";
import { CartProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { removeProductFromCart } from "@/app/helpers/axios/axios";
import React, { useState } from "react";

interface CartCardProps {
  cartProduct: CartProductProps;
  onProductRemoved: (removedProductPrice: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  cartProduct,
  onProductRemoved,
}) => {
  const [inputValue, setInputValue] = useState(1);
  const [isRemoved, setIsRemoved] = useState(false);

  const removeProduct = async (productId: string) => {
    try {
      const removedProduct = await removeProductFromCart(productId);
      console.log("Removed cart products:", removedProduct);
      setIsRemoved(true);

      onProductRemoved(cartProduct.cartProduct.price);
    } catch (error) {
      console.error("Error removing cart product:", error);
    }
  };

  const incrementQuantity = () => {
    setInputValue(inputValue + 1);
  };

  const decrementQuantity = () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
    }
  };

  return (
    <div>
      {isRemoved ? undefined : (
        <div className="justify-between mb-6 rounded-lg gap-[40px] bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img
            src={cartProduct.cartProduct.image}
            alt="product-image"
            className="w-full rounded-lg sm:w-40"
          />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">
                {cartProduct.cartProduct.title}
              </h2>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span
                  onClick={decrementQuantity}
                  className="cursor-pointer rounded-l bg-gray-800 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  {" "}
                  -{" "}
                </span>
                <input
                  className="flex items-center justify-center pl-[14px] h-8 max-w-[45px] border text-gray-950 bg-white text-center text-xs outline-none pointer-events-none"
                  type="number"
                  value={inputValue}
                  onChange={incrementQuantity}
                  min="1"
                />
                <span
                  onClick={incrementQuantity}
                  className="cursor-pointer rounded-r bg-gray-800 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  {" "}
                  +{" "}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-950">
                  {cartProduct.cartProduct.price}$
                </p>
                <button onClick={() => removeProduct(cartProduct.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCard;
