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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

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
    const mockData = [
      {
        id: 1,
        code: 'SAVE10',
        discountPercentage: 10,
        maxUsage: 100,
        usageCount: 50,
        isActive: true,
        expiryDate: '2024-12-31'
      },
      {
        id: 2,
        code: 'WELCOME20',
        discountPercentage: 20,
        maxUsage: 200,
        usageCount: 10,
        isActive: false,
        expiryDate: '2024-10-15'
      }
      // ... Add the rest of your mock data
    ]
    setCoupons(mockData)
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleAddCoupon = () => {
    const newId = coupons.length > 0 ? coupons[coupons.length - 1].id + 1 : 1
    setCoupons([...coupons, { ...newCoupon, id: newId }])
    setIsAddModalOpen(false)
    setNewCoupon({
      code: '',
      discountPercentage: '',
      maxUsage: '',
      usageCount: 0,
      isActive: true,
      expiryDate: ''
    })
  }

  const handleEditCoupon = () => {
    setCoupons(
      coupons.map(coupon => (coupon.id === editCoupon.id ? editCoupon : coupon))
    )
    setIsEditModalOpen(false)
    setEditCoupon(null)
  }

  const handleDeleteCoupon = () => {
    setCoupons(coupons.filter(coupon => coupon.id !== deleteCouponId))
    setIsDeleteModalOpen(false)
    setDeleteCouponId(null)
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
                <strong>Discount (%)</strong>
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
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.discountPercentage}</TableCell>
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
                      onClick={() => handleDelete(coupon.id)}
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
          <Button onClick={() => setIsAddModalOpen(false)} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleAddCoupon} color='primary'>
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
          <Button onClick={() => setIsEditModalOpen(false)} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleEditCoupon} color='primary'>
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
          <Button onClick={() => setIsDeleteModalOpen(false)} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteCoupon} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CouponManagement
