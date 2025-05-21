import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemCount } from '../store/actions/shoppingCartActions';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

const CartDropdown = ({ isOpen, toggleDropdown }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shoppingCart);

  if (!isOpen) {
    return null;
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemCount(productId, newQuantity));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.count, 0).toFixed(2);
  };

  return (
    <div 
      className="cart-dropdown-component absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-md shadow-xl z-20 border border-gray-200"
      onClick={(e) => {
        e.stopPropagation(); 
      }}
    >
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">Shopping Cart</h3>
      </div>

      {cart.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto p-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <img 
                    src={item.product.imageUrl || 'https://via.placeholder.com/50'} 
                    alt={item.product.name} 
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <Link 
                      to={`/shop/product/${item.product.id}`} 
                      onClick={toggleDropdown}
                      className="text-sm font-medium text-gray-800 hover:text-primary block"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-xs text-gray-500">
                      ${item.product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end ml-2">
                  <div className="flex items-center text-xs mb-1">
                    <button 
                      onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                      className="p-1 text-gray-500 hover:text-primary disabled:opacity-50"
                      disabled={item.count <= 1}
                    >
                      <FaMinus size={10}/>
                    </button>
                    <span className="mx-1.5 w-5 text-center text-gray-900 font-semibold">
                      {item.count}
                    </span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                      className="p-1 text-gray-500 hover:text-primary disabled:opacity-50"
                      disabled={item.product.stock !== undefined && item.count >= item.product.stock}
                    >
                      <FaPlus size={10}/>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt className="inline mr-1" size={10}/> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-md font-semibold text-gray-700">Subtotal:</span>
              <span className="text-md font-bold text-gray-900">${calculateSubtotal()}</span>
            </div>
            <Link
              to="/cart"
              onClick={toggleDropdown}
              className="block w-full bg-primary text-white text-center font-semibold py-2 px-4 rounded hover:bg-primary-dark transition-colors"
            >
              View Cart & Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown; 