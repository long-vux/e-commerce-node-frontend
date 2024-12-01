import React from 'react';

const ImageWithText = ({ imgSrc, styleName }) => {
  return (
      <div className="w-[15rem] h-[15rem] relative">
        <img
          src={imgSrc}
          alt={styleName}
          className="w-full h-full object-cover"
        />
        <p className="absolute inset-0 flex items-center justify-center text-white text-[30px] font-semibold text-shadow-xl">
          {styleName}
        </p>
      </div>
  );
};

export default ImageWithText;
