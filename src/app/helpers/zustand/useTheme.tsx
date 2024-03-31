// import { create } from "zustand";

// export const checkThemeStateOnOpen = () => {
//   if (typeof localStorage !== "undefined") {
//     const localThemeState = localStorage.getItem("isDark");
//     console.log(localThemeState);
//     if (localThemeState !== null) {
//       return JSON.parse(localThemeState);
//     } else {
//       console.log("Local Theme is Empty");
//       return false;
//     }
//   } else {
//     console.log("localStorage is not available on the server side");
//     // You may choose to return a default value or handle this case accordingly
//     return false;
//   }
// };

// interface themeState {
//   isDark: boolean;
//   changeTheme: () => void;
// }

// export const useThemeStore = create<themeState>()((set) => ({
//   isDark: false,
//   changeTheme: () => set((state) => ({ isDark: !state.isDark })),
// }));
