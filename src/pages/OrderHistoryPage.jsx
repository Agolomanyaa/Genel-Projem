import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { fetchOrders } from '../store/actions/clientActions';
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Alışverişe Başla butonu için (opsiyonel)

// FETCH_STATES'i clientReducer veya merkezi bir yerden alabiliriz, şimdilik manuel tanımlayalım
const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

// YENİ: Sahte Sipariş Verisi
const mockOrders = [
  {
    id: 'ORDER123',
    order_date: '2023-10-26T10:30:00Z',
    price: 150.75,
    status: 'Teslim Edildi',
    kargoFirmasiAdi: 'Hayali Kargo',
    kargoTakipNo: 'HK123456789TR',
    kargoTakipUrl: 'https://www.hayalikargo.com/takip?no=',
    faturaUrl: '/placeholder-invoice.pdf',
    products: [
      { id: 'PROD001', name: 'Harika Tişört Mavi', quantity: 1, unit_price: 50.00, image_url: 'https://via.placeholder.com/50/007bff/ffffff?Text=Tshirt' },
      { id: 'PROD002', name: 'Süper Şapka Kırmızı', quantity: 2, unit_price: 25.25, image_url: 'https://via.placeholder.com/50/dc3545/ffffff?Text=Hat' },
    ],
    address: {
      title: 'Ev Adresim',
      street: 'Mutlu Sokak No:15 Daire:3',
      city: 'Gülümseşehir',
      country: 'Hayaller Ülkesi'
    }
  },
  {
    id: 'ORDER456',
    order_date: '2023-11-05T14:00:00Z',
    price: 75.50,
    status: 'Hazırlanıyor',
    kargoFirmasiAdi: 'Jet Kargo',
    kargoTakipNo: 'JK987654321TR',
    kargoTakipUrl: 'https://www.jetkargo.com.tr/tracking?id=',
    faturaUrl: '/placeholder-invoice.pdf',
    products: [
      { id: 'PROD003', name: 'Müthiş Kupa Desenli', quantity: 1, unit_price: 75.50, image_url: 'https://via.placeholder.com/50/28a745/ffffff?Text=Mug' },
    ],
    address: {
        title: 'İş Adresim',
        street: 'Çalışkan Caddesi No:100',
        city: 'Başarıkent',
        country: 'Hayaller Ülkesi'
      }
  },
  {
    id: 'ORDER789',
    order_date: '2023-11-15T09:15:00Z',
    price: 220.00,
    status: 'Kargoda',
    kargoFirmasiAdi: 'Hayali Kargo',
    kargoTakipNo: 'HK555111222TR',
    kargoTakipUrl: 'https://www.hayalikargo.com/takip?no=',
    faturaUrl: '/placeholder-invoice.pdf',
    products: [
      { id: 'PROD001', name: 'Harika Tişört Yeşil', quantity: 2, unit_price: 50.00, image_url: 'https://via.placeholder.com/50/ffc107/000000?Text=Tshirt2' },
      { id: 'PROD004', name: 'Efsane Ceket Siyah', quantity: 1, unit_price: 120.00, image_url: 'https://via.placeholder.com/50/343a40/ffffff?Text=Jacket' },
    ],
    address: {
        title: 'Yazlık Adresim',
        street: 'Deniz Kenarı Yolu No:1',
        city: 'Tatilköy',
        country: 'Hayaller Ülkesi'
      }
  }
];

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { 
    orders: actualOrders, // API'den gelen gerçek siparişler
    fetchOrdersState, 
    fetchOrdersError 
  } = useSelector((state) => state.client);

  // YENİ: Filtreleme için state'ler
  const [selectedYear, setSelectedYear] = useState('all'); // Başlangıçta tüm yıllar seçili
  const [availableYears, setAvailableYears] = useState([]); // Siparişlerden elde edilen mevcut yıllar

  const ordersToDisplayInitially = (fetchOrdersState === FETCH_STATES.FETCHED && actualOrders && actualOrders.length > 0) 
                                  ? actualOrders 
                                  : mockOrders;

  // YENİ: Mevcut yılları ve filtrelenmiş siparişleri hesapla
  useEffect(() => {
    if (ordersToDisplayInitially && ordersToDisplayInitially.length > 0) {
      const years = [...new Set(ordersToDisplayInitially.map(order => new Date(order.order_date).getFullYear()))];
      setAvailableYears(years.sort((a, b) => b - a)); // Yılları büyükten küçüğe sırala
    } else {
      setAvailableYears([]);
    }
  }, [ordersToDisplayInitially]); // ordersToDisplayInitially'e göre çalışsın

  // Filtrelenmiş siparişler
  const filteredOrders = ordersToDisplayInitially.filter(order => {
    if (selectedYear === 'all') {
      return true; // Tüm yıllar seçiliyse hepsini göster
    }
    return new Date(order.order_date).getFullYear() === parseInt(selectedYear);
  });
  
  // GÖSTERİLECEK SİPARİŞLER ARTIK filteredOrders OLACAK
  // Önceki ordersToDisplay tanımını kaldırıp bunu kullanacağız.
  // Loglama için veya başka bir yerde kullanmak istersen ordersToDisplayInitially'i tutabilirsin.

  useEffect(() => {
    if (fetchOrdersState === FETCH_STATES.NOT_FETCHED) {
      dispatch(fetchOrders());
    }
  }, [dispatch]); 

  useEffect(() => {
    console.log('[OrderHistoryPage] State update:');
    console.log('  fetchOrdersState:', fetchOrdersState);
    console.log('  actualOrders count:', actualOrders?.length);
    console.log('  ordersToDisplayInitially count:', ordersToDisplayInitially?.length);
    console.log('  filteredOrders count:', filteredOrders?.length); // filteredOrders'ı logla
    console.log('  selectedYear:', selectedYear);
    console.log('  availableYears:', availableYears);
    console.log('  fetchOrdersError:', fetchOrdersError);
  }, [actualOrders, fetchOrdersState, fetchOrdersError, ordersToDisplayInitially, filteredOrders, selectedYear, availableYears]);

  const renderContent = () => {
    if (fetchOrdersState === FETCH_STATES.FETCHING && (!ordersToDisplayInitially || ordersToDisplayInitially.length === 0)) {
      return (
        <div className="flex items-center justify-center text-gray-500 py-10">
          <FaSpinner className="animate-spin mr-3 text-2xl" />
          <span>Sipariş geçmişiniz yükleniyor...</span>
        </div>
      );
    }

    if (fetchOrdersState === FETCH_STATES.FAILED && (!ordersToDisplayInitially || ordersToDisplayInitially.length === 0)) {
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

    if (!filteredOrders || filteredOrders.length === 0) {
      if (selectedYear !== 'all' && ordersToDisplayInitially && ordersToDisplayInitially.length > 0) {
        return (
          <div className="text-center text-gray-500 py-10">
            <p className="text-xl mb-2">😕</p>
            <p>Seçtiğiniz yılda ({selectedYear}) kayıtlı bir sipariş bulunmamaktadır.</p>
            <p className="text-sm mt-2">Filtreyi değiştirerek diğer yıllardaki siparişlerinizi görebilirsiniz.</p>
          </div>
        );
      }
      return (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl mb-2">😕</p>
          <p>Henüz kayıtlı bir siparişiniz bulunmamaktadır.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <p className="text-lg font-semibold text-gray-700">
          {selectedYear === 'all' ? 'Toplam' : `${selectedYear} yılında`} {filteredOrders.length} sipariş bulundu.
        </p>
        {filteredOrders.map(order => {
          const calculateProductTotal = (product) => product.unit_price * product.quantity;

          return (
            <div key={order.id} className="bg-white shadow-lg rounded-xl p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 pb-5 border-b border-gray-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Sipariş #{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    Tarih: {new Date(order.order_date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className={`mt-2 sm:mt-0 px-4 py-1.5 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap ${
                  order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-700 border border-green-300' :
                  order.status === 'Hazırlanıyor' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                  order.status === 'Kargoda' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                  'bg-gray-100 text-gray-700 border border-gray-300'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3">Ürünler:</h3>
                <ul className="space-y-4">
                  {order.products.map(product => (
                    <li key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm p-3 bg-gray-50 rounded-lg shadow-sm">
                      <img src={product.image_url || 'https://via.placeholder.com/40x40/eee/ccc?text=Ürün'} alt={product.name} className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded-lg " />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate" title={product.name}>{product.name}</p>
                        <p className="text-xs text-gray-500">Birim Fiyat: {product.unit_price.toFixed(2)} TL</p>
                        <p className="text-xs text-gray-500">Adet: {product.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-700 text-base sm:text-lg whitespace-nowrap">
                        {calculateProductTotal(product).toFixed(2)} TL
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Teslimat Adresi:</h4>
                  <p className="text-xs text-gray-600">{order.address.title}</p>
                  <p className="text-xs text-gray-600">{order.address.street}, {order.address.city}, {order.address.country}</p>
                </div>
                {order.kargoTakipNo && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Kargo Bilgileri:</h4>
                    <p className="text-xs text-gray-600">Firma: {order.kargoFirmasiAdi}</p>
                    <p className="text-xs text-gray-600">Takip No: {order.kargoTakipNo}</p>
                    {order.kargoTakipUrl && (
                      <a 
                        href={`${order.kargoTakipUrl}${order.kargoTakipNo}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center mt-1"
                      >
                        Kargoyu Takip Et 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-500 mb-1">Sipariş Toplamı</p>
                  <p className="text-2xl font-bold text-primary">
                    {order.price?.toFixed(2)} TL
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <button 
                    onClick={() => alert(`Fatura indiriliyor: ${order.faturaUrl}`)} 
                    className="w-full sm:w-auto bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-xs font-medium"
                  >
                    Faturayı İndir
                  </button>
                  <button 
                    onClick={() => alert(`İade talebi oluşturuluyor: Sipariş ${order.id}`)} 
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-xs font-medium"
                  >
                    İade Talebi Oluştur
                  </button>
                </div>
              </div>
            </div>
          )
        })}
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
          {/* YIL FİLTRESİ DROPDOWN */}
          {availableYears.length > 0 && (
            <div className="relative">
              <select
                id="yearFilter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none block w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">Tüm Yıllar</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548c.436-.446 1.043-.48 1.576 0L10 10.405l2.908-2.857c.533-.48 1.14-.446 1.576 0 .436.445.408 1.197 0 1.615L10 13.635l-4.484-4.472c-.408-.418-.436-1.17 0-1.615z"/></svg>
              </div>
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default OrderHistoryPage;
