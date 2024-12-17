"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CartPage = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart, removeFromCart, updateQuantity, clearCart } = cartContext;

  return (
    <section className="w-full max-w-7xl container py-10">
      <h1 className="text-2xl font-kumbh font-bold">Your Cart</h1>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="mt-1 text-gray-700">
                    Category: {product.category}
                  </p>
                  <p className="mt-1 text-gray-700">Price: ${product.price}</p>
                  <p className="mt-1 text-gray-500 line-through">
                    Old Price: ${product.oldPrice}
                  </p>
                  <p className="mt-1 text-gray-700">
                    Quantity: {product.quantity}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      onClick={() =>
                        updateQuantity(product._id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() =>
                        updateQuantity(product._id, product.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-600 hover:bg-red-700 border-none rounded-xl"
              >
                <span className="text-Black text-sm font-kumbh font-semibold">
                  Remove
                </span>
              </Button>
              <Link href={{pathname: `/product/${product._id}`}}>
              <Button className="bg-BgOrange hover:bg-PaleOrange border-none rounded-xl">
                <span className="text-Black text-sm font-kumbh font-semibold">
                  {" "}
                  Checkout{" "}
                </span>
              </Button>
              </Link>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cart.length > 0 && (
        <Button
          onClick={clearCart}
          className="bg-red-600 hover:bg-red-700 border-none rounded-xl mt-5"
        >
          <span className="text-Black text-sm font-kumbh font-semibold">
            Remove All
          </span>
        </Button>
      )}
      <Link href="/">
        <Button className="bg-BgOrange hover:bg-PaleOrange border-none rounded-xl mt-5">
          <span className="text-Black text-sm font-kumbh font-semibold">
            Continue Shopping
          </span>
        </Button>
      </Link>
    </section>
  );
};

export default CartPage;
