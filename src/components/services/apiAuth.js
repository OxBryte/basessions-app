import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;

export async function userSignup(body) {
  try {
    const { data } = await axios.post(`${apiURL}user/create`, body);
    return data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error(
      error.response?.data?.error || "An error occurred during signup"
    );
  }
}