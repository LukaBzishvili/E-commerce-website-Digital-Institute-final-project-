"use client";
import { addProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { addProduct, getAllCategories } from "@/app/helpers/axios/axios";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState<addProductProps>({
    title: "",
    description: "",
    image: "",
    category_name: "",
    salePrice: 0,
    price: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const getCategoryNames = async () => {
    const catNames = await getAllCategories();
    setCategories(catNames);
  };

  useEffect(() => {
    getCategoryNames();
    console.log(categories);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addProduct(formData);
  };

  return (
    <div className="flex flex-row items-center justify-evenly w-screen h-screen">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-start gap-[10px]"
        >
          <input
            className="bg-gray-200 text-black"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            className="bg-gray-200 text-black"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="bg-gray-200 text-black"
            type="text"
            placeholder="Category"
            name="category"
            value={formData.category_name}
            onChange={handleChange}
          />
          <input
            className="bg-gray-200 text-black"
            type="number"
            placeholder="Sale Price"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
          />

          <input
            className="bg-gray-200 text-black"
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            className="bg-gray-200 text-black"
            type="file"
            placeholder="Image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="self-start bg-orange-400 rounded-xl px-4 py-2"
          >
            Add
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default AddProduct;
