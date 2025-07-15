import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const ProductCard = ({ product }) => {
  if (!product || !product.category) {
    return null;
  }

  const { 
    id,
    images,
    name,
    price,
    category
  } = product;

  const mainImageUrl = (Array.isArray(images) && images.length > 0 && images[0].url) 
                       ? images[0].url 
                       : `https://via.placeholder.com/300x375/efefef/999999?text=No+Image`;

  const productNameSlug = slugify(name);
  const categorySlug = slugify(category.name);
  
  const productDetailUrl = `/shop/${category.gender}/${categorySlug}/${category.id}/${productNameSlug}/${id}`;

  return (
    <Link 
      to={productDetailUrl}
      className="block group text-center cursor-pointer"
    >
      <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100 rounded">
        <img
          src={mainImageUrl}
          alt={name || 'Product Image'}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h5 className="text-base font-bold text-dark-text mb-2 h-12 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {name || 'Product Title'}
      </h5>
      <div className="flex justify-center items-baseline gap-2 font-bold text-base">
        <span className="text-secondary">${price ? price.toFixed(2) : '0.00'}</span>
      </div>
    </Link>
  );
};

export default ProductCard; 