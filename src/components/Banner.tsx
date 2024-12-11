"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchProductData } from '../utils/fetchProductData';

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

const Category = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProductData();
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 py-40">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product._id} className="p-4 border rounded-lg shadow-lg">
            <Image
              src={product.image}
              alt={product.title}
              width={300}  // Adjust the width
              height={200} // Adjust the height
              className="object-cover rounded-md"
            />
            <h3 className="mt-2 text-lg font-semibold">{product.category}</h3>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Category;

