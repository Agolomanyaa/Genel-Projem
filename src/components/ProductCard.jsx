import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  // Eğer ürün bilgisi yoksa veya kategori bilgisi eksikse kartı render etme
  if (!product || !product.category) {
    return null;
  }

  // Her kartın kendi ürün bilgisiyle doğru linki oluşturmasını sağlıyoruz.
  const productUrl = `/shop/${product.category.gender}/${product.category.name.toLowerCase().replace(/ /g, '-')}/${product.category.id}/${product.name.toLowerCase().replace(/ /g, '-')}/${product.id}`;
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : "https://picsum.photos/400/500";

  return (
    <div className="group/card relative flex flex-col items-center text-center font-bold shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link to={productUrl} className="w-full">
        <div className="relative w-full pb-[125%] overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/card:bg-opacity-20 transition-all duration-300"></div>
      </Link>

      <div className="p-4 bg-white w-full flex flex-col items-center flex-grow">
        <h5 className="text-md text-dark-text mb-2">{product.name}</h5>
        <a href="#" className="text-sm text-second-text mb-2 hover:text-primary">{product.category.name}</a>
        <div className="flex gap-x-2">
          <h5 className="text-md text-muted-text line-through">${(product.price * 1.15).toFixed(2)}</h5>
          <h5 className="text-md text-secondary-color">${product.price.toFixed(2)}</h5>
        </div>
      </div>
      
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-primary hover:text-white transition-colors">
            <FaShoppingCart />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-primary hover:text-white transition-colors">
            <FaHeart />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-primary hover:text-white transition-colors">
            <FaSearch />
          </button>
      </div>
    </div>
  );
};

export default ProductCard; 