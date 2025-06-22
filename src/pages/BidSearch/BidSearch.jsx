import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Bread from "../../widgets/BackToHomeButton/BreadCrumbs.jsx";
import ProposalService from "../../services/proposalService.js";

function OpenSolicitations() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPublished, setSelectedPublished] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownConfig = [
    { name: "Bid Type", values: ["All Bids"] },
    {
      name: "category",
      values: ["furniture", "electronic", "clothing", "food"],
    },
    {
      name: "Published",
      values: ["Last 24 Hours", "Last 7 Days", "Last 30 Days"],
    },
    {
      name: "Status",
      values: [
        "pending",
        "confirmed",
        "rejected",
        "pending_financial",
        "ready_for_financial_round",
        "bid_successful",
      ],
    },
  ];

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await ProposalService.getAllProposal();
        setProposals(Array.isArray(data.proposals) ? data.proposals : []);
      } catch (error) {
        console.error("Failed to fetch proposals", error);
        setProposals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const filterByPublished = (proposal) => {
    if (!selectedPublished) return true;

    const createdAt = new Date(proposal.createdAt);
    const now = new Date();
    const diffMs = now - createdAt;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (selectedPublished === "Last 24 Hours") return diffDays <= 1;
    if (selectedPublished === "Last 7 Days") return diffDays <= 7;
    if (selectedPublished === "Last 30 Days") return diffDays <= 30;

    return true;
  };

  const filteredProposals = proposals
    .filter((p) => (selectedStatus ? p.approval === selectedStatus : true))
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter(filterByPublished)
    .filter((p) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        p.postingTitle?.toLowerCase().includes(search) ||
        p.vendorName?.toLowerCase().includes(search)
      );
    });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Bread name="Bid Search" />
      <div className="flex-grow-1">
        <div className="container text-center mt-5 mb-4">
          <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Open Solicitations
            </Typography>

            {/* Filters */}
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search by Keywords or Bid Title"
                sx={{
                  flex: "1 1 auto",
                  minWidth: "300px",
                  "& .MuiInputBase-input": { color: "black" },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {dropdownConfig.map((dropdown, index) => {
                const isStatusDropdown = dropdown.name === "Status";
                const isPublishedDropdown = dropdown.name === "Published";
                const isCategoryDropdown = dropdown.name === "category";

                return (
                  <FormControl fullWidth size="small" key={index}>
                    <InputLabel
                      id={`dropdown-label-${index}`}
                      sx={{ color: "black" }}
                    >
                      {dropdown.name}
                    </InputLabel>
                    <Select
                      labelId={`dropdown-label-${index}`}
                      id={`dropdown-${index}`}
                      label={dropdown.name}
                      sx={{
                        color: "black",
                        "& .MuiSelect-icon": { color: "black" },
                      }}
                      value={
                        isStatusDropdown
                          ? selectedStatus
                          : isPublishedDropdown
                          ? selectedPublished
                          : isCategoryDropdown
                          ? selectedCategory
                          : ""
                      }
                      onChange={
                        isStatusDropdown
                          ? (e) => setSelectedStatus(e.target.value)
                          : isPublishedDropdown
                          ? (e) => setSelectedPublished(e.target.value)
                          : isCategoryDropdown
                          ? (e) => setSelectedCategory(e.target.value)
                          : undefined
                      }
                    >
                      {dropdown.values.map((value, i) => (
                        <MenuItem key={i} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              })}
            </Stack>

            <br />
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {filteredProposals.length} results
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    p: 2,
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1">List of Bids</Typography>
                </Box>

                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                          <TableCell>
                            <strong>Title</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Bid Date</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Offer Price</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Status</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredProposals.map((proposal, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {proposal.postingTitle || "Untitled"}
                            </TableCell>
                            <TableCell>
                              {proposal.bidDate
                                ? new Date(
                                    proposal.bidDate
                                  ).toLocaleDateString()
                                : "-"}
                            </TableCell>
                            <TableCell>${proposal.offerPrice}</TableCell>
                            <TableCell>{proposal.approval}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )}
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OpenSolicitations;
