import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  Stack,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./UserDashboard.css";
import ProposalService from "../../services/proposalService";

const UserDashboard = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.uuid) throw new Error("User not authenticated");

        const response = await ProposalService.getProposals(user.uuid);
        setProposals(response.proposals || []);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDownloadProposal = (proposal) => {
    import("jspdf")
      .then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.text(`Proposal from ${proposal.vendorCompany}`, 10, 10);
        doc.text(`Product Name: ${proposal.productName}`, 10, 20);
        doc.text(`Total Price: $${proposal.totalPrice}`, 10, 30);
        doc.text(`Description: ${proposal.description}`, 10, 40);
        doc.save(
          `Proposal_${proposal.vendorCompany}_${proposal.productName}.pdf`
        );
      })
      .catch((err) => {
        console.error("Failed to generate PDF:", err);
      });
  };

  const handleAcceptProposal = (proposal) => {
    setSelectedProposal(proposal);
    setOpenAcceptDialog(true);
  };

  const handleRejectProposal = (proposal) => {
    setSelectedProposal(proposal);
    setOpenRejectDialog(true);
  };

  const handlePreviewProposal = (proposal) => {
    setSelectedProposal(proposal);
    setOpenPreviewModal(true);
  };

  const handleClosePreview = () => {
    setOpenPreviewModal(false);
    setSelectedProposal(null);
  };

  const handleCloseDialog = () => {
    setOpenRejectDialog(false);
    setOpenAcceptDialog(false);
    setSelectedProposal(null);
  };

  const handleConfirmReject = async () => {
    try {
      if (!selectedProposal) return;
      await ProposalService.updateProposalStatus(
        selectedProposal._id,
        "rejected"
      );
      setProposals((prev) =>
        prev.map((p) =>
          p._id === selectedProposal._id ? { ...p, approval: "rejected" } : p
        )
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to reject proposal:", error);
    }
  };

  const handleConfirmAccept = async () => {
    try {
      if (!selectedProposal) return;
      await ProposalService.updateProposalStatus(
        selectedProposal._id,
        "ready_for_financial_round"
      );
      setProposals((prev) =>
        prev.map((p) =>
          p._id === selectedProposal._id
            ? { ...p, approval: "ready_for_financial_round" }
            : p
        )
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to accept proposal:", error);
    }
  };

  const handleResetStatus = async (proposal) => {
    try {
      await ProposalService.updateProposalStatus(proposal._id, "pending");
      setProposals((prev) =>
        prev.map((p) =>
          p._id === proposal._id ? { ...p, approval: "pending" } : p
        )
      );
    } catch (error) {
      console.error("Failed to reset status:", error);
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
          User Dashboard
        </Typography>

        <TableContainer component={Paper} className="company-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="company-table-head">
                  Company Name
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Product Name
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Status
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.length > 0 ? (
                proposals.map((proposal) => (
                  <TableRow key={proposal._id} className="company-row">
                    <TableCell align="center">
                      {proposal.vendorCompany}
                    </TableCell>
                    <TableCell align="center">
                      {proposal.productName || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <span
                        className={`status-badge ${proposal.approval.toLowerCase()}`}
                      >
                        {proposal.approval === "ready_for_financial_round"
                          ? "Ready Financial Round"
                          : proposal.approval}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction={isSmallScreen ? "column" : "row"}
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleDownloadProposal(proposal)}
                          className="proposal-button download-btn"
                        >
                          Download
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleAcceptProposal(proposal)}
                          className="proposal-button accept-btn"
                          disabled={proposal.approval === "approved"}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleRejectProposal(proposal)}
                          className="proposal-button reject-btn"
                          disabled={proposal.approval === "rejected"}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handlePreviewProposal(proposal)}
                          className="proposal-button preview-btn"
                        >
                          Preview
                        </Button>
                        {(proposal.approval === "approved" ||
                          proposal.approval === "rejected") && (
                          <IconButton
                            color="error"
                            onClick={() => handleResetStatus(proposal)}
                          >
                            <CloseIcon />
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No proposals found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Accept Confirmation Dialog */}
      <Dialog open={openAcceptDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Acceptance</DialogTitle>
        <DialogContent>
          Are you sure you want to accept the proposal from{" "}
          {selectedProposal?.vendorCompany}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmAccept}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={openRejectDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Rejection</DialogTitle>
        <DialogContent>
          Are you sure you want to reject the proposal from{" "}
          {selectedProposal?.vendorCompany}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmReject}
            color="error"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Modal */}
      <Dialog
        open={openPreviewModal}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Proposal Details</DialogTitle>
        <DialogContent>
          {selectedProposal && (
            <div>
              <Typography variant="h6" gutterBottom>
                Bid Information
              </Typography>
              <Typography>
                <strong>Posting Title:</strong> {selectedProposal.postingTitle}
              </Typography>
              <Typography>
                <strong>Vendor Company:</strong>{" "}
                {selectedProposal.vendorCompany}
              </Typography>
              <Typography>
                <strong>Product Name:</strong> {selectedProposal.productName}
              </Typography>
              {/* <Typography><strong>Total Price:</strong> ${selectedProposal.totalPrice}</Typography> */}
              <Typography>
                <strong>Description:</strong> {selectedProposal.description}
              </Typography>

              <br />

              {/* Device Specification */}
              <Typography variant="h6" gutterBottom>
                Device Specification
              </Typography>
              <Typography>
                <strong>Device Type:</strong>{" "}
                {selectedProposal.category || "N/A"}
              </Typography>
              <Typography>
                <strong>Device Model:</strong>{" "}
                {selectedProposal.modelNumber || "N/A"}
              </Typography>
              <Typography>
                <strong>Color:</strong> {selectedProposal.color || "N/A"}
              </Typography>
              <Typography>
                <strong>Size:</strong> {selectedProposal.size || "N/A"}
              </Typography>
              <Typography>
                <strong>Weight:</strong> {selectedProposal.weight || "N/A"}
              </Typography>
              {/* Add more fields here if your device specification includes more */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default UserDashboard;
