import axiosInstance from "../../api/axiosInstance"; // Axios instance'ı doğru yoldan import ettiğinizden emin olun

// Fetch State Tipleri (Sabitler)
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

// Action Tipleri
export const SET_CATEGORIES_REQUEST = 'SET_CATEGORIES_REQUEST'; // Kategorileri çekme isteği başladı
export const SET_CATEGORIES_SUCCESS = 'SET_CATEGORIES_SUCCESS'; // Kategoriler başarıyla çekildi (eski SET_CATEGORIES yerine)
export const SET_CATEGORIES_FAILURE = 'SET_CATEGORIES_FAILURE'; // Kategori çekme hatası
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE'; // Ürünler için fetch state
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// Action Creator Fonksiyonları
export const setCategoriesRequest = () => ({
  type: SET_CATEGORIES_REQUEST,
});

export const setCategoriesSuccess = (categories) => ({
  type: SET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const setCategoriesFailure = (error) => ({
  type: SET_CATEGORIES_FAILURE,
  payload: error,
});

// --- Thunk Action Creator (Kategorileri Çekmek İçin) - YENİ EKLENDİ ---
export const fetchCategories = () => async (dispatch) => {
  dispatch(setCategoriesRequest());
  console.log('[fetchCategories] Request dispatched'); // YENİ LOG
  try {
    const response = await axiosInstance.get('/categories');
    console.log('[fetchCategories] Response received:', response); // YENİ LOG

    if (response && response.status === 200 && response.data) { // response.data var mı diye de kontrol edelim
      console.log('[fetchCategories] Response status 200 and data exists.'); // YENİ LOG
      if (Array.isArray(response.data)) {
        console.log('[fetchCategories] response.data is an array. Dispatching success...'); // YENİ LOG
        dispatch(setCategoriesSuccess(response.data));
        console.log('[fetchCategories] setCategoriesSuccess dispatched.'); // YENİ LOG
      } else {
        console.error('[fetchCategories] ERROR: response.data is not an array!', response.data); // YENİ LOG
        dispatch(setCategoriesFailure("Category data is not in array format."));
      }
    } else {
      console.error('[fetchCategories] ERROR: Unexpected response structure or status!', response); // YENİ LOG
      dispatch(setCategoriesFailure("Unexpected response structure or status while fetching categories."));
    }
  } catch (error) {
    // error.isAxiosError kontrolü faydalı olabilir
    const errorMessage = error.response?.data?.message || "Failed to fetch categories. Please try again later.";
    // error nesnesinin tamamını loglayalım
    console.error("[fetchCategories] CATCH BLOCK ERROR:", errorMessage, "Full error object:", error, "error.response:", error.response, "error.request:", error.request); // GÜNCELLENMİŞ LOG
    dispatch(setCategoriesFailure(errorMessage));
  }
};

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

// TODO: Action Creator fonksiyonları buraya eklenecek 