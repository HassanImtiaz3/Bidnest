import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const submitPost = async (postData) => {
  try {
    console.log("[DEBUG] Raw Post Data to Submit:", postData);

    const userRaw = localStorage.getItem("user");
    let user = null;

    try {
      user = userRaw && typeof userRaw === "string" ? JSON.parse(userRaw) : null;
    } catch (err) {
      console.error("[ERROR] Failed to parse user from localStorage:", err);
      return {
        success: false,
        error: "Invalid user data in localStorage. Please login again.",
      };
    }

    if (!user || !user._id) {
      return {
        success: false,
        error: "User not found. Please login again.",
      };
    }

    const dataToSend = {
      ...postData,
      user: user._id, // MongoDB ID
      uuid: user.uuid, // custom uuid if required
    };

    console.log("[DEBUG] Final Data Sent to Backend:", dataToSend);

    const response = await api.post("/create-post", dataToSend, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[INFO] Post created successfully:", response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "[ERROR] Failed to create post:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.response?.data?.message || "Failed to create post",
    };
  }
};

export const getPost = async () => {
  try {
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;

    const userId = user?.uuid;
    const role = user?.role;

    let response;

    if (role === "vendor") {
      response = await api.get(`/posts`, {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }
      response = await api.get(`/post?userId=${userId}`, {
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[INFO] Posts fetched successfully:", response?.data);
    localStorage.setItem("post", JSON.stringify(response?.data));
    return {
      success: true,
      data: response?.data,
    };
  } catch (error) {
    console.error(
      "[ERROR] Failed to get posts:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
