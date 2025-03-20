import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;
const token = document.cookie.includes("token=")
  ? document.cookie.split("token=")[1].split(";")[0]
  : null;
// console.log(token);

export async function userSignup(body) {
  try {
    const { data } = await axios.post(`${apiURL}user/create`, body);
    return data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during signup"
    );
  }
}

export async function userLogin(body) {
  try {
    const { data } = await axios.post(`${apiURL}user/login`, body);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
}

export async function verifyUser(body) {
  try {
    const { data } = await axios.patch(`${apiURL}user/verify`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error while verifying user:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while verifying user"
    );
  }
}

export async function getCurrentUser() {
  try {
    // Assuming the token is stored in localStorage or similar
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${apiURL}user/profile`, config);

    return data;
  } catch (error) {
    console.error("Error while fetching user:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching user"
    );
  }
}

export async function getCreatorProfile(creatorId) {
  try {
    // Assuming the token is stored in localStorage or similar
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiURL}user/profile/creator/${creatorId}`,
      config
    );

    return data;
  } catch (error) {
    console.error("Error while fetching user:", error);
    // window.location.href = "/";
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching user"
    );
  }
}
