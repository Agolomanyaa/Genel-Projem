import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { fetchOrders } from '../store/actions/clientActions';
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { 
    orders,
    fetchOrdersState, 
    fetchOrdersError 
  } = useSelector((state) => state.client);

  useEffect(() => {
    // Component yüklendiğinde ve siparişler henüz çekilmemişse siparişleri çek.
    if (fetchOrdersState === FETCH_STATES.NOT_FETCHED) {
      dispatch(fetchOrders());
    }
  }, [dispatch, fetchOrdersState]);

  const renderContent = () => {
    if (fetchOrdersState === FETCH_STATES.FETCHING) {
      return (
        <div className="flex items-center justify-center text-gray-500 py-10">
          <FaSpinner className="animate-spin mr-3 text-2xl" />
          <span>Sipariş geçmişiniz yükleniyor...</span>
        </div>
      );
    }

    if (fetchOrdersState === FETCH_STATES.FAILED) {
      return (
        <div className="text-red-500 bg-red-100 p-4 rounded-md flex items-center my-4">
          <FaExclamationCircle className="mr-3 text-xl flex-shrink-0" />
          <span>
            Sipariş geçmişi yüklenirken bir hata oluştu: {fetchOrdersError || 'Bilinmeyen bir hata.'}
            <button 
              onClick={() => dispatch(fetchOrders())} 
              className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Tekrar Dene
            </button>
          </span>
        </div>
      );
    }

    if (!orders || orders.length === 0) {
      return (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl mb-2">😕</p>
          <p>Henüz kayıtlı bir siparişiniz bulunmamaktadır.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {orders.map(order => (
          <div key={order.id} className="bg-white shadow-lg rounded-xl p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 pb-5 border-b border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Sipariş #{order.id}</h2>
                <p className="text-sm text-gray-500">
                  Tarih: {new Date(order.orderDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span className={`mt-2 sm:mt-0 px-4 py-1.5 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap ${
                order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 border border-green-300' :
                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                'bg-gray-100 text-gray-700 border border-gray-300'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-700 mb-3">Ürünler:</h3>
              <ul className="space-y-4">
                {/* ANA DÜZELTME: order.products.map -> order.orderItems.map */}
                {/* VE içindeki alan adları da DTO ile uyumlu hale getirildi. */}
                {order.orderItems.map(item => (
                  <li key={`${item.productId}-${item.variantInfo}`} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm p-3 bg-gray-50 rounded-lg shadow-sm">
                    <img src={item.productImageUrl || 'https://via.placeholder.com/40x40/eee/ccc?text=Ürün'} alt={item.productName} className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate" title={item.productName}>{item.productName}</p>
                      <p className="text-xs text-gray-500">Detay: {item.variantInfo}</p>
                      <p className="text-xs text-gray-500">Adet: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-700 text-base sm:text-lg whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} TL
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Teslimat Adresi:</h4>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-500 mb-1">Sipariş Toplamı</p>
                <p className="text-2xl font-bold text-primary">
                  {order.totalPrice?.toFixed(2)} TL
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button 
                  disabled 
                  className="w-full sm:w-auto bg-gray-600 text-white px-4 py-2 rounded-md transition-colors text-xs font-medium opacity-50 cursor-not-allowed"
                >
                  Faturayı İndir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-0">
            Sipariş Geçmişim
          </h1>
        </div>
        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default OrderHistoryPage;
