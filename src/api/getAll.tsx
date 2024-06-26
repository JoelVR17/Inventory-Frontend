import axios from "axios";

// Define the global URL
const url = "http://www.inventory-cr.somee.com/api/";

// Get all objects
const getAll = async (type: string) => {
  try {
    const url_all = url + type;
    const response = await axios.get(url_all);

    return response;

    // Re-throw the error to be caught by the caller if needed
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export default getAll;
