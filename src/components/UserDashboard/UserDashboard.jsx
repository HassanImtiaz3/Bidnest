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

  const handleDownloadProposal = async (proposal) => {
    try {
      const [{ jsPDF }, autoTableModule] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      const autoTable = autoTableModule.default;
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add Logo
      const logoImg = "/logo.png";
      const logo = new Image();
      logo.src = logoImg;

      logo.onload = () => {
        doc.addImage(logo, "PNG", pageWidth - 60, 10, 50, 20);

        // Company Info
        doc.setFontSize(12);
        doc.text(`Company Name:  ${proposal.vendorCompany || "Company Name"}`, 14, 20);

        // Title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Quotation", pageWidth / 2, 15, { align: "center" });

        // Quotation Meta
        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        const ntnLabel = "National Tax Number (NTN):";
        const ntnValue = proposal.ntnNumber || "0627833-7";
        doc.text(`${ntnLabel} ${ntnValue}`, pageWidth - 20, 45, { align: "right" });



        // Reference
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
        doc.text(`Ref: Quotation for ${proposal.productName || "Device"}`, 14, 60);

        // Clean function to remove ANSI codes
        const removeAnsi = (text) => text?.replace(/\x1B\[[0-9;]*m/g, "") || "";

        // Table Content
        const specLines = [
          removeAnsi(proposal.productName || "Alcatel T76-CE"),
          removeAnsi(proposal.description || "Black Corded CLI Telephone"),
          "2 Years Replacement Warranty",
          "For Detail Specifications Datasheet Attached"
        ];
        const specFormatted = specLines.join("\n");

        const price = proposal.unitPrice || "11,864/-";
        const netUnitPrice = proposal.totalPrice || "14,000/-";
        const quantity = proposal.quantity?.toString() || "1";
        const netAmount = proposal.totalPrice || "14,000/-";

        const tableBody = [[
          specFormatted,
          price,
          netUnitPrice,
          quantity,
          netAmount
        ]];

        autoTable(doc, {
          startY: 70,
          head: [["Product Specification", "Price", "Net unit Price", "Quantity", "Net Amount"]],
          body: tableBody,
          styles: {
            fontSize: 10,
            cellPadding: 4,
            valign: "top",
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
          },
          headStyles: {
            fillColor: [0, 0, 0],        // Black background
            textColor: [255, 255, 255],  // White text
            fontStyle: "bold",
            halign: "center",
          },
          columnStyles: {
            0: { cellWidth: 75 },
            1: { halign: "center" },
            2: { halign: "center" },
            3: { halign: "center" },
            4: { halign: "center" },
            5: { halign: "center" },
          }
        });

        // Prices note
        let y = doc.lastAutoTable.finalY + 5;
        doc.setFont(undefined, "normal");
        doc.text("•  Above mentioned prices are inclusive of all Taxes", 14, y);

        // Terms & Conditions
        y += 10;
        doc.setFont(undefined, "bold");
        doc.text("Specific Terms & Conditions", 14, y);
        doc.setFont(undefined, "normal");
        doc.setFontSize(10);
        doc.text(`Quotation Validity   :   MOQ 15 Units`, 14, y + 6);
        doc.text(`Delivery Period     :   Ex Stock While Stock Lasts All over Pakistan`, 14, y + 12);

        // Digital Signature
        y += 30;
        doc.setFontSize(10);
        doc.text("Digitally signed by Bidnest", 14, y);

        // Footer Contacts
        y += 20;
        doc.setFontSize(11);
        doc.setFont(undefined, "bold");
        doc.text("M. Atif Ashraf Khan", 14, y);
        doc.text("M. Liaquat Ali", pageWidth / 2 + 10, y);

        doc.setFont(undefined, "normal");
        doc.setFontSize(10);
        doc.text("Dy. Manager-Business Development", 14, y + 6);
        doc.text("Senior Executive Business Development", pageWidth / 2 + 10, y + 6);

        doc.text("0321-4365695, 0333-8283945", 14, y + 12);
        doc.text("0321-4125680, 0333-8283722", pageWidth / 2 + 10, y + 12);

        // Note
        y += 25;
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.text("NOTE: Income Tax deduction", 14, y);
        doc.setFont(undefined, "normal");
        doc.text(
          `Kindly do not deduct any tax because we are the importers /Partners of Alcatel and already paid tax at the time of import. 
  We will provide you GD and undertaking for this with invoice.`,
          14,
          y + 5
        );

        // Final Footer at Bottom
        const footerY = pageHeight - 35;

        // Black line above footer
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(10, footerY - 4, pageWidth - 10, footerY - 4);

        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc.text(
          "Karachi, Lahore, Islamabad, Peshawar. Toll Free: +92 3324421885,",
          pageWidth / 2,
          footerY,
          { align: "center" }
        );

        doc.setFont(undefined, "normal");
        doc.text(
          "Telephone: +92 3324421885, Fax: +92 3324421885, E-mail: bidnest2@gmail.com, www.bidnest.com",
          pageWidth / 2,
          footerY + 5,
          { align: "center" }
        );  

        doc.text(
          "Registered Office: E-173, Faisal Town, S.I.T.E, Lahore, Pakistan.",
          pageWidth / 2,
          footerY + 10,
          { align: "center" }
        );

        doc.save(`Proposal_${proposal.vendorCompany}_${proposal.productName}.pdf`);
      };
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
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

      const currentStatus = selectedProposal.approval;

      if (currentStatus === "bid_successful") {
        console.log(
          "Proposal is already marked as bid successful. No action taken."
        );
        return; // Do nothing
      }

      let newStatus = "";

      if (currentStatus === "pending_financial") {
        newStatus = "bid_successful";
      } else {
        newStatus = "ready_for_financial_round";
      }

      await ProposalService.updateProposalStatus(
        selectedProposal._id,
        newStatus
      );

      setProposals((prev) =>
        prev.map((p) =>
          p._id === selectedProposal._id ? { ...p, approval: newStatus } : p
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

              {selectedProposal.approval === "pending_financial" && (
                <>
                  <br />
                  <Typography variant="h6" gutterBottom>
                    Price Quote
                  </Typography>
                  <Typography>
                    <strong>Unit Price:</strong>{" "}
                    {selectedProposal.unitPrice || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Total Price:</strong>{" "}
                    {selectedProposal.totalPrice || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Quantity:</strong>{" "}
                    {selectedProposal.quantity || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Offer Price:</strong>{" "}
                    {selectedProposal.offerPrice || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Weight:</strong> {selectedProposal.weight || "N/A"}
                  </Typography>
                </>
              )}

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
