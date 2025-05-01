import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function getSearch() {
  try {
    // Assuming the token is stored in localStorage or similar
    const { data } = await axios.get(`${apiURL}search`);

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}

export async function searchMedia(q) {
  try {
    const token = document.cookie.includes("token=")
      ? document.cookie.split("token=")[1].split(";")[0]
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${apiURL}search?q=${q}`, null, config);
    return data.data;
  } catch (error) {
    console.error("Error while sending search:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while sending search"
    );
  }
}
