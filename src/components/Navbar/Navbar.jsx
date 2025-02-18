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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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

  const pages = [
    { title: "Bid Search", path: "/bid-search" },
    { title: "Participating Agencies", path: "/participanting-agencies" },
    { title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact-us" },
    { title: "Why Bidnest ?", path: "/why-bidnest" },

  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden"}}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
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

            {/* Mobile Menu Icon */}
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

              {/* Mobile Menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
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

            {/* Navbar links for desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ title, path }) => (
                <Button
                  key={title}
                  sx={{
                    my: 2,
                    color: theme.palette.text.primary,
                    display: "block",
                  }}
                  onClick={() => navigate(path)}
                >
                  {title}
                </Button>
              ))}
            </Box>

            {/* User Profile Section */}
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  {/* Profile Avatar and Name */}
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.text.secondary,
                      width: 40,
                      height: 40,
                      mr: 1,
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

                  {/* Logout Button */}
                  <Button
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
                  {/* Login & SignUp Buttons */}
                  <Button
                    sx={{
                      mx: 1,
                      border: 1,
                      borderColor: theme.palette.primary.main,
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

            {/* Auth Modal */}
            <AuthModal
              open={modalOpen}
              handleClose={handleCloseModal}
              type={modalType}
              navigate={navigate}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
