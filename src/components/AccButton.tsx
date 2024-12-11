import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown, FaUserTie } from "@/assets";

const AccountButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        className={`flex flex-row gap-2 text-LightGrayishBlue ${
          isActive ? " text-Orange" : ""
        } hover:text-Orange`}
        onClick={handleClick}
      >
        <span>
          <FaUserTie className="w-8 h-6" />
        </span>
        <span>
          <p>Account</p>
        </span>
        <span>
          {isActive ? (
            <IoIosArrowUp className="h-7" />
          ) : (
            <IoIosArrowDown className="h-7" />
          )}
        </span>
      </button>

      {isVisible && (
        <div className="absolute">
          <span>All category</span>
        </div>
      )}
    </div>
  );
};

export default AccountButton;
