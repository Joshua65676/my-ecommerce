import { GetServerSideProps } from 'next';
import Image from 'next/image';

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

type Props = {
  product: Product | null;
};

const ProductDetails = ({ product }: Props) => {
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Image src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-md" />
      <h1 className="mt-4 text-2xl font-bold">{product.title}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 text-gray-700">Price: ${product.price}</p>
      <p className="mt-2 text-gray-500 line-through">Old Price: ${product.oldPrice}</p>
      <p className="mt-2 text-gray-700">Brand: {product.brand}</p>
      <p className="mt-2 text-gray-700">Sold Out: {product.soldOut}</p>
      <p className="mt-2 text-gray-700">Rating: {product.rating}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();
  const product = data.productData.find((p: Product) => p._id === Number(id)) || null;

  return {
    props: {
      product,
    },
  };
};

export default ProductDetails;
