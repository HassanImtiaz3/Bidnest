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
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const VendorDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState(false);

  // Static dummy data
  const formData = {
    companyName: 'Tech Solutions Ltd.',
    requiredProduct: 'Laptop',
    brandPreference: 'Dell',
    category: 'Electronics',
    quantity: '50',
    eachPrice: '700',
    totalPrice: '35000',
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

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

    // Submit logic here
    console.log('Sending proposal with file:', uploadedFile);
    handleCloseDialog();
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ color: '#6a1b9a' }}>
          Vendor Dashboard
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2} sx={{ backgroundColor: '#6a1b9a', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '2px solid #4a148c' }}>
                  Proposal Information
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(formData).map(([key, value]) => (
                <TableRow key={key} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#f1f1f1', transition: 'all 0.3s ease' } }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </TableCell>
                  <TableCell sx={{ color: '#444' }}>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
              sx={{
                padding: '12px 24px',
                fontSize: '1.1rem',
                background: 'linear-gradient(to right, #8e24aa, #6a1b9a)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: 3,
                '&:hover': {
                  background: 'linear-gradient(to right, #6a1b9a, #8e24aa)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Send Proposal
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#6a1b9a', color: '#fff' }}>Upload Proposal File</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Company Name Field */}
            <Grid item xs={12}>

              <TextField
                variant="outlined"
                placeholder='Company Name'
                fullWidth
                value={companyName}
                onChange={handleCompanyNameChange}
                error={companyNameError}
                InputLabelProps={{
                  shrink: true, // Ensures the label stays at the top, static
                }}
                sx={{ marginBottom: '16px', marginTop: '8px' }}
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ width: '100%', padding: '8px', borderRadius: 4 }} />
              {fileError && (
                <Typography color="error" mt={1}>
                  Please upload a PDF file before sending.
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#6a1b9a' }}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendProposal}
            disabled={!companyName || !uploadedFile}
            sx={{
              backgroundColor: '#6a1b9a',
              '&:hover': {
                backgroundColor: '#8e24aa',
              },
            }}
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
