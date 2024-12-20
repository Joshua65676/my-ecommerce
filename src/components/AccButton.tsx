import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown, FaUserTie, FaBoxOpen } from "@/assets";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/Button";
import Link from "next/link";

const AccountButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setIsVisible(!isVisible);
  };

  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <button
        className={`flex flex-row gap-2 text-GrayishBlue ${
          isActive ? " text-Orange" : ""
        } hover:text-Orange`}
        onClick={handleClick}
      >
        <div>
          <FaUserTie className="w-8 h-6" />
        </div>
        <div>
          {!loading && !user && (
            <>
              <p>Account</p>
            </>
          )}
          {user && (
            <>
              <div>Hi, {user.displayName}!</div>
            </>
          )}
        </div>
        <>
          {isActive ? (
            <IoIosArrowUp className="h-7" />
          ) : (
            <IoIosArrowDown className="h-7" />
          )}
        </>
      </button>

      {isVisible && (
        <div className="absolute border shadow-lg rounded-lg w-[14rem] -ml-12 mt-3 py-5 flex flex-row bg-LightGrayishBlue">
          {!loading && !user && (
            <div className="pl-5 w-full flex flex-col gap-2">
              <Link href={{ pathname: `/login` }}>
                <Button className="bg-Orange w-[11.5rem] rounded-lg border-none hover:bg-BgOrange">
                  <div className="text-lg font-semibold font-sans uppercase">
                    Log in
                  </div>
                </Button>
              </Link>
              <Link href={{ pathname: `/signup` }}>
                <div className="text-center uppercase -ml-4">
                  <span className="text-blue-500 text-sm text-center">
                    Sign Up
                  </span>
                </div>
              </Link>
            </div>
          )}
          {user && (
            <div className="flex flex-col gap-5 w-full">
              <div className="">
                <Link href={{ pathname: `/myaccount` }}>
                  <div className="flex flex-row gap-5 hover:bg-GrayishBlue h-10 p-2">
                    <FaUserTie className="w-5 h-6" />
                    <span>My Account</span>
                  </div>
                </Link>
                <Link href={{ pathname: `/` }}>
                  <div className="flex flex-row gap-5 hover:bg-GrayishBlue h-10 p-2">
                    <FaBoxOpen className="w-5 h-6" />
                    <span>Orders</span>
                  </div>
                </Link>
              </div>
              <hr className="border w-[14rem]" />
              <div className="text-center">
                <button
                  onClick={() => auth.signOut()}
                  className="text-red-700 hover:text-red-600 uppercase font-mono"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountButton;
