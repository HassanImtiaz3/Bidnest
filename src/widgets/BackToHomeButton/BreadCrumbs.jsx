import React from "react";
import { Container, Link, Breadcrumbs, Typography } from "@mui/material";

const Bread = ({ name }) => {
  return (
    <Container sx={{ my: 2 }}>
      <Breadcrumbs
        separator="|"
        aria-label="breadcrumb"
        sx={{ color: "#673de6" }}
      >
        <Link
          underline="hover"
          color="inherit"
          href="/"
          sx={{ opacity: 0.6, fontWeight: 500, color: "black" }}
        >
          Home
        </Link>
        <Typography
          color="inherit"
          sx={{ fontWeight: "bold", color: "#673de6" }}
        >
          {name}
        </Typography>
      </Breadcrumbs>
    </Container>
  );
};

export default Bread;

