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
  updateCreditCard,
  createOrder
} from '../store/actions/clientActions'; // fetchAddresses ve addAddress action'larını import et
import AddressForm from '../components/AddressForm'; // AddressForm'u import et
import CreditCardForm from '../components/CreditCardForm'; // YENİ IMPORT
import { FaSpinner, FaExclamationCircle, FaPlusCircle, FaTrash, FaEdit, FaCheckCircle } from 'react-icons/fa'; // Yükleme ve hata ikonları için

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
  
  const { 
    user,
    addressList, 
    getAddressFetchState, 
    getAddressError,
    creditCards,
    getCreditCardsFetchState,
    getCreditCardsError,
    createOrderFetchState, // YENİ: Sipariş oluşturma durumu
    createOrderError,      // YENİ: Sipariş hatası
    lastOrder              // YENİ: Son sipariş (başarı sonrası)
  } = useSelector((state) => state.client);

  // Yeni adres formu görünürlüğü için state
  const [showAddressForm, setShowAddressForm] = useState(false);
  // Yeni state: Hangi adresin düzenlendiğini tutar.
  // null ise yeni adres ekleme modu, obje ise düzenleme modu.
  const [editingAddress, setEditingAddress] = useState(null); 

  // YENİ: Kredi Kartları için Redux State'leri
  const {
    creditCards: oldCreditCards,
    getCreditCardsFetchState: oldGetCreditCardsFetchState,
    getCreditCardsError: oldGetCreditCardsError,
  } = useSelector((state) => state.client);

  // YENİ: KREDİ KARTI FORMU GÖRÜNÜRLÜĞÜ İÇİN STATE
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  // YENİ: DÜZENLENECEK KREDİ KARTI İÇİN STATE (İLERİDE KULLANILACAK)
  const [editingCreditCard, setEditingCreditCard] = useState(null); 

  // YENİ STATE'LER
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [paymentCcv, setPaymentCcv] = useState(''); // Kayıtlı kart için CCV
  const [orderSuccessMessage, setOrderSuccessMessage] = useState('');
  const [paymentAttempted, setPaymentAttempted] = useState(false); // Ödeme butonuna basıldığını anlamak için

  // YENİ: cartTotal'ı manuel olarak hesapla
  const calculatedCartTotal = cart.reduce((total, item) => {
    // product.price'ın sayı olduğundan ve item.count'un var olduğundan emin ol
    if (item.product && typeof item.product.price === 'number' && typeof item.count === 'number') {
      return total + (item.product.price * item.count);
    }
    return total;
  }, 0);

  // Tüm useEffect hook'ları burada, koşullu return'den ÖNCE olmalı
  useEffect(() => {
    if (cart.length === 0 && !lastOrder && !orderSuccessMessage) { // Başarı mesajı gösteriliyorsa yönlendirme yapma
      history.push('/cart');
    } else {
      if (getAddressFetchState === FETCH_STATES.NOT_FETCHED) {
        dispatch(fetchAddresses());
      }
      if (getCreditCardsFetchState === FETCH_STATES.NOT_FETCHED) {
        dispatch(fetchCreditCards());
      }
    }
  }, [cart, history, dispatch, getAddressFetchState, getCreditCardsFetchState, lastOrder, orderSuccessMessage]);

  useEffect(() => {
    if (getAddressFetchState === FETCH_STATES.FETCHED && addressList.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addressList[0].id);
    }
  }, [addressList, getAddressFetchState, selectedAddressId]);

  useEffect(() => {
    if (getCreditCardsFetchState === FETCH_STATES.FETCHED && creditCards.length > 0 && !selectedCardId) {
      setSelectedCardId(creditCards[0].id);
      setShowCreditCardForm(false);
    }
  }, [creditCards, getCreditCardsFetchState, selectedCardId]);

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

  // YENİ: ÖDEME YAP BUTONU HANDLER'I (İçi daha sonra doldurulacak)
  const handleCreateOrder = async () => {
    console.log("Ödeme Yap butonuna tıklandı - handleCreateOrder BAŞLANGIÇ");
    setPaymentAttempted(true); 
    setOrderSuccessMessage(''); 

    if (!selectedAddressId) {
      alert("Lütfen bir teslimat adresi seçin.");
      setPaymentAttempted(false); // Hata sonrası attempt'i sıfırla
      return;
    }
    
    if (!selectedCardId) {
        alert("Lütfen bir ödeme kartı seçin veya yeni bir kart ekleyip seçin.");
        setPaymentAttempted(false);
        return;
    }

    const selectedCard = creditCards.find(card => card.id === selectedCardId);
    if (!selectedCard) {
      alert("Seçili kart bulunamadı. Lütfen tekrar deneyin.");
      setPaymentAttempted(false);
      return;
    }

    const finalCcv = paymentCcv; 
    if (!finalCcv || finalCcv.length < 3) {
      alert("Lütfen seçili kartınız için CCV/güvenlik kodunu girin (en az 3 hane).");
      setPaymentAttempted(false);
      return;
    }

    const cardDetailsForOrder = {
      card_no: selectedCard.card_no, 
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: parseInt(finalCcv, 10), 
    };
    
    const orderDetails = {
      address_id: selectedAddressId,
      order_date: new Date().toISOString(),
      ...cardDetailsForOrder,
      price: calculatedCartTotal,
      products: cart.map(item => {
        return {
          variantId: item.product.variantId,
          count: item.count,
          detail: `${item.product.name} - ${item.product.description ? item.product.description.substring(0, 30) : 'Detay Yok'}...`
        };
      }),
    };

    console.log("Oluşturulan Sipariş Detayları:", orderDetails);

    dispatch(createOrder(orderDetails, 
      (createdOrder) => { 
        console.log('Sipariş başarıyla oluşturuldu (callback):', createdOrder);
        setOrderSuccessMessage(`Siparişiniz #${createdOrder.id} başarıyla oluşturuldu! Teşekkür ederiz.`);
        // Sepet zaten temizleniyor, diğer seçimleri de sıfırlayalım
        if (addressList.length > 0) setSelectedAddressId(addressList[0].id); else setSelectedAddressId(null);
        if (creditCards.length > 0) setSelectedCardId(creditCards[0].id); else setSelectedCardId(null);
        setPaymentCcv('');
        setPaymentAttempted(false); // Başarı sonrası attempt'i sıfırla
      },
      (error) => { 
        console.error('Sipariş oluşturma hatası (callback):', error);
        setPaymentAttempted(false); // Hata sonrası attempt'i sıfırla
      }
    ));
  };

  // KOŞULLU RETURN'LERİ EN SONA, TÜM HOOK ÇAĞRILARINDAN SONRA YAP
  if (cart.length === 0 && getAddressFetchState !== FETCH_STATES.FETCHING && !orderSuccessMessage && !lastOrder) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          Sepetiniz boş, yönlendiriliyor...
        </div>
      </MainLayout>
    );
  }

  // Ana JSX Return Kısmı
  return (
    <MainLayout>
      {(() => {
        if (orderSuccessMessage) {
          return (
            <div className="container mx-auto px-4 py-16 text-center">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Siparişiniz Alındı!</h1>
              <p className="text-lg text-gray-600 mb-8">{orderSuccessMessage}</p>
              <button
                onClick={() => {
                  setOrderSuccessMessage(''); 
                  history.push('/'); 
                }}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition duration-150 ease-in-out"
              >
                Alışverişe Devam Et
              </button>
            </div>
          );
        } else {
          return ( // NORMAL CHECKOUT İÇERİĞİ
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Checkout</h1>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sol Taraf */}
                <div className="lg:w-2/3 space-y-8">
                  {/* Adres Bilgileri Bölümü */}
                  <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Adres Bilgileri</h2>
                    <p className="text-sm text-gray-500 mb-6">Teslimat ve fatura adresinizi yönetin.</p>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">Teslimat Adresi Seçin</h3>
                      {getAddressFetchState === FETCH_STATES.FETCHING && <p>Adresler yükleniyor...</p>}
                      {getAddressFetchState === FETCH_STATES.FETCHED && addressList.length === 0 && !showAddressForm && (
                          <p className="text-gray-500 text-sm py-2">Lütfen yeni bir teslimat adresi ekleyin.</p>
                      )}
                      {addressList.map(address => (
                          <div key={address.id} className={`p-3 border rounded-md mb-2 ${selectedAddressId === address.id ? 'border-primary bg-primary-lightest' : 'border-gray-300 hover:border-gray-400'}`}>
                              <label className="flex items-center cursor-pointer">
                                  <input 
                                      type="radio" 
                                      name="selectedAddress" 
                                      value={address.id}
                                      checked={selectedAddressId === address.id}
                                      onChange={() => setSelectedAddressId(address.id)}
                                      className="form-radio h-5 w-5 text-primary mr-3"
                                  />
                                  <div>
                                      <span className="font-semibold text-gray-700">{address.title}</span>
                                      <p className="text-xs text-gray-600">{address.name} {address.surname} - {address.phone}</p>
                                      <p className="text-xs text-gray-500">{address.neighborhood}, {address.district}, {address.city}</p>
                                  </div>
                                   <div className="ml-auto flex space-x-2">
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); openEditForm(address); }} 
                                          className="text-xs text-blue-500 hover:text-blue-700 p-1" title="Düzenle"><FaEdit/>
                                      </button>
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address.id, address.title);}}
                                          className="text-xs text-red-500 hover:text-red-700 p-1" title="Sil"><FaTrash/>
                                      </button>
                                  </div>
                              </label>
                          </div>
                      ))}
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

                  {/* Kart Bilgileri Bölümü */}
                  <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Ödeme Yöntemi</h2>
                      {!showCreditCardForm && creditCards.length > 0 && ( // Sadece kayıtlı kart varsa ve form kapalıysa göster
                        <button
                          onClick={() => {
                            setEditingCreditCard(null); 
                            setSelectedCardId(null);    
                            setShowCreditCardForm(true);  
                          }}
                          className="flex items-center text-sm text-primary hover:underline"
                        >
                          <FaPlusCircle className="mr-1" /> Yeni Kart Ekle
                        </button> 
                      )}
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">Kayıtlı Kartlarım / Yeni Kart</h3>
                      {getCreditCardsFetchState === FETCH_STATES.FETCHING && <p>Kartlar yükleniyor...</p>}
                      {getCreditCardsFetchState === FETCH_STATES.FETCHED && creditCards.length === 0 && !showCreditCardForm && (
                          <div className="text-center py-4">
                            <p className="text-gray-500 text-sm mb-3">Kayıtlı kartınız yok.</p>
                            <button
                                onClick={() => {
                                setEditingCreditCard(null); 
                                setSelectedCardId(null);    
                                setShowCreditCardForm(true);  
                                }}
                                className="flex items-center justify-center mx-auto text-sm text-primary hover:underline"
                            >
                                <FaPlusCircle className="mr-1" /> Yeni Kart Ekle
                            </button> 
                          </div>
                      )}
                      {creditCards.map(card => (
                          <div key={card.id} className={`p-3 border rounded-md mb-2 ${selectedCardId === card.id && !showCreditCardForm ? 'border-primary bg-primary-lightest' : 'border-gray-300 hover:border-gray-400'}`}>
                              <label className="flex items-center cursor-pointer">
                                  <input 
                                      type="radio" 
                                      name="selectedCard" 
                                      value={card.id}
                                      checked={selectedCardId === card.id && !showCreditCardForm}
                                      onChange={() => {
                                          setSelectedCardId(card.id);
                                          setShowCreditCardForm(false); 
                                          setEditingCreditCard(null);  
                                          setPaymentCcv(''); 
                                      }}
                                      className="form-radio h-5 w-5 text-primary mr-3"
                                  />
                                  <div>
                                      <span className="font-semibold text-gray-700">{card.name_on_card}</span>
                                      <p className="text-xs text-gray-600">**** **** **** {card.card_no.slice(-4)}</p>
                                      <p className="text-xs text-gray-500">Son Kul.: {String(card.expire_month).padStart(2, '0')}/{card.expire_year}</p>
                                  </div>
                                   <div className="ml-auto flex space-x-2">
                                      <button 
                                          onClick={(e) => { 
                                              e.stopPropagation(); 
                                              setSelectedCardId(null); 
                                              openEditCreditCardForm(card); 
                                          }} 
                                          className="text-xs text-blue-500 hover:text-blue-700 p-1" title="Düzenle"><FaEdit/>
                                      </button>
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); handleDeleteCreditCard(card.id, card.card_no.slice(-4));}}
                                          className="text-xs text-red-500 hover:text-red-700 p-1" title="Sil"><FaTrash/>
                                      </button>
                                  </div>
                              </label>
                          </div>
                      ))}
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
                            if (creditCards.length > 0 && !selectedCardId) setSelectedCardId(creditCards[0].id);
                          }}
                          submitButtonText={editingCreditCard ? 'Güncellemeleri Kaydet' : 'Kartı Kaydet'}
                        /> 
                      </>
                    )}
                    
                    {selectedCardId && !showCreditCardForm && (
                      <div className="mt-4">
                        <label htmlFor="paymentCcv" className="block text-sm font-medium text-gray-700">
                          Güvenlik Kodu (CCV)<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="password"
                          name="paymentCcv"
                          id="paymentCcv"
                          value={paymentCcv}
                          onChange={(e) => setPaymentCcv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength="4"
                          className={`mt-1 block w-full max-w-xs px-3 py-2 border ${(paymentAttempted && selectedCardId && !paymentCcv) || (paymentAttempted && selectedCardId && paymentCcv.length <3) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                          placeholder="123"
                        />
                         {paymentAttempted && selectedCardId && (!paymentCcv || paymentCcv.length < 3) && (
                          <p className="mt-1 text-xs text-red-500">Lütfen geçerli bir CCV girin (3-4 hane).</p>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-6 border-t pt-6">
                       <label className="flex items-center text-sm text-gray-700">
                          <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 mr-2" />
                          3D Secure ile ödemek istiyorum (Bu özellik şu an aktif değildir)
                        </label>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 mt-8"> {/* Ödeme butonu ayrı bir kartta */}
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center text-sm text-gray-700">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 mr-2" />
                          Faturamı Aynı Adrese Gönder
                        </label>
                      </div>
                      <div className="text-right">
                        <button 
                          onClick={handleCreateOrder}
                          disabled={createOrderFetchState === FETCH_STATES.FETCHING || cart.length === 0}
                          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {createOrderFetchState === FETCH_STATES.FETCHING ? (
                            <FaSpinner className="animate-spin inline mr-2" /> 
                          ) : null}
                          Ödeme Yap ({calculatedCartTotal.toFixed(2)} TL)
                        </button>
                        {createOrderFetchState === FETCH_STATES.FAILED && createOrderError && (
                           <p className="mt-2 text-xs text-red-500 text-right">{createOrderError}</p>
                        )}
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
          );
        }
      })()}
    </MainLayout>
  );
};

export default OrderPage;
