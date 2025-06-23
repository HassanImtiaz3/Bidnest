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
  FormHelperText,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { submitPost } from "../../services/Post";
import { validateField } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

const HiddenInput = styled("input")({
  display: "none",
});

function PostNow() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactName: user ? `${user.firstName} ${user.lastName}` : "",
    companyName: "",
    productName: "",
    quantity: "",
    category: "",
    budget: "",
    deadline: "",
    deliveryLocation: "",
    message: "",
    file: null,
  });

  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const totalBudget = formData.quantity * formData.budget;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (["quantity", "budget"].includes(field)) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value, { ...formData, [field]: value }),
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field], formData),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const error = validateField("file", file, formData);
    setTouched((prev) => ({ ...prev, file: true }));
    setErrors((prev) => ({ ...prev, file: error }));

    if (file && !error) {
      setFormData((prev) => ({ ...prev, file }));
      setFileName(file.name);
    } else {
      setFormData((prev) => ({ ...prev, file: null }));
      setFileName("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const error = validateField("file", file, formData);
    setTouched((prev) => ({ ...prev, file: true }));
    setErrors((prev) => ({ ...prev, file: error }));

    if (file && !error) {
      setFormData((prev) => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const validateForm = () => {
    const fields = Object.keys(formData);
    const newErrors = {};

    fields.forEach((field) => {
      newErrors[field] = validateField(field, formData[field], formData);
    });

    setErrors(newErrors);
    const newTouched = fields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(newTouched);

    return !Object.values(newErrors).some((err) => err !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const fileBase64 = formData.file
        ? await convertToBase64(formData.file)
        : "";

      const postData = {
        ...formData,
        totalBudget,
        file: fileBase64,
        fileName: formData.file?.name || "",
        fileType: formData.file?.type || "",
      };

      const result = await submitPost(postData);
      if (result.success) {
        alert("Post created successfully!");
        navigate("/post");

        setFormData({
          contactName: "",
          companyName: "",
          productName: "",
          quantity: "",
          category: "",
          budget: "",
          deadline: "",
          deliveryLocation: "",
          message: "",
          file: null,
        });
        setFileName("");
        setErrors({});
        setTouched({});
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
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
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 900 }}>
          Request for <span style={{ color: "#ffeb3b" }}>Quote</span>
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -15, mb: 4 }}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Contact Name"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  onBlur={() => handleBlur("contactName")}
                  fullWidth
                  error={touched.contactName && !!errors.contactName}
                  helperText={touched.contactName && errors.contactName}
                  required
                />
                <TextField
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  onBlur={() => handleBlur("companyName")}
                  fullWidth
                  error={touched.companyName && !!errors.companyName}
                  helperText={touched.companyName && errors.companyName}
                  required
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Product Name"
                  value={formData.productName}
                  onChange={(e) => handleChange("productName", e.target.value)}
                  onBlur={() => handleBlur("productName")}
                  fullWidth
                  error={touched.productName && !!errors.productName}
                  helperText={touched.productName && errors.productName}
                  required
                />
                <TextField
                  label="Quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleChange("quantity", Number(e.target.value))
                  }
                  onBlur={() => handleBlur("quantity")}
                  fullWidth
                  error={touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  required
                  inputProps={{ min: 1 }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl
                  fullWidth
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
                  label="Unit Price"
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    handleChange("budget", Number(e.target.value))
                  }
                  onBlur={() => handleBlur("budget")}
                  fullWidth
                  error={touched.budget && !!errors.budget}
                  helperText={touched.budget && errors.budget}
                  required
                  inputProps={{ min: 0, step: "0.01" }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Delivery Deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  onBlur={() => handleBlur("deadline")}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={touched.deadline && !!errors.deadline}
                  helperText={touched.deadline && errors.deadline}
                  required
                />
                <TextField
                  label="Delivery Location"
                  value={formData.deliveryLocation}
                  onChange={(e) =>
                    handleChange("deliveryLocation", e.target.value)
                  }
                  onBlur={() => handleBlur("deliveryLocation")}
                  fullWidth
                  error={touched.deliveryLocation && !!errors.deliveryLocation}
                  helperText={
                    touched.deliveryLocation && errors.deliveryLocation
                  }
                  required
                />
              </Stack>

              <TextField
                label="Total Price"
                value={totalBudget}
                InputProps={{ readOnly: true }}
                fullWidth
              />

              <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                sx={{
                  border: `2px dashed ${
                    touched.file && errors.file ? "red" : "#ccc"
                  }`,
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  bgcolor: "#f9f9f9",
                }}
              >
                <Typography>{fileName || "No file selected"}</Typography>
                <Button component="label" variant="outlined" sx={{ mt: 1 }}>
                  Upload File
                  <HiddenInput type="file" onChange={handleFileChange} />
                </Button>
                {touched.file && errors.file && (
                  <Typography color="error" variant="body2">
                    {errors.file}
                  </Typography>
                )}
              </Box>

              <TextField
                label="Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                error={touched.message && !!errors.message}
                helperText={touched.message && errors.message}
                fullWidth
              />

              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                sx={{ alignSelf: "center", px: 6, py: 1.5 }}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default PostNow;
