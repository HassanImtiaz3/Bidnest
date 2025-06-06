// AdminDashboard.jsx
import { Sidebar } from "./Sidebar";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { VendorsDashboard } from "./VendorDashboard";

export function AdminVendorDashboard() {
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
          Vendor Management
        </Typography>
        <VendorsDashboard />
      </Box>
    </Box>
  );
}