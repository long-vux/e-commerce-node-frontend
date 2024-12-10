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
import { Visibility, Edit, Close } from '@mui/icons-material'
import OrderAPI from '../api/OrderAPI' // Import your OrderAPI

const Order = () => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [editedStatus, setEditedStatus] = useState('')

  const fetchOrders = async () => {
    try {
      const data = await OrderAPI.getOrdersOfUser()
      console.log("this is orders: ",data)
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const openDetails = order => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const closeDetails = () => {
    setSelectedOrder(null)
    setIsDetailsOpen(false)
  }

  const openEdit = order => {
    setSelectedOrder(order)
    setEditedStatus(order.status)
    setIsEditOpen(true)
  }

  const closeEdit = () => {
    setSelectedOrder(null)
    setEditedStatus('')
    setIsEditOpen(false)
  }

  const saveStatus = async () => {
    try {
      await OrderAPI.updateOrder(selectedOrder.id, { status: editedStatus })
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id
            ? { ...order, status: editedStatus }
            : order
        )
      )
      closeEdit()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'confirmed':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

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
                <strong>Total ($)</strong>
              </TableCell>
              <TableCell>
                <strong>Shipping Address</strong>
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
              .map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => openDetails(order)}
                      color='default'
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => openEdit(order)} color='default'>
                      <Edit />
                    </IconButton>
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
              fontWeight:' bold'
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
              Customer: {selectedOrder.user.name}
            </Typography>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Shipping Address: {selectedOrder.shippingAddress}
            </Typography>
            <Typography variant='body1' color='textSecondary' gutterBottom>
              Total: <strong>${selectedOrder.total}</strong>
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
                    <strong>Price ($)</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.variant}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price}</TableCell>
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
        <Dialog open={isEditOpen} onClose={closeEdit}>
          <DialogTitle>Edit Order Status</DialogTitle>
          <DialogContent>
            <Typography variant='body1' gutterBottom>
              Update status for Order ID: {selectedOrder.id}
            </Typography>
            <Select
              value={editedStatus}
              onChange={e => setEditedStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='confirmed'>Confirmed</MenuItem>
              <MenuItem value='shipped'>Shipped</MenuItem>
              <MenuItem value='delivered'>Delivered</MenuItem>
              <MenuItem value='cancelled'>Cancelled</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEdit} color='default'>
              Cancel
            </Button>
            <Button
              onClick={saveStatus}
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default Order
