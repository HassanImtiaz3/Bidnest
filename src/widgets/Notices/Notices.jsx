import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
} from "@mui/material";

const procurementData = [
  {
    type: "Tender Notice",
    title:
      "PROCUREMENT OF CONSUMABLE & OTHER ITEMS THROUGH PHED FUNDED PROJECT 20487/19 'INVESTIGATING GENETIC LANDSCAPE OF ACUTE LYMPHOBLASTIC LEUKEMIA' REAGENTS FOR CLINICAL LABORATORY SERVICE HEMATOLOGY UHS",
    submissionDate: "12 Feb 2025",
    openingDate: "27 Feb 2025",
    issuedBy: "University of Health Sciences, Lahore",
  },
  {
    type: "Prequalification Notice",
    title:
      "PROCUREMENT OF IT EQUIPMENT TURNKEY SOLUTION FOR SCHEME OPERATIONALIZATION OF DIVISIONAL COMPLEXES",
    submissionDate: "12 Feb 2025",
    openingDate: "28 Feb 2025",
    issuedBy:
      "Strategic Planning & Implementation Unit Environment Protection Department Lahore.",
  },
  {
    type: "Tender Notice",
    title:
      "Construction of Soling from Govt Middle Girls School Towards Govt P/S Boys Basti Saleem Wali UC Baseera Tehsil Karor In limit of District Council Layyah.",
    submissionDate: "12 Feb 2025",
    openingDate: "05 Mar 2025",
    issuedBy: "District Council, Layyah",
  },
  {
    type: "Tender Notice",
    title: "Tender Notice JCD",
    submissionDate: "12 Feb 2025",
    openingDate: "04 Mar 2025",
    issuedBy: "Jampur Construction Division, Rajanpur.",
  },
];

const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontWeight: "500", 
  fontSize: { xs: "16px", sm: "18px", md: "17px" }, 
}));

const RegularCell = styled(TableCell)(({ theme }) => ({
  border: "1px dotted",
  borderColor: theme.palette.divider,
  fontWeight: "500", 
  fontSize: { xs: "16px", sm: "18px", md: "17px" }, 
}));

const ProcurementNotices = () => {
  return (
    <>
     <Typography
        variant="h1"
        sx={{
          fontWeight: "1000",
          padding: "50",
          marginTop: 3,
          fontSize: { xs: "24px", sm: "32px", md: "40px" },
        }}
      >
        PROCRUMENT <span style={{ color: "#673de6" }}>NOTICES</span>
      </Typography>
      <Box
      sx={{
        width: "100%",
        overflow: "auto",
        height: "300px",
        marginTop: 5,
        marginBottom: 15,
      }}
    >
     
      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Submission Date</HeaderCell>
              <HeaderCell>Opening Date</HeaderCell>
              <HeaderCell>Issued By</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {procurementData.map((row, index) => (
              <TableRow key={index}>
                <RegularCell>{row.type}</RegularCell>
                <RegularCell>{row.title}</RegularCell>
                <RegularCell>{row.submissionDate}</RegularCell>
                <RegularCell>{row.openingDate}</RegularCell>
                <RegularCell>{row.issuedBy}</RegularCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
   
  );
};

export default ProcurementNotices;
