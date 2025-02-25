import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;
const token = document.cookie.includes("token=")
  ? document.cookie.split("token=")[1].split(";")[0]
  : null;

export async function updateProfile(body) {
  try {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      if (body[key] !== "") {
        formData.append(key, body[key]);
      }
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${apiURL}user/profile`,
      formData,
      config
    );
    return data;
  } catch (error) {
    console.error("Error while updating profile :", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating profile"
    );
  }
}

export async function uploadMedia(body) {
  try {
    const formData = new FormData();
    Object.keys(body).forEach((key) => formData.append(key, body[key]));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${apiURL}media/upload`,
      formData,
      config
    );
    return data;
  } catch (error) {
    console.error("Error while updating profile :", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating profile"
    );
  }
}
