import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { name, price, image, totalSold, productId } = product;

  const truncateName = (name) => {
    return name.length > 40 ? name.substring(0, 40) + '...' : name; // 2 lines
  }

  // convert sold to k if it is greater than 1000
  const formattedSold = totalSold > 1000 ? (totalSold / 1000) + 'k' : totalSold;

  return (
    <div className="relative p-4 rounded-2xl bg-white shadow-lg hover:scale-105 transition-all duration-300 ">
      <img src={image} alt={name} className=' object-contain rounded-t-2xl' />
      <div className='flex flex-col justify-start items-start'>
        <h3 className="text-[18px] font-semibold cursor-pointer" onClick={() => navigate(`/product/${productId}`)}>{truncateName(name)}</h3>
        <div className='flex flex-row justify-between items-center gap-2 w-full'>
          <p className="text-[14px] ">sold {formattedSold} </p>
          <p className="text-[20px] text-red-500 font-semibold">{price}$</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
