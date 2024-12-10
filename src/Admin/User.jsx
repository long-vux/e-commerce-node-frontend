import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { Visibility, Block, Close } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBanOpen, setIsBanOpen] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token')?.replace(/['"]/g, '');

  const fetchUsers = async () => {
    if (!token) {
      toast.error('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}api/admin/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("this is users: ", response.data.data)

      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error('Unexpected response structure:', response.data);
        toast.error('Failed to load users. Invalid response format.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setSelectedUser(null);
    setIsDetailsOpen(false);
  };

  const openBanDialog = (user) => {
    setSelectedUser(user);
    setIsBanOpen(true);
  };

  const closeBanDialog = () => {
    setSelectedUser(null);
    setIsBanOpen(false);
  };

  const handleBanUser = async (userId) => {
    if (!token) {
      toast.error('User is not authenticated. Please log in.');
      return;
    }

    try {
      await axios.put(`${BASE_URL}api/admin/${userId}/ban`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User banned successfully.');
      fetchUsers();
      closeBanDialog();
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Banned</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{`${user.firstName || ''} ${user.lastName || ''}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.isBanned ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openDetails(user)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => openBanDialog(user)} color="error">
                    <Block />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selectedUser && (
        <Dialog open={isDetailsOpen} onClose={closeDetails}>
          <DialogTitle>
            User Details
            <IconButton onClick={closeDetails} style={{ position: 'absolute', right: 16, top: 16 }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography><strong>Name:</strong> {`${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`}</Typography>
            <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
            <Typography><strong>Phone:</strong> {selectedUser.phone || 'N/A'}</Typography>
            <Typography><strong>Role:</strong> {selectedUser.role}</Typography>
            <Typography><strong>Banned:</strong> {selectedUser.isBanned ? 'Yes' : 'No'}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetails}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {selectedUser && (
        <Dialog open={isBanOpen} onClose={closeBanDialog}>
          <DialogTitle>Ban User</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to ban this user? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeBanDialog}>Cancel</Button>
            <Button onClick={() => handleBanUser(selectedUser._id)} color="error">
              Ban
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default User;
