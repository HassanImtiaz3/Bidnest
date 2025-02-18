import React from "react";
import { Button as MuiButton } from "@mui/material"; // Renaming to avoid conflict

export default function OutlineButton(props) {
  return (
    <MuiButton
      variant="outlined"
      sx={{
        width: "100%",
        padding: "10px 20px",
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      {props.children}
    </MuiButton>
  );
}
