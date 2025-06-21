import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./VendorStatusDashboard.css";
import ProposalService from "../../services/proposalService";

const VendorStatusDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [openFinancialModal, setOpenFinancialModal] = useState(false);
  const [selectedFinancialProposal, setSelectedFinancialProposal] =
    useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [financialForm, setFinancialForm] = useState({
    postingTitle: "",
    bidDate: "",
    offerPrice: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.uuid) {
          throw new Error("Vendor UUID not found in user data");
        }

        setUser(storedUser); // ✅ store full user

        const vendorId = storedUser.uuid;
        const response = await ProposalService.getProposalsForVendor(vendorId);
        setProposals(response.proposals || []);
      } catch (err) {
        console.error("Error fetching proposals:", err);
        setError(err.message || "Failed to fetch proposals");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "failure";
      case "pending":
        return "pending";
      case "ready_for_financial_round":
        return "inprocess"; // or create a new class if needed
      default:
        return "inprocess";
    }
  };

  const getDisplayStatus = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      case "ready_for_financial_round":
        return "Ready for Financial";
      default:
        return status;
    }
  };

  const handleOpenFinancialModal = (proposal) => {
    setSelectedFinancialProposal(proposal);
    setFinancialForm({
      postingTitle: proposal.postingTitle || "",
      bidDate: proposal.bidDate
        ? new Date(proposal.bidDate).toISOString().split("T")[0]
        : "",
      offerPrice: proposal.offerPrice || "",
      quantity: proposal.quantity || "",
      unitPrice: proposal.unitPrice || "",
      totalPrice: proposal.totalPrice || "",
    });
    setOpenFinancialModal(true);
  };

  const handleCloseFinancialModal = () => {
    setSelectedFinancialProposal(null);
    setOpenFinancialModal(false);
  };

  const handleOpenModal = (proposal) => {
    setSelectedProposal(proposal);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProposal(null);
    setOpenModal(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleFinancialInputChange = (e) => {
    const { name, value } = e.target;
    setFinancialForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "quantity" || name === "unitPrice") {
      const quantity = name === "quantity" ? value : financialForm.quantity;
      const unitPrice = name === "unitPrice" ? value : financialForm.unitPrice;

      if (quantity && unitPrice) {
        const total = parseFloat(quantity) * parseFloat(unitPrice);
        setFinancialForm((prev) => ({
          ...prev,
          totalPrice: isNaN(total) ? "" : total.toString(),
        }));
      }
    }
  };

  const validateFinancialForm = () => {
    const requiredFields = [
      "postingTitle",
      "bidDate",
      "offerPrice",
      "quantity",
      "unitPrice",
    ];
    return requiredFields.every(
      (field) =>
        financialForm[field] && financialForm[field].toString().trim() !== ""
    );
  };

  const handleSubmitFinancial = async () => {
    if (!validateFinancialForm()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.uuid) {
        throw new Error("Vendor UUID not found in user data");
      }

      if (!selectedFinancialProposal?.postId) {
        throw new Error("Original post ID not found");
      }

      // Create the financial proposal payload similar to VendorDashboard's approach
      const financialProposal = {
        // Vendor details from the original proposal
        vendorName: selectedFinancialProposal.vendorName || "",
        vendorCompany: selectedFinancialProposal.vendorCompany || "",
        vendorPhone: selectedFinancialProposal.vendorPhone || "",
        vendorEmail: selectedFinancialProposal.vendorEmail || "",
        vendorAddress: selectedFinancialProposal.vendorAddress || "",

        // Financial information from the form
        postingTitle: financialForm.postingTitle,
        bidDate: financialForm.bidDate,
        offerPrice: financialForm.offerPrice,
        quantity: financialForm.quantity,
        unitPrice: financialForm.unitPrice,
        totalPrice: financialForm.totalPrice,

        // Product details from the original proposal
        productName: selectedFinancialProposal.productName || "",
        description: selectedFinancialProposal.description || "",
        modelNumber: selectedFinancialProposal.modelNumber || "",
        color: selectedFinancialProposal.color || "",
        size: selectedFinancialProposal.size || "",
        weight: selectedFinancialProposal.weight || "",
        warranty: selectedFinancialProposal.warranty || "",
        deliveryTime: selectedFinancialProposal.deliveryTime || "",

        // System fields
        approval: "pending_financial",
        isFinancialProposal: true,
        originalProposalId: selectedFinancialProposal._id,
        postId: selectedFinancialProposal.postId,
        vendorId: user.uuid,
        category: selectedFinancialProposal.category,
        userId: selectedFinancialProposal.userId,
      };

      // Submit as a new proposal
      const result = await ProposalService.updateProposal(
        selectedFinancialProposal._id,
        financialProposal
      );
      // await ProposalService.updateProposalStatus(proposals._id, "pending");

      setSnackbar({
        open: true,
        message: "Financial proposal submitted successfully!",
        severity: "success",
      });

      // Refresh proposals
      const response = await ProposalService.getProposalsForVendor(user.uuid);
      setProposals(response.proposals || []);

      handleCloseFinancialModal();
    } catch (error) {
      console.error("Failed to submit financial proposal:", error);
      setSnackbar({
        open: true,
        message: `Failed to submit financial proposal: ${
          error.message || "Unknown error"
        }`,
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ my: 5, textAlign: "center" }}>
          <CircularProgress />
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ my: 5, textAlign: "center" }}>
          <Typography color="error">{error}</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h4" className="user-dashboard-title">
          Vendor Status Dashboard
        </Typography>

        <TableContainer component={Paper} className="company-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="company-table-head">
                  Company Name
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Description
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Product Name
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Category
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Status
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Bid Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.length > 0 ? (
                proposals
                  // .filter(
                  //   (proposal) =>
                  //     proposal.approval?.toLowerCase() !==
                  //     "ready_for_financial_round"
                  // )
                  .map((proposal) => (
                    <TableRow key={proposal._id} className="company-row">
                      <TableCell className="company-name-cell" align="center">
                        {proposal.vendorCompany || proposal.vendorName || "N/A"}
                      </TableCell>
                      <TableCell className="company-name-cell" align="center">
                        {user.description || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {proposal.productName || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {proposal.category || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            className={`status-badge ${getStatusBadgeClass(
                              proposal.approval
                            )}`}
                          >
                            {getDisplayStatus(proposal.approval)}
                          </span>

                          {proposal.approval?.toLowerCase() ===
                            "ready_for_financial_round" && (
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: "#1976d2",
                                textTransform: "none",
                              }}
                              onClick={() => handleOpenFinancialModal(proposal)}
                            >
                              Financial Round
                            </Button>
                          )}
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <button
                          className="bid-detail-btn"
                          onClick={() => handleOpenModal(proposal)}
                        >
                          Bid Detail
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No proposals found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Bid Detail Dialog */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="dialog-title">
          Bid Detail
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedProposal && (
            <>
              {selectedProposal?.approval?.toLowerCase() !== "pending" && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Bid Information
                  </Typography>
                  <Table size="small" sx={{ mb: 3 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Posting Title</TableCell>
                        <TableCell>Last Date</TableCell>
                        <TableCell>Offer Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {selectedProposal.postingTitle || "N/A"}
                        </TableCell>
                        <TableCell>
                          {selectedProposal.bidDate
                            ? new Date(selectedProposal.bidDate)
                                .toISOString()
                                .split("T")[0]
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {selectedProposal.offerPrice || "N/A"}
                        </TableCell>
                        <TableCell>
                          {selectedProposal.quantity || "N/A"}
                        </TableCell>
                        <TableCell>
                          {selectedProposal.unitPrice || "N/A"}
                        </TableCell>
                        <TableCell>
                          {selectedProposal.totalPrice || "N/A"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              )}

              <Typography variant="h6" gutterBottom>
                Device Specification
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Model Number</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Warranty Info</TableCell>
                    <TableCell>Delivery Time Frame</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {selectedProposal.productName || "N/A"}
                    </TableCell>
                    <TableCell>
                      {selectedProposal.description || "N/A"}
                    </TableCell>
                    <TableCell>
                      {selectedProposal.modelNumber || "N/A"}
                    </TableCell>
                    <TableCell>{selectedProposal.color || "N/A"}</TableCell>
                    <TableCell>{selectedProposal.size || "N/A"}</TableCell>
                    <TableCell>{selectedProposal.weight || "N/A"}</TableCell>
                    <TableCell>{selectedProposal.warranty || "N/A"}</TableCell>
                    <TableCell>
                      {selectedProposal.deliveryTime || "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            sx={{
              backgroundColor: "#6a1b9a",
              color: "white",
              "&:hover": {
                backgroundColor: "#4a148c",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Financial Round Dialog */}
      <Dialog
        open={openFinancialModal}
        onClose={handleCloseFinancialModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="dialog-title">
          Financial Round
          <IconButton
            onClick={handleCloseFinancialModal}
            sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Vendor Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                label="Vendor Name"
                value={selectedFinancialProposal?.vendorName || ""}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                label="Vendor Company Name"
                value={selectedFinancialProposal?.vendorCompany || ""}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                label="Vendor Phone Number"
                value={selectedFinancialProposal?.vendorPhone || ""}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                label="Email"
                value={selectedFinancialProposal?.vendorEmail || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                required
                label="Vendor Address"
                value={selectedFinancialProposal?.vendorAddress || ""}
                disabled
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom mt={4}>
            Financial Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                name="postingTitle"
                label="Posting Title"
                value={financialForm.postingTitle}
                onChange={handleFinancialInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                name="bidDate"
                label="Last Date (YYYY-MM-DD)"
                value={financialForm.bidDate}
                onChange={handleFinancialInputChange}
                placeholder="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                required
                name="offerPrice"
                label="Offer Price"
                value={financialForm.offerPrice}
                onChange={handleFinancialInputChange}
                type="number"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                required
                name="quantity"
                label="Quantity"
                value={financialForm.quantity}
                onChange={handleFinancialInputChange}
                type="number"
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                required
                name="unitPrice"
                label="Unit Price"
                value={financialForm.unitPrice}
                onChange={handleFinancialInputChange}
                type="number"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                required
                name="totalPrice"
                label="Total Price"
                value={financialForm.totalPrice}
                onChange={handleFinancialInputChange}
                type="number"
                disabled
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFinancialModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitFinancial}
            variant="contained"
            color="primary"
            disabled={!validateFinancialForm()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default VendorStatusDashboard;
