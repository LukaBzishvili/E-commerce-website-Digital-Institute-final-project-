"use client";
import { CartProductProps } from "@/app/helpers/Interfaces/Interfaces";
import React, { useEffect, useState } from "react";
import { getCartProducts } from "@/app/helpers/axios/axios";
import CartCard from "@/app/components/CartCard/CartCard";
import Link from "next/link";

const Page = () => {
  const [cartProducts, setCartProducts] = useState<CartProductProps[]>([]);
  const [productsTotalPrice, setProductsTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const getCartProdsWithPrice = async () => {
    try {
      const fetchedProducts = await getCartProducts();
      console.log("Fetched cart products:", fetchedProducts);
      let fullPrc = 0;
      fetchedProducts.forEach((element: CartProductProps) => {
        fullPrc += element.cartProduct.price;
      });
      const shippingPrc = fullPrc * 0.01;
      setProductsTotalPrice(fullPrc);
      setShippingPrice(shippingPrc);
      setCartProducts(fetchedProducts || []);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error getting cart products:", error);
    }
  };

  const handleProductRemoved = (removedProductPrice: number) => {
    const updatedTotalPrice = productsTotalPrice - removedProductPrice;
    setProductsTotalPrice(updatedTotalPrice);

    const updatedShippingPrice = updatedTotalPrice * 0.01;
    setShippingPrice(updatedShippingPrice);
  };

  useEffect(() => {
    getCartProdsWithPrice();
  }, []);

  return (
    <div className="h-screen py-[30px]">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartProducts.length > 0 ? (
            <div className="flex flex-wrap gap-4 w-full overflow-y-scroll p-[20px] no-scrollbar">
              {cartProducts.map((cartProduct: CartProductProps) => (
                <div key={cartProduct.id}>
                  <CartCard
                    cartProduct={cartProduct}
                    onProductRemoved={handleProductRemoved}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No products in the cart</p>
          )}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${productsTotalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${shippingPrice}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold text-gray-950 mr-[10px]">Total:</p>
            <div className="flex flex-row w-full items-center justify-between">
              <p className="mb-1 text-lg font-bold text-gray-950">
                ${shippingPrice + productsTotalPrice} USD
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          {cartProducts ? (
            <Link
              href={"/pages/PaymentForm"}
              className="mt-6 w-full px-[7px] rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </Link>
          ) : (
            <button className="mt-6 w-full px-[7px] rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
