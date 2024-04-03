import axios from "axios";

// Define the global URL
const url = "http://www.inventory-cr.somee.com/api/";

// put the object
const putItem = async (type: string, data: any, id: any) => {
  try {
    const url_put = url + type + "/" + id;
    const response = await axios.put(url_put, data);

    return response.data; // Return the data received from the server

    // Re-throw the error to be caught by the caller if needed
  } catch (error) {
    console.error("Error putting:", error);
    throw error;
  }
};

export default putItem;
