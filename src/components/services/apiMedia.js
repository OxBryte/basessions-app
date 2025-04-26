import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function getMedias() {
  try {
    // Assuming the token is stored in localStorage or similar
    const { data } = await axios.get(`${apiURL}media`);

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}

export async function getUserMedias(userId) {
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
    const { data } = await axios.get(
      `${apiURL}user/profile/creator/${userId}/media`,
      config
    );

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}

export async function getSingleMedia(mediaId) {
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
    const { data } = await axios.get(`${apiURL}/media/${mediaId}`, config);

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}

export async function updateLike(mediaId, body) {
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
    const { data } = await axios.put(`${apiURL}media/${mediaId}`, body, config);

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}

export async function postComment(body, mediaId) {
  try {
    const token = document.cookie.includes("token=")
      ? document.cookie.split("token=")[1].split(";")[0]
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.patch(
      `${apiURL}media/${mediaId}/comment`,
      body,
      config
    );
    return data.data;
  } catch (error) {
    console.error("Error while posting comment:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while posting comment"
    );
  }
}

export async function getLikedMedia() {
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
    const { data } = await axios.get(`${apiURL}media/liked`, config);

    return data.data;
  } catch (error) {
    console.error("Error while fetching media:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching media"
    );
  }
}
