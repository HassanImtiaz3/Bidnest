import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  Stack,
  Divider,
  Button,
} from "@mui/material";

function OpenSolicitations() {

  const dropdownConfig = [
    { name: "Agency Type", values: ["All Bids", "Private Bids", "State & Local", "Federal"] },
    { 
      name: "Category", 
      values: [
        "Construction & Infrastructure (Building, Renovation, Roads, Bridges)",
        "Painting & Coatings (Residential, Commercial, Industrial)",
        "Electrical & Mechanical Services (Wiring, HVAC, Plumbing)",
        "Telecommunications & Networking (Fiber Optic, ISP, IT Infrastructure)",
        "Printing & Packaging (Brochures, Labels, Product Packaging)",
        "Security & Surveillance (CCTV, Guards, Access Control)",
        "Transportation & Logistics (Freight, Warehousing, Delivery Services)",
        "Education & Training Services (Corporate Training, Workshops, e-Learning)",
        "Health & Medical Supplies (Pharmaceuticals, Hospital Equipment)",
        "Cleaning & Waste Management (Pest Control, Janitorial Services)",
        "Marketing & Advertising (Digital Marketing, Billboards, Branding)",
        "Event Management & Catering (Corporate Events, Food Supply)",
        "IT & Software Solutions (Web Development, ERP Systems, Cybersecurity)",
        "Legal & Financial Services (Consulting, Auditing, Insurance)",
        "Manufacturing & Industrial Supplies (Raw Materials, Machinery)",
        "Energy & Utilities (Solar Panels, Generators, Electrical Work)",
        "Automotive & Fleet Services (Vehicle Leasing, Maintenance, Spare Parts)",
        "Agriculture & Farming (Fertilizers, Equipment, Irrigation)",
        "Interior Design & Furniture (Office Furniture, Home Decor)",
        "Media & Entertainment (Photography, Video Production, PR)"
      ]
    },
    { 
      name: "City", 
      values: [
        "Islamabad", "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Peshawar", 
        "Quetta", "Multan", "Hyderabad", "Sialkot", "Gujranwala", "Bahawalpur", 
        "Sargodha", "Sukkur", "Mardan", "Abbottabad", "Mirpur", "Larkana", "Gujrat"
      ]
    },
    { name: "Published", values: ["Last 24 Hours", "Last 7 Days", "Last 30 Days"] },
    { name: "Status", values: ["Open", "Closed", "Under Review"] },
  ];
  

  const solicitations = [
    {
      title: "Small Animal ICU Unit/Oxygen Cages",
      location: "Louisiana",
      publishedDate: "01/14/2025",
      closingDate: "01/28/2025",
    },
    {
      title: "Small Animal ICU Unit/Oxygen Cages",
      location: "Louisiana",
      publishedDate: "01/14/2025",
      closingDate: "01/28/2025",
    },
    {
      title: "Small Animal ICU Unit/Oxygen Cages",
      location: "Louisiana",
      publishedDate: "01/14/2025",
      closingDate: "01/28/2025",
    },
    {
      title: "Small Animal ICU Unit/Oxygen Cages",
      location: "Louisiana",
      publishedDate: "01/14/2025",
      closingDate: "01/28/2025",
    },
    {
      title: "Small Animal ICU Unit/Oxygen Cages",
      location: "Louisiana",
      publishedDate: "01/14/2025",
      closingDate: "01/28/2025",
    },
    {
      title: "Avondale Learning Center – Multipurpose Room Addition",
      location: "Michigan",
      publishedDate: "01/14/2025",
      closingDate: "01/28/2025",
    },
    // Add more entries as needed...
  ];

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 mt-4">
          <div className="container text-center mt-5 mb-4">
            <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
              {/* Breadcrumb */}
              <Typography variant="body2" sx={{ mb: 2 }}>
                <a href="/">Home</a> / Bid Search
              </Typography>

              {/* Title */}
              <Typography variant="h4" sx={{ mb: 3 }}>
                Open Solicitations
              </Typography>

              {/* Search and Filters */}
              <Stack
                direction="row"
                spacing={2}
              >
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Search by Keywords or Bid Title"
                  sx={{
                    flex: "1 1 auto",
                    minWidth: "300px",
                    "& .MuiInputBase-input": { color: "black" },
                  }}
                />
                {dropdownConfig.map((dropdown, index) => (
                 <FormControl fullWidth size="small" key={index}>
                 <InputLabel id={`dropdown-label-${index}`} sx={{ color: "black" }}>
                   {dropdown.name}
                 </InputLabel>
                 <Select
                   labelId={`dropdown-label-${index}`}
                   id={`dropdown-${index}`}
                   label={dropdown.name} // Ensure the label is applied here
                   sx={{
                     color: "black",
                     "& .MuiSelect-icon": { color: "black" },
                   }}
                 >
                   {dropdown.values.map((value, i) => (
                     <MenuItem key={i} value={value}>
                       {value}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
               
                ))}
                <Button
                  variant="contained"
                  sx={{
                    flex: "1 1 auto",
                    minWidth: "150px",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  Search
                </Button>
              </Stack>

              {/* Results */}
              <Typography variant="body1" sx={{ mb: 1 }}>
                6 results
              </Typography>

              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  p: 2,
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">Order By</Typography>
                <Select
                  defaultValue="Publication Date (Newest)"
                  sx={{ color: "black", backgroundColor: "white", borderColor: "#fff" }}
                >
                  <MenuItem value="Publication Date (Newest)">
                    Publication Date (Newest)
                  </MenuItem>
                  <MenuItem value="Publication Date (Oldest)">
                    Publication Date (Oldest)
                  </MenuItem>
                </Select>
              </Box>

              <Paper>
                {solicitations.map((solicitation, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          {solicitation.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {solicitation.location}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.primary">
                          Published: {solicitation.publishedDate}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          Closing: {solicitation.closingDate}
                        </Typography>
                      </Box>
                    </Box>
                    {index !== solicitations.length - 1 && <Divider />}
                  </Box>
                ))}
              </Paper>
            </Box>
            <div />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default OpenSolicitations;
