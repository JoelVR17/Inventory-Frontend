import axios from "axios";

// Define the global URL
const url = "http://www.inventory-cr.somee.com/api/";

const getOne = async (type: string, id: number) => {
  try {
    const url_all = url + type + "/" + id;
    const response = await axios.get(url_all);

    return response;

    // Re-throw the error to be caught by the caller if needed
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export default getOne;
