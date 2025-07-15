import axiosInstance from '../../api/axiosInstance'; // axiosInstance'ı import et
import { toast } from 'react-toastify'; // Toastify kullanıyorsanız
import { clearCart } from './shoppingCartActions'; // Sepeti temizlemek için import et

// Action Tipleri
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
// Rolleri çekerken kullanılacak ek action tipleri (isteğe bağlı ama iyi pratik)
export const FETCH_ROLES_START = 'FETCH_ROLES_START';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAILURE = 'FETCH_ROLES_FAILURE';
// Login için de benzer loading/error action tipleri eklenebilir (isteğe bağlı)
export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
// Adresleri çekmek için Action Tipleri
export const GET_ADDRESSES_REQUEST = 'GET_ADDRESSES_REQUEST';
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS';
export const GET_ADDRESSES_FAILURE = 'GET_ADDRESSES_FAILURE';
// Yeni adres eklemek için Action Tipleri
export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE';
// Adres güncellemek için Action Tipleri
export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';
// YENİ: Adres silmek için Action Tipleri
export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';
export const AUTH_VERIFY_PENDING = 'AUTH_VERIFY_PENDING';
export const AUTH_VERIFY_SUCCESS = 'AUTH_VERIFY_SUCCESS';
export const AUTH_VERIFY_FAILURE = 'AUTH_VERIFY_FAILURE';
// YENİ: Kredi Kartları İçin Action Tipleri
export const GET_CREDIT_CARDS_REQUEST = 'GET_CREDIT_CARDS_REQUEST';
export const GET_CREDIT_CARDS_SUCCESS = 'GET_CREDIT_CARDS_SUCCESS';
export const GET_CREDIT_CARDS_FAILURE = 'GET_CREDIT_CARDS_FAILURE';

export const ADD_CREDIT_CARD_REQUEST = 'ADD_CREDIT_CARD_REQUEST';
export const ADD_CREDIT_CARD_SUCCESS = 'ADD_CREDIT_CARD_SUCCESS';
export const ADD_CREDIT_CARD_FAILURE = 'ADD_CREDIT_CARD_FAILURE';

export const UPDATE_CREDIT_CARD_REQUEST = 'UPDATE_CREDIT_CARD_REQUEST';
export const UPDATE_CREDIT_CARD_SUCCESS = 'UPDATE_CREDIT_CARD_SUCCESS';
export const UPDATE_CREDIT_CARD_FAILURE = 'UPDATE_CREDIT_CARD_FAILURE';

export const DELETE_CREDIT_CARD_REQUEST = 'DELETE_CREDIT_CARD_REQUEST';
export const DELETE_CREDIT_CARD_SUCCESS = 'DELETE_CREDIT_CARD_SUCCESS';
export const DELETE_CREDIT_CARD_FAILURE = 'DELETE_CREDIT_CARD_FAILURE';

// YENİ: Sipariş oluşturma için Action Tipleri
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// YENİ: Sipariş Geçmişi İçin Action Tipleri
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

// Alışveriş sepeti için (eğer yoksa shoppingCartActions.js'e eklenebilir)
// export const CLEAR_CART = 'CLEAR_CART';

// Action Creator Fonksiyonları
export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData, // Gönderilecek veri (kullanıcı objesi)
});

export const setRoles = (rolesData) => ({
  type: SET_ROLES,
  payload: rolesData, // Gönderilecek veri (roller dizisi)
});

export const setTheme = (themeName) => ({
  type: SET_THEME,
  payload: themeName, // Gönderilecek veri (string - 'light' veya 'dark')
});

export const setLanguage = (languageCode) => ({
  type: SET_LANGUAGE,
  payload: languageCode, // Gönderilecek veri (string - 'en' veya 'tr')
});

// Login action creator'ları (isteğe bağlı)
export const loginUserStart = () => ({ type: LOGIN_USER_START });
export const loginUserSuccess = (userData) => ({ type: LOGIN_USER_SUCCESS, payload: userData }); // SET_USER yerine bunu kullanabiliriz
export const loginUserFailure = (error) => ({ type: LOGIN_USER_FAILURE, payload: error });

