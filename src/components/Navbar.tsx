"use client";
import { Navlinks } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { carticon } from "@/assets";
import { FaUserTie } from "react-icons/fa6";

const Navbar: React.FC = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50   ${
        stickyClass
          ? "bg-white/20 backdrop-blur-sm border-b border-slate-300 shadow-lg"
          : ""
      }`}
    >
      <section className="max-w-7xl mx-auto w-full">
        <main className="flex w-full justify-between items-center py-5">
          <div className="flex flex-row gap-20">
            <Link href="/">
              <span className="text-xl font-semibold">
                <span className="text-Black font-kumbh">Josh</span>
                <span className="font-mono text-Orange">Store</span>
              </span>
            </Link>

            <div className="flex flex-row gap-5 font-mono text-lg ">
              {Navlinks.map(({ id, title, links }) => (
                <ul key={id}>
                  <Link href={links}>
                    <span className="text-Grayishblue hover:text-Black">
                      {title}
                    </span>
                  </Link>
                </ul>
              ))}
            </div>
          </div>
          {/* Search input */}
          <div className="flex items-center justify-center p-5">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full max-w-lg p-2 border border-GrayishBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-Grayishblue"
            />
            <Button className="ml-2 p-2 bg-Orange text-white rounded-lg hover:bg-BgOrange focus:outline-none border-none h-10">
              Search
            </Button>
          </div>

          <div className="flex flex-row gap-8">
            <button className="">
              <Image src={carticon} alt="carticon" />
            </button>
            <button>
              <FaUserTie className="w-8 h-6" />
            </button>
          </div>
        </main>
      </section>
    </nav>
  );
};

export default Navbar;
