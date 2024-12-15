"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProductData } from "../utils/fetchProductData";
import Link from "next/link";

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
};

const Banner = ({ fetchAll }: { fetchAll: boolean }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProductData(fetchAll);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProducts();
  }, [fetchAll]);

  return (
    <main className="py-28 container w-full max-w-7xl flex flex-col gap-10">
      <div className="">
        <h1 className="text-4xl font-kumbh font-bold">Category deals</h1>
      </div>
      <div className="flex flex-row justify-between pt-5">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="hover:bg-LightGrayishBlue hover:shadow-2xl w-[11rem] h-[12rem] -mt-5 hover:border hover:rounded-xl"
            >
              <div className="flex flex-col gap-3 ml-3 mt-3">
                <Link
                  href={{
                    pathname: `/category/${encodeURIComponent(
                      product.category
                    )}`,
                  }}
                >
                  <div className="">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={150}
                      height={10}
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <h3 className=" text-base font-mono text-center font-semibold">
                    {product.category}
                  </h3>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Banner;
