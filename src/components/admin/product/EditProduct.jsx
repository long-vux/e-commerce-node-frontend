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

const EditProduct = ({ open, onClose, onEdit, productToEdit }) => {
  const [product, setProduct] = useState({
    ...productToEdit,
    images: productToEdit?.images || [],  // Ensure images is an array
    variants: productToEdit?.variants || [] // Ensure variants is an array
  })
  const [errors, setErrors] = useState({
    images: '',
    variants: ''
  })

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        ...productToEdit,
        images: productToEdit?.images || [],
        variants: productToEdit?.variants || []
      }) // Pre-fill the form with product data
    }
  }, [productToEdit])

  const handleChange = (field, value) => {
    setProduct({
      ...product,
      [field]: field === 'price' ? parseFloat(value) || 0 : value
    })
  }

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

  const handleImageUpload = e => {
    const files = Array.from(e.target.files)
    const newImages = []

    if (files.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        images: 'Please select at least one image.'
      }))
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        images: ''
      }))
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        newImages.push(reader.result)
        if (newImages.length === files.length) {
          setProduct(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
          }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = () => {
    if (!product.name || !product.price || product.variants.length === 0) {
      // Example validation: check if name, price, and variants are provided
      alert('Please fill in all required fields!')
      return
    }
    onEdit(product)
    onClose()
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
            {errors.images && (
              <Typography color="error">{errors.images}</Typography>
            )}
            {product.images && product.images.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`Preview ${index + 1}`}
                    sx={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}
                  />
                ))}
              </Box>
            )}
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
            label="Categories (comma-separated)"
            fullWidth
            value={product.categories.join(', ')}
            onChange={e => handleArrayChange('categories', e.target.value)}
          />
          <TextField
            label="Tags (comma-separated)"
            fullWidth
            value={product.tags.join(', ')}
            onChange={e => handleArrayChange('tags', e.target.value)}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Variants:
          </Typography>
          {product.variants && product.variants.length > 0 && product.variants.map((variant, index) => (
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
          ))}
          {errors.variants && (
            <Typography color="error">{errors.variants}</Typography>
          )}
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
