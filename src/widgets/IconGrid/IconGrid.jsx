import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";

const data = [
  { icon: <GavelIcon sx={{ fontSize: 50, color: "green" }} />, label: "Legal Framework" },
  { icon: <NotificationsActiveIcon sx={{ fontSize: 50, color: "green" }} />, label: "Circular / Notifications" },
  { icon: <BookIcon sx={{ fontSize: 50, color: "green" }} />, label: "Standing Instructions" },
  { icon: <ArticleIcon sx={{ fontSize: 50, color: "green" }} />, label: "Bidding Documents" },
  { icon: <DescriptionIcon sx={{ fontSize: 50, color: "green" }} />, label: "Tender Guidelines" },
  { icon: <AssignmentIcon sx={{ fontSize: 50, color: "green" }} />, label: "Tender Instructions" },
];

export default function IconGrid() {
  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        maxWidth: "900px", 
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid
            key={index}
            item
            xs={6} // 2 items per row on mobile (xs)
            sm={4} // 3 items per row on web (sm and up)
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: 0,
            }}
          >
            {item.icon}
            <Typography variant="body1" component="div" sx={{ mt: 4, mb: 4 }}>
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
