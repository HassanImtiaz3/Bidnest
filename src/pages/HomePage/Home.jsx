import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import ResponsiveStack from "../../components/Stack/Stack";
import CustomWidget1 from "../../widgets/T1/CustomWidget1";
import CustomWidget2 from "../../widgets/T2/CustomWidget2";
import Accordion from "../../widgets/Accordion/Accordion";
import IconGrid from "../../widgets/IconGrid/IconGrid";
import ResponsiveCard from "../../widgets/Cards/Cards";
import { Typography } from "@mui/material";
import ProcurementNotices from "../../widgets/Notices/Notices";
import EnrollmentSection from "../../widgets/UserOnboarding/Onboarding";
import { Container, Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box>
        <Container maxWidth="lg">
        </Container>
        <Navbar />

        <Banner />
        <Container maxWidth="lg" align="center" sx={{ marginTop: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "950", // Extra bold font weight
              fontSize: { xs: "24px", sm: "32px", md: "40px" }, // Responsive font size
            }}
          >
            The Industry Leader in Response <br /> Content Management
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                marginTop: 2,
              }}
            >
              Winning bids starts with quality responses. It’s not enough to
              have your content all <br /> in one place—you also need to know
              that it’s trustworthy, accessible, and accurate.
            </Typography>
          </Typography>
          <ResponsiveCard />
          <ProcurementNotices />
          <ResponsiveStack>
            <CustomWidget1 />
            <CustomWidget2 />
          </ResponsiveStack>
          <EnrollmentSection />
          <Typography
            variant="h1"
            sx={{
              fontWeight: "1000",
              padding: "50",
              fontSize: { xs: "24px", sm: "32px", md: "40px" },
            }}
          >
            INFO <span style={{ color: "#673de6" }}>DESK</span>
          </Typography>
          <ResponsiveStack>
            <IconGrid />
            <Accordion />
          </ResponsiveStack>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
