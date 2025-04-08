import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';

const ResponsiveCard = () => {
  const cardData = [
    {
      title: "Sui Northern Gas Pipelines Limited, Lahore",
      description: "H.S.I. Core Supply of H.S.I Core LE-013/25",
    },
    {
      title: "DMS Software Support & Maintenance",
      description: "(Easy Document 5 SSGC/SC/PT/13684)",
    },
    {
      title: "INVITATION TO BID",
      description: "Invitation to bid for procurement of carpet and mattress for invitation to bid 11227",
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: 2, sm: 4, md: 6 },
        margin: "auto",
        overflowX: 'auto',
      }}
    >
      <Grid container spacing={3} wrap="nowrap" justifyContent="flex-start">
        {cardData.map((card, index) => (
          <Grid item key={index} sx={{ flex: '0 0 auto' }}>
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: 'white',
                borderRadius: 3,
                boxShadow: 3,
                width: 350,
                transition: (theme) => theme.transitions.create(['box-shadow', 'transform'], {
                  duration: theme.transitions.duration.standard,
                }),
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ padding: 4 }}> {/* Increased padding here */}
                <Stack spacing={2} alignItems="flex-start">
                  {/* Icon */}
                  <Box sx={{ color: 'inherit', fontSize: "40px" }}>
                    <FaCheckCircle />
                  </Box>

                  {/* Heading */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      textAlign: "left",
                      fontWeight: "500",
                    }}
                  >
                    {card.description}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResponsiveCard;