// Adresleri çekmek için Action Creator'lar
export const getAddressesRequest = () => ({ type: GET_ADDRESSES_REQUEST });
export const getAddressesSuccess = (addresses) => ({ type: GET_ADDRESSES_SUCCESS, payload: addresses });
export const getAddressesFailure = (error) => ({ type: GET_ADDRESSES_FAILURE, payload: error });

// Yeni adres eklemek için Action Creator'lar
export const addAddressRequest = () => ({ type: ADD_ADDRESS_REQUEST });
export const addAddressSuccess = (newAddress) => ({ type: ADD_ADDRESS_SUCCESS, payload: newAddress });
export const addAddressFailure = (error) => ({ type: ADD_ADDRESS_FAILURE, payload: error });

// Adres güncellemek için Action Creator'lar
export const updateAddressRequest = () => ({ type: UPDATE_ADDRESS_REQUEST });
export const updateAddressSuccess = (updatedAddress) => ({ type: UPDATE_ADDRESS_SUCCESS, payload: updatedAddress });
export const updateAddressFailure = (error) => ({ type: UPDATE_ADDRESS_FAILURE, payload: error });

// YENİ: Adres silmek için Action Creator'lar
export const deleteAddressRequest = () => ({ type: DELETE_ADDRESS_REQUEST });
export const deleteAddressSuccess = (addressId) => ({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
export const deleteAddressFailure = (error) => ({ type: DELETE_ADDRESS_FAILURE, payload: error });

// YENİ: Kredi Kartları İçin Action Creator'lar
export const getCreditCardsRequest = () => ({ type: GET_CREDIT_CARDS_REQUEST });
export const getCreditCardsSuccess = (cards) => ({ type: GET_CREDIT_CARDS_SUCCESS, payload: cards });
export const getCreditCardsFailure = (error) => ({ type: GET_CREDIT_CARDS_FAILURE, payload: error });

export const addCreditCardRequest = () => ({ type: ADD_CREDIT_CARD_REQUEST });
export const addCreditCardSuccess = (newCard) => ({ type: ADD_CREDIT_CARD_SUCCESS, payload: newCard });
export const addCreditCardFailure = (error) => ({ type: ADD_CREDIT_CARD_FAILURE, payload: error });

export const updateCreditCard = (cardData, callback) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_CREDIT_CARD_REQUEST });
  console.log('[updateCreditCard] Request Data:', cardData);
  try {
    const response = await axiosInstance.put('/user/card', cardData); 
    
    console.log('[updateCreditCard] Raw API Response:', response);
    console.log('[updateCreditCard] Raw API Response.data:', response.data);

    let updatedCard = null;

    if (response && response.data) {
      if (response.data.id) { // İdeal durum: API doğrudan güncellenmiş kartı döndürür
        updatedCard = response.data;
      } else if (typeof response.data === 'object' && response.data[0] && response.data[0].id) {
        // API {0: cardObject} formatında döndürürse
        console.log('[updateCreditCard] API returned data in {0: object} format. Extracting object from key "0".');
        updatedCard = response.data[0];
      }
    }

    if (updatedCard) {
      dispatch({ type: UPDATE_CREDIT_CARD_SUCCESS, payload: updatedCard });
      if (callback) callback(updatedCard);
    } else if (response && response.status >= 200 && response.status < 300 && cardData.id) {
      // API güncellenmiş kartı döndürmüyor veya beklenmedik bir formatta döndürüyor
      // ama başarılı bir statü kodu (2xx) veriyorsa ve elimizde gönderdiğimiz cardData varsa,
      // bunu optimistik güncelleme için kullanalım.
      console.warn('[updateCreditCard] API did not return the updated card object in the expected format, but returned a success status. Using original cardData for optimism.');
      dispatch({ type: UPDATE_CREDIT_CARD_SUCCESS, payload: cardData }); // Gönderilen cardData'yı kullan
      if (callback) callback(cardData);
    }
     else {
      console.error('[updateCreditCard] ERROR: Unexpected API response structure or unsuccessful update!', response.data);
      dispatch({ type: UPDATE_CREDIT_CARD_FAILURE, payload: 'Güncellenmiş kart verisi alınamadı veya format hatalı.' });
    }
  } catch (error) {
    console.error('[updateCreditCard] API Error:', error.response || error);
    dispatch({
      type: UPDATE_CREDIT_CARD_FAILURE,
      payload: error.response ? error.response.data.message || 'Kredi kartı güncellenirken bir hata oluştu.' : error.message
    });
  }
};

