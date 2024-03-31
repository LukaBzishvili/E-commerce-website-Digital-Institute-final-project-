import React from "react";
import Image from "next/image";
import prodImage from "../../../../public/images/hp-victus-16-1.webp";
import { useStore } from "../../page";

interface ProductCardImageProps {
  title: string;
  category: string;
  price: string;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({
  price,
  category,
  title,
}) => {
  const { isDark } = useStore();
  return (
    <div
      className={`text-white
       relative w-[240px] h-[200px] flex flex-col items-end justify-end gap-[10px] cursor-pointer rounded-xl p-[10px]`}
    >
      <Image
        src={prodImage}
        alt="product"
        className="rounded-xl absolute z-[-1] top-[20px] left-0"
        width={240}
        height={200}
      />
      <div className="top-[190px] w-full h-full left-0 flex flex-row items-center self-start justify-center gap-[10px]">
        <div className="h-full w-full flex flex-col items-center justify-center gap-[5px]">
          <h3 className="font-extrabold	text-xl align-center text-center">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCardImage;
