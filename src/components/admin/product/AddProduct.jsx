import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Stack, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const AddProduct = ({ open, onClose, onAdd }) => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    weight: 500,
    images: [],
    description: "",
    category: "",
    tags: "",
    variants: [{ size: "", color: "", stock: "" }],

  });

  const [imageFiles, setImageFiles] = useState([]); // New state to store image files

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
      toast.error("At least one image is required.");
      return;
    }

    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    // Optional: Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...previews],
    }));
  };

  const handleImageDelete = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleVariantDelete = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let formIsValid = true;

    if (!product.name) {
      toast.error("Product name is required.");
      formIsValid = false;
    } else if (isNaN(product.price) || product.price <= 0) {
      toast.error("Price must be a valid number greater than zero.");
      formIsValid = false;
    } else if (imageFiles.length === 0) { // Check imageFiles instead of product.images
      toast.error("At least one image is required.");
      formIsValid = false;
    } else if (product.description === "") {
      toast.error("Description is required.");
      formIsValid = false;
    } else if (product.category === "") {
      toast.error("Category is required.");
      formIsValid = false;
    } else if (product.variants.length === 0) {
      toast.error("At least one variant is required.");
      formIsValid = false;
    } else {
      product.variants.forEach((variant, index) => {
        if (!variant.size || !variant.color || !variant.stock) {
          toast.error("All variant fields (size, color, stock) must be filled.");
          formIsValid = false;
        }
      });
    }


    return formIsValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("tags", product.tags);
        formData.append("variants", JSON.stringify(product.variants));
        formData.append("weight", product.weight);

        imageFiles.forEach((file) => {
          formData.append("images", file);
        });

        await onAdd(formData); // Ensure onAdd handles FormData appropriately
      } catch (error) {
        // Handle error appropriately
        console.error("Error adding product:", error);
      }
    }
  };

  const resetForm = () => {
    setImageFiles([]);
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
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={product.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
          <TextField
            label="Weight (gram, default 500)"
            fullWidth
            type="number"
            value={product.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
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
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    '&:hover .delete-icon': {
                      display: 'flex',
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
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextField
            label="Category"
            fullWidth
            value={product.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <TextField
            label="Tags (comma-separated)"
            fullWidth
            value={product.tags}
            onChange={(e) => handleArrayChange("tags", e.target.value)}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Variants:
          </Typography>
          {product.variants.map((variant, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              <IconButton onClick={() => handleVariantDelete(index)}>
                <CloseIcon />
              </IconButton>
            </div>
          ))}
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