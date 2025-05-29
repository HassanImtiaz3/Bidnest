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
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./VendorStatusDashboard.css";
import ProposalService from "../../services/proposalService";

const VendorStatusDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                      {proposal.productName || "N/A"}
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
      <Footer />
    </>
  );
};

export default VendorStatusDashboard;
