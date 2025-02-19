import axios from "axios";

export const sendEmail = async (emailData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/contact", emailData);
    return response.data; 
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send message. Try again." };
  }
};
