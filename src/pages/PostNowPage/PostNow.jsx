import React from "react";
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
import { useState } from "react";

const Input = styled("input")({
  display: "none",
});

function PostNow() {
  const [category, setCategory] = React.useState("");
  const [deadline, setDeadline] = React.useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setDeadline(event.target.value);
  };

  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      // Perform file upload task here if required
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          background: "linear-gradient(145deg, #673DE6 0%, #000000 100%)", // Diagonal gradient
          maxHeight: "650px",
          paddingY: { xs: "20%", sm: "12%" },
          color: "#FFFFFF", // Ensures text color is white for better contrast
          display: "flex",
          alignItems: "center", // Vertically centers any children inside the box
          justifyContent: "center", // Horizontally centers any children inside the box
          borderRadius: "8px", // Optional rounded corners
        }}
      >
      </Box>
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
          <form>
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
                  label="Product Name"
                  variant="outlined"
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
                  label="Budget"
                  type="number"
                  variant="outlined"
                />
                <FormControl
                  fullWidth
                  variant="outlined"
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
                  <InputLabel
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
                    Category
                  </InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Row 3 */}
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
                  onChange={handleDateChange}
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
                  label="Brand Preference"
                  variant="outlined"
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
                  label="Contact Name"
                  variant="outlined"
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
                  label="Contact Number"
                  variant="outlined"
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
                    width: "100%", // Ensures the Box takes full width
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
                    <Typography></Typography>
                  )}
                  <Button component="label" fullWidth>
                    Upload File
                    <MuiInput type="file" hidden onChange={handleFileChange} />
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
                />
              </Stack>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 7,
                  py: 2,
                  background: "linear-gradient(35deg, #673DE6 50%, #000000 100%)", // Diagonal gradient
                  color: "white",
                  borderRadius: "8px", // Rounded corners
                  textTransform: "none", // Removes uppercase transformation
                  fontSize: "26px", // Sets the font size
                  "&:hover": {
                    backgroundColor:
                      "linear-gradient(90deg, #512DA8 30%, #673DE6 90%)", // Hover effect with gradient flip
                  },
                }}
              >
                Post Now
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
