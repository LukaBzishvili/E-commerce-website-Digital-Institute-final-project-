import React, { useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import Image from "next/image";
import { useStore } from "../../page";
import Link from "next/link";

interface Product {
  title: string;
  category_name: string;
  description: string;
  image: string;
  salePrice: number | null;
  price: number;
  id: string;
}

interface ForSaleProductsProps {
  products: Product[];
}

const ForSaleProducts: React.FC<ForSaleProductsProps> = ({ products }) => {
  const { isDark } = useStore();

  const slides = products.map((product) => (
    <Link
      href={`/pages/ProductPage?id=${product.id}`}
      className="p-[10px] h-[300px] w-full cursor-pointer flex items-center justify-center flex-col gap-[5px] border-[1.5px] border-solid border-gray-300 py-[30px]"
    >
      <Image src={product.image} width={200} height={157} alt="for sale" />
      <h4 className="font-medium text-lg">{product.title}</h4>
      <p>{product.salePrice}</p>
    </Link>
  ));

  return (
    <div
      className={`h-fit w-full ${
        isDark ? `bg-[#1e1e1f] text-white` : `bg-slate-200 text-black`
      } my-[40px]`}
    >
      <Carousel slides={slides} />
    </div>
  );
};

export default ForSaleProducts;
