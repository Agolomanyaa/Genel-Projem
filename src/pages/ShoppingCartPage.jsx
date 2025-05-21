import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Henüz kullanmayacak olsak da, ileride ihtiyaç duyabiliriz
import {
  removeFromCart,
  updateCartItemCount,
  toggleProductChecked, // Yeni eklediğimiz action
} from '../store/actions/shoppingCartActions';
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'; // İkonlar

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shoppingCart);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemCount(productId, newQuantity));
    } else {
      // Adet 0 veya altına düşerse ürünü kaldır (veya sadece 1'in altına düşmesini engelle)
      // Şimdilik updateCartItemCount zaten 0 ise siliyor, bu yüzden doğrudan dispatch edebiliriz.
      dispatch(updateCartItemCount(productId, newQuantity)); 
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleChecked = (productId) => {
    dispatch(toggleProductChecked(productId));
  };

  const calculateSelectedTotal = () => {
    return cart
      .filter(item => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0)
      .toFixed(2);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Your Shopping Cart is Empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/shop" // "/shop" veya ana alışveriş sayfanızın yolu
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // TODO: Sepet doluysa ürünleri listeleyen JSX buraya gelecek
  // Şimdilik basit bir başlık ve seçili ürünlerin toplamını gösterelim
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Shopping Cart</h1>
      
      {/* Ürün listesi buraya gelecek (Data Table benzeri yapı) */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map((item) => (
              <tr key={item.product.id} className={`${item.checked ? '' : 'bg-gray-50 opacity-60'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary-dark"
                    checked={item.checked}
                    onChange={() => handleToggleChecked(item.product.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img 
                        className="h-16 w-16 rounded-md object-cover" 
                        src={item.product.imageUrl || 'https://via.placeholder.com/150'}
                        alt={item.product.name} 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                      {/* İleride kategori, renk, beden gibi bilgiler eklenebilir */}
                      <div className="text-xs text-gray-500">{item.product.category_id || 'Category'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${item.product.price?.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                      disabled={item.count <= 1} // Eğer 0'a düşünce silinmesini istiyorsak bu disabled koşulu kaldırılabilir veya güncellenebilir
                      className="p-1 border rounded-l-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-3 py-1 border-t border-b text-sm font-medium text-gray-700">
                      {item.count}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                      disabled={item.product.stock !== undefined && item.count >= item.product.stock}
                      className="p-1 border rounded-r-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${(item.product.price * item.count).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove item"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-8">
        <div className="text-right">
          <p className="text-lg text-gray-600">Selected Items Total:</p>
          <p className="text-3xl font-bold text-gray-800">${calculateSelectedTotal()}</p>
          <button 
            disabled={cart.filter(item => item.checked).length === 0}
            className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            // onClick={() => { /* TODO: Navigate to checkout page */ }}
          >
            Proceed to Checkout ({cart.filter(item => item.checked).length} items)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
