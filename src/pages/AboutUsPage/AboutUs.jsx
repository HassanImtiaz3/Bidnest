import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Stack, Typography, Button } from "@mui/material";

function AboutUs() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 mt-4">
          {/* Wrapper Box to center the content */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: { xs: 3, sm: 4 },
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }} // Stack items vertically on xs and horizontally on md and larger
              spacing={4}
              sx={{
                width: "100%",
                maxWidth: "1200px", // Max width for large screens
                boxSizing: "border-box",
              }}
            >
              {/* Left Column with Image */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                }}
              >
                <img
                  src="https://via.placeholder.com/400" // Replace with your image URL
                  alt="About Us"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>

              {/* Right Column with Text */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* About Us Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: (theme) => theme.palette.primary.main,
                    marginBottom: 2,
                    fontSize: { xs: "1.8rem", sm: "2.5rem" },
                  }}
                >
                  About Us
                </Typography>

                {/* Section Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: (theme) => theme.palette.primary.main,
                    marginBottom: 3,
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  }}
                >
                  Who We Are
                </Typography>

                {/* About Us Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    textAlign: "justify",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    lineHeight: 1.6,
                    marginBottom: 2,
                  }}
                >
                  BidNest is an innovative e-Tender Management System designed to streamline the bidding and procurement process for businesses and government entities. Our platform connects vendors with large-scale tender opportunities, ensuring transparency, efficiency, and seamless communication.
                </Typography>

                {/* Call to Action Button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ alignSelf: "flex-start", borderRadius: 3, padding: "8px 20px" }}
                >
                  Learn More
                </Button>
              </Box>
            </Stack>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
