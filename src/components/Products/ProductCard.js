import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartOutlined, CheckCircle, FavoriteBorder, Favorite } from '@mui/icons-material'
import axios from 'axios';
import { getSessionId, getUserId } from '../../utils/session';

function ProductCard({ product }) {
  const { id, name, price, image } = product;
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);

  const handleAddToCart = async () => {
    const sessionId = getSessionId();
    const userId = getUserId();

    try {
      const response = await axios.post('/api/cart/add', {
        userId: userId || null,
        sessionId: sessionId,
        productId: id,
        quantity: 1,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
    setIsAdded(true);
  };

  const handleRemoveFromCart = async (productId) => {
    const sessionId = getSessionId();
    const userId = getUserId();

    try {
      const response = await axios.post('/api/cart/remove', {
        userId: userId || null,
        sessionId: sessionId,
        productId: productId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error removing from cart', error);
    }
    setIsAdded(false);
  };

  const handleAddToFavorite = async () => {
    setIsFavorite(true);
  };
  const handleRemoveFromFavorite = async () => {
    setIsFavorite(false);
  };

  return (
    <div className="relative p-4 rounded-2xl bg-white shadow-lg hover:scale-105 transition-all duration-300">
      <img src={image} alt={name} className=' object-contain rounded-t-2xl' />
      <div className="flex flex-row justify-end items-center gap-2 mb-2">
        {isFavorite ? (
          <button onClick={handleRemoveFromFavorite} className='flex items-center justify-center '>
            <Favorite sx={{ fontSize: '30px', color: 'red', backdropFilter: 'blur(10px)' }} />
          </button>
        ) : (
          <button onClick={handleAddToFavorite} className='flex items-center justify-center '>
            <FavoriteBorder sx={{ fontSize: '30px' }} />
          </button>
        )}

        {isAdded ? (
          <button onClick={handleRemoveFromCart} className='bottom-0 right-0 w-[30px] h-[30px] bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center'>
            <CheckCircle sx={{ fontSize: '30px', color: 'green' }} />
          </button>
        ) : (
          <button onClick={handleAddToCart} className='bottom-0 right-0 w-[30px] h-[30px] bg-gray-200 rounded-full hover:bg-gray-300'>
            <ShoppingCartOutlined sx={{ fontSize: '20px' }} />
          </button>
        )}
      </div>
      <div className='flex flex-row justify-between items-center  '>
        <h3 className="text-[18px] font-bold w-[200px]">{name}</h3>
        <p className="text-[18px]">{price.toFixed(2)}$</p>
      </div>
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
