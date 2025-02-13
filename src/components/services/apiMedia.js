import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function getMedias() {
  try {
    // Assuming the token is stored in localStorage or similar
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${apiURL}media`, config);

    return data.data;
  } catch (error) {
    console.error("Error while fetching medias:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching medias"
    );
  }
}
