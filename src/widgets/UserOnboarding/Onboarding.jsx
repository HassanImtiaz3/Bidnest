import React, { useState } from "react";
import { Box, Stack, Typography, Snackbar, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EnrollmentSection = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handlePostNowClick = () => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    if (!isLoggedIn) {
      setOpenSnackbar(true);
    } else {
      navigate("/post-now");
    }
  };

  const handleBidNowClick = () => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    if (!isLoggedIn) {
      setOpenSnackbar(true);
    } else {
      navigate("/post");
    }
  };

  const handleLoginClick = () => {
    setOpenSnackbar(false);
    navigate("/user/login");
  };

  // Get role from localStorage
  const token = localStorage.getItem("token");

  const userData = localStorage.getItem("user");
  let role = "";
  try {
    role = userData ? JSON.parse(userData)?.role : "";
  } catch (e) {
    console.error("Error parsing user data:", e);
  }

  const showPostNow = !token || role === "user";
  const showBidNow = !token || role === "vendor";

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", padding: { xs: 3, md: 6 } }}
      >
        {showPostNow && (
          <Box
            sx={{
              width: { xs: "100%", md: "100%" },
              textAlign: "center",
              padding: { xs: 3, md: 5 },
            }}
          >
            <Box
              onClick={handlePostNowClick}
              sx={{
                display: "inline-block",
                backgroundColor: "black",
                color: "white",
                padding: "12px 60px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                  fontWeight: "500",
                }}
              >
                POST NOW
              </Typography>
            </Box>
            <Box mt={4}>
              <img
                src="/assets/local/manLaptop.png"
                alt="Public Sector"
                style={{ width: "100%", maxWidth: "300px", height: "auto" }}
              />
            </Box>
          </Box>
        )}

        {showBidNow && (
          <Box
            sx={{
              width: { xs: "100%", md: "100%" },
              textAlign: "center",
              padding: { xs: 3, md: 5 },
            }}
          >
            <Box
              onClick={handleBidNowClick}
              sx={{
                display: "inline-block",
                backgroundColor: "#673de6",
                color: "white",
                padding: "12px 60px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                  fontWeight: "500",
                }}
              >
                BID NOW
              </Typography>
            </Box>
            <Box mt={4}>
              <img
                src="/assets/local/laptop.png"
                alt="Suppliers"
                style={{ width: "100%", maxWidth: "300px", height: "auto" }}
              />
            </Box>
          </Box>
        )}
      </Stack>

      {/* Snackbar for login prompt */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
          action={
            <Button
              size="small"
              onClick={handleLoginClick}
              sx={{
                backgroundColor: "black !important",
                color: "white !important",
              }}
            >
              LOGIN
            </Button>
          }
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          You must be logged in to post.
        </Alert>
      </Snackbar>
    </>
  );
};

export default EnrollmentSection;
