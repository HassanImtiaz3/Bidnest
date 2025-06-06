import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  Stack,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  Person,
  Fingerprint,
  ArrowBack,
  Save,
  MoreVert,
  ThumbUp,
  ThumbDown,
  PendingActions,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

export function UserDetailCard({ user, mode, onBack, onSave }) {
  const [formData, setFormData] = useState({ ...user });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  const handleMenuOpen = (event, post) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedPost) return;

    // Update the post status in the formData
    const updatedPosts = formData.posts.map((post) =>
      post._id === selectedPost._id ? { ...post, approval: newStatus } : post
    );

    setFormData({ ...formData, posts: updatedPosts });
    handleMenuClose();

    // In a real app, you would call an API to save this change
    console.log(`Changed status of post ${selectedPost._id} to ${newStatus}`);
  };

  const getStatusChip = (status) => {
    const statusMap = {
      approved: { color: "success", icon: <ThumbUp fontSize="small" /> },
      rejected: { color: "error", icon: <ThumbDown fontSize="small" /> },
      pending: { color: "warning", icon: <PendingActions fontSize="small" /> },
    };

    const config = statusMap[status] || statusMap.pending;

    return (
      <Chip
        label={status}
        size="small"
        color={config.color}
        icon={config.icon}
      />
    );
  };

  const renderField = (label, value, fieldName, icon = null) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <Typography>
        <strong>{label}:</strong> {value || "N/A"}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
          {user.firstName?.charAt(0)}
          {user.lastName?.charAt(0)}
        </Avatar>
        <Typography variant="h4" fontWeight="bold">
          {mode === "edit"
            ? "Edit User Details"
            : `${user.firstName} ${user.lastName}`}
        </Typography>
        <Chip
          label={user.role || "user"}
          color={user.role === "admin" ? "secondary" : "default"}
          sx={{ ml: "auto" }}
        />
      </Stack>

      {/* Personal Info Card */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Person color="primary" /> Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {renderField(
                    "First Name",
                    user.firstName,
                    "firstName",
                    <Person fontSize="small" />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {renderField("Last Name", user.lastName, "lastName")}
                </Grid>
                <Grid item xs={12}>
                  {renderField(
                    "Email",
                    user.email,
                    "email",
                    <Email fontSize="small" />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {renderField(
                    "Phone",
                    user.phoneNumber,
                    "phoneNumber",
                    <Phone fontSize="small" />
                  )}
                </Grid>

                {mode !== "edit" && (
                  <Grid item xs={12}>
                    {renderField(
                      "User ID",
                      user.userId || user.uuid,
                      "userId",
                      <Fingerprint fontSize="small" />
                    )}
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Service Info Card */}
        {(user.serviceCategory || user.serviceSubCategory) && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Service Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {renderField(
                      "Service Category",
                      user.serviceCategory,
                      "serviceCategory"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {renderField(
                      "Service Sub-Category",
                      user.serviceSubCategory,
                      "serviceSubCategory"
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Posts Card */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6" fontWeight="bold">
                  User Posts
                </Typography>
                <Badge
                  badgeContent={user.posts?.length || 0}
                  color="primary"
                  sx={{ ml: 1 }}
                />
              </Stack>
              <Divider sx={{ mb: 2, mt: 1 }} />

              {user.posts?.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "action.hover" }}>
                      <TableRow>
                        <TableCell>
                          <strong>Product</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Company</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Contact</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Quantity</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Budget</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Deadline</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Category</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Location</strong>
                        </TableCell>
                        {/* <TableCell>
                          <strong>Status</strong>
                        </TableCell> */}
                        <TableCell>
                          <strong>Created</strong>
                        </TableCell>
                        {/* {mode === "edit" && (
                          <TableCell>
                            <strong>Actions</strong>
                          </TableCell>
                        )} */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.posts?.map((post) => (
                        <TableRow key={post._id} hover>
                          <TableCell>{post.productName}</TableCell>
                          <TableCell>{post.companyName}</TableCell>
                          <TableCell>{post.contactName}</TableCell>
                          <TableCell>{post.quantity}</TableCell>
                          <TableCell>${post.budget}</TableCell>
                          <TableCell>
                            ${post.totalBudget?.toLocaleString() || "0"}
                          </TableCell>
                          <TableCell>
                            {new Date(post.deadline).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{post.deliveryLocation}</TableCell>
                          {/* <TableCell>
                            {getStatusChip(post.approval || "pending")}
                          </TableCell> */}
                          <TableCell>
                            {new Date(post.created_at).toLocaleDateString()}
                          </TableCell>
                          {/* <TableCell>
                            {mode === "edit" && (
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, post)}
                              >
                                <MoreVert />
                              </IconButton>
                            )}
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    No posts found for this user.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Change Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange("approved")}>
          <ThumbUp color="success" sx={{ mr: 1 }} />
          Approve
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("rejected")}>
          <ThumbDown color="error" sx={{ mr: 1 }} />
          Reject
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("pending")}>
          <PendingActions color="warning" sx={{ mr: 1 }} />
          Set to Pending
        </MenuItem>
      </Menu>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button onClick={onBack} variant="outlined" startIcon={<ArrowBack />}>
          Back to Users
        </Button>
        {mode === "view" && (
          <Button
            onClick={handleSaveClick}
            variant="contained"
            color="primary"
            startIcon={<Save />}
          >
            Save Changes
          </Button>
        )}
      </Stack>
    </Box>
  );
}
