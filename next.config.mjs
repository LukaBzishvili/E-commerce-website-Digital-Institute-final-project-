/** @type {import('next').NextConfig} */

// import dotenv from "dotenv";
// dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_LOGIN_URL: process.env.API_LOGIN_URL,
    API_REGISTER_URL: process.env.API_REGISTER_URL,
    API_UPDATE_TOKENS: process.env.API_UPDATE_TOKENS,
    API_GET_ALL_PRODUCTS: process.env.API_GET_ALL_PRODUCTS,
    API_ADD_PRODUCT: process.env.API_ADD_PRODUCT,
    API_ADD_MULTIPLE_PRODUCTS: process.env.API_ADD_MULTIPLE_PRODUCTS,
    API_DELETE_PRODUCT: process.env.API_DELETE_PRODUCT,
    API_DELETE_ALL_PRODUCTS: process.env.API_DELETE_ALL_PRODUCTS,
    API_GET_ALL_CATEGORIES: process.env.API_GET_ALL_CATEGORIES,
    API_CREATE_CATEGORY: process.env.API_CREATE_CATEGORY,
    API_CREATE_MULTIPLE_CATEGORIES: process.env.API_CREATE_MULTIPLE_CATEGORIES,
    API_DELETE_CATEGORIES: process.env.API_DELETE_CATEGORIES,
    API_DELETE_ALL_CATEGORIES: process.env.API_DELETE_ALL_CATEGORIES,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    domains: [
      "tecdn.b-cdn.net",
      "tailwindui.com",
      "www.dropbox.com",
      "images.unsplash.com",
      "upload.wikimedia.org",
      "i.postimg.cc",
    ],
  },
};

export default nextConfig;
