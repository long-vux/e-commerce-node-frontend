import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Avatar,
  IconButton,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewProduct from './ViewProduct';
import EditProduct from './EditProduct';

const ProductRow = ({ product, onDelete, onEdit }) => {
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteProduct = () => {
    onDelete(product._id); // Call the onDelete function passed from the parent
    setOpenDeleteModal(false);
  };

  return (
    <>
      <TableRow>
        {/* Thumbnail */}
        <TableCell align="center">
          <Avatar
            src={product.image}
            alt={product.name}
            sx={{ width: 60, height: 60 }}
            variant="rounded"
          />
        </TableCell>

        {/* Name */}
        <TableCell>
          <div style={{ color: 'black' }}>{product.name}</div>
        </TableCell>

        {/* Price */}
        <TableCell>
          <div style={{ color: 'black' }}>${product.price}</div>
        </TableCell>

        {/* Tags */}
        <TableCell>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {product.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: '0.75rem',
                  margin: '2px',
                }}
              />
            ))}
          </Stack>
        </TableCell>

        {/* Categories */}
        <TableCell>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {product.categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: '0.75rem',
                  margin: '2px',
                }}
              />
            ))}
          </Stack>
        </TableCell>

        {/* Actions */}
        <TableCell>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => setOpenView(true)} color="default">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={handleOpenEdit} color="default">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleOpenDeleteModal} color="default">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>

        {/* View Product Modal */}
        <ViewProduct open={openView} close={() => setOpenView(false)} product={product} />

        {/* Edit Product Modal */}
        <EditProduct
          open={openEdit}
          onClose={handleCloseEdit}
          onEdit={(updatedProduct) => {
            onEdit(updatedProduct); // Pass the updated product to the parent
            handleCloseEdit();
          }}
          productToEdit={product}
        />
      </TableRow>

      {/* Clean and Minimal Delete Confirmation Modal */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#fff',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'black', fontWeight: 'bold' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ color: 'black' }}>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseDeleteModal} color="default" sx={{ fontSize: '1rem' }}>
            Cancel
          </IconButton>
          <IconButton
            onClick={handleDeleteProduct}
            color="error"
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '4px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Confirm
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductRow;
