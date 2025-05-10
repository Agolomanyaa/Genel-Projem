import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { 
    id,
    images,
    name,
    price,
  } = product;

  const mainImageUrl = (Array.isArray(images) && images.length > 0 && images[0].url) 
                       ? images[0].url 
                       : 'https://via.placeholder.com/300x375/efefef/999999?text=No+Image';

  const displayOldPrice = product.oldPrice || null;

  return (
    <Link to={`/product/${id}`} className="block group text-center">
      <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100 rounded">
        <img
          src={mainImageUrl}
          alt={name || 'Product Image'}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h5 className="text-base font-bold text-dark-text mb-2 h-12 line-clamp-2 group-hover:text-primary">
          {name || 'Product Title'}
      </h5>
      <div className="flex justify-center items-baseline gap-2 font-bold text-base">
        <span className="text-secondary">${price || '0.00'}</span>
      </div>
    </Link>
  );
};

export default ProductCard; 