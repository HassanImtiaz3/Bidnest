import React from "react";
import { Box, Typography, Button } from "@mui/material";

const PostABid = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        marginY: 6,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Left Section - Post a Bid */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#673de6",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2 }}>
          ARE YOU LOOKING TO POST A BID?
        </Typography>

        <Typography
          sx={{
            marginBottom: 4,
            textAlign: "left",
            width: "100%",
            wordBreak: "break-word",
            lineHeight: 1.6,
          }}
        >
          Explore available opportunities and submit your proposal now to get
          started with bidding.
        </Typography>

        <Button
          variant="contained"
          href="/about-us"
          sx={{
            backgroundColor: "#4a4a4a",
            color: "white",
            borderRadius: "30px",
            paddingX: 4,
            paddingY: 1,
            fontWeight: 600,
            textTransform: "none",
            pointerEvents: "auto",
          }}
        >
          VIEW MORE
        </Button>
      </Box>

      {/* Right Section - Tender Info */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2 }}>
          ARE YOU LOOKING FOR A TENDER?
        </Typography>

        <Typography
          sx={{
            marginBottom: 4,
            textAlign: "left",
            width: "100%",
            wordBreak: "break-word",
            lineHeight: 1.6,
          }}
        >
          Discover available tenders and get the details you need to submit your
          best offer.
        </Typography>

        <Button
          variant="contained"
          href="/about-us"
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "30px",
            paddingX: 4,
            paddingY: 1,
            fontWeight: 600,
            textTransform: "none",
            pointerEvents: "auto",
          }}
        >
          VIEW MORE
        </Button>
      </Box>
    </Box>
  );
};

export default PostABid;
