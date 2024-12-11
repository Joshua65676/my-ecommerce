export const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.productData;
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw error;
    }
  };
  