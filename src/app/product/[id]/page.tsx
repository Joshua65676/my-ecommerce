"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState } from "react";

type Product = {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
  soldOut: number;
  rating: number;
};

const getProductData = async (id: number): Promise<Product | null> => {
  const response = await fetch(`http://localhost:3000/api/products?id=${id}`);
  if (!response.ok) {
    return null;
  }
  const product = await response.json();
  return product;
};

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { addToCart } = cartContext;

  const [product, setProduct] = useState<Product | null>(null);
  const productId = Number(params.id);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductData(productId);
      setProduct(productData);
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <section className="container max-w-7xl mx-auto w-full">
      <main className="flex flex-row justify-between gap-[10rem] items-center  p-5 py-32">
        {/* Image */}
        <div className="w-[200re] h-full">
          <Image
            src={product.image}
            alt={product.title}
            width={1000}
            height={1000}
            className="h-[32rem]"
          />
        </div>
        {/* Details */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-4">
            <div className="">
              <span className="font-kumbh text-Grayishblue font-semibold uppercase tracking-widest text-[14px]">
                {product.brand}
              </span>
            </div>
            <div className="">
              <h1 className="font-kumbh text-Black font-bold md:text-4xl mx:text-3xl leading-[50px]">
                {product.title}
              </h1>
            </div>
          </div>
          {/* Discrition */}
          <div className="w-[34rem]">
            <p className="font-mono md:font-medium mx:font-bold md:text-[15px] mx:text-[12.5px] text-GrayishBlue leading-[26.2px] -tracking-[2.5%]">
              {product.description}
            </p>
          </div>
          {/* soldout&rating&Isnew */}
          <div className="flex flex-col gap-3">
            <span className="text-Black">{product.isNew}</span>
            <div className="flex flex-row gap-5">
              <span className="flex flex-row gap-1 font-mono font-semibold">
                {product.soldOut}
                <span className="text-GrayishBlue font-serif text-sm pt-[3px]">
                  SoldOut
                </span>
              </span>
              <span className="flex flex-row gap-1 font-mono font-semibold">
                <FaStar className="mt-1 text-Orange" />
                {product.rating}
              </span>
            </div>
          </div>
          {/* Price */}
          <div className="">
            <div className="flex flex-row gap-5">
              <span className="font-bold text-2xl font-kumbh">
                ${product.price}
              </span>
              <span className="text-lg font-mono font-medium text-Grayishblue line-through pt-[2px]">
                ${product.oldPrice}
              </span>
            </div>
          </div>
          {/* AddToCartButton */}
          <div className="">
            <Button
              onClick={() =>
                addToCart({
                  _id: product._id,
                  title: product.title,
                  category: product.category,
                  price: product.price,
                  oldPrice: product.oldPrice,
                  image: product.image,
                  quantity: 1,
                })
              }
              className="bg-Orange border-Orange md:w-56 mx:w-full rounded-xl hover:bg-BgOrange"
            >
              <div className="flex flex-row gap-5">
                <MdAddShoppingCart className="h-8 w-6" />
                <span className="text-Black font-bold  font-kumbh text-base pt-1">
                  Add To Cart
                </span>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProductDetails;

// const getProductData = async (id: number): Promise<Product | null> => {
//   const response = await fetch(`http://localhost:3000/api/products?id=${id}`);
//   if (!response.ok) {
//     return null;
//   }
//   const product = await response.json();
//   return product;
// };

// const ProductDetails = ({ params }: { params: { id: string } }) => {
//   const cartContext = useContext(CartContext);

//   if (!cartContext) {
//     throw new Error('CartContext must be used within a CartProvider');
//   }

//   const { addToCart } = cartContext;

//   const [product, setProduct] = useState<Product | null>(null);
//   const productId = Number(params.id);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const productData = await getProductData(productId);
//       setProduct(productData);
//     };
//     fetchProduct();
//   }, [productId]);

//   if (!product) {
//     return <p>Product not found</p>;
//   }
