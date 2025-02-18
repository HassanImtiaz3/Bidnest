import React from "react";
import { Button as MuiButton } from "@mui/material"; // Renaming to avoid conflict

export default function CustomButton(props) {
  return (
    <MuiButton
      variant="contained"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main, 
        color: (theme) => theme.palette.text.secondary, 
        padding: "10px 20px", 
        borderRadius: "8px", 
        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary, 
        },
      }}
    >
      {props.children} {/* This will render the passed text */}
    </MuiButton>
  );
}
