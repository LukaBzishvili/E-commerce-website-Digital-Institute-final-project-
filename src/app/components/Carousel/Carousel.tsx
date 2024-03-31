// Carousel.tsx
`use client`;
import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface CarouselProps {
  slides: React.ReactNode[];
}

const CustomArrow = ({ onClick, direction }: any) => (
  <button
    onClick={onClick}
    className={`absolute text-white bottom-[305px] lg:bottom-[200px] ${
      direction === "prev" ? "left-[20px]" : "right-[20px]"
    }  z-[1] flex items-center justify-center border-0 bg-black rounded-full text-center opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
    type="button"
    style={{
      transform: "translateY(-50%)",
      borderRadius: "50%",
    }}
    aria-label={direction === "prev" ? "Previous" : "Next"}
  >
    <span className="h-8 w-8 flex items-center justify-center">
      {direction === "prev" ? <IoIosArrowBack /> : <IoIosArrowForward />}
    </span>
  </button>
);

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          draggeble: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {slides.length > 0 ? (
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>{slide}</div>
          ))}
        </Slider>
      ) : undefined}
    </div>
  );
};

export default Carousel;
