// src/utils/validation.js

export const validateField = (fieldName, value, formData) => {
  let error = "";

  switch (fieldName) {
    case "firstName":
    case "lastName":
    case "company":
    case "contactName":
    case "companyName":
    case "productName":
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!value) {
        error = `${fieldName === "firstName"
            ? "First"
            : fieldName === "lastName"
              ? "Last"
              : fieldName === "contactName"
                ? "Contact"
                : fieldName === "productName"
                  ? "Product"
                  : "Company"
          } name is required.`;
      } else if (!nameRegex.test(value)) {
        error = `${fieldName === "firstName"
            ? "First"
            : fieldName === "lastName"
              ? "Last"
              : fieldName === "contactName"
                ? "Contact"
                : fieldName === "productName"
                  ? "Product"
                  : "Company"
          } name should contain only letters and spaces.`;
      } else if (value.length > 50) {
        error = `${fieldName === "firstName"
            ? "First"
            : fieldName === "lastName"
              ? "Last"
              : fieldName === "contactName"
                ? "Contact"
                : fieldName === "productName"
                  ? "Product"
                  : "Company"
          } name cannot exceed 50 characters.`;
      }
      break;

    case "quantity":
      if (!value && value !== 0) {
        error = "Quantity is required.";
      } else if (isNaN(value) || value <= 0) {
        error = "Quantity must be a positive number.";
      } else if (value > 1000000) {
        error = "Quantity cannot exceed 1,000,000.";
      }
      break;

    case "category":
      if (!value) {
        error = "Category selection is required.";
      }
      break;

    case "budget":
      if (!value && value !== 0) {
        error = "Budget is required.";
      } else if (isNaN(value) || value <= 0) {
        error = "Budget must be a positive number.";
      } else if (value > 1000000000) {
        error = "Budget cannot exceed 1,000,000,000.";
      }
      break;

    case "deadline":
      if (!value) {
        error = "Delivery deadline is required.";
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          error = "Deadline cannot be in the past.";
        }
      }
      break;

    case "deliveryLocation":
      if (!value) {
        error = "Delivery location is required.";
      } else if (value.length > 50) {
        error = "Delivery location cannot exceed 50 characters.";
      }
      break;

    case "email":
      const gmailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@gmail\.com$/;
      if (!value) {
        error = "Email is required.";
      } else if (!gmailRegex.test(value)) {
        error =
          "Please enter a valid Gmail address (must start with a letter).";
      }
      break;

    case "password":
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters.";
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
    case "description":
      if (!value) {
        error = "Description is required.";
      }
      break;
      case "ntnNumber":
        if (!value) {
          error = "ntnNumber is required.";
        }
        break;

    case "message":
      if (value && value.length > 1000) {
        error = "Message cannot exceed 500 characters.";
      }
      break;

    case "address.city":
    case "address.state":
    case "address.country":
    case "address.zipCode":
      if (!value) {
        error = `${fieldName.split(".")[1]} is required.`;
      } else if (fieldName === "address.zipCode" && !/^\d+$/.test(value)) {
        error = "zipCode must contain only numbers.";
      }
      break;

    default:
      break;
  }

  return error;
};
