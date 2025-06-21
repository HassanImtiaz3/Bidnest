import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

const TwoColumnWidget = ({ image, heading, paragraph, direction = "left", imageStyle = {} }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 6, md: 8 },
        maxWidth: "1500px",
        margin: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", md: direction === "left" ? "row" : "row-reverse" }}
        spacing={4}
        alignItems="center"
      >
        {/* Image Column */}
        <Box
          flex={1}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            component="img"
            src={image}
            alt="Visual Representation"
            sx={{
              width: "100%",
              maxWidth: "700px",
              borderRadius: "5%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              objectFit: "cover",
              ...imageStyle, // override or extend styling
            }}
          />
        </Box>

        {/* Text Column */}
        <Box flex={1}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "950",
              fontSize: { xs: "24px", sm: "32px", md: "40px" },
              mb: 2,
              color: "primary.main",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              textAlign: { xs: "center", md: "left" },
              fontWeight: "500",
              fontSize: { xs: "16px", sm: "18px", md: "18px" },
            }}
          >
            {paragraph}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

TwoColumnWidget.propTypes = {
  image: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right"]),
  imageStyle: PropTypes.object, // new prop
};

export default TwoColumnWidget;
