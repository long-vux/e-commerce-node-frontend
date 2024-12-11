import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material'
import { Visibility, Edit, Close, Delete, CheckBox } from '@mui/icons-material'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { formatCurrency } from '../utils/formatCurrency'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [editedStatus, setEditedStatus] = useState('')
  const [updateStatusMap, setUpdateStatusMap] = useState({})
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [currentStatus, setCurrentStatus] = useState('')

  const token = localStorage.getItem('token')
  const cleanToken = token.replace(/['"]/g, '')

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/admin/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`
        }
      })
      console.log(response.data.data)
      setOrders(response.data.data)
      if (response.data.data.length > 0) {
        setCurrentStatus(response.data.data[0].status)
        setEditedStatus(response.data.data[0].status)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleChangeStatus = (e, orderId) => {
    const newStatus = e.target.value;

    setEditedStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));

    setUpdateStatusMap((prev) => ({
      ...prev,
      [orderId]: orders.find(order => order._id === orderId)?.status !== newStatus,
    }));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const openDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const closeDetails = () => {
    setSelectedOrder(null)
    setIsDetailsOpen(false)
  }

  const openDelete = (order) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }

  const closeDelete = () => {
    setSelectedOrder(null)
    setIsDeleteOpen(false)
  }

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(`${BASE_URL}api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`
        }
      })
      if (response.status === 200) {
        toast.success('Order deleted successfully')
        fetchOrders()
        closeDelete()
      } else {
        toast.error('Failed to delete order')
      }
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }
  const handleUpdateStatus = async (orderId) => {
    try {
      const newStatus = editedStatus[orderId];
      const response = await axios.put(
        `${BASE_URL}api/order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Order status updated successfully');
        fetchOrders();
        setEditedStatus((prev) => ({
          ...prev,
          [orderId]: undefined, // Reset to undefined after updating
        }));
        setUpdateStatusMap((prev) => ({
          ...prev,
          [orderId]: false,
        }));
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom className='font-bold'>
        <strong>Order</strong>
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Order ID</strong>
              </TableCell>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user?.email}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Select
                      value={editedStatus[order._id] || order.status}
                      onChange={(e) => handleChangeStatus(e, order._id)}
                      fullWidth
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>

                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => openDetails(order)} color='default'>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => openDelete(order)} color='default'>
                      <Delete />
                    </IconButton>
                    {updateStatusMap[order._id] && (
                      <IconButton onClick={() => handleUpdateStatus(order._id)} color='error'>
                        <CheckBox />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* View Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailsOpen} onClose={closeDetails}>
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold'
            }}
          >
            Order Details
            <IconButton
              onClick={closeDetails}
              sx={{ position: 'absolute', right: 16, top: 16 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ padding: 3 }}>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Name: {selectedOrder.receiverName}
            </Typography>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Email: {selectedOrder.receiverEmail}
            </Typography>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Phone: {selectedOrder.receiverPhone}
            </Typography>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Shipping Address: {selectedOrder.shippingAddress}
            </Typography>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Total: <strong>{formatCurrency(selectedOrder.total)}</strong>
            </Typography>

            <Typography variant='h6' gutterBottom sx={{ marginTop: 2 }}>
              Items:
            </Typography>
            <Table size='small'>
              <TableHead>
                <TableRow>

                  <TableCell>
                    <strong>Product</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Variant</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Quantity</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Price</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.variant}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button
              onClick={closeDetails}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black'
                },
                border: '1px solid',
                transition: 'all 0.3s'
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Status Dialog */}
      {selectedOrder && (
        <Dialog open={isDeleteOpen} onClose={closeDelete}>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogContent>
            <Typography variant='body1' gutterBottom>
              Are you sure you want to delete this order?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDelete} color='default'>
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(selectedOrder._id)}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black'
                },
                border: '1px solid',
                transition: 'all 0.3s'
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default Order
