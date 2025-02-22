import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Bread from "../../widgets/BackToHomeButton/BreadCrumbs.jsx";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,

} from "@mui/material";

const cardData = [
  {
    image: "/assets/local/Create.svg",
    title: "Create",
    description: "Awesome Experience",
  },
  {
    image: "/assets/local/Communicate.svg",
    title: "Communicate",
    description: "Seamless Interaction",
  },
  {
    image: "/assets/local/Connect.svg",
    title: "Connect",
    description: "Global Networking",
  },
];

const CardItem = ({ image, title, description }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
    }}
  >
    <Card sx={{ maxWidth: 600, textAlign: "center", boxShadow: 3 }}>
      <CardMedia component="img" height="350" image={image} alt={title} />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "25px" },
            color: "gray",
            fontWeight: "600",
          }}
        >
          we
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "24px", sm: "32px", md: "35px" },
            fontWeight: "1000",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            color: "gray",
            fontWeight: "600",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

function AboutUs() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Bread name="About Us" />;
        <div className="flex-grow-1 mt-2">
          {/* Main Content */}
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
              direction={{ xs: "column", md: "row" }}
              spacing={4}
              sx={{ width: "100%", maxWidth: "1200px" }}
            >
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
                  src="/assets/local/manLaptop.png"
                  alt="About Us"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    fontWeight: "600",
                    color: "#673de6",
                  }}
                >
                  About Us
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "24px", sm: "32px", md: "50px" },
                    fontWeight: "1000",
                    marginBottom: 2,
                  }}
                >
                  Who We Are
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    textAlign: "justify",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    lineHeight: 1.2,
                    marginBottom: 2,
                  }}
                >
                  BidNest is an innovative e-Tender Management System designed
                  to streamline the bidding and procurement process for
                  businesses and government entities. Our platform connects
                  vendors with large-scale tender opportunities, ensuring
                  transparency, efficiency, and seamless communication.
                </Typography>
                <Button
                  className="buttonDesign"
                  variant="contained"
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "17px" },
                    alignSelf: "flex-start",
                    borderRadius: 3,
                    padding: "8px 20px",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Stack>
          </Box>
        </div>
        {/* Dynamic Cards Section */}
        <div className="flex-grow-1 mt-4">
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
              direction={{ xs: "column", md: "row" }}
              spacing={4}
              sx={{ width: "100%", maxWidth: "1200px" }}
            >
              {cardData.map((card, index) => (
                <CardItem key={index} {...card} />
              ))}
            </Stack>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
