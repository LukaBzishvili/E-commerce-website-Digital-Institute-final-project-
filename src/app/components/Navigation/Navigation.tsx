import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import "../../globals.css";
import { useStore } from "../../page";
import Link from "next/link";

interface List {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

interface NavigationProps {
  list: List[];
}

const Navigation: React.FC<NavigationProps> = ({ list }) => {
  const { isDark } = useStore();

  return (
    <div className="my-[40px] w-full h-fit">
      <div
        className={`w-full h-fit rounded-sm shadow-lg overflow-hidden ${
          isDark ? `bg-[#363535] text-white` : `bg-[#9e69f4] text-white`
        } px-[3px] py-[5px]`}
      >
        <nav>
          <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center w-full gap-[30px] py-[20px]">
            {list.map((category, index) => (
              <li
                key={index}
                className={`rounded-xl group cursor-pointer ${
                  isDark
                    ? `hover:bg-[#7188ce]`
                    : `hover:bg-[#f2f3f6] hover:text-gray-500`
                } flex flex-row items-center justify-between`}
              >
                <Link
                  className="text-lg sm:text-md w-full py-[7px] px-[5px] flex items-center justify-between flex-row font-bold"
                  href={{
                    pathname: "/pages/Products",
                    query: { category: category.name },
                  }}
                >
                  {category.name}
                  <IoIosArrowForward className="opacity-0 group-hover:opacity-100 xl:hidden" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
