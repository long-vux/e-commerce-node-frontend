import React, { useState } from "react";
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
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddProduct = ({ open, onClose, onAdd }) => {
  const initialProductState = {
    name: "",
    price: 0, // Initialize price as a number
    images: [],
    description: "",
    categories: [],
    tags: [],
    variants: [{ size: "", color: "", stock: "" }],
  };

  const [product, setProduct] = useState(initialProductState);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    images: "",
    variants: "",
  });

  const handleChange = (field, value) => {
    setProduct({
      ...product,
      [field]: field === "price" ? parseFloat(value) || 0 : value, // Parse price as a float
    });
  };

  const handleArrayChange = (field, value) => {
    setProduct({
      ...product,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][field] = value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: "", color: "", stock: "" }],
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      setErrors({ ...errors, images: "At least one image is required." });
      return;
    }

    setErrors({ ...errors, images: "" });

    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let tempErrors = { ...errors };

    if (!product.name) {
      tempErrors.name = "Product name is required.";
      formIsValid = false;
    } else {
      tempErrors.name = "";
    }

    if (isNaN(product.price) || product.price <= 0) {
      tempErrors.price = "Price must be a valid number greater than zero.";
      formIsValid = false;
    } else {
      tempErrors.price = "";
    }

    if (product.images.length === 0) {
      tempErrors.images = "At least one image is required.";
      formIsValid = false;
    } else {
      tempErrors.images = "";
    }

    // Validate variants
    let variantErrors = "";
    product.variants.forEach((variant, index) => {
      if (!variant.size || !variant.color || !variant.stock) {
        variantErrors = "All variant fields (size, color, stock) must be filled.";
        formIsValid = false;
      }
    });
    tempErrors.variants = variantErrors;

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd(product);
      onClose();
      resetForm(); // Reset the form after successful submit
    }
  };

  const resetForm = () => {
    setProduct(initialProductState);
    setErrors({
      name: "",
      price: "",
      images: "",
      variants: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Add New Product
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
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={product.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
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
              style={{ marginBottom: "10px" }}
            />
            {errors.images && <Typography color="error">{errors.images}</Typography>}
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Preview ${index + 1}`}
                  sx={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                  }}
                />
              ))}
            </Box>
          </Box>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextField
            label="Categories (comma-separated)"
            fullWidth
            value={product.categories.join(", ")}
            onChange={(e) => handleArrayChange("categories", e.target.value)}
          />
          <TextField
            label="Tags (comma-separated)"
            fullWidth
            value={product.tags.join(", ")}
            onChange={(e) => handleArrayChange("tags", e.target.value)}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Variants:
          </Typography>
          {product.variants.map((variant, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 1,
                mb: 1,
                p: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
              }}
            >
              <TextField
                label="Size"
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
                size="small"
              />
              <TextField
                label="Color"
                value={variant.color}
                onChange={(e) =>
                  handleVariantChange(index, "color", e.target.value)
                }
                size="small"
              />
              <TextField
                label="Stock"
                type="number"
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
                size="small"
              />
            </Box>
          ))}
          {errors.variants && <Typography color="error">{errors.variants}</Typography>}
          <Button
            variant="outlined"
            size="small"
            onClick={addVariant}
            sx={{ alignSelf: "flex-start" }}
          >
            Add Variant
          </Button>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
