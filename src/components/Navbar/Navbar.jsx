import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import logo from "../../assets/bidnest.png";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../widgets/Modal/Modal";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [user, setUser] = React.useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(""); // 'login' or 'signup'

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    setSnackbarMessage("Logged out successfully!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const userRole = user?.role; // ✅ Corrected: now gets role from parsed user object

  const pages = [
    { title: "Bid Search", path: "/bid-search" },
    { title: "Participating Agencies", path: "/participanting-agencies" },
    { title: "About Bidnest", path: "/about-us" },
    { title: "Contact Us", path: "/contact-us" },
    { title: "Why Bidnest ?", path: "/why-bidnest" },
    ...(userRole === 'user' ? [{ title: "View All Posts", path: "/post" }] : []),
    ...(userRole === 'vendor' ? [{ title: "View All Posts For Bid", path: "/post" }] : []),
  ];

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map(({ title, path }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      navigate(path);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ title, path }) => {
                const isHighlighted =
                  title === "View All Posts" || title === "View All Posts For Bid";

                return (
                  <Button
                    key={title}
                    onClick={() => navigate(path)}
                    sx={{
                      my: 2,
                      display: "block",
                      bgcolor: isHighlighted ? "black" : "transparent",
                      color: isHighlighted ? "white" : theme.palette.text.primary,
                      fontWeight: isHighlighted ? "bold" : "normal",
                      "&:hover": {
                        bgcolor: isHighlighted ? "#333" : theme.palette.action.hover,
                      },
                    }}
                  >
                    {title}
                  </Button>
                );
              })}
            </Box>



            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.text.secondary,
                      width: 40,
                      height: 40,
                      mr: 3,
                    }}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      mr: 2,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {user.firstName.toUpperCase()}
                  </Typography>
                  <Button
                    className="buttonDesign"
                    variant="contained"
                    color="secondary"
                    sx={{
                      ml: 2,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.text.secondary,
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      mx: 1,
                      border: 1,
                      borderColor: theme.palette.primary,
                      backgroundColor: "transparent",
                      color: theme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.text.secondary,
                      },
                    }}
                    onClick={() => handleOpenModal("login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="buttonDesign"
                    sx={{
                      mx: 1,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={() => handleOpenModal("signup")}
                  >
                    SignUp
                  </Button>
                </>
              )}
            </Box>

            <AuthModal
              open={modalOpen}
              handleClose={handleCloseModal}
              type={modalType}
              navigate={navigate}
            />
          </Toolbar>
        </Container>
      </AppBar>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ResponsiveAppBar;
