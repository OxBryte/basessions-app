import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;
// const token = document.cookie.includes("token=")
//   ? document.cookie.split("token=")[1].split(";")[0]
//   : null;

export async function updateProfile(body) {
  try {
    const token = document.cookie.includes("token=")
      ? document.cookie.split("token=")[1].split(";")[0]
      : null;

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
    const token = document.cookie.includes("token=")
      ? document.cookie.split("token=")[1].split(";")[0]
      : null;

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

export async function deleteMedia(mediaId) {
  try {
    const token = document.cookie.includes("token=")
      ? document.cookie.split("token=")[1].split(";")[0]
      : null;
    // Assuming the token is stored in localStorage or similar

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`${apiURL}media/${mediaId}`, config);

    return data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.message || "An error occurred while fetching media"
    );
  }
}

export async function followCreator(userId) {
  try {
    const token = document.cookie.includes("token=")
      ? document.cookie.split("token=")[1].split(";")[0]
      : null;
    // Assuming the token is stored in localStorage or similar

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${apiURL}user/profile/follow/${userId}`,
      null,
      config
    );
    return data;
    
  } catch (error) {
    console.error("Error while following creator:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.message || "An error occurred while following creator"
    );
  }
}
