import Banner from "@/components/Banner";
import ProductForU from "@/components/ProductForU";
import React from "react";
// import { CartProvider } from "@/context/CartContext";

const page: React.FC = () => {
  return (
    // <CartProvider>
    // </CartProvider>
      <div className="">
        <Banner fetchAll={false} />
        <ProductForU />
      </div>
  );
};

export default page;
