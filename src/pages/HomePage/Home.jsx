import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import ResponsiveStack from "../../components/Stack/Stack";
import CustomWidget1 from "../../widgets/T1/CustomWidget1";
import CustomWidget2 from "../../widgets/T2/CustomWidget2";
import CustomWidget3 from "../../widgets/T3/CustomWidget3";
import Accordion from "../../widgets/Accordion/Accordion";
import IconGrid from "../../widgets/IconGrid/IconGrid";
import Timer from "../../widgets/Timer/Timer";
import ResponsiveCard from "../../widgets/Cards/Cards";
import { Typography } from "@mui/material";
import { BrowserRouter as Router } from 'react-router-dom';
import ProcurementNotices from "../../widgets/Notices/Notices";

const Home = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Banner />
        <div className="flex-grow-1 mt-4">
          <div className="container text-center mt-5 mb-4">
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
                  fontWeight: "500", // Regular weight for the paragraph
                  fontSize: { xs: "16px", sm: "18px", md: "20px" }, // Responsive font size
                  marginTop: 2, // Adds spacing between the title and the paragraph
                }}
              >
                Winning bids starts with quality responses. It’s not enough to
                have your content all <br /> in one place—you also need to know
                that it’s trustworthy, accessible, and accurate.
              </Typography>
            </Typography>
            <ResponsiveCard />
              <ProcurementNotices/>
            <ResponsiveStack>
              <CustomWidget1 />
              <CustomWidget2 />
            </ResponsiveStack>
            <div />
          </div>
          <Timer />
          <div className="container text-center mt-5 mb-4">
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
          </div>
          <CustomWidget3 />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
