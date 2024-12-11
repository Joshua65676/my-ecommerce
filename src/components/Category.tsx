import React, { useState } from "react";
import { GiHamburgerMenu } from "@/assets";

const Category = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <button className="pt-2" onClick={handleClick}>
        <GiHamburgerMenu className="w-7 h-6 text-LightGrayishBlue" />
      </button>

      {isVisible && (
        <div className="absolute">
          <span>All category</span>
        </div>
      )}
    </div>
  );
};

export default Category;
