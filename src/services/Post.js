import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const submitPost = async (postData) => {
  try {
    console.log("[DEBUG] Sending Post Data", postData);
    const userId = localStorage.getItem("user"); // Adjust key name based on your storage
    const user = JSON.parse(userId); // Parse the string into an object

    console.log("asdadasd", userId);

    const dataToSend = {
      ...postData,
      user: user?._id, // send MongoDB _id, not uuid
      uuid: user?.uuid,
    };

    console.log("[DEBUG] Sending Post Data", dataToSend);
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
      error: error.response?.data?.message,
    };
  }
};

export const getPost = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Parse once
    const userId = user?._id;
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

    console.log("[INFO] Post fetch successfully:", response?.data);
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
