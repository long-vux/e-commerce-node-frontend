import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  IconButton,
  Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditProduct = ({ open, onClose, onEdit, productToEdit }) => {
  const [existingImages, setExistingImages] = useState([])
  const [newImages, setNewImages] = useState([]); // New images uploaded by the user

  const [product, setProduct] = useState({
    ...productToEdit,
    images: productToEdit?.images || [],
    variants: productToEdit?.variants || []
  })


  useEffect(() => {
    if (productToEdit) {
      setProduct({
        ...productToEdit,
        images: productToEdit?.images || [],
        variants: productToEdit?.variants || []
      })
      setExistingImages(productToEdit.images || []);
      setNewImages([]); // Reset new images on edit
    }
  }, [productToEdit])

  const handleChange = (field, value) => {
    setProduct({
      ...product,
      [field]: field === 'price' ? parseFloat(value) || 0 : value
    })
  }

  const handleImageDelete = (index) => {
    const imageToDelete = product.images[index];

    // Check if the image is an existing image
    if (existingImages.includes(imageToDelete)) {
      setExistingImages((prev) => prev.filter((img) => img !== imageToDelete));
    } else {
      // It's a new image; remove it from newImages
      setNewImages((prev) => prev.filter((_, i) => i !== index - existingImages.length));
    }

    // Remove the image from the display
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleArrayChange = (field, value) => {
    setProduct({
      ...product,
      [field]: value.split(',').map(item => item.trim())
    })
  }

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants]
    updatedVariants[index][field] = value
    setProduct({ ...product, variants: updatedVariants })
  }

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: '', color: '', stock: '' }]
    })
  }

  const handleVariantDelete = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...newImagePreviews]
          }));
          setNewImages((prev) => [...prev, ...files]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (!product.name) toast.error("Product name is required.");
    else if (isNaN(product.price) || product.price <= 0) toast.error("Price must be a valid number greater than zero.");
    else if (product.images.length === 0) toast.error("At least one image is required.");
    else if (product.description === "") toast.error("Description is required.");
    else if (product.category === "") toast.error("Category is required.");
    else if (product.variants.length === 0) toast.error("At least one variant is required.");
    else {
      // Prepare FormData
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('tags', product.tags.join(', '));
      formData.append("variants", JSON.stringify(product.variants));

      // Append existingImages to retain
      formData.append('existingImages', JSON.stringify(existingImages));

      // Append new images
      newImages.forEach((image) => {
        formData.append('images', image);
      });

      onEdit(formData)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Edit Product
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Product Name"
            fullWidth
            value={product.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={product.price}
            onChange={e => handleChange('price', e.target.value)}
          />
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Product Images:
            </Typography>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handleImageUpload}
              style={{ marginBottom: '10px' }}
            />
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    '&:hover .delete-icon': {
                      display: existingImages.includes(image) ? 'flex' : 'none',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`Preview ${index + 1}`}
                    sx={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: '1px solid #e0e0e0',
                      position: 'relative',
                    }}
                  />
                  <IconButton
                    className="delete-icon"
                    onClick={() => handleImageDelete(index)}
                    sx={{
                      display: 'none',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'rgba(255, 255, 255, 0.8)', // Optional: add background for better visibility
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 1)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

          </Box>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={product.description}
            onChange={e => handleChange('description', e.target.value)}
          />
          <TextField
            label="Category"
            fullWidth
            value={product.category}
            onChange={e => handleChange('category', e.target.value)}
          />
          <TextField
            label="Tags (comma-separated)"
            fullWidth
            value={product.tags?.join(', ')}
            onChange={e => handleArrayChange('tags', e.target.value)}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Variants:
          </Typography>
          {product.variants && product.variants.length > 0 && product.variants.map((variant, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 1,
                  mb: 1,
                  p: 1,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1
                }}
              >
                <TextField
                  label="Size"
                  value={variant.size}
                  onChange={e => handleVariantChange(index, 'size', e.target.value)}
                  size="small"
                />
                <TextField
                  label="Color"
                  value={variant.color}
                  onChange={e => handleVariantChange(index, 'color', e.target.value)}
                  size="small"
                />
                <TextField
                  label="Stock"
                  type="number"
                  value={variant.stock}
                  onChange={e => handleVariantChange(index, 'stock', e.target.value)}
                  size="small"
                />
              </Box>
              <IconButton onClick={() => handleVariantDelete(index)}>
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            size="small"
            onClick={addVariant}
            sx={{ alignSelf: 'flex-start' }}
          >
            Add Variant
          </Button>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProduct
