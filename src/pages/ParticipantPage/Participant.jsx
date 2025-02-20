import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

// Category mapping
const categories = {
  All: [],
  Electronics: ["Dawlance", "Pel", "Superasia"],
  Sports: ["Forward"],
  Automobile: ["Indus", "Mtl"],
  "Steel Mill": ["Ittefaq"],
  Textile: ["Artistic", "Kohinoor", "Nishat", "Sapphire"],
  Hosiery: ["Interloop"],
  Plumbing: ["Mastech"],
  Footwear: ["Servis"],
  "Chemical Industry": ["Sitara"],
};

// Agencies list
const agencies = [
  { name: "Artistic", image: "assets/companies/artistic.png" },
  { name: "Dawlance", image: "assets/companies/dawlance.png" },
  { name: "Forward", image: "assets/companies/forward.png" },
  { name: "Indus", image: "assets/companies/indus.png" },
  { name: "Interloop", image: "assets/companies/interloop.png" },
  { name: "Ittefaq", image: "assets/companies/ittefaq.png" },
  { name: "Kohinoor", image: "assets/companies/kohinoor.png" },
  { name: "Mastech", image: "assets/companies/mastech.png" },
  { name: "Mtl", image: "assets/companies/mtl.png" },
  { name: "Nishat", image: "assets/companies/nishat.png" },
  { name: "Pel", image: "assets/companies/pel.png" },
  { name: "Sapphire", image: "assets/companies/sapphire.png" },
  { name: "Servis", image: "assets/companies/Servis.png" },
  { name: "Sitara", image: "assets/companies/sitara.png" },
  { name: "Superasia", image: "assets/companies/superasia.png" },
];

const ParticipatingAgenciesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const agenciesPerPage = 8; // Number of agencies per page

  // Function to get filtered agencies based on selected category
  const getFilteredAgencies = () => {
    if (selectedCategory === "All") {
      return agencies.filter((agency) =>
        Object.values(categories).flat().includes(agency.name)
      );
    }
    return agencies.filter((agency) =>
      categories[selectedCategory]?.includes(agency.name)
    );
  };

  const filteredAgencies = getFilteredAgencies();

  // Pagination logic
  const indexOfLastAgency = currentPage * agenciesPerPage;
  const indexOfFirstAgency = indexOfLastAgency - agenciesPerPage;
  const currentAgencies = filteredAgencies.slice(
    indexOfFirstAgency,
    indexOfLastAgency
  );

  const totalPages = Math.ceil(filteredAgencies.length / agenciesPerPage);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 mt-4">
          <div className="container text-center mt-5 mb-4">
            <Box sx={{ py: 5, px: 3, backgroundColor: "#f9f9f9" }}>
              {/* Header Section */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "1000", mb: 2 }}>
                  Participating Agencies
                </Typography>
                <Typography variant="body1" sx={{ color: "gray" }}>
                  Receive bids directly from government buyers
                </Typography>
              </Box>

              {/* Dropdown Section */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1); // Reset to first page on category change
                  }}
                  sx={{
                    minWidth: "300px",
                    backgroundColor: "white",
                    color: "black",
                    "& .MuiSelect-icon": { color: "black" },
                  }}
                >
                  {Object.keys(categories).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                  Select a category to view agencies
                </Typography>
              </Box>

              {/* Agencies Grid Section */}
              <Grid container spacing={3} justifyContent="center">
                {currentAgencies.map((agency, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card sx={{ boxShadow: 3, textAlign: "center" }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={agency.image}
                        alt={agency.name}
                        sx={{ objectFit: "contain", p: 2 }}
                      />
                      <CardContent>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {agency.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Message if no agencies found */}
              {filteredAgencies.length === 0 && (
                <Typography variant="h6" sx={{ mt: 3, color: "gray" }}>
                  No agencies found in this category.
                </Typography>
              )}

              {/* Pagination Controls */}
              {filteredAgencies.length > agenciesPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                  className='buttonDesign'
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    sx={{ mx: 1 }}
                  >
                    Previous
                  </Button>
                  <Typography
                    variant="body1"
                    sx={{ alignSelf: "center", mx: 2, fontWeight: "bold" }}
                  >
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Button
                  className='buttonDesign'
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    sx={{ mx: 1 }}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Box>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ParticipatingAgenciesSection;
