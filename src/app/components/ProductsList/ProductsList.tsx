"use client";
import { addProductProps } from "@/app/helpers/Interfaces/Interfaces";
import { addProduct } from "@/app/helpers/axios/axios";
import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const productsData = [
    {
      title: "Samsung Wireless Earbuds",
      category_name: "აუდიო",
      description:
        "Immerse yourself in music with Samsung Wireless Earbuds and seamless connectivity.",
      image: "",
      salePrice: 80,
      price: 120,
    },
    {
      title: "Samsung Galaxy S21",
      category_name: "სმარტფონები",
      description:
        "This is the latest Samsung Galaxy S21 smartphone with advanced features.",
      image: "",
      salePrice: null,
      price: 1200,
    },
    {
      title: "Samsung Galaxy Book Pro",
      category_name: "ლეპტოპები",
      description:
        "Powerful and sleek Samsung Galaxy Book Pro laptop for your productivity needs.",
      image: "",
      salePrice: null,
      price: 400,
    },
    {
      title: "Sony Soundbar",
      category_name: "აუდიო",
      description:
        "Immerse yourself in rich audio with the Sony Soundbar and advanced sound technologies.",
      image: "sony_soundbar_image_url",
      salePrice: null,
      price: 800,
    },
    {
      title: "LG 4K Smart TV",
      category_name: "TV | მონიტორები",
      description:
        "Enjoy stunning visuals and smart features with the LG 4K Smart TV, perfect for entertainment.",
      image: "lg_4k_tv_image_url",
      salePrice: null,
      price: 1300,
    },
    {
      title: "Dell Gaming Monitor",
      category_name: "გეიმინგი",
      description:
        "Immerse yourself in gaming with the Dell Gaming Monitor, designed for smooth gameplay.",
      image: "",
      salePrice: null,
      price: 1100,
    },
    {
      title: "OnePlus Nord 3",
      category_name: "სმარტფონები",
      description:
        "Experience flagship features with the OnePlus Nord 2 smartphone.",
      image: "",
      salePrice: null,
      price: 900,
    },
    {
      title: "HP Chromebook",
      category_name: "ლეპტოპები",
      description:
        "Compact and efficient, the HP Chromebook is perfect for on-the-go computing.",
      image: "",
      salePrice: null,
      price: 550,
    },
    {
      title: "Samsung Gaming Monitor",
      category_name: "გეიმინგი",
      description:
        "Enhance your gaming experience with the Samsung Gaming Monitor for smooth gameplay.",
      image: "",
      salePrice: null,
      price: 1200,
    },
    {
      title: "Samsung 4K QLED TV",
      category_name: "TV | მონიტორები",
      description:
        "Experience true-to-life visuals with the Samsung 8K QLED TV.",
      image: "",
      salePrice: null,
      price: 2500,
    },
    {
      title: "Samsung Smart Refrigerator",
      category_name: "სმარტფონები",
      description:
        "A smart addition to your kitchen, the Samsung Smart Refrigerator keeps your food fresh.",
      image: "",
      salePrice: null,
      price: 1500,
    },
  ];

  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [productsWithImages, setProductsWithImages] = useState<
    addProductProps[]
  >([]);

  async function convertImagesToBase64(imagePaths: Array<string>) {
    const base64Images = await Promise.all(
      imagePaths.map(async (imagePath: string) => {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        const base64String = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        return base64String;
      })
    );

    return base64Images;
  }

  useEffect(() => {
    const loadImages = async () => {
      const imagePaths = [
        "/images/products/earBuds.jpg",
        "/images/products/DellGamingMonitor.jpg",
        "/images/products/HPChromebook.jpg",
        "/images/products/OnePlus3.jpg",
        "/images/products/Samsung4kMonitor.jpg",
        "/images/products/SamsungGamingMonitor.jpg",
        "/images/products/samsungS21.jpg",
        "/images/products/SamsungSmartRefrigerator.jpg",
        "/images/products/sonySoundbar.jpg",
      ];

      const images = await convertImagesToBase64(imagePaths);
      setBase64Images(images as string[]);

      const productsWithImages = productsData.map((product, index) => ({
        ...product,
        image: images[index],
      }));

      setProductsWithImages(productsWithImages);
    };

    loadImages();
  }, []);

  const addProd = async () => {
    await addProduct(productsWithImages[1]);
  };

  useEffect(() => {
    console.log(base64Images);
    console.log(productsWithImages);
    addProd();
    // productsWithImages.forEach(async (product) => {
    //   await addProduct(product);
    // });
  }, [base64Images, productsWithImages]);

  return (
    <div>
      {base64Images.map((base64String, index) => (
        <img key={index} src={base64String} alt={`Product ${index}`} />
      ))}
    </div>
  );
};

export default ProductsList;
