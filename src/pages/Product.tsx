import { useEffect, useState } from "react";
import getAll from "../api/getAll";
import Navbar from "../components/Navbar";
import getOne from "../api/getOne";
import { Link } from "react-router-dom";

// Types for Product
interface Product {
  productId: number;
  name: string;
  description: string;
  categoryId: number;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    const getProductsDataRequest = async () => {
      try {
        const response = await getAll("Products");
        if (response.status === 200) {
          const productsData: Product[] = response.data;
          setProducts(productsData);
          productsData.forEach((product) => {
            getCategory(product.categoryId);
          });
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProductsDataRequest();
  }, []);

  const getCategory = async (categoryId: number) => {
    try {
      const response = await getOne("Categories", categoryId);
      if (response.status === 200) {
        const categoryData: any = response.data;
        setCategories((prevCategories) => ({
          ...prevCategories,
          [categoryId]: categoryData,
        }));
      } else {
        console.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.length === 0 ? (
              <div className="text-red-800 text-5xl">Loading...</div>
            ) : (
              products.map((product, index) => (
                <Link key={index} className="group" to={`${product.productId}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src="/img1.png"
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <h4 className="mt-4 text-sm text-gray-700">
                    {product.description}
                  </h4>

                  {categories[product.categoryId] && (
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {categories[product.categoryId].name}
                    </p>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
