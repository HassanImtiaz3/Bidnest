import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MDBContainer } from "mdb-react-ui-kit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validateField } from "../../utils/validation"; // Import validation function
import { submitUser } from "../../services/User";
import { useNavigate } from "react-router-dom";
import Back from "../../widgets/BackToHomeButton/Back";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        const [parent, child] = keys;
        return {
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });

    // Validate the field
    const error = validateField(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      const error = validateField(key, value, formData);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("[DEBUG] Submitting Form Data:", formData);
        const response = await submitUser(formData);
        console.log("[INFO] Registration Successful:", response);

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      } catch (err) {
        console.error("[ERROR] API Error:", err.message);
        setError("[ERROR] User Submission failed: " + err.message);
        setLoading(false);
      }
    } else {
      console.warn("[WARNING] Validation Failed:", newErrors);
      setLoading(false);
    }
  };

  return (
    <>
      <Back />
      <MDBContainer
        fluid
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
            height: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: 0,
            margin: 0,
          }}
        ></div>

        <Box
          sx={{
            maxWidth: "1200px",
            margin: "-150px auto 20px", // Center form and overlap the banner
            padding: "30px",
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              fontWeight: "bold",
            }}
          >
            User Registration Form
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{ marginBottom: 2 }}
          >
            {/* Personal Information Section */}
            <Stack flex={1} spacing={2}>
              <Typography variant="h6">
                <b>Personal Information</b>
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  label="First Name"
                  fullWidth
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#000000",
                    },
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Last Name"
                  size="small"
                  fullWidth
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#000000",
                    },
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  label="Phone Number"
                  fullWidth
                  required
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber}
                  type="tel"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#000000",
                    },
                  }}
                />
              </Stack>
            </Stack>

            <Stack flex={1} spacing={2}>
              <Typography variant="h6">
                <b>Connection Details</b>
              </Typography>
              <TextField
                size="small"
                label="Email"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                type="email"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#000000",
                  },
                }}
              />
              <TextField
                size="small"
                label="Password"
                fullWidth
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#000000",
                  },
                }}
              />
              <TextField
                size="small"
                label="Confirm Password"
                fullWidth
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#000000",
                  },
                }}
              />
            </Stack>
          </Stack>

          {error && <Typography color="error">{error}</Typography>}

          <Box textAlign="left">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                color: "white",
                backgroundColor: loading ? "purple" : "primary.main",
                "&:hover": {
                  backgroundColor: loading ? "purple" : "primary.main",
                },
                position: "relative",
                minHeight: "56px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1, // To space out loader and text
              }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    color="inherit"
                    size={24}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      marginLeft: "-12px",
                      marginTop: "-12px",
                    }}
                  />
                  <Typography variant="body1" sx={{ color: "white" }}>
                    Finalizing User Submission...
                  </Typography>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Box>
      </MDBContainer>
    </>
  );
};

export default RegistrationForm;
