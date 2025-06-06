// AdminDashboard.jsx
import { Sidebar } from "./Sidebar";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import {UserDashboard} from "./UserDashboard";

export function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Toolbar />
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          User Management
        </Typography>
        <UserDashboard />
      </Box>
    </Box>
  );
}