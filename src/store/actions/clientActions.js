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

// TODO: Roller için Thunk Action Creator buraya eklenecek 