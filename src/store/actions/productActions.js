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
export const SET_PRODUCTS_REQUEST = 'SET_PRODUCTS_REQUEST'; // Ürünleri çekme isteği başladı
export const SET_PRODUCTS_SUCCESS = 'SET_PRODUCTS_SUCCESS'; // Ürünler başarıyla çekildi
export const SET_PRODUCTS_FAILURE = 'SET_PRODUCTS_FAILURE'; // Ürün çekme hatası
export const SET_FETCH_STATE = 'SET_FETCH_STATE'; // Bu genel bir fetch state, ürünler için spesifik olanı kullanacağız
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

// --- YENİ ÜRÜN ACTION CREATOR'LARI ---
export const setProductsRequest = () => ({
  type: SET_PRODUCTS_REQUEST,
});

export const setProductsSuccess = (products, total) => ({
  type: SET_PRODUCTS_SUCCESS,
  payload: { products, total }, // products ve total'ı tek payload'da gönder
});

export const setProductsFailure = (error) => ({
  type: SET_PRODUCTS_FAILURE,
  payload: error,
});
// ------------------------------------

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

// --- YENİ THUNK ACTION CREATOR (ÜRÜNLERİ ÇEKMEK İÇİN) ---
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setProductsRequest());
  console.log('[fetchProducts] Request dispatched with params:', params);
  try {
    const response = await axiosInstance.get('/products', { params });
    console.log('[fetchProducts] Response received (full data object):', response.data); // TÜM DATA OBJESİNİ LOGLA

    if (response && response.status === 200 && response.data && typeof response.data.total === 'number' && Array.isArray(response.data.products)) {
      console.log('[fetchProducts] Response status 200 and data structure is valid.');

      console.log('--- API Product List Details (First 3 Products) ---');
      response.data.products.slice(0, 3).forEach((product, index) => { // Sadece ilk 3 ürünü detaylı logla
        console.log(`Product ${index + 1} (Full Object):`, product);
        console.log(`Product ${index + 1} ID:`, product.id, '| Type:', typeof product.id);
        console.log(`Product ${index + 1} Images Field (e.g., images, imageUrl, selling_price_list, thumbnail):`, product.images || product.imageUrl || product.selling_price_list || product.thumbnail || "COULD NOT DETECT IMAGE FIELD"); // Olası resim alanlarını kontrol et
        console.log(`Product ${index + 1} Gender Field (e.g., gender, category.gender_id, sex):`, product.gender || product.category?.gender_id || product.sex || "COULD NOT DETECT GENDER FIELD"); // Olası gender alanlarını kontrol et
        console.log(`Product ${index + 1} Category ID Field:`, product.category_id || product.categoryId || "COULD NOT DETECT CATEGORY ID FIELD"); // API Kategori ID'si
      });
      console.log('--------------------------------------------------');

      dispatch(setProductsSuccess(response.data.products, response.data.total));
      console.log('[fetchProducts] setProductsSuccess dispatched.');
    } else {
      console.error('[fetchProducts] ERROR: Invalid response structure or status!', response);
      dispatch(setProductsFailure("Invalid response structure or status while fetching products."));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch products. Please try again later.";
    console.error("[fetchProducts] CATCH BLOCK ERROR:", errorMessage, "Full error object:", error);
    dispatch(setProductsFailure(errorMessage));
  }
};
// ----------------------------------------------------------

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