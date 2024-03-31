import React, { useEffect, useState } from "react";
import {
  addProduct,
  getAllProducts,
  removeProduct,
} from "@/app/helpers/axios/axios";
import { productsData } from "../../Utils";
import type { ProductProps } from "@/app/helpers/Interfaces/Interfaces";

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductProps>();
  const addAllProducts = async () => {
    await addProduct(productsData[2]);
  };

  const getProductsData = async () => {
    const productsData = await getAllProducts();
    setProducts(productsData);
    console.log(productsData);
  };

  const deleteProduct = async () => {
    const productsData = await getAllProducts();

    if (products !== undefined) {
      productsData.forEach((product: ProductProps) => {
        // removeProduct(product.id);
        console.log(product.id);
      });
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div className="flex items-start justify-start flex-col gap-[20px] h-[600px]">
      <button className="text-white" onClick={addAllProducts}>
        Add Product
      </button>
      <button className="text-white" onClick={getProductsData}>
        Get Products
      </button>
      <button className="text-white" onClick={deleteProduct}>
        Delete Product
      </button>
    </div>
  );
};

export default Product;
