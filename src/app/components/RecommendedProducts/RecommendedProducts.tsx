"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import RecommendedProductCard from "../RecommendedProductCard/RecommendedProductCard";
import Carousel from "../Carousel/Carousel";
import { useTranslation } from "react-i18next";
import { ProductProps } from "@/app/helpers/Interfaces/Interfaces";
import useLanguageInitialization from "@/app/helpers/Language/Language";

interface RecommendedProductsProps {
  category: string;
  products: ProductProps[];
  activeProductId: string | null;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  category,
  products,
  activeProductId,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

  ///////Translation
  const { t } = useTranslation();
  useLanguageInitialization();
  //////////////////

  const filterProducts = () => {
    const recommendedProds = products.filter(
      (product: ProductProps) =>
        product.category_name == category && product.id !== activeProductId
    );

    setFilteredProducts(recommendedProds);
  };

  useEffect(() => {
    console.log("activeProductId:", activeProductId);
    console.log("filteredProducts:", filteredProducts);
    filterProducts();
  }, [products, activeProductId]);

  return (
    <div>
      <div className="mt-[70px] mx-[30px]">
        <div>
          <h2 className="text-3xl mb-[10px]">{t("product.recommended")}</h2>
        </div>
        <div className="gap-[20px] border-2 border-solid border-gray-300 py-[15px] px-[10px]">
          {filteredProducts.length > 3 ? (
            <Carousel
              slides={filteredProducts.map((recommendedProduct) => (
                <div key={recommendedProduct.id}>
                  <RecommendedProductCard product={recommendedProduct} />
                </div>
              ))}
            />
          ) : (
            <div className="w-full flex flex-row justify-start gap-[30px]">
              {filteredProducts.map((recommendedProduct) => (
                <div key={recommendedProduct.id}>
                  <RecommendedProductCard product={recommendedProduct} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
