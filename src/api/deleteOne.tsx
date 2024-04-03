import axios from "axios";

// Define the global URL
const url = "http://www.inventory-cr.somee.com/api/";

// delete the object
const deleteItem = async (type: string, id: any) => {
  try {
    const url_delete = url + type + "/" + id;
    const response = await axios.delete(url_delete);

    return response.data; // Return the data received from the server

    // Re-throw the error to be caught by the caller if needed
  } catch (error) {
    console.error("Error deleteting:", error);
    throw error;
  }
};

export default deleteItem;
