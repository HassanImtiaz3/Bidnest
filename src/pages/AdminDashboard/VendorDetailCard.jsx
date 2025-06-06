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
  Business,
  Work,
  Category,
  Fingerprint,
  Receipt,
  CheckCircle,
  Cancel,
  Schedule,
  ArrowBack,
  Save,
  Edit,
  LocationOn,
  MoreVert,
  ThumbUp,
  ThumbDown,
  PendingActions,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import ProposalService from "../../services/proposalService";

export function VendorDetailCard({ vendor, mode, onBack, onSave }) {
  const [formData, setFormData] = useState({ ...vendor });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    setFormData({ ...vendor });
  }, [vendor]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      // Filter only posts with an _id and changed status (optional)
      const updates = formData.proposals.map((proposal) => ({
        id: proposal._id,
        status: proposal.approval,
      }));

      // Call API for each post
      await Promise.all(
        updates.map(({ id, status }) =>
          ProposalService.updateProposalStatus(id, status)
        )
      );

      console.log("All statuses updated successfully.");
      onSave(formData); // Optional: Notify parent to refresh or close
    } catch (error) {
      console.error("Error saving changes:", error);
      // Optionally show user feedback here
    }
  };

  const handleMenuOpen = (event, proposal) => {
    setAnchorEl(event.currentTarget);
    setSelectedProposal(proposal);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProposal(null);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedProposal) return;

    // Update the proposal status in the formData
    const updatedProposals = formData.proposals.map((proposal) =>
      proposal._id === selectedProposal._id
        ? { ...proposal, approval: newStatus }
        : proposal
    );

    setFormData({ ...formData, proposals: updatedProposals });
    handleMenuClose();

    // In a real app, you would call an API to save this change
    console.log(
      `Changed status of proposal ${selectedProposal._id} to ${newStatus}`
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

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
          {vendor.firstName?.charAt(0)}
          {vendor.lastName?.charAt(0)}
        </Avatar>
        <Typography variant="h4" fontWeight="bold">
          {mode === "edit"
            ? "Edit Vendor Details"
            : `${vendor.firstName} ${vendor.lastName}`}
        </Typography>
        <Chip
          label={vendor.role || "vendor"}
          color={vendor.role === "admin" ? "secondary" : "default"}
          sx={{ ml: "auto" }}
        />
      </Stack>

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
                  vendor.firstName,
                  "firstName",
                  <Person fontSize="small" />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("Last Name", vendor.lastName, "lastName")}
              </Grid>
              <Grid item xs={12}>
                {renderField(
                  "Email",
                  vendor.email,
                  "email",
                  <Email fontSize="small" />
                )}
              </Grid>
              <Grid item xs={12}>
                {renderField(
                  "Phone",
                  vendor.phoneNumber,
                  "phoneNumber",
                  <Phone fontSize="small" />
                )}
              </Grid>
              <Grid item xs={12}>
                {renderField(
                  "Experience",
                  `${vendor.experience} years`,
                  "experience",
                  <Work fontSize="small" />
                )}
              </Grid>
              {mode !== "edit" && (
                <Grid item xs={12}>
                  {renderField(
                    "Vendor ID",
                    vendor.uuid,
                    "uuid",
                    <Fingerprint fontSize="small" />
                  )}
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Company Info Card */}
      <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ height: "100%" }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Business color="primary" /> Company Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                {renderField(
                  "Company Name",
                  vendor.company,
                  "company",
                  <Business fontSize="small" />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" />
                  <Typography>
                    <strong>City:</strong> {vendor.address?.city || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" />
                  <Typography>
                    <strong>State:</strong> {vendor.address?.state || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" />
                  <Typography>
                    <strong>Country:</strong> {vendor.address?.country || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" />
                  <Typography>
                    <strong>Zip Code:</strong>{" "}
                    {vendor.address?.zipCode || "N/A"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Proposals Card with Status Actions */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6" fontWeight="bold">
                Vendor Proposals
              </Typography>
              <Badge
                badgeContent={vendor.proposals?.length || 0}
                color="primary"
                sx={{ ml: 1 }}
              />
            </Stack>
            <Divider sx={{ mb: 2, mt: 1 }} />

            {vendor.proposals?.length > 0 ? (
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead sx={{ bgcolor: "action.hover" }}>
                    <TableRow>
                      <TableCell>
                        <strong>Post Title</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Product</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Bid Date</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Quantity</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Unit Price</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Total Price</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Category</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Status</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Created</strong>
                      </TableCell>
                      <TableCell>
                        <strong>User Id</strong>
                      </TableCell>
                      {mode === "edit" && (
                        <TableCell>
                          <strong>Actions</strong>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.proposals?.map((proposal) => (
                      <TableRow key={proposal._id} hover>
                        <TableCell>{proposal.postingTitle}</TableCell>
                        <TableCell>{proposal.productName}</TableCell>
                        <TableCell>
                          {new Date(proposal.bidDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{proposal.quantity}</TableCell>
                        <TableCell>${proposal.unitPrice}</TableCell>
                        <TableCell>${proposal.totalPrice}</TableCell>
                        <TableCell>{proposal.category}</TableCell>
                        <TableCell>
                          {getStatusChip(proposal.approval || "pending")}
                        </TableCell>
                        <TableCell>
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{proposal.userId}</TableCell>

                        {mode === "edit" && (
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuOpen(e, proposal)}
                            >
                              <MoreVert />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">
                  No proposals found for this vendor.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
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
        {mode === "edit" && (
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
