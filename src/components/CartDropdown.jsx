import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromCart, updateCartItemCount } from '../store/actions/shoppingCartActions';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartDropdown = ({ isOpen, toggleDropdown }) => {
  const { cart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemove = (variantId) => {
    dispatch(removeFromCart(variantId));
  };

  const handleUpdateCount = (variantId, newCount) => {
    if (newCount > 0) {
      dispatch(updateCartItemCount(variantId, newCount));
    } else {
      dispatch(removeFromCart(variantId));
    }
  };

  const handleViewCart = () => {
    history.push('/cart');
    toggleDropdown(); 
  };

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.count, 0);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50"
      // --- ANA DÜZELTME BURADA ---
      // Bu div'in içindeki tıklama olaylarının dışarı "sızmasını" engelliyoruz.
      // Bu sayede Navbar'daki "dışarıya tıklandı" algılayıcısı yanlışlıkla tetiklenmez.
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-dark-text mb-4">Shopping Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.product.variantId} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-sm text-dark-text leading-tight">{item.product.name}</p>
                      <p className="text-xs text-gray-500">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleUpdateCount(item.product.variantId, item.count - 1)} className="p-1 text-gray-500 hover:text-black">
                      <FaMinus size={12} />
                    </button>
                    <span className="text-sm font-bold">{item.count}</span>
                    <button onClick={() => handleUpdateCount(item.product.variantId, item.count + 1)} className="p-1 text-gray-500 hover:text-black">
                      <FaPlus size={12} />
                    </button>
                    <button onClick={() => handleRemove(item.product.variantId)} className="ml-2 p-1 text-red-500 hover:text-red-700">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-dark-text">Subtotal:</span>
                <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleViewCart}
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition"
              >
                View Cart & Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown; 