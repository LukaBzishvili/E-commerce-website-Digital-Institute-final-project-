import React from "react";
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";
import useLanguageInitialization from "@/app/helpers/Language/Language";
import Link from "next/link";

interface SalesCardProps {
  image: StaticImageData;
  link: string;
}

const SalesCard: React.FC<SalesCardProps> = ({ image, link }) => {
  const { t } = useTranslation();

  useLanguageInitialization();

  return (
    <div className="relative text-white w-fit">
      <div>
        <Image src={image} alt="sales image" width={400} height={400} />
      </div>
      <div className="absolute left-[20px] top-[30px]">
        <div>
          <p className="tracking-normal text-xl">{t("salesCard.title")}</p>
          <h2 className="text-4xl font-bold">
            {t("salesCard.sale1")} {50}
            {t("salesCard.sale2")}
            {/* <span></span> */}
          </h2>
        </div>
        <div>
          <Link href={link}>
            <button className="py-[10px] px-[35px] bg-white text-black rounded-3xl mt-[60px]">
              {t("salesCard.shop")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
