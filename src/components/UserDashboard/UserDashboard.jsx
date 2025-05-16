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
  Grid,
  DialogActions,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./UserDashboard.css";
import ProposalService from "../../services/proposalService";

const UserDashboard = () => {
  const companies = [
    { companyName: "Tech Solutions Ltd." },
    { companyName: "Innovative Systems Inc." },
    { companyName: "Global Enterprises" },
  ];

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [companyToReject, setCompanyToReject] = useState("");
  const [companyToAccept, setCompanyToAccept] = useState("");
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const vendorDataRaw = localStorage.getItem("user");
        const vendorData = vendorDataRaw ? JSON.parse(vendorDataRaw) : null;
        const response = await ProposalService.getProposals(vendorData?.uuid);
        setProposals(response.proposals);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDownloadProposal = (proposal) => {
    // Import jsPDF dynamically (to avoid SSR issues)
    import("jspdf")
      .then(({ jsPDF }) => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text("Proposal Details", 105, 15, { align: "center" });

        // Add vendor information
        doc.setFontSize(12);
        doc.text(`Vendor: ${proposal.vendorName || "N/A"}`, 14, 25);
        doc.text(`Company: ${proposal.vendorCompany || "N/A"}`, 14, 35);

        // Add proposal details in two columns
        let y = 45;

        // Left column
        doc.text(`Posting Title: ${proposal.postingTitle || "N/A"}`, 14, y);
        doc.text(`Product Name: ${proposal.productName || "N/A"}`, 14, y + 10);
        doc.text(`Model Number: ${proposal.modelNumber || "N/A"}`, 14, y + 20);
        doc.text(`Quantity: ${proposal.quantity || "N/A"}`, 14, y + 30);
        doc.text(`Unit Price: ${proposal.unitPrice || "N/A"}`, 14, y + 40);

        // Right column
        doc.text(`Total Price: ${proposal.totalPrice || "N/A"}`, 105, y);
        doc.text(
          `Bid Date: ${
            proposal.bidDate
              ? new Date(proposal.bidDate).toLocaleString()
              : "N/A"
          }`,
          105,
          y + 10
        );
        doc.text(`Color: ${proposal.color || "N/A"}`, 105, y + 20);
        doc.text(`Size: ${proposal.size || "N/A"}`, 105, y + 30);
        doc.text(`Warranty: ${proposal.warranty || "N/A"}`, 105, y + 40);

        // Description (may span multiple pages)
        const description = proposal.description || "No description provided.";
        const splitDescription = doc.splitTextToSize(description, 180);
        doc.text("Description:", 14, y + 50);
        doc.text(splitDescription, 14, y + 60);

        // Vendor contact info
        doc.text(
          `Vendor Address: ${proposal.vendorAddress || "N/A"}`,
          14,
          y + 80
        );
        doc.text(`Vendor Phone: ${proposal.vendorPhone || "N/A"}`, 14, y + 90);
        doc.text(`Vendor Email: ${proposal.vendorEmail || "N/A"}`, 14, y + 100);

        // Save the PDF
        doc.save(
          `Proposal_${proposal.vendorCompany}_${proposal.productName}.pdf`
        );
      })
      .catch((err) => {
        console.error("Failed to generate PDF:", err);
      });
  };

  const handleAcceptProposal = (companyName) => {
    setCompanyToAccept(companyName);
    setOpenAcceptDialog(true);
  };

  const handleRejectProposal = (companyName) => {
    setCompanyToReject(companyName);
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
    setCompanyToReject("");
    setCompanyToAccept("");
  };

  const handleConfirmReject = () => {
    console.log(
      `Proposal for ${companyToReject} has been rejected permanently.`
    );
    handleCloseDialog();
  };

  const handleConfirmAccept = () => {
    console.log(`Proposal for ${companyToAccept} has been accepted.`);
    handleCloseDialog();
  };

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
                  Proposal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal, index) => (
                <TableRow key={index} className="company-row">
                  <TableCell className="company-name-cell">
                    {proposal.vendorCompany}
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
                        onClick={() =>
                          handleAcceptProposal(proposal.companyName)
                        }
                        className="proposal-button accept-btn"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleRejectProposal(proposal.companyName)
                        }
                        className="proposal-button reject-btn"
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
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Reject Dialog */}
      <Dialog
        open={openRejectDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#f44336", color: "#fff" }}>
          Confirm Proposal Rejection
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ my: 3 }}>
            Are you sure you want to reject this proposal? This action is
            irreversible and the proposal will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#6a1b9a" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmReject}
            sx={{
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/* Accept Dialog */}
      <Dialog
        open={openAcceptDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#388e3c", color: "#fff" }}>
          Confirm Proposal Acceptance
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ my: 3 }}>
            Are you sure you want to accept this proposal? This will mark the
            proposal as officially accepted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#6a1b9a" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAccept}
            sx={{
              backgroundColor: "#388e3c",
              "&:hover": { backgroundColor: "#4caf50" },
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPreviewModal}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
          Proposal Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedProposal ? (
            <div>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Vendor: {selectedProposal.vendorName || "N/A"}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Company:</strong>{" "}
                    {selectedProposal.vendorCompany || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Posting Title:</strong>{" "}
                    {selectedProposal.postingTitle || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Product Name:</strong>{" "}
                    {selectedProposal.productName || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Model Number:</strong>{" "}
                    {selectedProposal.modelNumber || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Quantity:</strong>{" "}
                    {selectedProposal.quantity || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Unit Price:</strong>{" "}
                    {selectedProposal.unitPrice || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Total Price:</strong>{" "}
                    {selectedProposal.totalPrice || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Bid Date:</strong>{" "}
                    {selectedProposal.bidDate
                      ? new Date(selectedProposal.bidDate).toLocaleString()
                      : "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Color:</strong> {selectedProposal.color || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Size:</strong> {selectedProposal.size || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Warranty:</strong>{" "}
                    {selectedProposal.warranty || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Delivery Time:</strong>{" "}
                    {selectedProposal.deliveryTime || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Description:</strong>{" "}
                {selectedProposal.description || "No description provided."}
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Vendor Address:</strong>{" "}
                {selectedProposal.vendorAddress || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Vendor Phone:</strong>{" "}
                {selectedProposal.vendorPhone || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Vendor Email:</strong>{" "}
                {selectedProposal.vendorEmail || "N/A"}
              </Typography>
            </div>
          ) : (
            <Typography>Loading proposal...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} sx={{ color: "#6a1b9a" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default UserDashboard;
