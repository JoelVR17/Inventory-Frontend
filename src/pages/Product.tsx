import { useEffect, useState } from "react";
import getAll from "../api/getAll";
import Navbar from "../components/Navbar";
import getOne from "../api/getOne";
import Modal from "../components/ModalFormProduct";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const openAddModal = () => {
    setIsOpen(true);
    setMode("add");
  };

  const openEditModal = (product: Product) => {
    setIsOpen(true);
    setMode("edit");
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

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

      <div>
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-5 sm:py-5 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="flex justify-end align-middle">
            <div className="w-full">
              <div className="flex justify-between mb-10">
                <button
                  onClick={openAddModal}
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add
                </button>
              </div>

              <Modal
                isOpen={isOpen}
                onClose={closeModal}
                titleHeader={mode === "add" ? "Add Product" : "Edit Product"}
                descriptionHeader={
                  mode === "add"
                    ? "Add poducts to Stock"
                    : "Edit one stock's product"
                }
                selectedProduct={mode === "edit" ? selectedProduct : null}
              />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex justify-center align-middle">
              <button
                disabled
                type="button"
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product, index) => (
                <button
                  onClick={() => openEditModal(product)}
                  key={index}
                  className="group bg-secondColor rounded p-7 shadow"
                >
                  <h3 className="mt-4 text-xl font-bold text-textPrimary">
                    {product.name}
                  </h3>
                  <h4 className="mt-4 text-sm text-textSecond">
                    {product.description}
                  </h4>

                  {categories[product.categoryId] && (
                    <p className="text-lg font-medium text-textSecond text-right mt-5">
                      {categories[product.categoryId].name}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
