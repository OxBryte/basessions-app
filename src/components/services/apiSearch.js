import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function getSearch() {
  try {
    // Assuming the token is stored in localStorage or similar
    const { data } = await axios.get(`${apiURL}get-searches`);

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}


export async function searchMedia(body) {
  try {
    const { data } = await axios.post(`${apiURL}search-media`, body);
    return data;
  } catch (error) {
    console.error("Error during search:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during search"
    );
  }
}