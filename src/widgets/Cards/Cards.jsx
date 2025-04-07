import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa'; // Import React Icon

const ResponsiveCard = () => {
  const cardData = [
    {
      title: "Hassan Loru",
      description: "This is a description for card 1. It explains the content of this card.",
    },
    {
      title: "Card Title 2",
      description: "This is a description for card 2. It explains the content of this card.",
    },
    {
      title: "Card Title 3",
      description: "This is a description for sd card 3. It explains the content of this card.",
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: 2, sm: 4, md: 6 },
        // maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: 'white',
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                padding: { xs: 4, sm: 6 },
                maxWidth: "350px",
                margin: "auto",
              }}
            >
              <Stack spacing={2} alignItems="flex-start"> {/* Align items to the left */}
                {/* Icon */}
                <Box sx={{ color: "text.secondary", fontSize: "40px" }}>
                <FaCheckCircle /> {/* Force the checkmark to be white */}
                </Box>

                {/* Heading */}
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "1000", // Extra bold font weight
                    fontSize: { xs: "16px", sm: "18px", md: "20px" }, // Responsive font size
                }}
                >
                  {card.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    textAlign: "left", // Ensures description is left aligned
                    fontSize: { xs: "16px", sm: "18px", md: "18px" }, 
                    fontWeight: "500", 

                  }}
                >
                  {card.description}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResponsiveCard;
