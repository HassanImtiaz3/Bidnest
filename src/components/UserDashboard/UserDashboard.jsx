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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const UserDashboard = () => {
  // Static dummy data with multiple companies
  const companies = [
    { companyName: 'Tech Solutions Ltd.' },
    { companyName: 'Innovative Systems Inc.' },
    { companyName: 'Global Enterprises' },
  ];

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [companyToReject, setCompanyToReject] = useState('');
  const [companyToAccept, setCompanyToAccept] = useState('');

  const handleDownloadProposal = (companyName) => {
    console.log(`Downloading proposal for ${companyName}...`);
  };

  const handleAcceptProposal = (companyName) => {
    setCompanyToAccept(companyName);
    setOpenAcceptDialog(true);
  };

  const handleRejectProposal = (companyName) => {
    setCompanyToReject(companyName);
    setOpenRejectDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenRejectDialog(false);
    setOpenAcceptDialog(false);
    setCompanyToReject('');
    setCompanyToAccept('');
  };

  const handleConfirmReject = () => {
    console.log(`Proposal for ${companyToReject} has been rejected permanently.`);
    setOpenRejectDialog(false);
    setCompanyToReject('');
  };

  const handleConfirmAccept = () => {
    console.log(`Proposal for ${companyToAccept} has been accepted.`);
    setOpenAcceptDialog(false);
    setCompanyToAccept('');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ color: '#6a1b9a', marginBottom: 3 }}
        >
          User Dashboard
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#6a1b9a',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    borderBottom: '2px solid #4a148c',
                    padding: '16px',
                  }}
                >
                  Company Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#6a1b9a',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    borderBottom: '2px solid #4a148c',
                    padding: '16px',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(even)': {
                      backgroundColor: '#f9f9f9',
                    },
                    '&:hover': {
                      backgroundColor: '#f1f1f1',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 'bold', color: '#444', padding: '16px' }}>
                    {company.companyName}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '16px' }}>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDownloadProposal(company.companyName)}
                          sx={{
                            background: 'linear-gradient(to right, #8e24aa, #6a1b9a)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            '&:hover': {
                              background: 'linear-gradient(to right, #6a1b9a, #8e24aa)',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                            },
                          }}
                        >
                          Download Proposal
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAcceptProposal(company.companyName)}
                          sx={{
                            background: 'linear-gradient(to right, #4caf50, #388e3c)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            '&:hover': {
                              background: 'linear-gradient(to right, #388e3c, #4caf50)',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                            },
                          }}
                        >
                          Accept Proposal
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRejectProposal(company.companyName)}
                          sx={{
                            background: 'linear-gradient(to right, #f44336, #d32f2f)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            '&:hover': {
                              background: 'linear-gradient(to right, #d32f2f, #f44336)',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                            },
                          }}
                        >
                          Reject Proposal
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Reject Confirmation Dialog */}
      <Dialog open={openRejectDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#f44336', color: '#fff' }}>
          Confirm Proposal Rejection
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 3 }}>
            Are you sure you want to reject this proposal? This action cannot be undone and the proposal will be deleted permanently.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#6a1b9a' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmReject}
            sx={{
              backgroundColor: '#f44336',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/* Accept Confirmation Dialog */}
      <Dialog open={openAcceptDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#388e3c', color: '#fff' }}>
          Confirm Proposal Acceptance
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 3 }}>
            Are you sure you want to accept this proposal? This action will mark the proposal as accepted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#6a1b9a' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmAccept}
            sx={{
              backgroundColor: '#388e3c',
              '&:hover': {
                backgroundColor: '#4caf50',
              },
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default UserDashboard;
