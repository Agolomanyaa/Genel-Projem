import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Giriş yapılmamışsa yönlendirme için
import MainLayout from '../layouts/MainLayout';
import OrderSummary from '../components/OrderSummary'; // Sipariş özetini tekrar kullanacağız
import { 
  fetchAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress,
  fetchCreditCards,
  deleteCreditCard,
  addCreditCard,
  updateCreditCard
} from '../store/actions/clientActions'; // fetchAddresses ve addAddress action'larını import et
import AddressForm from '../components/AddressForm'; // AddressForm'u import et
import CreditCardForm from '../components/CreditCardForm'; // YENİ IMPORT
import { FaSpinner, FaExclamationCircle, FaPlusCircle, FaTrash, FaEdit } from 'react-icons/fa'; // Yükleme ve hata ikonları için

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

  // YENİ: Kredi Kartları için Redux State'leri
  const {
    creditCards,
    getCreditCardsFetchState,
    getCreditCardsError,
  } = useSelector((state) => state.client);

  // YENİ: KREDİ KARTI FORMU GÖRÜNÜRLÜĞÜ İÇİN STATE
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  // YENİ: DÜZENLENECEK KREDİ KARTI İÇİN STATE (İLERİDE KULLANILACAK)
  const [editingCreditCard, setEditingCreditCard] = useState(null); 

  useEffect(() => {
    if (cart.length === 0) {
      history.push('/cart');
    } else {
      if (getAddressFetchState === FETCH_STATES.NOT_FETCHED) {
        dispatch(fetchAddresses());
      }
    }
  }, [cart, history, dispatch, getAddressFetchState]);

  // YENİ: Kredi kartlarını çekmek için useEffect
  useEffect(() => {
    if (getCreditCardsFetchState === FETCH_STATES.NOT_FETCHED) {
      dispatch(fetchCreditCards());
    }
  }, [dispatch, getCreditCardsFetchState]);

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

  // YENİ: Kredi Kartı Silme Handler Fonksiyonu
  const handleDeleteCreditCard = (cardId, cardIdentifier) => { 
    const confirmMessage = cardIdentifier 
      ? `"${cardIdentifier}" ile biten kartı silmek istediğinizden emin misiniz?`
      : `ID: ${cardId} olan kartı silmek istediğinizden emin misiniz?`;
    if (window.confirm(confirmMessage)) {
      console.log(`[OrderPage] Deleting credit card with ID: ${cardId}`);
      dispatch(deleteCreditCard(cardId));
    } else {
      console.log(`[OrderPage] Credit card deletion cancelled for ID: ${cardId}`);
    }
  };

  // --- Kredi Kartı Handler Fonksiyonları ---
  const handleAddNewCreditCardSubmit = (formData) => {
    // API'nin beklediği formatta olduğundan emin olun.
    // expire_month ve expire_year sayı olmalı.
    const submissionData = {
      ...formData,
      expire_month: parseInt(formData.expire_month, 10),
      expire_year: parseInt(formData.expire_year, 10),
    };
    // ID'yi (eğer varsa ve yeni ekleme değilse) payload'dan çıkar
    delete submissionData.id; 

    dispatch(addCreditCard(submissionData, () => {
      setShowCreditCardForm(false); // Formu kapat
      // Kart listesi zaten Redux ile güncellenecek, fetchCreditCards() tekrar çağrılabilir ama genellikle gerekmez.
    }));
  };

  // YENİ: Kredi Kartı Güncelleme Submit Handler'ı
  const handleUpdateCreditCardSubmit = (formData) => {
    if (!formData.id && editingCreditCard && editingCreditCard.id) {
      // Bu durum pek olası değil çünkü formu initialData ile dolduruyoruz
      // ama bir güvenlik önlemi olarak eklenebilir.
      console.warn("[OrderPage] formData'dan ID gelmedi, editingCreditCard.id kullanılıyor.");
      formData.id = editingCreditCard.id;
    }
    
    const submissionData = {
      ...formData,
      expire_month: parseInt(formData.expire_month, 10),
      expire_year: parseInt(formData.expire_year, 10),
    };

    dispatch(updateCreditCard(submissionData, () => { 
      setShowCreditCardForm(false);
      setEditingCreditCard(null);
    }));
  };

  // YENİ: Kredi Kartı Düzenleme Formunu Açma Fonksiyonu
  const openEditCreditCardForm = (card) => {
    setEditingCreditCard(card); // Düzenlenecek kartı state'e ata
    setShowCreditCardForm(true);  // Formu göster
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

  // Kayıtlı Kredi Kartlarını Listeleme Fonksiyonunu Güncelle
  const renderCreditCardList = () => {
    if (getCreditCardsFetchState === FETCH_STATES.FETCHING) { 
      return (
        <div className="flex items-center justify-center text-gray-500 py-4">
          <FaSpinner className="animate-spin mr-2" /> Kredi kartları yükleniyor...
        </div>
      );
    }

    if (getCreditCardsFetchState === FETCH_STATES.FAILED) { 
      return (
        <div className="text-red-500 bg-red-100 p-3 rounded-md flex items-center my-2">
          <FaExclamationCircle className="mr-2 flex-shrink-0" />
          <span>
            Kredi kartları yüklenirken bir hata oluştu: {getCreditCardsError || 'Bilinmeyen bir hata.'}
          </span>
        </div>
      );
    }

    if (getCreditCardsFetchState === FETCH_STATES.FETCHED) { 
      if (!creditCards || creditCards.length === 0) { 
        return <p className="text-gray-500 text-sm py-2">Henüz kayıtlı bir kredi kartınız bulunmamaktadır.</p>;
      }

      return (
        <div className="space-y-3">
          {creditCards.map((card) => (
            <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150 ease-in-out">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-800">{card.name_on_card || 'İsimsiz Kart'}</h5>
                  <p className="text-sm text-gray-600">
                    {card.card_no ? `**** **** **** ${card.card_no.slice(-4)}` : 'Kart No Bilgisi Yok'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Son Kul.: {String(card.expire_month).padStart(2, '0')}/{card.expire_year}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditCreditCardForm(card)}
                    className="p-1 text-blue-500 hover:text-blue-700"
                    title="Düzenle"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteCreditCard(card.id, card.card_no ? `**** ${card.card_no.slice(-4)}` : card.name_on_card)}
                    className="p-1 text-red-500 hover:text-red-700" 
                    title="Sil"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <p className="text-gray-500 text-sm py-2">Kredi kartı bilgileri bekleniyor...</p>; 
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Taraf: Adres Bilgileri ve Formu + KART BİLGİLERİ */}
          <div className="lg:w-2/3 space-y-8">
            {/* Adres Bilgileri Bölümü (Mevcut kodunuz) */}
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
            </div>

            {/* YENİ: Kart Bilgileri Bölümü */}
            <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Kart Bilgileri</h2>
                {!showCreditCardForm && (
                  <button
                    onClick={() => {
                      setEditingCreditCard(null);
                      setShowCreditCardForm(true);
                    }}
                    className="flex items-center text-sm text-primary hover:underline"
                  >
                    <FaPlusCircle className="mr-1" /> Yeni Kart Ekle
                  </button> 
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Kayıtlı Kartlarım</h3>
                {renderCreditCardList()}
              </div>

              {showCreditCardForm && (
                <>
                  <hr className="my-6"/>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    {editingCreditCard ? 'Kart Bilgilerini Düzenle' : 'Yeni Kredi Kartı Ekle'}
                  </h3>
                  <CreditCardForm 
                    onSubmit={editingCreditCard ? handleUpdateCreditCardSubmit : handleAddNewCreditCardSubmit}
                    initialData={editingCreditCard}
                    onCancel={() => {
                      setShowCreditCardForm(false);
                      setEditingCreditCard(null);
                    }}
                    submitButtonText={editingCreditCard ? 'Güncellemeleri Kaydet' : 'Kartı Kaydet'}
                  /> 
                </>
              )}
              
              <div className="mt-6 border-t pt-6">
                 <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 mr-2" />
                    3D Secure ile ödemek istiyorum
                  </label>
              </div>
            </div>
            
            {/* Fatura ve "Kaydet ve Devam Et" Butonu Bölümü */}
            <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <div className="space-y-4">
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
                    Ödeme Yap
                  </button>
                </div>
              </div>
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

export default OrderPage;
