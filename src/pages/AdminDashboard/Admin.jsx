// src/pages/AdminDashboard/Admin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Typography,
  Box,
  CssBaseline,
  Container
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      setIsAuthenticated(true);
      navigate("/admin/dashboard");
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Card sx={{ width: '100%', mt: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
                  Admin Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  return null;
}