import React from "react";
import { useStore } from "../../page";
import Image from "next/image";
import TV from "../../../../public/images/samsungTV.png";
import samsung from "../../../../public/images/Samsung.png";
import PS5 from "../../../../public/images/playStation.png";
import Link from "next/link";
import MCCarousel from "../MCCarousel/MCCarousel";

const Test = () => {
  const { isDark } = useStore();

  const slides = [
    [
      <Link
        key={1}
        href={
          "http://localhost:3001/pages/Products?category=TV+%7C+%E1%83%9B%E1%83%9D%E1%83%9C%E1%83%98%E1%83%A2%E1%83%9D%E1%83%A0%E1%83%94%E1%83%91%E1%83%98"
        }
        className="cursor-pointer"
      >
        <Image height={400} width={1280} src={TV} alt="TV" />
      </Link>,
    ],
    [
      <Link
        key={2}
        href={
          "http://localhost:3001/pages/Products?category=%E1%83%92%E1%83%94%E1%83%98%E1%83%9B%E1%83%98%E1%83%9C%E1%83%92%E1%83%98"
        }
        className="cursor-pointer"
      >
        <Image height={400} width={1280} src={PS5} alt="gaming" />
      </Link>,
    ],
    [
      <Link
        key={3}
        href={
          "http://localhost:3001/pages/Products?category=%E1%83%A1%E1%83%9B%E1%83%90%E1%83%A0%E1%83%A2%E1%83%A4%E1%83%9D%E1%83%9C%E1%83%94%E1%83%91%E1%83%98"
        }
        className="cursor-pointer"
      >
        <Image height={400} width={1280} src={samsung} alt="samsung" />
      </Link>,
    ],
  ];

  return (
    // /lg:h-[281px] lg:w-[900px] xl:w-[1280px] xl:h-[400px]
    <div
      className={` w-full xl:order-2 ${
        isDark ? `bg-[#1e293b]` : `bg-slate-200`
      }`}
    >
      <MCCarousel slides={slides} />
    </div>
  );
};

export default Test;
