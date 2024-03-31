import React, { useEffect } from "react";
import Image from "next/image";

interface CategoryCardProps {
  image: HTMLImageElement;
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => {
  return (
    <div className="relative w-[120px] h-[50px] rounded-lg bg-blue-200 flex items-center justify-center">
      <h2>CategoryCard</h2>
      <Image
        src={image}
        alt="Category"
        className="absolute w-full h-full self-center"
      />
    </div>
  );
};

export default CategoryCard;
