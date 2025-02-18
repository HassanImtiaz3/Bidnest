// src/utils/validation.js

export const validateField = (fieldName, value, formData) => {
    let error = "";
  
    switch (fieldName) {
      case "firstName":
      case "lastName":
      case "company":
        if (value.length > 10) {
          error = `Name cannot exceed 10 characters.`;
        }
        break;
  
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = "Email is required.";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
  
      case "password":
        if (value.length < 8) {
            error = "Password must be at least 8 characters.";
          }
      else if (!value) {
          error = "Password is required.";
        } 
        break;
  
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password.";
        } else if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;
  
      case "phoneNumber":
        const phoneRegex = /^[0-9]{11}$/;
        if (!value) {
          error = "Phone Number is required.";
        } else if (!phoneRegex.test(value)) {
          error = "Phone Number must be between 11 digits.";
        }
        break;
  
      case "experience":
        if (!value) {
          error = "Experience is required.";
        } else if (isNaN(value) || value <= 0) {
          error = "Experience must be a positive number.";
        }
        break;
  
      case "address.city":
      case "address.state":
      case "address.country":
      case "address.zipCode":
        if (!value) {
          error = `${fieldName.split(".")[1]} is required.`;
        }
        break;
  
      default:
        break;
    }
  
    return error;
  };
  