import React, { ReactNode } from "react";
import { useStore } from "../../page";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const { isDark } = useStore();
  return (
    <div
      className={`pt-[30px] relative max-w-screen-xl m-auto ${
        !isDark ? `bg-[#f1f3f6]` : `bg-[#252424]`
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
