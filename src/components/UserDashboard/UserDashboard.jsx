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
  useMediaQuery,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './UserDashboard.css';

const UserDashboard = () => {
  const companies = [
    { companyName: 'Tech Solutions Ltd.' },
    { companyName: 'Innovative Systems Inc.' },
    { companyName: 'Global Enterprises' },
  ];

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [companyToReject, setCompanyToReject] = useState('');
  const [companyToAccept, setCompanyToAccept] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
              {companies.map((company, index) => (
                <TableRow key={index} className="company-row">
                  <TableCell className="company-name-cell">
                    {company.companyName}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction={isSmallScreen ? 'column' : 'row'}
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleDownloadProposal(company.companyName)}
                        className="proposal-button download-btn"
                      >
                        Download
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleAcceptProposal(company.companyName)}
                        className="proposal-button accept-btn"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleRejectProposal(company.companyName)}
                        className="proposal-button reject-btn"
                      >
                        Reject
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog open={openRejectDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#f44336', color: '#fff' }}>
          Confirm Proposal Rejection
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 3 }}>
            Are you sure you want to reject this proposal? This action is irreversible and the proposal will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#6a1b9a' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmReject}
            sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAcceptDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#388e3c', color: '#fff' }}>
          Confirm Proposal Acceptance
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 3 }}>
            Are you sure you want to accept this proposal? This will mark the proposal as officially accepted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#6a1b9a' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAccept}
            sx={{ backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#4caf50' } }}
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
