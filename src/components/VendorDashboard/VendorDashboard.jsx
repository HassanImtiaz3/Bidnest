import React, { useState, useEffect } from 'react';
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
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './VendorDashboard.css';
import { useLocation } from 'react-router-dom';
import ProposalService from '../../services/proposalService';

const VendorDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const location = useLocation();
  const postData = location.state?.post;

  const formData = postData
    ? {
        companyName: postData.companyName || "Unknown Company",
        requiredProduct: postData.productName || "N/A",
        category: postData.category || "N/A",
        quantity: postData.quantity || "0",
        eachPrice: postData.budget || "N/A",
        totalPrice: postData.totalBudget || "N/A",
      }
    : {};

  const fields = {
    vendorName: '',
    vendorCompany: '',
    vendorPhone: '',
    vendorEmail: '',
    vendorAddress: '',
    postingTitle: '',
    bidDate: '',
    offerPrice: '',
    quantity: '',
    unitPrice: '',
    totalPrice: '',
    productName: '',
    description: '',
    modelNumber: '',
    color: '',
    size: '',
    weight: '',
    warranty: '',
    deliveryTime: ''
  };

  useEffect(() => {
    const allFilled = Object.values(formState).every((v) => v?.toString().trim() !== '');
    setIsFormValid(allFilled);
  }, [formState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Optional: Auto-calculate total price when quantity or unit price changes
    if (name === 'quantity' || name === 'unitPrice') {
      const quantity = name === 'quantity' ? value : formState.quantity || 0;
      const unitPrice = name === 'unitPrice' ? value : formState.unitPrice || 0;
      
      if (quantity && unitPrice) {
        const total = parseFloat(quantity) * parseFloat(unitPrice);
        setFormState(prev => ({
          ...prev,
          totalPrice: total.toString()
        }));
      }
    }
  };

  const handleOpenDialog = () => {
    setFormState(fields);
    setSelectedDate(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }
  
    try {
      const vendorDataRaw = localStorage.getItem("user");
      const vendorData = vendorDataRaw ? JSON.parse(vendorDataRaw) : null;
      const vendorId = vendorData?.uuid;
      const postId = postData?.uuid;
  
      if (!postId || !vendorId) {
        console.error("Missing postId or vendorId");
        setSnackbar({
          open: true,
          message: 'Missing post or vendor information',
          severity: 'error'
        });
        return;
      }
  
      console.log("Submitting proposal - Post ID:", postId, "Vendor ID:", vendorId);
      console.log("Form data:", formState);
  
      const formattedData = {
        ...formState,
        bidDate: formState.bidDate instanceof Date
          ? formState.bidDate.toISOString()
          : formState.bidDate,
      };
  
      const payload = {
        ...formattedData,
        userId: postId,
        vendorId,
      };
  
      const result = await ProposalService.submitProposal(payload);
      console.log('Proposal submitted:', result);
  
      setSnackbar({
        open: true,
        message: 'Proposal submitted successfully!',
        severity: 'success'
      });
  
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to submit proposal:', error);
      setSnackbar({
        open: true,
        message: `Failed to submit proposal: ${error.message || 'Unknown error'}`,
        severity: 'error'
      });
    }
  };
  
  
  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="vendor-dashboard-container">
        <Typography variant="h4" className="vendor-dashboard-title" gutterBottom>
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

        <Grid container justifyContent="center" mt={3}>
          <Grid item>
            <Button variant="contained" onClick={handleOpenDialog} className="send-proposal-button">
              Send Proposal
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle className="dialog-title">
          Send Proposal
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>Vendor Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorName"
                label="Vendor Name" value={formState.vendorName || ''}
                onChange={handleInputChange} inputProps={{ maxLength: 15, pattern: "[A-Za-z ]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorCompany"
                label="Vendor Company Name" value={formState.vendorCompany || ''}
                onChange={handleInputChange} inputProps={{ maxLength: 30, pattern: "[A-Za-z ]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorPhone"
                label="Vendor Phone Number" value={formState.vendorPhone || ''}
                onChange={handleInputChange} inputProps={{ maxLength: 11, pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorEmail"
                label="Email" value={formState.vendorEmail || ''}
                onChange={handleInputChange} type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" required name="vendorAddress"
                label="Vendor Address" value={formState.vendorAddress || ''}
                onChange={handleInputChange} inputProps={{ maxLength: 100 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom mt={4}>Bid Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="postingTitle"
                label="Posting Title" value={formState.postingTitle || ''}
                onChange={handleInputChange} inputProps={{ maxLength: 15, pattern: "[A-Za-z ]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setFormState((prev) => ({ ...prev, bidDate: date }));
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      required: true,
                      label: 'Last Date',
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="offerPrice" label="Offer Price"
                value={formState.offerPrice || ''} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="quantity" label="Quantity"
                value={formState.quantity || ''} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="unitPrice" label="Unit Price"
                value={formState.unitPrice || ''} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" required name="totalPrice" label="Total Price"
                value={formState.totalPrice || ''} onChange={handleInputChange} type="number"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom mt={4}>Device Specification</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth size="small" name="productName" label="Product Name"
                value={formState.productName || ''} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" name="description" label="Description"
                value={formState.description || ''} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" name="modelNumber" label="Model Number"
                value={formState.modelNumber || ''} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" name="color" label="Color"
                value={formState.color || ''} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" name="size" label="Size"
                value={formState.size || ''} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" name="weight" label="Weight"
                value={formState.weight || ''} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" name="warranty" label="Warranty Information"
                value={formState.warranty || ''} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" name="deliveryTime" label="Delivery Time Frame"
                value={formState.deliveryTime || ''} onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary" 
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default VendorDashboard;