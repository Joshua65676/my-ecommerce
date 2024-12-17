"use client";

import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { carticon } from "@/assets";
import HelpButton from "./HelpButton";
import AccountButton from "./AccButton";
import Category from "./Category";
import { CartContext } from "@/context/CartContext";
import { MdAddShoppingCart } from "react-icons/md";

const Navbar: React.FC = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const stickNavbar = () => {
    if (typeof window !== "undefined") {
      const windowHeight = window.scrollY;
      setStickyClass(windowHeight > 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const { cart } = cartContext;
  const cartProductCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50   ${
        stickyClass
          ? "bg-white/20 backdrop-blur-sm border-b border-slate-300 shadow-lg"
          : "bg-Black"
      }`}
    >
      <section className="max-w-7xl mx-auto w-full">
        <main className="flex w-full justify-between items-center">
          <div className="flex flex-row gap-10">
            <Link href="/">
              <span className="text-3xl font-semibold">
                <span className="text-White font-kumbh">Josh</span>
                <span className="font-mono text-Orange">Store</span>
              </span>
            </Link>

            <Category fetchAll={false} />
          </div>
          {/* Search input */}
          <div className="flex items-center justify-center p-5">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-[40rem] max-w-lg p-2 border border-GrayishBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-Grayishblue"
            />
            <Button className="ml-2 p-2 bg-Orange text-white rounded-lg hover:bg-BgOrange focus:outline-none border-none h-10">
              Search
            </Button>
          </div>

          <div className="flex flex-row gap-8">
            <HelpButton />
            <AccountButton />

            <Link href={{ pathname: `/cart` }}>
              <button className="flex flex-row gap-0 hover:text-BgOrange text-GrayishBlue">
                {/* <Image src={carticon} alt="carticon" className="relative"/> */}
                <MdAddShoppingCart className="h-6 w-7 text-Grayishblu"/>
                {cartProductCount > 0 && (
                  <span className="absolute top-2 ml-2 bg-Orange font-mono text-white rounded-full px-3 py-0.5 text-xs">
                    {cartProductCount}
                  </span>
                )}
                <span className="text-Grayishblu relative font-kumbh font-medium">Cart</span>
              </button>
            </Link>
          </div>
        </main>
      </section>
    </nav>
  );
};

export default Navbar;
