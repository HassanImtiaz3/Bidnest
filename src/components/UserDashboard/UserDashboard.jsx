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
    import("jspdf")
      .then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Proposal Details", 105, 15, { align: "center" });
        doc.setFontSize(12);
        doc.text(`Vendor: ${proposal.vendorName || "N/A"}`, 14, 25);
        doc.text(`Company: ${proposal.vendorCompany || "N/A"}`, 14, 35);
        let y = 45;
        doc.text(`Posting Title: ${proposal.postingTitle || "N/A"}`, 14, y);
        doc.text(`Product Name: ${proposal.productName || "N/A"}`, 14, y + 10);
        doc.text(`Model Number: ${proposal.modelNumber || "N/A"}`, 14, y + 20);
        doc.text(`Quantity: ${proposal.quantity || "N/A"}`, 14, y + 30);
        doc.text(`Unit Price: ${proposal.unitPrice || "N/A"}`, 14, y + 40);
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
        const description = proposal.description || "No description provided.";
        const splitDescription = doc.splitTextToSize(description, 180);
        doc.text("Description:", 14, y + 50);
        doc.text(splitDescription, 14, y + 60);
        doc.text(
          `Vendor Address: ${proposal.vendorAddress || "N/A"}`,
          14,
          y + 80
        );
        doc.text(`Vendor Phone: ${proposal.vendorPhone || "N/A"}`, 14, y + 90);
        doc.text(`Vendor Email: ${proposal.vendorEmail || "N/A"}`, 14, y + 100);
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
                  
                  Detail/Category
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
                    {proposal.category || "N/A"}
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

      {/* Dialogs (Reject, Accept, Preview) remain unchanged */}

      <Footer />
    </>
  );
};

export default UserDashboard;
