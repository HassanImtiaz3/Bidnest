import React, { useState } from 'react';
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
  Grid,
  TextField,
} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './VendorDashboard.css';
import { useLocation } from "react-router-dom";

const VendorDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState(false);
  const location = useLocation();
  const postData = location.state?.post;
  
  const formData = postData
  ? {
      companyName: postData.companyName || "Unknown Company",
      requiredProduct: postData.productName || "N/A",
      category: postData.category || "N/A",
      quantity: postData.quantity || "0",
      eachPrice: postData.budget || "N/A",
      totalPrice: postData.totalBudget || "N/A", // Calculate if needed
    }
  : {};


  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUploadedFile(null);
    setFileError(false);
    setCompanyName('');
    setCompanyNameError(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setFileError(false);
    } else {
      setUploadedFile(null);
      setFileError(true);
    }
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    setCompanyNameError(false);
  };

  const handleSendProposal = () => {
    if (!companyName || !uploadedFile) {
      if (!companyName) setCompanyNameError(true);
      setFileError(true);
      return;
    }

    console.log('Sending proposal with file:', uploadedFile);
    handleCloseDialog();
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="vendor-dashboard-container">
        <Typography variant="h4" className="vendor-dashboard-title">
          Vendor Dashboard
        </Typography>

        <TableContainer component={Paper} className="proposal-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2} className="proposal-table-head">
                  Proposal Information
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(formData).map(([key, value]) => (
                <TableRow key={key} className="proposal-row">
                  <TableCell className="table-label-cell">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </TableCell>
                  <TableCell className="table-value-cell">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              className="send-proposal-button"
            >
              Send Proposal
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle className="dialog-title">Upload Proposal File</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Company Name"
                fullWidth
                value={companyName}
                onChange={handleCompanyNameChange}
                error={companyNameError}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: '16px', marginTop: '8px' }}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              {fileError && (
                <Typography color="error" mt={1}>
                  Please upload a PDF file before sending.
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="cancel-button">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSendProposal}
            disabled={!companyName || !uploadedFile}
            className="send-button"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
};

export default VendorDashboard;
