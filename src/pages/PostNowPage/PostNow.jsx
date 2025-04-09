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
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { submitPost } from "../../services/Post";

const Input = styled("input")({
  display: "none",
});

function PostNow() {
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    setQuantity(value);
    setTotalBudget(value * budget);
  };

  const handleBudgetChange = (event) => {
    const value = Number(event.target.value);
    setBudget(value);
    setTotalBudget(quantity * value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
      reader.onload = () => resolve(reader.result.split(',')[1]); // Extract only the base64 part
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let fileBase64 = "";
      if (file) {
        fileBase64 = await convertToBase64(file);
      }

      const postData = {
        contactName,
        companyName,
        productName,
        quantity,
        category,
        budget,
        deadline,
        deliveryLocation,
        totalBudget,
        message,
        file: fileBase64,
        fileName: file ? file.name : "",
        fileType: file ? file.type : ""
      };

      const result = await submitPost(postData);
      if (result.success) {
        alert("Post created successfully!");
        // Reset form
        setContactName("");
        setCompanyName("");
        setProductName("");
        setQuantity(0);
        setCategory("");
        setBudget(0);
        setDeadline("");
        setDeliveryLocation("");
        setTotalBudget(0);
        setMessage("");
        setFile(null);
        setFileName("");
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
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
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
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
                  value={quantity}
                  onChange={handleQuantityChange}
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
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                    required
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                  </Select>
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
                  value={budget}
                  onChange={handleBudgetChange}
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
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
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
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
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
                    border: "2px dashed #ccc",
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                  background: "linear-gradient(35deg, #673DE6 50%, #000000 100%)",
                  color: "white",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "26px",
                  "&:hover": {
                    background: "linear-gradient(90deg, #512DA8 30%, #673DE6 90%)",
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