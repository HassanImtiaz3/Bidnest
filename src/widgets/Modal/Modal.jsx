import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function AuthModal({ open, handleClose, type, navigate }) {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="auth-modal-title">
      <Box sx={style}>
        <Typography id="auth-modal-title" variant="h6" component="h2">
          {type === "login" ? "Login Options" : "Sign Up Options"}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {type === "login" ? (
            <>
              <Button
              className='buttonDesign'
                sx={{ mb: 2, width: "100%" }}
                variant="contained"
                onClick={() => navigate("/user/login")}
              >
                Login as User
              </Button>
              <Button
              className='buttonDesign'
                sx={{ width: "100%" }}
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Login as Vendor
              </Button>
            </>
          ) : (
            <>
              <Button
              className='buttonDesign'
                sx={{ mb: 2, width: "100%" }}
                variant="contained"
                onClick={() => navigate("/user")}
              >
                Sign Up as User
              </Button>
              <Button
              className='buttonDesign'
                sx={{ width: "100%" }}
                variant="outlined"
                onClick={() => navigate("/registration")}
              >
                Sign Up as Vendor
              </Button>
            </>
          )}
        </Box>
        <Button
          sx={{ mt: 2 }}
          variant="text"
          color="error"
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
