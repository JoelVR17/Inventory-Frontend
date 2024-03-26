import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import getAll from "../api/getAll";
import postOne from "../api/postOne";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleHeader: string;
}

interface Category {
  categoryId: number;
  name: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, titleHeader }) => {
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

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newProduct = {
        name: data.name,
        description: data.description,
        categoryId: data.category,
        category: {
          categoryId: 0,
          name: "string",
        },
      };

      await postOne("Products", newProduct);
      toast.success(`The Product ${data.name} was added successful`);
      window.location.reload();
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-xl leading-6 text-gray-900 font-bold">
                      {titleHeader}
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Add poducts to Stock
                            </p>

                            {/* Name */}
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="col-span-full">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="product-name"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="col-span-full">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Description
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={handleTextareaChange}
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Category */}
                            <div className="sm:col-span-3 mt-5">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Category
                              </label>
                              <div className="mt-2">
                                <select
                                  id="category"
                                  name="category"
                                  value={data.category}
                                  onChange={handleSelectChange}
                                  autoComplete="country-name"
                                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                  {categories.map((category) => (
                                    <option
                                      key={category.categoryId}
                                      value={category.categoryId}
                                    >
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={onClose}
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md  bg-green-700 hover:bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
