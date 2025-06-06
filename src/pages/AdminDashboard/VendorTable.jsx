import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import { getPaginatedVendorsWithProposal } from "./admin";

export function TableWithPagination({ onView, onEdit }) {
  const [vendors, setVendors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVendors(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchVendors = async (pageNum, limit) => {
    setLoading(true);
    try {
      const res = await getPaginatedVendorsWithProposal(pageNum, limit);
      setVendors(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) {
      console.error("Error fetching vendors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Vendor List
      </Typography>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="vendor table">
          <TableHead>
            <TableRow>
              <TableCell>Vendor Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Proposals</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={2}
                  >
                    <CircularProgress size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : vendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No vendors found.
                </TableCell>
              </TableRow>
            ) : (
              vendors.map((vendor) => (
                <TableRow key={vendor._id}>
                  <TableCell>{vendor.uuid}</TableCell>
                  <TableCell>
                    {vendor.firstName} {vendor.lastName}
                  </TableCell>
                  <TableCell>{vendor.company}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phoneNumber}</TableCell>
                  <TableCell>{vendor.experience} years</TableCell>
                  <TableCell>
                    <Chip
                      label={vendor.proposals?.length || 0}
                      size="small"
                      color={vendor.proposals?.length ? "secondary" : "default"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => onView(vendor)}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    <Button size="small" onClick={() => onEdit(vendor)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.totalVendors || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
