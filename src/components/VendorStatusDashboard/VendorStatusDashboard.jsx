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
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./VendorStatusDashboard.css";

const VendorStatusDashboard = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const dummyProposals = [
      {
        vendorCompany: "TechCorp Solutions",
        category: "Electronics",
        status: "Success",
        productName: "Laptop",
      },
      {
        vendorCompany: "BuildIt Inc.",
        category: "Construction",
        status: "Failure",
        productName: "Cement Mixer",
      },
      {
        vendorCompany: "FreshFoods Ltd.",
        category: "Grocery",
        status: "Pending",
        productName: "Organic Apples",
      },
      {
        vendorCompany: "MediSupplies",
        category: "Medical",
        status: "Inprocess",
        productName: "First Aid Kits",
      },
    ];
    setProposals(dummyProposals);
  }, []);

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
                  Detail/Category
                </TableCell>
                <TableCell align="center" className="company-table-head">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal, index) => (
                <TableRow key={index} className="company-row">
                  <TableCell className="company-name-cell" align="center">
                    {proposal.vendorCompany}
                  </TableCell>
                  <TableCell align="center">
                    {proposal.category || "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={`status-badge ${proposal.status.toLowerCase()}`}
                    >
                      {proposal.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
};

export default VendorStatusDashboard;
