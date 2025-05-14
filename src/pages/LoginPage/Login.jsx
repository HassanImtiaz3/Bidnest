import { React, useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import logo from "../../assets/bidnest.png";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { loginUser } from "../../services/Login";
import { userLogin } from "../../services/UserLogin";
import Back from "../../widgets/BackToHomeButton/Back";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleLogin = async () => {
    try {
      // Send the email and password to your backend
      const response = await loginUser({ email, password });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Save user info to localStorage/sessionStorage if needed
        localStorage.setItem("token", response.data.token);
        
        // Show success snackbar
        setSnackbarMessage("Vendor login successful! Redirecting...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        
        // Redirect after a short delay (1.5 seconds)
        setTimeout(() => {
          window.location.href = "/"; // Redirect to dashboard
        }, 1500);
      }
    } catch (error) {
      // Handle error
      console.error("Login failed:", error.response?.data || error.message);

      // Display a meaningful error message to the user
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password."
      );
      
      // Show error snackbar
      setSnackbarMessage(error.response?.data?.message || "Login failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Back />

      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              bgcolor="#f8f9fa"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                bgcolor="white"
                p={4}
                borderRadius={2}
                boxShadow={3}
                maxWidth={400}
                width="100%"
              >
                {/* Logo */}
                <Box mb={2}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ height: "70px", width: "auto" }}
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
                    "& .MuiInputBase-input::placeholder": {
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
                    "& .MuiInputBase-input::placeholder": {
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
                  className='buttonDesign'
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleLogin}
                  sx={{
                    mt: 2,
                    mb: 3,
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  Vendor LOGIN
                </Button>

                {/* Forgot Password */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  mb={2}
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
            </Box>
          </MDBCol>

          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src="assets/companies/right.jpg"
              alt="Login image"
              className="w-100"
              style={{
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
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

export default App;