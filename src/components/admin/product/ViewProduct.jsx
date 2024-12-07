import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Chip, Stack, Grid, Avatar, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ViewProduct = ({ open, close, product }) => {
  if (!product) return null;

  const { name, price, description, category, tags, variants, images } = product;
  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="bold">
            Product Details
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Image */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={images[0]}
              variant="square"
              sx={{ width: 200, height: 200, borderRadius: 2 }}
            />
          </Box>
          <div className="flex justify-start gap-2">
            {images?.map((image, index) => (
              <Avatar key={index} src={image} variant="square" sx={{ width: 100, height: 100, borderRadius: 2 }} />
            ))}
          </div>

          {/* Product Info */}
          <Box>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {name || 'No name'}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              ${price?.toFixed(2) || '0.00'}
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {description || 'No description'}
          </Typography>

          {/* Categories */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Categories:
            </Typography>
            <Chip
              key={category}
              label={category || 'No category'}
            />
          </Box>

          {/* Tags */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Tags:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {tags?.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
            </Stack>
          </Box>

          {/* Variants */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Variants:
            </Typography>
            <Grid container spacing={2}>
              {variants?.map((variant, index) => (
                <Grid
                  item
                  xs={6}
                  key={index}
                  sx={{
                    border: "1px solid #e0e0e0",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>Size:</strong> {variant.size}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Color:</strong> {variant.color}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Stock:</strong> {variant.stock}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
