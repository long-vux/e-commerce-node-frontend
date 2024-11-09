import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartOutlined } from '@mui/icons-material'

function ProductCard({ product, onAddToCart }) {
  const { id, name, price, image } = product;

  const handleAddToCart = () => {
    onAddToCart(id);
  };

  return (
    <div className="p-4 border border-2 border-gray-300 relative">
      <img src={image} alt={name} className=' object-contain' />
      <h3 className="text-[20px] font-bold">{name}</h3>
      <p className="text-[20px] text-red-600 font-semibold">{price.toFixed(2)}$ <span className="line-through text-gray-500">{price.toFixed(2)*2}$</span></p>
      <button onClick={handleAddToCart} className='w-full h-[50px] bg-red-500 rounded-lg hover:scale-110 transition-all duration-300'>
        <ShoppingCartOutlined sx={{color:'white', fontSize: '30px'}}/>
        <span className="text-center text-white font-bold text-[16px] md:text-[20px] "> Add to Cart</span>
      </button>
      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">50%</div>

    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, // or string, depending on your data
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