export const deleteCreditCard = (cardId, onComplete) => async (dispatch) => {
  if (!cardId) {
    console.error('[deleteCreditCard] ERROR: Card ID is missing for deletion.');
    toast.error('Silinecek kart için ID eksik.');
    dispatch(deleteCreditCardFailure("Silinecek kart için ID eksik."));
    return;
  }
  dispatch(deleteCreditCardRequest());
  try {
    // API endpoint'i /user/card/:cardId olarak belirtilmiş.
    await axiosInstance.delete(`/user/card/${cardId}`);
    // DELETE isteği genellikle bir body dönmez, başarılı olursa 200 OK veya 204 No Content döner.
    // Biz doğrudan cardId ile success action'ını dispatch ediyoruz.
    dispatch(deleteCreditCardSuccess(cardId));
    toast.success('Kredi kartı başarıyla silindi!');
    if (onComplete) onComplete();
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Kredi kartı silinirken bir hata oluştu.';
    console.error('[deleteCreditCard] CATCH ERROR:', errorMessage, error);
    dispatch(deleteCreditCardFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// --- Thunk Action Creator (Rolleri Çekmek İçin) ---
export const fetchRoles = () => async (dispatch) => {
  // 1. Yükleme başladığını belirten action'ı dispatch et (isteğe bağlı)
  // dispatch({ type: FETCH_ROLES_START }); // Bunun için reducer'da case eklemek gerekir

  try {
    // 2. API'ye isteği gönder
    const response = await axiosInstance.get('/roles');

    // 3. Başarılı olursa, gelen rolleri store'a kaydetmek için SET_ROLES action'ını dispatch et
    if (Array.isArray(response.data)) {
      dispatch(setRoles(response.data)); // setRoles action creator'ını kullanarak dispatch et
      // dispatch({ type: FETCH_ROLES_SUCCESS }); // Başarı action'ı dispatch et (isteğe bağlı)
    } else {
      // Beklenmedik format durumu
      console.error("Unexpected API response format for roles:", response.data);
      // dispatch({ type: FETCH_ROLES_FAILURE, payload: 'Invalid data format' }); // Hata action'ı dispatch et (isteğe bağlı)
    }
  } catch (error) {
    // 4. Hata olursa, hatayı konsola yazdır ve/veya hata action'ı dispatch et
    console.error("Error fetching roles:", error);
    // dispatch({ type: FETCH_ROLES_FAILURE, payload: error.message }); // Hata action'ı dispatch et (isteğe bağlı)
  }
};

// --- Thunk Action Creator (Login İçin) - GÜNCELLENDİ ---
export const loginUser = (credentials, rememberMe, history) => async (dispatch) => {
  try {
    console.log("Attempting login with:", credentials, "Remember Me:", rememberMe);
    const response = await axiosInstance.post('/login', credentials);

    if (response.status === 200 && response.data.token) {
      const { token, ...userData } = response.data;
      console.log("Login successful. Token:", token, "User Data:", userData);

      // Not: Token'ı axios header'ına ekleme işini axiosInstance.js'deki interceptor yaptığı için
      // burada manuel eklemeyi geri alıyoruz.

      // 1. Kullanıcı bilgilerini Redux state'ine kaydet
      dispatch(setUser(userData));

      // 2. Token'ı rememberMe durumuna göre kaydet
      if (rememberMe) {
        localStorage.setItem('token', token);
        sessionStorage.removeItem('token'); // Diğerini temizle
        console.log("Token saved to localStorage.");
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('token'); // Diğerini temizle
        console.log("Token saved to sessionStorage.");
      }

      // 3. Başarılı giriş sonrası yönlendirme
      history.push('/');
      toast.success("Login Successful!"); // İsteğe bağlı

      return null; // Hata yok
    } else {
      console.error("Login failed: Unexpected response format.", response);
      toast.error("Login failed. Please try again.");
      return "Login failed. Unexpected response.";
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
    console.error("Login error:", errorMessage, error.response);
    toast.error(errorMessage); // İsteğe bağlı
    return errorMessage;
  }
};

// --- Thunk Action Creator (Token Doğrulama İçin) - GÜNCELLENDİ ---
export const verifyToken = () => async (dispatch) => {
  // 1. Oturum doğrulama sürecinin başladığını belirt
  dispatch({ type: AUTH_VERIFY_PENDING });

  // Not: Token'ı axios header'ına ekleme işini axiosInstance.js'deki interceptor zaten yapıyor.
  // Bu yüzden burada manuel eklemeye gerek yok. Interceptor, her istekten önce çalışır.
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    dispatch({ type: AUTH_VERIFY_FAILURE });
    return;
  }

  console.log(`Interceptor will handle the token. Attempting verification...`);

  try {
    const response = await axiosInstance.get('/verify');

    if (response.status === 200 && response.data) {
      console.log("Token verified successfully. User data:", response.data);
      dispatch({ type: AUTH_VERIFY_SUCCESS, payload: response.data });
    } else {
      console.warn("Token verification returned unexpected status or no data:", response);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      dispatch({ type: AUTH_VERIFY_FAILURE });
    }
  } catch (error) {
    console.error("Token verification failed:", error.response?.data?.message || error.message);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    dispatch({ type: AUTH_VERIFY_FAILURE });
  }
};

// --- Thunk Action Creator (Adresleri Çekmek İçin) ---
export const fetchAddresses = () => async (dispatch) => {
  dispatch(getAddressesRequest());
  console.log('[fetchAddresses] Request dispatched');
  try {
    const response = await axiosInstance.get('/user/address');
    console.log('[fetchAddresses] Response received:', response);

    if (response && (response.status === 200 || response.status === 201) && Array.isArray(response.data)) {
      console.log('[fetchAddresses] Addresses fetched successfully (status:', response.status, '):', response.data);
      dispatch(getAddressesSuccess(response.data));
    } else {
      console.error('[fetchAddresses] ERROR: Unexpected response structure or status!', response);
      dispatch(getAddressesFailure("Unexpected response structure or status while fetching addresses."));
      toast.error("Could not fetch addresses. Please try again.");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch addresses.";
    console.error("[fetchAddresses] CATCH BLOCK ERROR:", errorMessage, "Full error object:", error);
    dispatch(getAddressesFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// --- Thunk Action Creator (Yeni Adres Eklemek İçin) ---
// addressData: { title, name, surname, phone, city, district, neighborhood }
// onComplete: Adres eklendikten sonra çağrılacak bir callback (örn: formu resetle, modal kapat)
export const addAddress = (addressData, onComplete) => async (dispatch) => {
  dispatch(addAddressRequest());
  console.log('[addAddress] Request dispatched with data:', addressData);
  try {
    const response = await axiosInstance.post('/user/address', addressData);
    console.log('[addAddress] Full API Response:', response);
    console.log('[addAddress] API Response.data:', response.data); 

    if (response && (response.status === 201 || response.status === 200) && response.data) {
      let newAddressData = response.data;

      // YENİ KONTROL: Eğer API {0: adresObjesi} formatında dönüyorsa, asıl objeyi al.
      if (response.data && typeof response.data === 'object' && response.data.hasOwnProperty('0') && typeof response.data[0] === 'object' && response.data[0] !== null) {
        console.log('[addAddress] API returned data in {0: object} format. Extracting object from key "0".', response.data[0]);
        newAddressData = response.data[0];
      }
      // Ek olarak, API doğrudan bir dizi içinde tek bir obje dönerse ([{addressObject}]) onu da handle edebiliriz.
      // else if (Array.isArray(response.data) && response.data.length === 1 && typeof response.data[0] === 'object' && response.data[0] !== null) {
      //   console.log('[addAddress] API returned data as a single-element array. Extracting object from array.', response.data[0]);
      //   newAddressData = response.data[0];
      // }


      // Güvenlik için, dispatch etmeden önce newAddressData'nın bir id'si olduğundan emin olalım (opsiyonel ama iyi bir pratik)
      if (!newAddressData || typeof newAddressData.id === 'undefined') {
        console.error('[addAddress] ERROR: Extracted address data is invalid or missing an ID. Original response.data:', response.data, 'Extracted:', newAddressData);
        const errorMessage = "Yeni adres eklendi ancak sunucudan gelen veri ID içermiyor veya geçersiz.";
        dispatch(addAddressFailure(errorMessage));
        toast.error(errorMessage);
        return; 
      }

      console.log('[addAddress] Address added successfully. Dispatching payload:', newAddressData);
      dispatch(addAddressSuccess(newAddressData)); 
      toast.success("Adres başarıyla eklendi!");
      
      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    } else {
      console.error('[addAddress] ERROR: Unexpected response structure or status!', response);
      const errorMessage = response?.data?.message || "Yeni adres eklenirken beklenmedik bir durum oluştu.";
      dispatch(addAddressFailure(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Yeni adres eklenirken bir hata oluştu.";
    console.error("[addAddress] CATCH BLOCK ERROR:", errorMessage, "Full error object:", error);
    dispatch(addAddressFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// --- Thunk Action Creator (Adres Güncellemek İçin) ---
// addressData: { id, title, name, surname, phone, city, district, neighborhood }
// onComplete: Adres güncellendikten sonra çağrılacak bir callback
export const updateAddress = (addressData, onComplete) => async (dispatch) => {
  dispatch(updateAddressRequest());
  try {
    if (!addressData.id) {
      console.error('[updateAddress] ERROR: Address ID is missing for update.');
      dispatch(updateAddressFailure("Güncellenecek adres için ID eksik."));
      toast.error("Adres güncellenemedi: ID eksik.");
      return;
    }

    const response = await axiosInstance.put('/user/address', addressData);
    
    if (response && (response.status === 200 || response.status === 201)) {
      let addressToDispatch = null;

      // 1. Önceki gibi response.data[0] içinde adres var mı diye kontrol et
      if (response.data && response.data[0] && response.data[0].id) {
        addressToDispatch = response.data[0];
        console.log('[updateAddress] Using response.data[0] for store update.');
      } 
      // 2. Ya da response.data'nın kendisi adres objesi mi diye kontrol et
      else if (response.data && response.data.id) {
        addressToDispatch = response.data;
        console.log('[updateAddress] Using response.data directly for store update.');
      } 
      // 3. YENİ DURUM: response.data boş bir obje {} ama status başarılı ise
      //    Bu durumda, gönderdiğimiz addressData'yı güncellenmiş kabul et
      else if (response.data && Object.keys(response.data).length === 0 && addressData.id) {
        console.log('[updateAddress] API returned empty object on success, using submitted addressData for store update.');
        addressToDispatch = addressData; // Gönderdiğimiz veriyi kullan
      }

      // Eğer geçerli bir adres objesi bulabildiysek (yukarıdaki senaryolardan biriyle)
      if (addressToDispatch && addressToDispatch.id) {
        console.log('[updateAddress] Address updated successfully (status:', response.status, '). Dispatching payload:', addressToDispatch);
        dispatch(updateAddressSuccess(addressToDispatch));
        toast.success("Adres başarıyla güncellendi!");

        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      } else {
        // Başarılı status ama beklenen veri yapısı yoksa
        console.error('[updateAddress] ERROR: Successful status but unexpected response.data structure. Data:', response.data, 'Submitted:', addressData);
        dispatch(updateAddressFailure("Adres güncellendi ancak sunucudan gelen veri işlenemedi."));
        toast.error("Adres güncellendi ancak cevap verisi işlenemedi.");
        if (onComplete && typeof onComplete === 'function') {
          onComplete(); // Formu yine de kapatmak için
        }
      }
    } else {
      // Başarısız status veya response objesi yoksa
      console.error('[updateAddress] ERROR: Unexpected response structure or non-successful status!', response);
      const errorMessage = response?.data?.message || "Adres güncellenirken beklenmedik bir durum oluştu.";
      dispatch(updateAddressFailure(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Adres güncellenirken bir hata oluştu.";
    console.error("[updateAddress] CATCH BLOCK ERROR:", errorMessage, "Full error object:", error);
    dispatch(updateAddressFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// YENİ: --- Thunk Action Creator (Adres Silmek İçin) ---
// addressId: Silinecek adresin ID'si
// onComplete: Adres silindikten sonra çağrılacak bir callback (opsiyonel)
export const deleteAddress = (addressId, onComplete) => async (dispatch) => {
  dispatch(deleteAddressRequest());
  console.log(`[deleteAddress] Request dispatched for address ID: ${addressId}`);
  try {
    const response = await axiosInstance.delete(`/user/address/${addressId}`);
    console.log('[deleteAddress] Response received:', response);

    // Genellikle DELETE istekleri başarılı olursa 200 OK veya 204 No Content döner.
    // API'miz 201 Created ve bir mesajla dönüyor.
    if (response && (response.status === 200 || response.status === 204 || response.status === 201)) {
      console.log(`[deleteAddress] Address ID: ${addressId} deleted successfully (status: ${response.status}). Data:`, response.data);
      dispatch(deleteAddressSuccess(addressId)); 
      toast.success("Adres başarıyla silindi!");

      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    } else {
      console.error(`[deleteAddress] ERROR: Unexpected response status while deleting address ID: ${addressId}!`, response);
      const errorMessage = response?.data?.message || "Adres silinirken beklenmedik bir durum oluştu.";
      dispatch(deleteAddressFailure(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Adres silinirken bir hata oluştu.";
    console.error(`[deleteAddress] CATCH BLOCK ERROR for address ID: ${addressId}:`, errorMessage, "Full error object:", error);
    dispatch(deleteAddressFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// --- THUNK ACTION CREATORS FOR CREDIT CARDS ---

// Kayıtlı Kredi Kartlarını Çekmek İçin
export const fetchCreditCards = () => async (dispatch) => {
  dispatch(getCreditCardsRequest());
  try {
    const response = await axiosInstance.get('/user/card');
    // API'nin doğrudan kart listesini Array olarak döndürdüğünü varsayıyoruz.
    // Eğer { data: [...] } gibi bir yapıda dönüyorsa response.data.data gibi erişmek gerekebilir.
    if (response && response.data && Array.isArray(response.data)) {
      dispatch(getCreditCardsSuccess(response.data));
    } else {
      console.error('[fetchCreditCards] ERROR: Unexpected API response structure!', response);
      dispatch(getCreditCardsFailure('Kredi kartları getirilirken beklenmedik yanıt formatı.'));
      toast.error('Kredi kartları getirilemedi.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Kredi kartları getirilirken bir hata oluştu.';
    console.error('[fetchCreditCards] CATCH ERROR:', errorMessage, error);
    dispatch(getCreditCardsFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// Yeni Kredi Kartı Eklemek İçin
// cardData: { card_no, expire_month, expire_year, name_on_card }
export const addCreditCard = (cardData, onComplete) => async (dispatch) => {
  dispatch(addCreditCardRequest());
  try {
    const response = await axiosInstance.post('/user/card', cardData);
    
    console.log('[addCreditCard] Raw API Response:', response);
    console.log('[addCreditCard] Raw API Response.data:', response.data);

    let newCardData = null;

    // YENİ KONTROL: Eğer API {0: cardObject} formatında dönüyorsa, asıl objeyi al.
    if (response && response.data && typeof response.data === 'object' && response.data.hasOwnProperty('0') && typeof response.data[0] === 'object' && response.data[0] !== null) {
      console.log('[addCreditCard] API returned data in {0: object} format. Extracting object from key "0".');
      newCardData = response.data[0];
    } 
    // Olası başka bir senaryo: API doğrudan kart objesini dönüyorsa
    else if (response && response.data && response.data.id) {
      console.log('[addCreditCard] API returned data directly as card object.');
      newCardData = response.data;
    }

    // newCardData'nın geçerli bir ID'si var mı kontrol et
    if (newCardData && newCardData.id) {
      dispatch(addCreditCardSuccess(newCardData));
      toast.success('Kredi kartı başarıyla eklendi!');
      if (onComplete) onComplete();
    } else {
      // Eğer yukarıdaki koşullar sağlanmazsa veya newCardData.id yoksa
      console.error('[addCreditCard] ERROR: Unexpected API response structure or missing ID after adding card!', response.data);
      dispatch(addCreditCardFailure('Kredi kartı eklendikten sonra beklenmedik yanıt formatı veya ID eksik.'));
      toast.error('Kredi kartı eklenemedi (yanıt formatı).');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Kredi kartı eklenirken bir hata oluştu.';
    console.error('[addCreditCard] CATCH ERROR:', errorMessage, error);
    dispatch(addCreditCardFailure(errorMessage));
    toast.error(errorMessage);
  }
};

// YENİ: Sipariş Oluşturmak İçin Thunk Action Creator
export const createOrder = (orderDetails, callbackSuccess, callbackError) => async (dispatch, getState) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  console.log('[createOrder] Request dispatched with orderDetails:', orderDetails);

  try {
    const response = await axiosInstance.post('/order', orderDetails);
    console.log('[createOrder] API Response:', response);

    // API'nin başarılı bir sipariş oluşturma sonrası ne döndüğünü kontrol etmemiz lazım.
    // Genellikle oluşturulan siparişin detaylarını veya bir başarı mesajını döndürür.
    // T22'de payload belirtilmiş ama response için bir yapı yok, o yüzden esnek olalım.
    if (response && (response.status === 201 || response.status === 200) && response.data) {
      // Başarılı yanıt
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data }); // API'den dönen sipariş verisi
      dispatch(clearCart()); // Sipariş başarılıysa sepeti temizle
      toast.success('Siparişiniz başarıyla oluşturuldu!'); // Kullanıcıya bildirim

      if (callbackSuccess && typeof callbackSuccess === 'function') {
        callbackSuccess(response.data); // Başarı durumunda callback'i çağır
      }
    } else {
      // Beklenmedik başarılı yanıt formatı
      console.error('[createOrder] ERROR: Unexpected success response structure or status!', response);
      const errorMessage = response?.data?.message || 'Sipariş oluşturuldu ancak sunucudan beklenmedik bir yanıt alındı.';
      dispatch({ type: CREATE_ORDER_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
      if (callbackError && typeof callbackError === 'function') {
        callbackError(errorMessage);
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu.';
    console.error('[createOrder] CATCH ERROR:', errorMessage, 'Full error object:', error.response || error);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: errorMessage });
    toast.error(errorMessage);
    if (callbackError && typeof callbackError === 'function') {
      callbackError(errorMessage);
    }
  }
};

// YENİ: Sipariş Geçmişini Çekmek İçin Thunk Action Creator
export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });
  console.log('[fetchOrders] Request dispatched');
  try {
    const response = await axiosInstance.get('/order'); // API endpoint'i
    console.log('[fetchOrders] API Response:', response);

    // API'den gelen yanıtın response.data'sının BİR DİZİ olmasını bekliyoruz.
    // VE status kodunun 200 veya 201 olmasını kabul ediyoruz.
    if (response && response.data && Array.isArray(response.data) && (response.status === 200 || response.status === 201)) {
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data }); // payload olarak response.data kullanılacak
      console.log('[fetchOrders] Orders fetched successfully:', response.data);
    } else {
      const errorMessage = 'Sipariş geçmişi alınırken beklenmedik yanıt formatı veya hatalı durum kodu.';
      console.error('[fetchOrders] ERROR:', errorMessage, 'Status:', response?.status, 'Response Data:', response?.data);
      dispatch({ type: FETCH_ORDERS_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Sipariş geçmişi alınırken bir hata oluştu.';
    console.error('[fetchOrders] CATCH ERROR:', errorMessage, error.response || error);
    dispatch({ type: FETCH_ORDERS_FAILURE, payload: errorMessage });
    toast.error(errorMessage);
  }
};

// YENİ: --- Thunk Action Creator (Logout İçin) ---
export const logoutUser = (history) => (dispatch) => {
  console.log("Logging out user...");

  // 1. Token'ları her yerden temizle
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  // 2. Axios header'ını temizle ki gelecekteki istekler kimliksiz gitsin
  delete axiosInstance.defaults.headers.common['Authorization'];

  // 3. Redux store'daki kullanıcı verisini temizle
  dispatch(setUser(null));

  // 4. Alışveriş sepetini temizle (iyi bir pratik)
  dispatch(clearCart());

  console.log("User data and tokens cleared. Redirecting...");

  // 5. Başarıyla çıkış yapıldığına dair bildirim göster
  toast.info("Başarıyla çıkış yaptınız.");

  // 6. Kullanıcıyı ana sayfaya yönlendir
  if (history) {
    history.push('/');
  }
};

// TODO: Roller için Thunk Action Creator buraya eklenecek 