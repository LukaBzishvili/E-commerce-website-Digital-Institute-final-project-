import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "ka"], // *** added this ***
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          searchInput: {
            seeAll: "See All",
          },
          main: {
            logOut: "Log Out",
          },
          header: {
            logIn: "Log In",
            home: "Main",
            cart: "Cart",
            theme: "Theme",
          },
          footer: {
            title: "Let's keep in touch!",
            description:
              "Find us on any of these platforms, we respond 1-2 business days.",
            usefulLinks: "Useful Links",
            aboutUs: "About Us",
            blog: "Blog",
            github: "Github",
            freeProducts: "Free Products",
            otherResourses: "Other Resources",
            MITLicence: "MIT License",
            termsAndConditions: "Terms & Conditions",
            privacyPolicy: "Privacy Policy",
            contactUs: "Contact Us",
            copyright: "Copyright © 2024 Notas JS by Luka.",
          },
          navigation: {
            smartPhones: "SmartPhones",
            Laptops: "Laptops",
            Audio: "Audio",
            PhotoAndVideo: "Photo | Video",
            Gaming: "Gaming",
            TVAndMonitor: "TV | Monitor",
            Tabs: "Tabs",
          },
          logIn: {
            title: "Log In",
            email: "Email: ",
            password: "Password: ",
            submit: "Sumbit",
          },
          salesCard: {
            title: "Just In",
            sale1: "Up to",
            sale2: "% off",
            shop: "Shop",
          },
          products: {
            goBack: "Go Back",
            noProducts: "No products found for this category :/",
          },
          product: {
            about: "About the product",
            reviews: "reviews",
            recommended: "Recommended Products",
            addToCart: "Add to Cart",
          },
          register: {
            signUp: "Sign Up",
            name: "Name",
            lastName: "Last Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            phoneNumber: "Phone Number",
            submit: "Submit",
          },
          settings: {
            title: "Settings",
            publicProfile: "Public Profile",
            websiteSettings: "Website Settings",
            cart: "Cart",
            mainPage: "Main",
            firstName: "FirstName:",
            lastName: "LastName:",
            isVerified: "Is Verified:",
            email: "Email:",
            save: "Save",
            likedProducts: "Liked Products",
            addProduct: "Add Product",
            logOut: "Log Out",
          },
          slidingCart: {
            shoppingCart: "Shopping Cart",
            subTotal: "Sub Total",
            smallDesc: "Shipping and taxes calculated at checkout",
            checkOut: "Checkout",
            continue1: "or",
            continue: "Continue Shopping",
          },
        },
      },
      ka: {
        translation: {
          searchInput: {
            seeAll: "ყველას ნახვა",
          },
          main: {
            logOut: "გამოსვლა",
          },
          header: {
            logIn: "შესვლა",
            home: "მთავარი",
            cart: "კალათა",
            theme: "თემა",
          },
          footer: {
            title: "ვითანამშრომლოთ",
            description:
              "მოგვძებნეთ რომელიმე ამ პლატფორმაზე, ჩვენ ვპასუხობთ 1-2 სამუშაო დღეში.",
            usefulLinks: "Useful Links",
            aboutUs: "About Us",
            blog: "Blog",
            github: "Github",
            freeProducts: "Free Products",
            otherResourses: "Other Resources",
            MITLicence: "MIT License",
            termsAndConditions: "Terms & Conditions",
            privacyPolicy: "Privacy Policy",
            contactUs: "Contact Us",
            copyright: "Copyright © 2024 Notas JS by Luka.",
          },
          navigation: {
            smartPhones: "სმარტფონები",
            Laptops: "ლეპტოპები",
            Audio: "აუდიო",
            PhotoAndVideo: "ფოტო | ვიდეო",
            Gaming: "გეიმინგი",
            TVAndMonitor: "TV | მონიტორები",
            Tabs: "ტაბები",
          },
          logIn: {
            title: "შესვლა",
            email: "მეილი: ",
            password: "პაროლი: ",
            submit: "დადასტურება",
          },
          salesCard: {
            title: "ახალი შემოთავაზება",
            sale1: " ",
            sale2: "% მდე ფასდაკლებით",
            shop: "ყიდვა",
          },
          products: {
            goBack: "დაბრუნება",
            noProducts: "პროდუქტები ვერ მოიძებნა :/",
          },
          product: {
            about: "პროდუქტის შესახებ",
            reviews: "შეფასება",
            recommended: "რეკომენდირებული პროდუქტები",
            addToCart: "ყიდვა",
          },
          register: {
            signUp: "რეგისტრაცია",
            name: "სახელი",
            lastName: "გვარი",
            email: "მეილი",
            password: "პაროლი",
            confirmPassword: "დაადასტურეთ პაროლი",
            phoneNumber: "ტელეფონის ნომერი",
            submit: "დასრულება",
          },
          settings: {
            title: "პარამეტრები",
            publicProfile: "პროფილი",
            websiteSettings: "საიტის პარამეტრები",
            cart: "შესყიდვის გვერდი",
            mainPage: "მთავარი გვერდი",
            firstName: "სახელი:",
            lastName: "გვარი:",
            isVerified: "დარეგისტრირებულია:",
            email: "მეილი:",
            save: "შენახვა",
            likedProducts: "მოწონებული პროდუქტები",
            addProduct: "დაამატე პროდუქტები",
            logOut: "გამოსვლა",
          },
          slidingCart: {
            shoppingCart: "ყიდვის გვერდი",
            subTotal: "სრული ფასი",
            smallDesc: "ჩამოტანის ფასი, ტაქსა და შეჯამებული პროდუქტების ფასი",
            checkOut: "გადახდა",
            continue1: "ან",
            continue: "ყიდვის გაგრძელება",
          },
        },
      },
    },
  });

export default i18n;
