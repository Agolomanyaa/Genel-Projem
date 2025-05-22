import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Henüz kullanmayacak olsak da, ileride ihtiyaç duyabiliriz
import {
  removeFromCart,
  updateCartItemCount,
  toggleProductChecked, // Yeni eklediğimiz action
} from '../store/actions/shoppingCartActions';
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'; // İkonlar
import OrderSummary from '../components/OrderSummary'; // OrderSummary component'ini import et
import MainLayout from '../layouts/MainLayout'; // MainLayout import edildi

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

  if (!cart || cart.length === 0) {
    return (
      <MainLayout>
        {/* Kenar boşlukları ve ortalama için container div'i burada gerekli */}
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"> {/* Örnek min yükseklik, header/footer yüksekliğine göre ayarla */}
          <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-semibold text-gray-700 mb-4">Your Shopping Cart is Empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/shop"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </MainLayout>
    );
  }

  // TODO: Sepet doluysa ürünleri listeleyen JSX buraya gelecek
  // Şimdilik basit bir başlık ve seçili ürünlerin toplamını gösterelim
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8"> {/* Ana içerik için container ve paddingler */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">My Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Taraf: Ürün Listesi */}
          <div className="lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.product.id} className={`${item.checked ? '' : 'bg-gray-50 opacity-60'}`}>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary-dark"
                          checked={item.checked}
                          onChange={() => handleToggleChecked(item.product.id)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-14 w-14 sm:h-16 sm:w-16">
                            <img 
                              className="h-full w-full rounded-md object-cover" 
                              src={item.product.imageUrl || 'https://via.placeholder.com/150'}
                              alt={item.product.name} 
                            />
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                            {/* İleride kategori, renk, beden gibi bilgiler eklenebilir */}
                            <div className="text-xs text-gray-500">{item.product.category_id || 'Category'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        <div className="text-sm text-gray-900">${item.product.price?.toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                            disabled={item.count <= 1}
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
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">
                        ${(item.product.price * item.count).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium sm:px-6">
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
          </div>

          {/* Sağ Taraf: Sipariş Özeti */}
          <div className="lg:w-1/3">
            <OrderSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShoppingCartPage;
