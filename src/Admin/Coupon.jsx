import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField
} from '@mui/material'
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CouponAPI from '../api/couponAPI'
const CouponManagement = () => {
  const [coupons, setCoupons] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountPercentage: '',
    maxUsage: '',
    usageCount: 0,
    isActive: true,
    expiryDate: ''
  })
  const [editCoupon, setEditCoupon] = useState(null)
  const [deleteCouponId, setDeleteCouponId] = useState(null)

  const fetchCoupons = async () => {
    try {
      const response = await CouponAPI.getAllCoupons()
      console.log('response', response)
      setCoupons(response)
    } catch (error) {
      console.error('Error fetching coupons:', error.message)
      toast.error('Error fetching coupons:', error.message)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleAddCoupon = async () => {
    try {
      if (newCoupon.expiryDate < new Date()) {
        toast.error('Expiry date must be greater than current date')
        return
      }

      if (newCoupon.discountPercentage < 0 || newCoupon.discountPercentage > 100) {
        toast.error('Discount percentage must be between 0 and 100')
        return
      }

      // Gọi API để thêm coupon mới
      const addedCoupon = await CouponAPI.createCoupon(newCoupon)

      // Cập nhật danh sách coupon sau khi thêm
      setCoupons([...coupons, addedCoupon])
      toast.success('Coupon added successfully!')

      // Đóng modal và reset form
      setIsAddModalOpen(false)
      setNewCoupon({
        code: '',
        discountPercentage: '',
        maxUsage: '',
        usageCount: 0,
        expiryDate: new Date().toISOString().split('T')[0]
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEditCoupon = async () => {
    try {
      console.log('Editing coupon:', editCoupon) // Debugging
      if (editCoupon.expiryDate < new Date()) {
        toast.error('Expiry date must be greater than current date')
        return
      }

      if (editCoupon.discountPercentage < 0 || editCoupon.discountPercentage > 100) {
        toast.error('Discount percentage must be between 0 and 100')
        return
      }

      const formData = new FormData();
      formData.append('code', editCoupon.code);
      formData.append('discountPercentage', editCoupon.discountPercentage);
      formData.append('maxUsage', editCoupon.maxUsage);
      formData.append('expiryDate', editCoupon.expiryDate);
      const updatedCoupon = await CouponAPI.updateCoupon(
        editCoupon._id,
        formData
      )
      console.log('Response from server:', updatedCoupon) // Debugging
      toast.success('Coupon updated successfully!')

      setCoupons(
        coupons.map(coupon =>
          coupon._id === updatedCoupon._id ? updatedCoupon : coupon
        )
      )

      setIsEditModalOpen(false)
      setEditCoupon(null)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteCoupon = async () => {
    try {
      // Call the API to delete the coupon
      await CouponAPI.deleteCoupon(deleteCouponId)

      // Update the local state
      setCoupons(coupons.filter(coupon => coupon._id !== deleteCouponId))
      toast.success('Coupon deleted successfully!')

      // Close the modal and reset deleteCouponId
      setIsDeleteModalOpen(false)
      setDeleteCouponId(null)
    } catch (error) {
      console.error('Error deleting coupon:', error.message)
    }
  }

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target
    if (isEditing) {
      setEditCoupon({ ...editCoupon, [name]: value })
    } else {
      setNewCoupon({ ...newCoupon, [name]: value })
    }
  }

  const handleEdit = coupon => {
    setEditCoupon(coupon)
    setIsEditModalOpen(true)
  }

  const handleDelete = id => {
    setDeleteCouponId(id)
    setIsDeleteModalOpen(true)
  }

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className='flex justify-between items-center'>
        <Typography variant='h4' gutterBottom className='font-bold'>
          <strong>Coupon</strong>
        </Typography>

        <Button
          variant='contained'
          color='primary'
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
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Coupon
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Code</strong>
              </TableCell>
              <TableCell>
                <strong>Discount</strong>
              </TableCell>
              <TableCell>
                <strong>Max Usage</strong>
              </TableCell>
              <TableCell>
                <strong>Usage Count</strong>
              </TableCell>
              <TableCell>
                <strong>Is Active</strong>
              </TableCell>
              <TableCell>
                <strong>Expiry Date</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(coupon => (
                <TableRow key={coupon.id}>
                  <TableCell >#{coupon.code}</TableCell>
                  <TableCell>{coupon.discountPercentage} %</TableCell>
                  <TableCell>{coupon.maxUsage}</TableCell>
                  <TableCell>{coupon.usageCount}</TableCell>
                  <TableCell>{coupon.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(coupon)}
                      color='default'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(coupon._id)}
                      color='default'
                    >
                      <DeleteIcon />
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
        count={coupons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add Coupon Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>Add New Coupon</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Code'
            name='code'
            value={newCoupon.code}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin='dense'
            label='Discount Percentage'
            name='discountPercentage'
            value={newCoupon.discountPercentage}
            onChange={handleInputChange}
            type='number'
            fullWidth
          />
          <TextField
            margin='dense'
            label='Max Usage'
            name='maxUsage'
            value={newCoupon.maxUsage}
            onChange={handleInputChange}
            type='number'
            fullWidth
          />
          <TextField
            margin='dense'
            label='Expiry Date'
            name='expiryDate'
            value={newCoupon.expiryDate}
            onChange={handleInputChange}
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddModalOpen(false)} color='default'>
            Cancel
          </Button>
          <Button onClick={handleAddCoupon} color='default'>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Coupon Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Coupon</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Code'
            name='code'
            value={editCoupon?.code || ''}
            onChange={e => handleInputChange(e, true)}
            fullWidth
          />
          <TextField
            margin='dense'
            label='Discount Percentage'
            name='discountPercentage'
            value={editCoupon?.discountPercentage || ''}
            onChange={e => handleInputChange(e, true)}
            type='number'
            fullWidth
          />
          <TextField
            margin='dense'
            label='Max Usage'
            name='maxUsage'
            value={editCoupon?.maxUsage || ''}
            onChange={e => handleInputChange(e, true)}
            type='number'
            fullWidth
          />
          <TextField
            margin='dense'
            label='Expiry Date'
            name='expiryDate'
            value={editCoupon?.expiryDate || ''}
            onChange={e => handleInputChange(e, true)}
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color='default'>
            Cancel
          </Button>
          <Button onClick={handleEditCoupon} color='default' >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this coupon?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)} color='default'>
            Cancel
          </Button>
          <Button onClick={handleDeleteCoupon} color='default'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CouponManagement
