import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const submitPost = async (postData) => {
  try {
    console.log("[DEBUG] Sending Post Data", postData);
    const response = await api.post("/create-post", postData, {
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
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getPost = async () => {
  try {
    const response = await api.get("/post", {
      headers : {
        "Content-Type" : "application/json",
      }
    })

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
}