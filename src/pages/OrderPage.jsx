import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Giriş yapılmamışsa yönlendirme için
import MainLayout from '../layouts/MainLayout';
import OrderSummary from '../components/OrderSummary'; // Sipariş özetini tekrar kullanacağız
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../store/actions/clientActions'; // fetchAddresses ve addAddress action'larını import et
import AddressForm from '../components/AddressForm'; // AddressForm'u import et
import { FaSpinner, FaExclamationCircle, FaPlusCircle } from 'react-icons/fa'; // Yükleme ve hata ikonları için

// productReducer'daki FETCH_STATES'i veya kendi tanımladığınızı kullanın
const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector((state) => state.shoppingCart);
  
  // Adres bilgilerini Redux store'dan al
  const { 
    addressList, 
    getAddressFetchState, 
    getAddressError 
  } = useSelector((state) => state.client);

  // Yeni adres formu görünürlüğü için state
  const [showAddressForm, setShowAddressForm] = useState(false);
  // Yeni state: Hangi adresin düzenlendiğini tutar.
  // null ise yeni adres ekleme modu, obje ise düzenleme modu.
  const [editingAddress, setEditingAddress] = useState(null); 

  useEffect(() => {
    if (cart.length === 0) {
      history.push('/cart');
    } else {
      if (getAddressFetchState === FETCH_STATES.NOT_FETCHED) {
        dispatch(fetchAddresses());
      }
    }
  }, [cart, history, dispatch, getAddressFetchState]);

  const handleAddNewAddressSubmit = (formData) => {
    dispatch(addAddress(formData, () => {
      setShowAddressForm(false);
    }));
  };
  
  const handleUpdateAddressSubmit = (formData) => {
    if (!formData.id && editingAddress && editingAddress.id) {
      console.warn("[OrderPage] formData'dan ID gelmedi, editingAddress.id kullanılıyor olabilir ama bu beklenmedik.");
    }
    
    dispatch(updateAddress(formData, () => { 
      setShowAddressForm(false);
      setEditingAddress(null);
    }));
  };

  const openEditForm = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const closeAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  // YENİ: Adres silme handler fonksiyonu
  const handleDeleteAddress = (addressId, addressTitle) => {
    // Kullanıcıya onay sorusu sor
    if (window.confirm(`"${addressTitle}" başlıklı adresi silmek istediğinizden emin misiniz?`)) {
      console.log(`[OrderPage] Deleting address with ID: ${addressId}`);
      dispatch(deleteAddress(addressId));
      // Opsiyonel: Silme işlemi tamamlandıktan sonra bir işlem yapmak isterseniz
      // dispatch(deleteAddress(addressId, () => {
      //   console.log("Adres silindi, callback çalıştı.");
      // }));
    } else {
      console.log(`[OrderPage] Address deletion cancelled for ID: ${addressId}`);
    }
  };

  // Eğer sepet boşsa ve yönlendirme henüz gerçekleşmediyse (veya bir yükleme durumu varsa)
  // bir mesaj gösterilebilir, ancak useEffect hemen yönlendireceği için bu kısım gerekmeyebilir.
  if (cart.length === 0 && getAddressFetchState !== FETCH_STATES.FETCHING) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          Yönlendiriliyor...
        </div>
      </MainLayout>
    );
  }

  const renderAddressList = () => {
    if (getAddressFetchState === FETCH_STATES.FETCHING) {
      return (
        <div className="flex items-center justify-center text-gray-500 py-4">
          <FaSpinner className="animate-spin mr-2" /> Adresler yükleniyor...
        </div>
      );
    }

    if (getAddressFetchState === FETCH_STATES.FAILED) {
      return (
        <div className="text-red-500 bg-red-100 p-3 rounded-md flex items-center my-2">
          <FaExclamationCircle className="mr-2 flex-shrink-0" />
          <span>Adresler yüklenirken bir hata oluştu: {getAddressError || 'Bilinmeyen bir hata.'}</span>
        </div>
      );
    }

    if (getAddressFetchState === FETCH_STATES.FETCHED && addressList.length === 0 && !showAddressForm) {
      return <p className="text-gray-500 text-sm py-2">Henüz kayıtlı bir teslimat adresiniz bulunmamaktadır. Lütfen yeni bir adres ekleyin.</p>;
    }

    if (getAddressFetchState === FETCH_STATES.FETCHED && addressList.length > 0) {
      return (
        <div className="space-y-4">
          {addressList.map((address) => (
            <div key={address.id} className="border border-gray-300 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-primary">{address.title}</h4>
                <div>
                  <button 
                    onClick={() => openEditForm(address)}
                    className="text-xs text-blue-600 hover:underline mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDeleteAddress(address.id, address.title)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700">{address.name} {address.surname}</p>
              <p className="text-sm text-gray-600">{address.phone}</p>
              <p className="text-sm text-gray-600">
                {address.neighborhood}, {address.district}, {address.city}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Taraf: Adres Bilgileri ve Formu */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Adres Bilgileri</h2>
              <p className="text-sm text-gray-500 mb-6">Teslimat ve fatura adresinizi yönetin.</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Kayıtlı Adreslerim</h3>
                {renderAddressList()}
              </div>

              <hr className="my-6"/>

              <div>
                {!showAddressForm && (
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressForm(true);
                    }}
                    className="flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-dashed border-gray-400 text-gray-700 rounded-md hover:bg-gray-50 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaPlusCircle className="mr-2" /> Yeni Adres Ekle
                  </button>
                )}

                {showAddressForm && (
                  <>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                    </h3>
                    <AddressForm 
                      onSubmit={editingAddress ? handleUpdateAddressSubmit : handleAddNewAddressSubmit}
                      initialData={editingAddress}
                      onCancel={closeAddressForm}
                      submitButtonText={editingAddress ? 'Güncellemeleri Kaydet' : 'Yeni Adresi Kaydet'}
                    />
                  </>
                )}
              </div>

              <div className="mt-8 border-t pt-6 space-y-4">
                <div>
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 mr-2" />
                    Faturamı Aynı Adrese Gönder
                  </label>
                  <p className="text-xs text-gray-500 mt-1 pl-6">
                    Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
                  </p>
                </div>
                <div className="text-right">
                  <button 
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition duration-150 ease-in-out"
                  >
                    Kaydet ve Devam Et {/* İleride ödeme adımına geçirecek */}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Sağ Taraf: Sipariş Özeti */}
          <div className="lg:w-1/3">
            <OrderSummary /> {/* Sepet boşsa zaten yönlendirildiği için burada tekrar kontrol etmeye gerek yok */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderPage;
