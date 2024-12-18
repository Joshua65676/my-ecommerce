import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Button } from "./ui/Button";

const CartSum = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart } = cartContext;

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <main className="border shadow-lg rounded-lg w-[19rem]">
      <div className="flex flex-col">
        <span className="p-2 font-sans font-semibold">Cart Summary</span>
        <hr className="" />
        <div className="p-2 flex-col flex gap-4">
          <div className="text- font-kumbh font-bold flex justify-between">
            <span className="">Subtotal</span>
            <span className="">${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-[13px] font-serif">
            Delivery fees not included yet.
          </p>
        </div>
        <hr className="" />
        <div className="p-2 items-center w-full">
          <Button className="bg-Orange hover:bg-BgOrange border-none rounded-xl w-full h-[3rem]">
            <span className="text-Black text-sm font-kumbh font-semibold uppercase flex gap-2">
              Checkout
              <span> (${totalPrice.toFixed(2)})</span>
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CartSum;
