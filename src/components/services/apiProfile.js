import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;

export async function updateProfile(body) {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };
    const { data } = await axios.post(`${apiURL}user/profile`, formData, config);
    return data;
  } catch (error) {
    console.error("Error while updating profile :", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating profile"
    );
  }
}
