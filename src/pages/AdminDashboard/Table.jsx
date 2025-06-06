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
import { getPaginatedUsersWithPosts } from "./admin"; // Adjust path if needed

export function TableWithPagination({ onView, onEdit }) {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0); // MUI is 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers(page + 1, rowsPerPage); // Backend expects 1-indexed
  }, [page, rowsPerPage]);

  const fetchUsers = async (pageNum, limit) => {
    setLoading(true);
    try {
      const res = await getPaginatedUsersWithPosts(pageNum, limit);
      setUsers(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) {
      console.error("Error fetching users:", err);
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
        User List
      </Typography>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Posts</TableCell>
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
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.uuid}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    {user.posts?.length ? (
                      [...new Set(user.posts.map((post) => post.category))].map(
                        (cat, idx) => (
                          <Chip
                            key={idx}
                            label={cat}
                            size="small"
                            color="primary"
                            sx={{ mr: 0.5 }}
                          />
                        )
                      )
                    ) : (
                      <Chip label="None" size="small" />
                    )}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={user.posts?.length || 0}
                      size="small"
                      color={user.posts?.length ? "secondary" : "default"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => onView(user)}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    <Button size="small" onClick={() => onEdit(user)}>
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
        count={pagination.totalUsers || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
