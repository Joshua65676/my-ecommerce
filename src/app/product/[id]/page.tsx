import Image from 'next/image';
// import { use } from 'next/navigation';

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

async function getProductData(id: number): Promise<Product | null> {
  const response = await fetch(`http://localhost:3000/api/products?id=${id}`);
  if (!response.ok) {
    return null;
  }
  const product = await response.json();
  return product;
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const productId = Number(params.id);
  const product = await getProductData(productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Image src={product.image} alt={product.title} width={400} height={400} className="w-full h-64 object-cover rounded-md" />
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

export default ProductDetails;
