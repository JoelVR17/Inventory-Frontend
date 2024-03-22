import { useEffect, useState } from "react";
import getAll from "../api/getAll";

interface Product {
  name: string;
  description: string;
  category: object;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProductsDataRequest = async () => {
      try {
        const response = await getAll("Products");
        if (response.status === 200) {
          const productsData: Product[] = response.data;
          setProducts(productsData);
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProductsDataRequest();
  }, []);

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <div className="container">
        <div className="w-full">
          {products.map((product, index) => (
            <div key={index}>
              <p>{product.name}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
