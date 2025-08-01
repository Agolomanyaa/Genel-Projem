import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/shoppingCartActions';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  if (!product || !product.category) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Link'e tıklanmasını engelle
    e.preventDefault(); // Varsayılan davranışı engelle

    // Stokta olan ilk varyantı bul
    const firstAvailableVariant = product.variants?.find(v => v.stock > 0);

    if (firstAvailableVariant) {
      const productToAdd = {
        id: product.id,
        variantId: firstAvailableVariant.id,
        name: `${product.name} (${firstAvailableVariant.color} / ${firstAvailableVariant.size})`,
        price: product.price,
        imageUrl: product.images?.[0]?.url || '',
        stock: firstAvailableVariant.stock,
      };
      dispatch(addToCart(productToAdd, 1));
      toast.success(`${productToAdd.name} sepete eklendi!`);
    } else {
      toast.warn('Bu ürünün stokları tükenmiştir.');
    }
  };

  const productUrl = `/product/${product.id}`;
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
        <Link to={`/shop?category=${product.category.id}`} className="text-sm text-second-text mb-2 hover:text-primary">{product.category.name}</Link>
        <div className="flex gap-x-2">
          <h5 className="text-md text-muted-text line-through">${(product.price * 1.15).toFixed(2)}</h5>
          <h5 className="text-md text-secondary-color">${product.price.toFixed(2)}</h5>
        </div>
      </div>
      
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-primary hover:text-white transition-colors"
            title="Add to Cart"
          >
            <FaShoppingCart />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-primary hover:text-white transition-colors">
            <FaHeart />
          </button>
          <Link to={productUrl} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-primary hover:text-white transition-colors">
            <FaSearch />
          </Link>
      </div>
    </div>
  );
};

export default ProductCard; 