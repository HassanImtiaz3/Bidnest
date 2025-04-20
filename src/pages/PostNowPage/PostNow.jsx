import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Container,
  Typography,
  styled,
  Input as MuiInput,
  FormHelperText,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { submitPost } from "../../services/Post";
import { validateField } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

function PostNow() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    productName: "",
    quantity: 0,
    category: "",
    budget: 0,
    deadline: "",
    deliveryLocation: "",
    message: "",
    file: null,
  });
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    contactName: "",
    companyName: "",
    productName: "",
    quantity: "",
    category: "",
    budget: "",
    deadline: "",
    deliveryLocation: "",
    message: "",
    file: "",
  });
  const [touched, setTouched] = useState({
    contactName: false,
    companyName: false,
    productName: false,
    quantity: false,
    category: false,
    budget: false,
    deadline: false,
    deliveryLocation: false,
    message: false,
    file: false,
  });

  const totalBudget = formData.quantity * formData.budget;

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // For quantity and budget, we need to update the other field's validation too
    if (fieldName === "quantity" || fieldName === "budget") {
      const error = validateField(fieldName, value, formData);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, formData[fieldName], formData);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const error = validateField("file", selectedFile, formData);

    setErrors((prev) => ({ ...prev, file: error }));
    setTouched((prev) => ({ ...prev, file: true }));

    if (selectedFile && !error) {
      setFormData((prev) => ({ ...prev, file: selectedFile }));
      setFileName(selectedFile.name);
    } else if (!selectedFile) {
      setFormData((prev) => ({ ...prev, file: null }));
      setFileName("");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    const error = validateField("file", selectedFile, formData);

    setErrors((prev) => ({ ...prev, file: error }));
    setTouched((prev) => ({ ...prev, file: true }));

    if (selectedFile && !error) {
      setFormData((prev) => ({ ...prev, file: selectedFile }));
      setFileName(selectedFile.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateForm = () => {
    const newErrors = {
      contactName: validateField("contactName", formData.contactName, formData),
      companyName: validateField("companyName", formData.companyName, formData),
      productName: validateField("productName", formData.productName, formData),
      quantity: validateField("quantity", formData.quantity, formData),
      category: validateField("category", formData.category, formData),
      budget: validateField("budget", formData.budget, formData),
      deadline: validateField("deadline", formData.deadline, formData),
      deliveryLocation: validateField(
        "deliveryLocation",
        formData.deliveryLocation,
        formData
      ),
      message: validateField("message", formData.message, formData),
      file: validateField("file", formData.file, formData),
    };

    setErrors(newErrors);
    setTouched({
      contactName: true,
      companyName: true,
      productName: true,
      quantity: true,
      category: true,
      budget: true,
      deadline: true,
      deliveryLocation: true,
      message: true,
      file: true,
    });

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let fileBase64 = "";
      if (formData.file) {
        fileBase64 = await convertToBase64(formData.file);
      }

      const postData = {
        contactName: formData.contactName,
        companyName: formData.companyName,
        productName: formData.productName,
        quantity: formData.quantity,
        category: formData.category,
        budget: formData.budget,
        deadline: formData.deadline,
        deliveryLocation: formData.deliveryLocation,
        totalBudget: totalBudget,
        message: formData.message,
        file: fileBase64,
        fileName: formData.file ? formData.file.name : "",
        fileType: formData.file ? formData.file.type : "",
      };

      const result = await submitPost(postData);
      if (result.success) {
        alert("Post created successfully!");
        navigate("/post");
        // Reset form
        setFormData({
          contactName: "",
          companyName: "",
          productName: "",
          quantity: 0,
          category: "",
          budget: 0,
          deadline: "",
          deliveryLocation: "",
          message: "",
          file: null,
        });
        setFileName("");
        setErrors({
          contactName: "",
          companyName: "",
          productName: "",
          quantity: "",
          category: "",
          budget: "",
          deadline: "",
          deliveryLocation: "",
          message: "",
          file: "",
        });
        setTouched({
          contactName: false,
          companyName: false,
          productName: false,
          quantity: false,
          category: false,
          budget: false,
          deadline: false,
          deliveryLocation: false,
          message: false,
          file: false,
        });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit post. Please try again.");
    } finally {
      setIsSubmitting(false);
     
    }


  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          background: "linear-gradient(145deg, #673DE6 0%, #000000 100%)",
          maxHeight: "650px",
          paddingY: { xs: "20%", sm: "12%" },
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      ></Box>
      <Container maxWidth="lg" sx={{ mt: -30, mb: 4, zIndex: 10 }}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            align="center"
            variant="h1"
            sx={{
              fontWeight: "1000",
              padding: "50",
              marginTop: 1,
              marginBottom: 6,
              fontSize: { xs: "24px", sm: "32px", md: "40px" },
            }}
          >
            REQUEST FOR
            <span style={{ color: "#673de6" }}> QUOTE</span>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              {/* Row 1 */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1 }}
              >
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Contact Name"
                  variant="outlined"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  onBlur={() => handleBlur("contactName")}
                  error={touched.contactName && !!errors.contactName}
                  helperText={touched.contactName && errors.contactName}
                  required
                />
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Company Name"
                  variant="outlined"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  onBlur={() => handleBlur("companyName")}
                  error={touched.companyName && !!errors.companyName}
                  helperText={touched.companyName && errors.companyName}
                  required
                />
              </Stack>
              {/* Row 2 */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1 }}
              >
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  value={formData.productName}
                  onChange={(e) => handleChange("productName", e.target.value)}
                  onBlur={() => handleBlur("productName")}
                  error={touched.productName && !!errors.productName}
                  helperText={touched.productName && errors.productName}
                  required
                />
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleChange("quantity", Number(e.target.value))
                  }
                  onBlur={() => handleBlur("quantity")}
                  error={touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  required
                  inputProps={{ min: 1 }}
                />
              </Stack>

              {/* Row 3 */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1 }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  error={touched.category && !!errors.category}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => handleChange("category", e.target.value)}
                    onBlur={() => handleBlur("category")}
                    required
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                  </Select>
                  {touched.category && errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Budget"
                  type="number"
                  variant="outlined"
                  value={formData.budget}
                  onChange={(e) =>
                    handleChange("budget", Number(e.target.value))
                  }
                  onBlur={() => handleBlur("budget")}
                  error={touched.budget && !!errors.budget}
                  helperText={touched.budget && errors.budget}
                  required
                  inputProps={{ min: 0, step: "0.01" }}
                />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1 }}
              >
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Delivery Deadline"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  onBlur={() => handleBlur("deadline")}
                  error={touched.deadline && !!errors.deadline}
                  helperText={touched.deadline && errors.deadline}
                  required
                />
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Delivery Location"
                  variant="outlined"
                  value={formData.deliveryLocation}
                  onChange={(e) =>
                    handleChange("deliveryLocation", e.target.value)
                  }
                  onBlur={() => handleBlur("deliveryLocation")}
                  error={touched.deliveryLocation && !!errors.deliveryLocation}
                  helperText={
                    touched.deliveryLocation && errors.deliveryLocation
                  }
                  required
                />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1 }}
              >
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Total Budget"
                  type="number"
                  variant="outlined"
                  value={totalBudget}
                  InputProps={{ readOnly: true }}
                />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1, width: "100%" }}
              >
                <Box
                  sx={{
                    border: `2px dashed ${
                      touched.file && errors.file ? "red" : "#ccc"
                    }`,
                    borderRadius: "8px",
                    padding: 2,
                    bgcolor: "#fafafa",
                    color: "#ccc",
                    width: "100%",
                    "&:hover": {
                      bgcolor: "#f4f4f4",
                      color: "#666",
                    },
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {fileName ? (
                    <Typography>{fileName}</Typography>
                  ) : (
                    <Typography>No file selected</Typography>
                  )}
                  <Button component="label" fullWidth>
                    Upload File
                    <Input type="file" onChange={handleFileChange} />
                  </Button>
                  {touched.file && errors.file && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {errors.file}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{ paddingX: 15, paddingY: 1 }}
              >
                <TextField
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                  }}
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  error={touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                />
              </Stack>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  px: 7,
                  py: 2,
                  background:
                    "linear-gradient(35deg, #673DE6 50%, #000000 100%)",
                  color: "white",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "26px",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #512DA8 30%, #673DE6 90%)",
                  },
                  "&:disabled": {
                    background: "#cccccc",
                  },
                }}
              >
                {isSubmitting ? "Posting..." : "Post Now"}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default PostNow;
