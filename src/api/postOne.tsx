import axios from "axios";

// Define the global URL
const url = "http://www.inventory-cr.somee.com/api/";

// Post the object
const postItem = async (type: string, data: any) => {
  try {
    const url_post = url + type;
    const response = await axios.post(url_post, data);

    return response.data; // Return the data received from the server

    // Re-throw the error to be caught by the caller if needed
  } catch (error) {
    console.error("Error posting:", error);
    throw error;
  }
};

export default postItem;
