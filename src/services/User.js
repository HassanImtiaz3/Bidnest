import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const submitUser = async (userData) => {
    try {
      console.log("[DEBUG] Sending User Data:", userData);
      const response = await api.post("/signup", userData);
  
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log("[INFO] User Successfully Registered:", user);
      return response;
    } catch (error) {
      console.error("[ERROR] Axios Error:", error.message);
      throw new Error("[ERROR] There was an error with the User Signup: " + error.message);
    }
  };
  