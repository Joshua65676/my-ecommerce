"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { fetchProductData } from "@/utils/fetchProductData";
import { FaStar } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

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

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { addToCart } = cartContext;
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const decodedCategory = decodeURIComponent(params.category);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProductData(true);
        const filteredProducts = productData.filter(
          (product: Product) => product.category === decodedCategory
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProducts();
  }, [decodedCategory]);

  return (
    <section className="w-full max-w-7xl container py-32">
      <main className="flex flex-col gap-10">
        <div className="">
          <h1 className="text-2xl font-kumbh font-bold">
            {decodedCategory} Lists
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <div
                  className="hover:bg-LightGrayishBlue hover:shadow-2xl w-[19rem] h-[28.5rem] -mt-5 hover:border hover:rounded-xl"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="flex flex-col gap-3 w-[17rem] ml-4 mt-5">
                    <div className="w-full h-[350p]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={150}
                        height={50}
                        className="object-cover w-full h-[250px]"
                      />
                      <div className="absolute ml-52 -mt-14 bg-LightGrayishBlue h-12 w-12 shadow-xl rounded-full">
                        <button>
                          <MdAddShoppingCart
                            className="h-10 w-9 pl-3 pt-2"
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
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="bg-Orange w-14 text-center rounded">
                        <span className="text-xs text-Black font-kumbh font-semibold">
                          Choice
                        </span>
                      </div>
                      <h2 className="text-Black font-mono font-semibold text-sm pt-1">
                        {product.title.substring(0, 20)}...
                      </h2>
                    </div>

                    <div className="flex flex-row gap-3">
                      <span className="font-mono font-light text-GrayishBlue">
                        {product.soldOut}+ sold
                      </span>
                      <span className="text-GrayishBlue font-mono font-semibold flex flex-row gap-1">
                        <FaStar className="text-Orange mt-[2px]" />{" "}
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex flex-row gap-3">
                      <span className="font-mono font-semibold text-Black">
                        ${product.price}
                      </span>
                      <span className="line-through text-GrayishBlue font-mono font-semibold">
                        ${product.oldPrice}
                      </span>
                    </div>

                    {hoveredProduct === product._id && (
                      <Link href={{ pathname: `/product/${product._id}` }}>
                        <Button className="bg-BgOrange hover:bg-PaleOrange border-none rounded-xl">
                          <span className="text-Black text-sm font-kumbh font-semibold">
                            See Details
                          </span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </section>
  );
};

export default CategoryPage;
