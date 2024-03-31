import {
  AddCategoriesProps,
  ProductProps,
  UserData,
  UserDataProps,
  addProductProps,
} from "../Interfaces/Interfaces";
import axios, { AxiosRequestConfig } from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      process.env.API_GET_ALL_PRODUCTS || "http://localhost:3000/product"
      //?onlySales=false
      //?maxPrice=9000
    );
    // console.log(response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const getSpecificProducts = async (type: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/product?${type}`
      //maxPrice=9000
      //onlySales=false
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      process.env.API_GET_ALL_CATEGORIES ||
        "http://localhost:3000/product-category"
    );
    return response.data;
  } catch (error: any) {
    console.error("Error getting categories: ", error);
  }
};

//Authorisation
//Register

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(
      process.env.API_REGISTER_URL || "http://localhost:3000/auth/register",
      userData
    );

    console.log("Registration successful:", response.data);
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refreshToken", response.data.refresh_token);
    return response.data;
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//Log In
interface LogInData {
  email: string;
  password: string;
}

export const LoginUser = async (logInData: LogInData) => {
  try {
    const response = await axios.post(
      process.env.API_LOGIN_URL || "http://localhost:3000/auth/login",
      logInData
    );

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refreshToken", response.data.refresh_token);
    if (response.status < 400) {
      // Successful login
      console.log("Log In successfull: ", response.data);
      return true; // Indicate successful login
    } else {
      // Unsuccessful login
      console.error("Log In failed: ", response.data);
      return false; // Indicate unsuccessful login
    }
  } catch (error: any) {
    console.error(
      "Log In failed: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

////////////////////////////////////////////////////

export const addProduct = async (product: addProductProps): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    // refreshToken();

    const apiUrl = "http://localhost:3000/product";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody = {
      title: product.title,
      category_name: product.category_name,
      description: product.description,
      image: product.image.startsWith("data:image")
        ? product.image.split(",")[1]
        : product.image,
      salePrice: product.salePrice,
      price: product.price,
    };

    const config: AxiosRequestConfig = {
      headers,
    };

    const response = await axios.post(apiUrl, requestBody, config);

    console.log("Product added successfully:", response.data);
  } catch (error: any) {
    console.error("Error adding product:", error.message);
  }
};

interface Products {
  products: ProductProps[];
}

export const getSaleProducts = async () => {
  try {
    const response = await axios.get(
      process.env.API_GET_ALL_PRODUCTS ||
        "http://localhost:3000/product?onlySales=true"
      //maxPrice=9000
    );
    // console.log(response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const addMultipleProducts = async (
  products: Products
): Promise<void> => {
  try {
    const response = await axios.post(
      process.env.API_ADD_MULTIPLE_PRODUCTS ||
        "http://localhost:3000/product/many",
      products,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Products added successfully: ", response.data);
  } catch (error: any) {
    console.error("Error adding products: ", error);
  }
};

export const removeProduct = async (productId: string) => {
  try {
    const response = await axios.delete(
      process.env.API_DELETE_PRODUCT + productId ||
        "http://localhost:3000/product/" + productId,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Product removed successfully", response.data);
  } catch (error: any) {
    console.error("Error removing product: ", error);
  }
};

export const addCategory = async (category: string) => {
  try {
    const response = await axios.post(
      process.env.API_CREATE_CATEGORY ||
        "http://localhost:3000/product-category",
      category,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error: any) {
    console.error("Error adding category: ", error);
  }
};

export const addMultipleCategories = async ({
  categories,
}: AddCategoriesProps): Promise<void> => {
  refreshToken();
  try {
    const response = await axios.post(
      "http://localhost:3000/product-category/many",
      { categories },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Categories added successfully:", response.data);
  } catch (error) {
    console.error("Error adding categories:", error);
  }
};

///////////////
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const data = {
    refresh_token: refreshToken,
  };

  const authToken = localStorage.getItem("token");

  if (!authToken) {
    console.log("Authorization token not found in localStorage");
    return;
  }

  try {
    const response = await axios.post(
      process.env.API_UPDATE_TOKENS ||
        "http://localhost:3000/auth/update-tokens",
      data
    );

    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    console.log("Access token refreshed:");

    localStorage.setItem("token", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  } catch (error: any) {
    console.error(
      "Error refreshing access token: ",
      error.response?.data || error.message
    );
    localStorage.removeItem("token");
  }
};

////Get favourite products
export const getFavouriteProducts = async () => {
  // refreshToken();
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      process.env.API_GET_FAVOURITE_PRODUCTS ||
        "http://localhost:3000/liked-products",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching liked products: ", error);
  }
};

////Add favorite products
export const addFavoriteProduct = async (productid: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    const response = await axios.post(
      process.env.API_ADD_FAVOURITE_PRODUCT ||
        "http://localhost:3000/liked-products",
      { product_id: productid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Product liked successfully: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error liking product: ", error);
  }
};

////Remove Liked Product
export const removeLikedProduct = async (productId: string) => {
  const authToken = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      // process.env.API_DELETE_FAVOURITE_PRODUCTS + `/${productId}` ||
      `http://localhost:3000/liked-products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("Product deleted successfully:", response.data);
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
  }
};

////Get user data
export const getUserData = async () => {
  refreshToken();
  try {
    const response = await axios.get(
      process.env.API_GET_CURRENT_USER ||
        "http://localhost:3000/user/current-user",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error getting user data: ", error);
  }
};

//Update user data
export const updateUser = async (userData: UserDataProps) => {
  try {
    const response = await axios.put(
      process.env.API_UPDATE_CURRENT_USER || "http://localhost:3000/user",
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        verified: userData.verified,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    // return response.data;
  } catch (error: any) {
    console.log(userData);
    console.error("Error updating user data: ", error);
  }
};

////Add Product To Cart
export const AddProductToCart = async (productId: String) => {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    console.error("Authorization token not found in localStorage");
    return;
  }

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  const requestBody = {
    product_id: productId,
  };

  try {
    const response = await axios.post(
      process.env.API_ADD_PRODUCT_IN_CART || "http://localhost:3000/cart",
      requestBody,
      { headers }
    );
    console.log("Product added to cart successfully:", response.data);
  } catch (error: any) {
    console.error(
      "Error adding product to cart:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getCartProducts = async () => {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    console.log("Authorization token not found in localStorage");
    return;
  }

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const response = await axios.get(
      process.env.API_GET_CART_PRODUCTS || "http://localhost:3000/cart",
      { headers }
    );
    // console.log("Cart products retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting cart products:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

export const removeProductFromCart = async (productId: string) => {
  const endpoint = `http://localhost:3000/cart/${productId}`;

  const authToken = localStorage.getItem("token");

  try {
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("Product removed from cart:", response.data);
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

// export const removeLikedProduct2 = async (productId: string) => {
//   try {
//     const response = await axios.delete(
//       process.env.API_DELETE_FAVOURITE_PRODUCTS +
//         `/302a0f3f-c090-4542-b321-83aa2518681a` ||
//         "http://localhost:3000/liked-products" +
//           `/302a0f3f-c090-4542-b321-83aa2518681a`
//     );

//     // Handle success if needed
//     console.log("Product deleted successfully:", response.data);
//   } catch (error: any) {
//     // Handle errors if needed
//     console.error("Error deleting product:", error.message);
//   }
// const endpoint = `http://localhost:3000/liked-products/${productId}`;

// const authToken = localStorage.getItem("token");

// try {
//   const response = await axios.delete(endpoint, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   });

//   console.log("Product removed from cart:", response.data);
// } catch (error) {
//   console.error("Error removing product from cart:", error);
// }
// };
