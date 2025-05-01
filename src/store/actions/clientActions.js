import axiosInstance from '../../api/axiosInstance'; // axiosInstance'ı import et

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

// --- Thunk Action Creator (Login İçin) - YENİ EKLENDİ ---
export const loginUser = (credentials, rememberMe, history) => async (dispatch) => {
  // dispatch(loginUserStart()); // Yükleme başladı action'ı (opsiyonel)
  try {
    // 1. API'ye login isteği gönder
    const response = await axiosInstance.post('/login', credentials); // credentials = { email, password }

    // 2. Başarılı cevap geldi, verileri al
    const { token, name, email, role_id } = response.data;
    const userData = { name, email, role_id }; // Redux'a kaydedilecek kullanıcı verisi

    // 3. Kullanıcı bilgilerini Redux store'una kaydet
    dispatch(setUser(userData)); // VEYA dispatch(loginUserSuccess(userData));
    // dispatch(loginUserSuccess(userData)); // Opsiyonel success action'ı

    // 4. "Remember Me" işaretliyse token'ı localStorage'a kaydet
    if (rememberMe) {
      localStorage.setItem('token', token);
      // İsteğe bağlı: localStorage.setItem('user', JSON.stringify(userData));
    }

    // 5. Kullanıcıyı önceki sayfaya veya ana sayfaya yönlendir
    // history objesi varsa ve önceki sayfa bilgisi varsa oraya git, yoksa ana sayfaya
    if (history.length > 1 && history.location.key) { // Basit bir kontrol
       history.goBack();
    } else {
       history.push('/'); // Ana sayfaya yönlendir
    }

    // 6. Başarı durumunu belirtmek için belki null döndür (veya başarı objesi)
    return null; // Veya return { success: true };

  } catch (error) {
    // 7. Hata oluştu
    console.error("Login failed:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
    // dispatch(loginUserFailure(errorMessage)); // Opsiyonel failure action'ı

    // 8. Hata mesajını bileşene iletmek için hatayı fırlat veya döndür
    // throw new Error(errorMessage); // VEYA hata mesajını döndür
    return errorMessage;
  }
};

// TODO: Roller için Thunk Action Creator buraya eklenecek 