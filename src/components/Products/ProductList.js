import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, handleAddToCart }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart} 
        />
      ))}
    </div>
  );
}

export default ProductList;
