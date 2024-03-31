export interface ProductProps {
  category_name: string;
  created_at: string;
  description: string;
  id: string;
  image: string;
  price: number;
  salePrice: number | null;
  title: string;
  updated_at: string;
}

export interface productCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  salePrice: string;
}

export interface addProductProps {
  title: string;
  category_name: string;
  description: string;
  image: string;
  salePrice: number;
  price: number;
}

export interface CartProductProps {
  cartProduct: {
    category: {
      id: string;
      created_at: string;
      updated_at: string;
      name: string;
    };
    category_name: string;
    created_at: string;
    description: string;
    id: string;
    image: string;
    price: number;
    salePrice: number | null;
    title: string;
    updated_at: string;
  };
  created_at: string;
  id: string;
  product_id: string;
  updated_at: string;
  user_id: string;
}

export interface useStoreState {
  isSlidingCartOpen: any;
  isDark: boolean;
  isAuthed: boolean;
  isEnglish: boolean;
  changeSlidingCartState: () => void;
  changeTheme: () => void;
  changeIsAuthed: () => void;
  changeLang: () => void;
}

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface likedProduct {
  id: string;
  created_at: string;
  updated_at: string;
  product_id: string;
  user_id: string;
  likedProduct: {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    image: string;
    price: number;
    salePrice: number;
    category_name: string;
    category: {
      id: string;
      created_at: string;
      updated_at: string;
      name: string;
    };
  };
}

export interface UserDataProps {
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  // created_at: string;
  // id: string;
  // password: string;
  // phone_number: string;
  // refresh_token: string;
  // role: string;
  // updated_at: string;
}

export interface Category {
  created_at: string;
  name: string;
  id: string;
  updated_at: string;
}

export interface AddCategoriesProps {
  categories: Category[];
}
