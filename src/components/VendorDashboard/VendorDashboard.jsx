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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './VendorDashboard.css';
import { useLocation } from 'react-router-dom';

const VendorDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
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
  };

  const handleOpenDialog = () => {
    setFormState(fields);
    setSelectedDate(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted", formState);
      handleCloseDialog();
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
                label="Vendor Name" value={formState.vendorName}
                onChange={handleInputChange} inputProps={{ maxLength: 15, pattern: "[A-Za-z ]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorCompany"
                label="Vendor Company Name" value={formState.vendorCompany}
                onChange={handleInputChange} inputProps={{ maxLength: 30, pattern: "[A-Za-z ]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorPhone"
                label="Vendor Phone Number" value={formState.vendorPhone}
                onChange={handleInputChange} inputProps={{ maxLength: 11, pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="vendorEmail"
                label="Email" value={formState.vendorEmail}
                onChange={handleInputChange} type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" required name="vendorAddress"
                label="Vendor Address" value={formState.vendorAddress}
                onChange={handleInputChange} inputProps={{ maxLength: 100 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom mt={4}>Bid Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="postingTitle"
                label="Posting Title" value={formState.postingTitle}
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
                      label: !selectedDate ? 'Last Date' : 'Last Date',
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
                value={formState.offerPrice} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="quantity" label="Quantity"
                value={formState.quantity} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="unitPrice" label="Unit Price"
                value={formState.unitPrice} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" required name="totalPrice" label="Total Price"
                value={formState.totalPrice} onChange={handleInputChange} type="number"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom mt={4}>Device Specification</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="productName" label="Product Name"
                value={formState.productName} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="description" label="Description"
                value={formState.description} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="modelNumber" label="Model Number"
                value={formState.modelNumber} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth size="small" required name="color" label="Color"
                value={formState.color} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="size" label="Size"
                value={formState.size} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="weight" label="Weight"
                value={formState.weight} onChange={handleInputChange} type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" required name="warranty" label="Warranty Information"
                value={formState.warranty} onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" required name="deliveryTime" label="Delivery Time Frame"
                value={formState.deliveryTime} onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!isFormValid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
};

export default VendorDashboard;
