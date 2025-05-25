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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
        // ... (keep your existing PDF generation code)
        doc.save(`Proposal_${proposal.vendorCompany}_${proposal.productName}.pdf`);
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
      
      await ProposalService.updateProposalStatus(selectedProposal._id, 'rejected');
      
      setProposals(proposals.map(p => 
        p._id === selectedProposal._id ? {...p, approval: 'rejected'} : p
      ));
      
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to reject proposal:", error);
    }
  };

  const handleConfirmAccept = async () => {
    try {
      if (!selectedProposal) return;
      
      await ProposalService.updateProposalStatus(selectedProposal._id, 'approved');
      
      setProposals(proposals.map(p => 
        p._id === selectedProposal._id ? {...p, approval: 'approved'} : p
      ));
      
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to accept proposal:", error);
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
                  Category
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
                    <TableCell className="company-name-cell" align="center">
                      {proposal.vendorCompany}
                    </TableCell>
                    <TableCell align="center">
                      {proposal.category || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <span className={`status-badge ${proposal.approval.toLowerCase()}`}>
                        {proposal.approval}
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
                          disabled={proposal.approval === 'approved'}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleRejectProposal(proposal)}
                          className="proposal-button reject-btn"
                          disabled={proposal.approval === 'rejected'}
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
          Are you sure you want to accept the proposal from {selectedProposal?.vendorCompany}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmAccept} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={openRejectDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Rejection</DialogTitle>
        <DialogContent>
          Are you sure you want to reject the proposal from {selectedProposal?.vendorCompany}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmReject} color="error" variant="contained">
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
              <Typography variant="h6">{selectedProposal.postingTitle}</Typography>
              <Typography>Product: {selectedProposal.productName}</Typography>
              <Typography>Vendor: {selectedProposal.vendorCompany}</Typography>
              <Typography>Price: ${selectedProposal.totalPrice}</Typography>
              <Typography>Description: {selectedProposal.description}</Typography>
              {/* Add more details as needed */}
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