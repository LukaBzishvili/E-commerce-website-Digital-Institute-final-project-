import React, { useState } from "react";

interface CategoriesDropDownProps {
  categories: Array<string>;
}

const CategoriesDropDown: React.FC<CategoriesDropDownProps> = ({
  categories,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const handleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div>
      <div
        className={`relative text-black bg-gray-100 px-[7px] py-[3px] rounded-sm`}
      >
        <div>
          <button onClick={handleDropDown}>{activeCategory}</button>
        </div>
        {isDropDownOpen ? (
          <div className="absolute top-[30px] left-[-10px] w-[120px] h-[50px] bg-gray-200 rounded-sm">
            {categories.map((category: string) =>
              category !== activeCategory ? (
                <button
                  onClick={() => handleActiveCategory(category)}
                  className="px-[10px]"
                >
                  {category}
                </button>
              ) : undefined
            )}
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default CategoriesDropDown;
