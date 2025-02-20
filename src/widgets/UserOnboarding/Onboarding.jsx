import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const EnrollmentSection = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={6} // Increased spacing between sections
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", padding: { xs: 3, md: 6 } }} // More padding on larger screens
    >
      {/* Enrollment of Suppliers */}
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          textAlign: "center",
          padding: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "24px", sm: "32px", md: "55px" },
            fontWeight: "1000",
            marginBottom: 2, // Added spacing below heading
          }}
        >
          ENROLLMENT OF
        </Typography>
        <Box
          sx={{
            display: "inline-block",
            backgroundColor: "#673de6",
            color: "white",
            padding: "12px 60px",
            borderRadius: "8px",
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

      {/* Registration of Public Sector Organizations */}
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          textAlign: "center",
          padding: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "24px", sm: "32px", md: "55px" },
            fontWeight: "1000",
            color: "#673de6",
            marginBottom: 2, // Added spacing below heading

          }}
        >
          REGISTRATION OF
        </Typography>
        <Box
          sx={{
            display: "inline-block",
            backgroundColor: "black",
            color: "white",
            padding: "12px 60px",
            borderRadius: "8px",
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
    </Stack>
  );
};

export default EnrollmentSection;
