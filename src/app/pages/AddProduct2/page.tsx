"use client";
import React, { useEffect, ChangeEvent, DragEvent, useState } from "react";
import { getAllCategories, getAllProducts } from "@/app/helpers/axios/axios";
import { addProduct } from "../../helpers/axios/axios";
import { Category, addProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { useStore } from "../../page";

const YourProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  ////Image Input
  const [isDragOver, setIsDragOver] = useState(false);
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
  const [productDetails, setProductDetails] = useState<addProductProps>({
    category_name: "",
    title: "",
    price: 0,
    salePrice: 0,
    description: "",
    image: "",
  });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    displayPreview(file);
  };

  const displayPreview = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          image: base64String,
        }));
      };
    }
  };

  ////
  const fetchAllProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      console.log(productsData);
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error: any) {
      console.error("Error fetching categories: ", error);
    }
  };

  const addProductOnWeb = () => {
    const { category_name, title, price, description, salePrice } =
      productDetails;

    if (!category_name || !title || price === 0 || description === "") {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    addProduct(productDetails);
    setProductDetails({
      category_name: "",
      title: "",
      price: 0,
      salePrice: 0,
      description: "",
      image: "",
    });
    setBase64Image(undefined);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryValue = e.target.value;

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      category_name: selectedCategoryValue,
    }));
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <div className="py-[30px] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:w-full">
            <div className="w-full">
              <h2 className="text-center">Main image</h2>
              <div id="media-uploader1">
                <div className="dz-message w-full text-center flex items-center justify-center flex-col gap-[10px]">
                  Drag and drop an image here or click to upload.
                  <div className="w-[300px] h-[350px] flex items-center justify-center">
                    {/* Image Input */}
                    <div
                      className={`w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 ${
                        isDragOver ? "border-indigo-600" : ""
                      }`}
                      id="dropzone"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 z-50"
                        onChange={handleFileChange}
                        id="file-upload"
                        name="file-upload"
                      />
                      <div className="text-center">
                        <img
                          className="mx-auto h-12 w-12"
                          src="https://www.svgrepo.com/show/357902/image-upload.svg"
                          alt=""
                        />

                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer"
                          >
                            <span>Drag and drop</span>
                            <span className="text-indigo-600"> or browse </span>
                            <span>to upload</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>

                      {base64Image && (
                        <img
                          src={base64Image}
                          className="mt-4 mx-auto max-h-40"
                          id="preview"
                          alt="Preview"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <input type="hidden" id="txtMainImgID" name="txtMainImgID" />
              </div>
            </div>
          </div>
          <div className="md:w-full flex items-center justify-center flex-row">
            <div className="w-full p-[20px]">
              <h2 className="text-center">Product Details</h2>
              <hr className="my-4" />
              <div className="w-full mb-4">
                <label className="block text-sm font-medium" htmlFor="txtModel">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    className="input px-[5px] py-[4px] rounded-md text-black"
                    id="categorySelect"
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category: Category) => (
                      <option
                        className={`text-black`}
                        key={category.id}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="txtBrand">
                  Product
                </label>
                <div className="mt-1">
                  <input
                    className="input px-[5px] py-[4px] rounded-md"
                    id="txtBrand"
                    type="text"
                    placeholder="product..."
                    value={productDetails.title}
                    onChange={(e) =>
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="txtYear">
                  Price
                </label>
                <div className="mt-1">
                  <input
                    className="input px-[5px] py-[4px] rounded-md"
                    id="txtYear"
                    type="number"
                    placeholder="price..."
                    value={
                      productDetails.price !== 0 ? productDetails.price : ""
                    }
                    onChange={(e) =>
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        price:
                          e.target.value !== "" ? Number(e.target.value) : 0,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium"
                  htmlFor="txtSalePrice"
                >
                  Sale Price
                </label>
                <div className="mt-1">
                  <input
                    className="input px-[5px] py-[4px] rounded-md"
                    id="txtSalePrice"
                    type="number"
                    placeholder="sale Price..."
                    value={
                      productDetails.salePrice !== null
                        ? productDetails.salePrice
                        : ""
                    }
                    onChange={(e) =>
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        salePrice:
                          e.target.value !== "" ? Number(e.target.value) : 0,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="w-full">
                <label htmlFor="txtDescription">Description</label>
                <div className="mt-1 bg-white w-[full] max-w-[300px] h-[300px]">
                  <input
                    type="text"
                    className="input w-[250px] bg-white p-[7px] flex items-start justify-start rounded-md h-fit outline-0"
                    id="txtDescription"
                    placeholder="description..."
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      overflow: "auto",
                    }}
                    value={productDetails.description}
                    onChange={(e) =>
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={addProductOnWeb}
            className="m-auto text-white bg-purple-400 px-[10px] py-[8px] rounded-xl w-fit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourProducts;
