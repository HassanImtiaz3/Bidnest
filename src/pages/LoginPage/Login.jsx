import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import logo from "../../assets/bidnest.png";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { loginUser } from "../../services/Login"; // Assuming vendor login uses this service
import Back from "../../widgets/BackToHomeButton/Back";

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        setSnackbarMessage("Vendor login successful! Redirecting...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          window.location.href = "/"; // Redirect to vendor dashboard or homepage
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password."
      );
      setSnackbarMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Back />
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <MDBRow className="w-100 justify-content-center">
          <MDBCol md="6" lg="5">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              bgcolor="white"
              p={4}
              borderRadius={3}
              boxShadow={4}
              width="100%"
            >
              {/* Heading */}
              <Typography variant="h5" fontWeight={600} mb={2} color="primary">
                Vendor Login
              </Typography>

              {/* Logo */}
              <Box
                mb={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={120}
                height={120}
                borderRadius="50%"
                bgcolor="#e8eaf6"
                boxShadow={3}
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    height: "80px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Email Input */}
              <TextField
                label="Email address"
                type="email"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000",
                  },
                }}
              />

              {/* Password Input */}
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000",
                  },
                }}
              />

              {/* Error Message */}
              {errorMessage && (
                <Typography color="error" mt={2}>
                  {errorMessage}
                </Typography>
              )}

              {/* Login Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleLogin}
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "white",
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                VENDOR LOGIN
              </Button>

              {/* Forgot Password */}
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mb={1}
              >
                <a
                  href="#!"
                  style={{ textDecoration: "none", color: "#673de6" }}
                >
                  Forgot password?
                </a>
              </Typography>

              {/* Register Link */}
              <Typography variant="body2" textAlign="center">
                Don't have an account?{" "}
                <a
                  href="/registration"
                  style={{ color: "#673de6", textDecoration: "none" }}
                >
                  Register here
                </a>
              </Typography>
            </Box>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default VendorLogin;
