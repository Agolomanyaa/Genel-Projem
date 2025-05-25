import axiosInstance from '../../api/axiosInstance'; // axiosInstance'ı import et
import { toast } from 'react-toastify'; // Toastify kullanıyorsanız

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

  let token = localStorage.getItem('token');
  let tokenSource = 'localStorage';

  if (!token) {
    token = sessionStorage.getItem('token');
    tokenSource = 'sessionStorage';
  }

  if (!token) {
    // console.log("No token found. Setting auth status to failure."); // Bu log eklenebilir
    dispatch({ type: AUTH_VERIFY_FAILURE }); // Token yoksa, doğrulama başarısız.
    // dispatch(setUser(null)); // AUTH_VERIFY_FAILURE zaten user'ı null yapmalı (reducer'da öyle ayarladık)
    return;
  }

  console.log(`Token found in ${tokenSource}, attempting verification...`);

  try {
    const response = await axiosInstance.get('/verify');

    if (response.status === 200 && response.data) { // response.data'nın da var olduğunu kontrol et
      const userData = response.data;
      console.log("Token verified successfully. User data:", userData);
      // Kullanıcı verisi ile birlikte başarı durumunu dispatch et
      dispatch({ type: AUTH_VERIFY_SUCCESS, payload: userData }); 
      // dispatch(setUser(userData)); // AUTH_VERIFY_SUCCESS zaten user'ı set ediyor (reducer'da)
    } else {
      console.warn("Token verification returned unexpected status or no data:", response);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      dispatch({ type: AUTH_VERIFY_FAILURE });
      // dispatch(setUser(null)); // AUTH_VERIFY_FAILURE zaten user'ı null yapmalı
    }
  } catch (error) {
    console.error("Token verification failed:", error.response?.data?.message || error.message);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    dispatch({ type: AUTH_VERIFY_FAILURE });
    // dispatch(setUser(null)); // AUTH_VERIFY_FAILURE zaten user'ı null yapmalı
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

// TODO: Roller için Thunk Action Creator buraya eklenecek 