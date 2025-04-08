import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { sendEmail } from "../../services/Contact";
import { useState } from "react";
import Bread from "../../widgets/BackToHomeButton/BreadCrumbs.jsx";

import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { MailOutline, LocationOn, Phone } from "@mui/icons-material";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("Sending...");

    const response = await sendEmail(formData); // Call the separate function
    setResponseMsg(response.message);
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Bread name="Contact Us" />;

      
        <div className="flex-grow-1">
       
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: { xs: 2, sm: 4 }, // Adjust padding for smaller screens
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }} // Stack items vertically on xs and horizontally on md and larger
              spacing={4}
              sx={{
                width: "100%",
                maxWidth: "1200px", // Max width for large screens
                height: "auto", // Allow content to grow naturally
                padding: { xs: 2, md: 4 }, // Adjust padding for responsiveness
                boxSizing: "border-box",
              }}
            >
              {/* Left Column */}
              <Box
                sx={{
                  flex: 1,
                  padding: { xs: 2, md: 3 }, // Adjust padding for smaller screens
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  height: "auto", // Allow content to grow naturally
                }}
              >
                {/* Contact Us Header */}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: (theme) => theme.palette.primary.main,
                    marginBottom: 2,
                    fontSize: { xs: "1.2rem" },
                  }}
                >
                  Contact Us
                </Typography>

                {/* Get in Touch with Us */}
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.3rem" },
                    fontWeight: "1000",
                    marginBottom: 3,
                  }}
                >
                  Get in Touch with Us
                </Typography>

                {/* Paragraph */}
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: 3,
                    color: "grey",
                    textAlign: "justify",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  We would love to hear from you! Whether you have a question,
                  feedback, or just want to say hello, feel free to reach out.
                  Have questions or need assistance? We're here to help! Reach
                  out to us using the details below.
                </Typography>

                {/* Email Contact Section */}

                <Stack spacing={3}>
                  {/* Office Address */}
                  <Stack direction="row" spacing={3} alignItems="center">
                    <IconButton
                      sx={{
                        backgroundColor: "#E5E4E2",
                        borderRadius: "10%",
                        padding: 2,
                      }}
                    >
                      <LocationOn
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: 30,
                        }}
                      />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "1000" }}>
                        Office Address:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 0.5, color: "grey" }}
                      >
                        173 E block Lahore, Pakistan
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Phone */}
                  <Stack direction="row" spacing={3} alignItems="center">
                    <IconButton
                      sx={{
                        backgroundColor: "#E5E4E2",
                        borderRadius: "10%",
                        padding: 2,
                      }}
                    >
                      <Phone
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: 30,
                        }}
                      />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "1000" }}>
                        Phone:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 0.5, color: "grey" }}
                      >
                        +92 3324421885
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Email */}
                  <Stack direction="row" spacing={3} alignItems="center">
                    <IconButton
                      sx={{
                        backgroundColor: "#E5E4E2",
                        borderRadius: "10%",
                        padding: 2,
                      }}
                    >
                      <MailOutline
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: 30,
                        }}
                      />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "1000" }}>
                        Email:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 0.5, color: "grey" }}
                      >
                        bidnest2@gmail.com
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              {/* Right Column with Contact Form */}
              <Box
                sx={{
                  flex: 1,
                  padding: { md: 1 }, // Adjust padding for smaller screens
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "auto",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 450,
                    boxShadow: 1,
                    padding: { xs: 0, md: 5, xl: 5 },
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <CardContent>
                      {/* Form */}
                      <Stack spacing={2}>
                        {/* Name */}
                        <TextField
                          label="Name"
                          name="name"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.name}
                          onChange={handleChange}
                          sx={{
                            borderRadius: 2,
                            "& .MuiInputBase-root": {
                              backgroundColor: "transparent",
                              color: "text.primary",
                            },
                            "& .MuiInputLabel-root": {
                              color: "text.primary",
                            },
                          }}
                        />

                        {/* Email */}
                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.email}
                          onChange={handleChange}
                          sx={{
                            borderRadius: 2,
                            "& .MuiInputBase-root": {
                              backgroundColor: "transparent",
                              color: "text.primary",
                            },
                            "& .MuiInputLabel-root": {
                              color: "text.primary",
                            },
                          }}
                        />

                        {/* Phone Number */}
                        <TextField
                          label="Phone Number"
                          name="phone"
                          type="text"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          sx={{
                            borderRadius: 2,
                            "& .MuiInputBase-root": {
                              backgroundColor: "transparent",
                              color: "text.primary",
                            },
                            "& .MuiInputLabel-root": {
                              color: "text.primary",
                            },
                          }}
                        />

                        {/* Message */}
                        <TextField
                          label="Message"
                          name="message"
                          variant="outlined"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          value={formData.message}
                          onChange={handleChange}
                          sx={{
                            borderRadius: 2,
                            "& .MuiInputBase-root": {
                              backgroundColor: "transparent",
                              color: "text.primary",
                            },
                            "& .MuiInputLabel-root": {
                              color: "text.primary",
                            },
                          }}
                        />

                        {/* Send Message Button */}
                        <Button
                        className='buttonDesign'
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            marginTop: 4,
                            padding: 1.5,
                            borderRadius: 3,
                          }}
                        >
                          Send Message
                        </Button>
                      </Stack>
                    </CardContent>

                    {responseMsg && <p>{responseMsg}</p>}
                  </form>
                </Card>
              </Box>
            </Stack>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ContactUs;
