import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
})

export const loginUser = async (credentials) => {
    try {
      console.log("[DEBUG] Sending credentials:", credentials);
      const response = await api.post('/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
      console.log("frontend",user)

      return response;
    } catch (error) {
      console.error("[DEBUG] Axios error:", error);
      if (error.response) {
        console.error("[DEBUG] Server response:", error.response.data);
      }
      throw new Error("[ERROR] There was an error with the Credentials: " + error.message);
    }
  };
  