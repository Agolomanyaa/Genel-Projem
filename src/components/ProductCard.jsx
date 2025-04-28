import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // product objesi gelmezse hata vermesin diye kontrol
  if (!product) {
    return null; // veya bir yükleniyor/hata durumu gösterilebilir
  }

  const { productId, imageUrl, title, category, price, oldPrice } = product;

  return (
    <Link to={`/product/${productId}`} className="block group text-center">
      <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100 rounded"> {/* Köşeleri yuvarla */}
        <img
          src={imageUrl || 'https://via.placeholder.com/300x375/efefef/999999?text=No+Image'}
          alt={title || 'Product Image'}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      {/* Başlık en fazla 2 satır olsun */}
      <h5 className="text-base font-bold text-dark-text mb-2 h-12 line-clamp-2 group-hover:text-primary">
          {title || 'Product Title'}
      </h5>
      {/* Kategori kaldırılabilir veya isteğe bağlı */}
      {/* <p className="text-sm font-bold text-second-text mb-2">{category || 'Uncategorized'}</p> */}
      <div className="flex justify-center items-baseline gap-2 font-bold text-base">
        {oldPrice && (
          <span className="text-muted-text line-through">${oldPrice}</span>
        )}
        <span className="text-secondary">${price || '0.00'}</span>
      </div>
    </Link>
  );
};

export default ProductCard; 