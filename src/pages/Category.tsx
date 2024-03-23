import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import getAll from "../api/getAll";

interface Category {
  name: string;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategoriesDataRequest = async () => {
      try {
        const response = await getAll("Categories");

        if (response.status == 200) {
          const categoriesData: Category[] = response.data;

          setCategories(categoriesData);
        } else {
          console.error("Failed to fetch category data");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getCategoriesDataRequest();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="container">
          <div className="w-full">
            {categories.length === 0 ? (
              <div>Loading...</div>
            ) : (
              categories.map((category, index) => (
                <div key={index}>
                  <p>{category.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
