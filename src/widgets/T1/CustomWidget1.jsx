import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "../../widgets/Button/Button";
import { useNavigate } from "react-router-dom";

export default function CustomWidget() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "950",
          marginBottom: "16px",
          textAlign: "left",
          fontSize: { xs: "24px", sm: "32px", md: "40px" }, // Responsive font size
        }}
      >
        We make it easy to find Relevant Bids.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "24px",
          textAlign: "left",
          fontSize: { xs: "16px", sm: "18px", md: "17px" },
          fontWeight: "500",
        }}
      >
        Bidnet direct offers your company a centralized location to gain instant
        access to bid opportunities from state departments, local
        municipalities, and the federal government. Working with government
        buyers, we give you access to the most relevant bid opportunities so you
        can focus on winning more government business.
      </Typography>
      <Button
      className='buttonDesign'
        sx={{
          fontSize: { xs: "16px", sm: "18px", md: "17px" },
          fontWeight: "500",
          
        }}
        onClick={() => {
          navigate("/user"); 
        }}
      >
        Register Now
      </Button>
    </Box>
  );
}
