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
} from "@mui/material";
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

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.uuid) {
          throw new Error("Vendor UUID not found in user data");
        }

        const vendorId = user.uuid;
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
      default:
        return status;
    }
  };

  const handleOpenModal = (proposal) => {
    setSelectedProposal(proposal);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProposal(null);
    setOpenModal(false);
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
                proposals.map((proposal) => (
                  <TableRow key={proposal._id} className="company-row">
                    <TableCell className="company-name-cell" align="center">
                      {proposal.vendorCompany || proposal.vendorName || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {proposal.postingTitle || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {proposal.category || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <span
                        className={`status-badge ${getStatusBadgeClass(proposal.approval)}`}
                      >
                        {getDisplayStatus(proposal.approval)}
                      </span>
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



<Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
  <DialogTitle>Bid Detail</DialogTitle>
  <DialogContent dividers>
    {selectedProposal && (
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
              <TableCell>{selectedProposal.postingTitle || "N/A"}</TableCell>
              <TableCell>{selectedProposal.lastDate || "N/A"}</TableCell>
              <TableCell>{selectedProposal.offerPrice || "N/A"}</TableCell>
              <TableCell>{selectedProposal.quantity || "N/A"}</TableCell>
              <TableCell>{selectedProposal.unitPrice || "N/A"}</TableCell>
              <TableCell>{selectedProposal.totalPrice || "N/A"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

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
              <TableCell>{selectedProposal.productName || "N/A"}</TableCell>
              <TableCell>{selectedProposal.description || "N/A"}</TableCell>
              <TableCell>{selectedProposal.modelNumber || "N/A"}</TableCell>
              <TableCell>{selectedProposal.color || "N/A"}</TableCell>
              <TableCell>{selectedProposal.size || "N/A"}</TableCell>

              {(() => {
                const spec = selectedProposal.deviceSpecification || {};
                return (
                  <>
                    <TableCell>{spec.weight || "N/A"}</TableCell>
                    <TableCell>{spec.warrantyInfo || "N/A"}</TableCell>
                    <TableCell>{spec.deliveryTimeFrame || "N/A"}</TableCell>
                  </>
                );
              })()}
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


      <Footer />
    </>
  );
};

export default VendorStatusDashboard;
