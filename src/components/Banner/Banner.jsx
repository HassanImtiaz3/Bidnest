import React from "react";
import {
  TextField,
  Stack,
  Box,
  Typography,
  InputAdornment,
  Container,
} from "@mui/material";
import bannerImage from "../../assets/banner1.jpeg";
import SearchIcon from "@mui/icons-material/Search";

export default function App() {
  return (
    <header>
      <Box
        sx={{
          background: `url(${bannerImage}) no-repeat center center / cover`,
          maxHeight: "650px",
          paddingY: { xs: "20%", sm: "12%" },
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              color: "white",
              textAlign: { xs: "left", md: "left" },
              width: "100%",
            }}
          >
            {/* Heading */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                fontSize: { xs: "1.4rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              Find government bids matching <br /> your business.
            </Typography>

            {/* Search Bar */}
            <Box mt={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems="left"
                sx={{ width: "100%" }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Search for bids..."
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "90%", md: "700px" },
                    height: "46px",
                  }}
                  InputProps={{
                    sx: { height: "46px" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </header>
  );
}
