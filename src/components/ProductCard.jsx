import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const ProductCard = ({ product, category }) => {
  if (!product) {
    return null;
  }

  const { 
    id,
    images,
    name,
    price,
    category_id
  } = product;

  const mainImageUrl = (Array.isArray(images) && images.length > 0 && images[0].url) 
                       ? images[0].url 
                       : 'https://via.placeholder.com/300x375/efefef/999999?text=No+Image';

  const productId = id;
  const productNameSlug = slugify(name);
  
  const catId = category ? category.id : category_id;
  const categorySlug = category ? slugify(category.title) : 'unknown-category';
  
  const gender = category ? category.gender : 'unisex';

  const productDetailUrl = `/shop/${gender}/${categorySlug}/${catId}/${productNameSlug}/${productId}`;

  console.log('[ProductCard] Preparing URL for Product:', name, '(ID:', id, ')');
  console.log('[ProductCard] Received Category Object:', category);
  console.log('[ProductCard] Calculated Gender:', gender);
  console.log('[ProductCard] Calculated Category Slug:', categorySlug);
  console.log('[ProductCard] Using Category ID:', catId);
  console.log('[ProductCard] Calculated Product Name Slug:', productNameSlug);
  console.log('[ProductCard] --------- Generated productDetailUrl:', productDetailUrl);

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
        <span className="text-secondary">${price || '0.00'}</span>
      </div>
    </Link>
  );
};

export default ProductCard; 