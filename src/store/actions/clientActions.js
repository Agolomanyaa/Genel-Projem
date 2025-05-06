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
  // 1. Önce localStorage'dan token'ı al
  let token = localStorage.getItem('token');
  let tokenSource = 'localStorage';

  // 2. localStorage'da yoksa sessionStorage'ı kontrol et
  if (!token) {
    token = sessionStorage.getItem('token');
    tokenSource = 'sessionStorage';
  }

  // 3. Hiçbir yerde token yoksa işlemi bitir
  if (!token) {
    // console.log("No token found in localStorage or sessionStorage."); // Konsolu kirletmemek için yorumlanabilir
    return;
  }

  console.log(`Token found in ${tokenSource}, attempting verification...`);

  try {
    // 4. Token varsa, Axios instance interceptor'ı başlığı otomatik ekleyecek.
    //    Doğrudan /verify endpoint'ine GET isteği gönder.
    const response = await axiosInstance.get('/verify');

    // 5. Başarılı cevap (200 OK) geldiyse, kullanıcı bilgilerini al ve state'i güncelle.
    if (response.status === 200) {
      const userData = response.data;
      console.log("Token verified successfully. User data:", userData);
      dispatch(setUser(userData));

      // Opsiyonel: Yeni token gelirse, doğru storage'ı güncelle
      // if (response.data.newToken) {
      //   if (tokenSource === 'localStorage') {
      //     localStorage.setItem('token', response.data.newToken);
      //   } else {
      //     sessionStorage.setItem('token', response.data.newToken);
      //   }
      // }

    } else {
      // Bu genellikle try/catch'e düşer ama yine de kontrol edelim.
      console.warn("Token verification returned unexpected status:", response.status);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      dispatch(setUser(null));
    }

  } catch (error) {
    // 6. Hata oluştuysa (genellikle 401 Unauthorized), token geçersizdir.
    console.error("Token verification failed:", error.response?.data?.message || error.message);

    // Token'ı her iki yerden de sil
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Kullanıcı bilgilerini Redux state'inden sil
    dispatch(setUser(null));
  }
};

// TODO: Roller için Thunk Action Creator buraya eklenecek 