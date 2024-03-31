"use client";
import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllProducts,
  getSaleProducts,
  getSpecificProducts,
} from "@/app/helpers/axios/axios";
import {
  Category,
  productCardProps,
  ProductProps,
} from "@/app/helpers/Interfaces/Interfaces";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "../../page";
import "../../globals.css";

const AllProducts = () => {
  const [price, setPrice] = useState(300);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { isDark } = useStore();
  const [saleProducts, setSaleProducts] = useState<productCardProps[]>([]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      console.log(productsData);
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  const fetchSpecificProducts = async (type: string) => {
    try {
      const saleProductsData = await getSpecificProducts(type);
      console.log(saleProductsData);
      setProducts(saleProductsData);
    } catch (error: any) {
      console.error("Error fetching sale products: ", error);
    }
  };

  const handleActiveCategory = async (category: string) => {
    setActiveCategory(category);
    const filteredProds = await getSpecificProducts(`categoryName=${category}`);
    setProducts(filteredProds);
  };

  const showAllProducts = () => {
    fetchAllProducts();
  };

  const showSaleProducts = () => {
    fetchSpecificProducts("onlySales=true");
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
    getSaleProds();
  }, []);

  const handleInputChange = (e: { currentTarget: { value: any } }) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    const searchValueFromURL = searchParams.get("inputValue");
    setSearchValue(String(searchValueFromURL));

    let filteredProds = products;

    if (searchValueFromURL) {
      filteredProds = filteredProds.filter((product: ProductProps) =>
        product.title
          .toLowerCase()
          .includes(String(searchValueFromURL).toLowerCase())
      );
    }

    filteredProds = filteredProds.filter(
      (product: ProductProps) => product.price < price
    );

    filteredProds = filteredProds.filter((product: ProductProps) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredProducts(filteredProds);
  }, [searchParams, products, price, inputValue]);

  const getSaleProds = async () => {
    const saleProds = await getSaleProducts();
    setSaleProducts(saleProds);
  };

  useEffect(() => {
    const filteredProds = products.filter((product: ProductProps) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredProducts(filteredProds);
  }, [inputValue, products]);

  useEffect(() => {
    const searchValueFromURL = searchParams.get("inputValue");
    setSearchValue(String(searchValueFromURL));

    if (searchValueFromURL) {
      const filteredProds = products.filter((product: ProductProps) =>
        product.title
          .toLowerCase()
          .includes(String(searchValueFromURL).toLowerCase())
      );
      setFilteredProducts(filteredProds);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const handlePriceChange = (event: { target: { value: string } }) => {
    setPrice(parseInt(event.target.value));
  };

  const handlePriceSubmit = async () => {
    const prods = await getSpecificProducts(`maxPrice=${price}`);
    setFilteredProducts(prods);
  };

  return (
    <div className="mt-[100px]">
      <div className="flex">
        <aside
          className={`h-fit ${
            isDark ? "" : "bg-white"
          } fixed z-[10] lg:sticky lg:top-0 border-r-2 p-6 pt-10 whitespace-nowrap closed shadow-xl`}
        >
          <div className="mb-10 flex items-center justify-between">
            <div className=" p-2 bg-purple-600 text-white rounded">
              <Link href={"/"} data-feather="box">
                Go Back
              </Link>
            </div>

            <button className="lg:hidden bg-gray-200 text-gray-500 rounded leading-none p-1 btn-close-menu">
              <i data-feather="chevron-left"></i>
            </button>
          </div>
          <ul className="text-gray-500 font-semibold flex flex-col gap-2">
            {categories.map((category: Category) => (
              <li
                onClick={() => handleActiveCategory(category.name)}
                key={category.id}
              >
                <a className="flex cursor-pointer items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all">
                  <i data-feather="home" className="mr-3 w-[2.4rem]"></i>

                  <span className="flex-grow">{category.name}</span>

                  <span className="text-sm bg-gray-200 leading-none rounded py-1 px-2 ml-10">
                    H
                  </span>
                </a>
              </li>
            ))}
            <li onClick={showAllProducts}>
              <a className="flex cursor-pointer items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all">
                <i data-feather="home" className="mr-3 w-[2.4rem]"></i>

                <span className="flex-grow">ყველა პროდუქტი</span>

                <span className="text-sm bg-gray-200 leading-none rounded py-1 px-2 ml-10">
                  H
                </span>
              </a>
            </li>
            <li onClick={showSaleProducts}>
              <a className="flex cursor-pointer items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all">
                <i data-feather="home" className="mr-3 w-[2.4rem]"></i>

                <span className="flex-grow">ფასდაკლებული</span>

                <span className="text-sm bg-gray-200 leading-none rounded py-1 px-2 ml-10">
                  H
                </span>
              </a>
            </li>
          </ul>
          <div>
            <div className="flex flex-col items-center pt-[40px]">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="priceRange"
                  className="mb-2 font-medium text-lg"
                >
                  Select a price range:
                </label>
                <input
                  type="range"
                  id="priceRange"
                  name="priceRange"
                  min="100"
                  max="7000"
                  step="50"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-64 bg-gray-200 rounded-lg overflow-hidden appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div className="mt-4 px-[8px] py-[5px]">
                  <span className="text-lg font-medium">${price}</span>
                </div>
                <div>
                  <button
                    onClick={handlePriceSubmit}
                    className="mt-4 px-[8px] py-[5px] rounded-xl bg-[#9333EA]"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="w-full relatieve z-[10]">
          <header
            className={`px-6 lg:px-8 pb-4 lg:pb-6 pt-6 lg:pt-10 shadow ${
              isDark ? `` : `bg-white`
            } mb-1 sticky top-0 z-[99]`}
          >
            <h1 className="text-xl font-semibold mb-6 flex items-center">
              <button className="btn-open-menu inline-block lg:hidden mr-6">
                <i data-feather="menu"></i>
              </button>
              <span>Products</span>
            </h1>
            <form className="flex items-center gap-3 bg-gray-100 rounded py-3 px-4 lg:max-w-md">
              <button className="text-gray-500">
                <i data-feather="search" className="w-5"></i>
              </button>
              <input
                type="text"
                placeholder="Search for a product"
                className="bg-transparent outline-none w-full text-black"
                onChange={handleInputChange}
                value={inputValue}
              />
            </form>
          </header>
          <main
            className={`px-6 py-8 lg:px-8 ${
              isDark ? `` : `bg-gray-200`
            } gap-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: ProductProps) => (
                <div key={product.id}>
                  <ProductCard
                    category_name={product.category_name}
                    created_at={product.created_at}
                    description={product.description}
                    id={product.id}
                    image={product.image}
                    price={product.price}
                    salePrice={product.salePrice}
                    title={product.title}
                    updated_at={product.updated_at}
                  />
                </div>
              ))
            ) : (
              <h2>No Products Found</h2>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
