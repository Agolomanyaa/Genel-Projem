// src/store/actions/productActions.js
import axiosInstance from "../../api/axiosInstance";
// import { API_BASE_URL } from '../../api/api'; // BU SATIRI SİL VEYA YORUMA AL

// Fetch State Tipleri
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

// Action Tipleri
export const SET_CATEGORIES_REQUEST = 'SET_CATEGORIES_REQUEST';
export const SET_CATEGORIES_SUCCESS = 'SET_CATEGORIES_SUCCESS';
export const SET_CATEGORIES_FAILURE = 'SET_CATEGORIES_FAILURE';

export const SET_PRODUCTS_REQUEST = 'SET_PRODUCTS_REQUEST';
export const SET_PRODUCTS_SUCCESS = 'SET_PRODUCTS_SUCCESS';
export const SET_PRODUCTS_FAILURE = 'SET_PRODUCTS_FAILURE';

export const SET_FETCH_STATE = 'SET_FETCH_STATE'; // Genel fetch state
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';

// T14 için YENİ Action Tipleri
export const SET_SELECTED_CATEGORY_ID = 'SET_SELECTED_CATEGORY_ID';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';         // <<< BU SATIR ÖNEMLİ
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';     // Opsiyonel

// T15 (Sayfalama) İÇİN YENİ ACTION TYPE
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'; // <<<< YENİ EKLE

// YENİ: Tek Ürün Detayı için Action Tipleri
export const FETCH_PRODUCT_BY_ID_REQUEST = 'FETCH_PRODUCT_BY_ID_REQUEST';
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';
export const FETCH_PRODUCT_BY_ID_FAILURE = 'FETCH_PRODUCT_BY_ID_FAILURE';
export const CLEAR_SELECTED_PRODUCT = 'CLEAR_SELECTED_PRODUCT'; // Sayfadan çıkıldığında temizlemek için

// YENİ: Ürün Silme için Action Tipleri
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

// YENİ: Ürün Güncelleme için Action Tipleri
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

// Action Creator Fonksiyonları
export const setCategoriesRequest = () => ({ type: SET_CATEGORIES_REQUEST });
export const setCategoriesSuccess = (categories) => ({ type: SET_CATEGORIES_SUCCESS, payload: categories });
export const setCategoriesFailure = (error) => ({ type: SET_CATEGORIES_FAILURE, payload: error });

export const setProductsRequest = () => ({ type: SET_PRODUCTS_REQUEST });
export const setProductsSuccess = (products, total) => ({ type: SET_PRODUCTS_SUCCESS, payload: { products, total } });
export const setProductsFailure = (error) => ({ type: SET_PRODUCTS_FAILURE, payload: error });

// T14 için YENİ Action Creator Fonksiyonları
export const setSelectedCategoryId = (categoryId) => ({ type: SET_SELECTED_CATEGORY_ID, payload: categoryId });
export const setSortOption = (sortOption) => ({ type: SET_SORT_OPTION, payload: sortOption });

// ========== BU FONKSİYONUN DOĞRU TANIMLANDIĞINDAN VE EXPORT EDİLDİĞİNDEN EMİN OLUN ==========
export const setFilterText = (filterText) => ({
  type: SET_FILTER_TEXT,
  payload: filterText,
});
// =======================================================================================

export const clearAllFilters = () => ({ type: CLEAR_ALL_FILTERS }); // Opsiyonel

// Thunk Action Creator (Kategorileri Çekmek İçin)
export const fetchCategories = () => async (dispatch) => {
  dispatch(setCategoriesRequest());
  console.log('[fetchCategories] Request dispatched');
  try {
    const response = await axiosInstance.get('/categories');
    console.log('[fetchCategories] Response received:', response);
    if (response && response.status === 200 && response.data) {
      console.log('[fetchCategories] Response status 200 and data exists.');
      if (Array.isArray(response.data)) {
        console.log('[fetchCategories] response.data is an array. Dispatching success...');
        dispatch(setCategoriesSuccess(response.data));
        console.log('[fetchCategories] setCategoriesSuccess dispatched.');
      } else {
        console.error('[fetchCategories] ERROR: response.data is not an array!', response.data);
        dispatch(setCategoriesFailure("Category data is not in array format."));
      }
    } else {
      console.error('[fetchCategories] ERROR: Unexpected response structure or status!', response);
      dispatch(setCategoriesFailure("Unexpected response structure or status while fetching categories."));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch categories. Please try again later.";
    console.error("[fetchCategories] CATCH BLOCK ERROR:", errorMessage, "Full error object:", error, "error.response:", error.response, "error.request:", error.request);
    dispatch(setCategoriesFailure(errorMessage));
  }
};

// Thunk Action Creator (ÜRÜNLERİ ÇEKMEK İÇİN - GÜNCELLENDİ)
export const fetchProducts = (params = {}) => async (dispatch, getState) => {
  dispatch(setProductsRequest());
  
  const currentParamsInState = getState().product;
  const finalParams = {
    limit: params.limit !== undefined ? params.limit : currentParamsInState.limit,
    offset: params.offset !== undefined ? params.offset : currentParamsInState.offset,
    // BU SATIR DEĞİŞTİ: `categoryId` yerine `category` kullanılıyor
    category: params.category !== undefined ? params.category : currentParamsInState.selectedCategoryId,
    sort: params.sort !== undefined ? params.sort : currentParamsInState.sortOption,
    filter: params.filter !== undefined ? params.filter : currentParamsInState.filterText,
    gender: params.gender,
    includeInactive: params.includeInactive,
  };

  // Sadece değeri olan parametreleri API'ye gönder
  const activeParams = Object.entries(finalParams).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

  console.log('[fetchProducts] Request dispatched with dynamic params:', activeParams);

  try {
    const response = await axiosInstance.get('/products', { params: activeParams });
    console.log('[fetchProducts] Response received (full data object):', response.data);

    if (response && response.status === 200 && response.data && typeof response.data.total === 'number' && Array.isArray(response.data.products)) {
      console.log('[fetchProducts] Response status 200 and data structure is valid.');
      // Detaylı loglama (isteğe bağlı)
      // response.data.products.slice(0, 3).forEach((product, index) => { ... });
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

// Genel Fetch State (Bu ürünlere özel olan fetch state ile karışabilir, dikkatli kullanılmalı)
export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

// Sayfalama için (T15)
export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

// T15 (Sayfalama) İÇİN YENİ ACTION CREATOR
export const setCurrentPage = (page) => ({ // <<<< YENİ EKLE
  type: SET_CURRENT_PAGE,
  payload: page,
});

// YENİ: Tek Ürün Detayı için Action Creator'lar
export const fetchProductByIdRequest = () => ({ type: FETCH_PRODUCT_BY_ID_REQUEST });
export const fetchProductByIdSuccess = (product) => ({ type: FETCH_PRODUCT_BY_ID_SUCCESS, payload: product });
export const fetchProductByIdFailure = (error) => ({ type: FETCH_PRODUCT_BY_ID_FAILURE, payload: error });
export const clearSelectedProduct = () => ({ type: CLEAR_SELECTED_PRODUCT });

// YENİ: ID ile Tek Ürün Çekmek İçin Thunk Action
export const fetchProductById = (productId) => async (dispatch) => {
  dispatch(fetchProductByIdRequest());
  console.log(`[fetchProductById] Request dispatched for productId: ${productId}`);
  try {
    // API endpoint'i: /products/:productId
    const response = await axiosInstance.get(`/products/${productId}`);
    console.log('[fetchProductById] Response received:', response);
    if (response && response.status === 200 && response.data) {
      // API'den dönen product objesinin görevdeki gibi olduğunu varsayıyoruz
      // (id, name, description, price, images, category_id vb.)
      dispatch(fetchProductByIdSuccess(response.data));
      console.log('[fetchProductById] fetchProductByIdSuccess dispatched with product:', response.data);
    } else {
      console.error('[fetchProductById] ERROR: Unexpected response structure or status!', response);
      dispatch(fetchProductByIdFailure("Unexpected response structure or status while fetching product by ID."));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || `Failed to fetch product with ID ${productId}. Please try again later.`;
    console.error(`[fetchProductById] CATCH BLOCK ERROR for productId ${productId}:`, errorMessage, "Full error object:", error);
    dispatch(fetchProductByIdFailure(errorMessage));
    // Postman'de 500 hatası alıyorduk, API bu endpoint için sorunlu olabilir.
    // Eğer API /products/:id yerine /product/:id gibi bir şey bekliyorsa, burayı düzeltmek gerekebilir.
    // Şimdilik görevdeki /products/:productId varsayımıyla devam ediyoruz.
  }
};

// YENİ: Admin Panelinden Yeni Ürün Oluşturmak İçin Thunk Action (GÜNCELLENDİ)
export const createProduct = (productData) => async (dispatch) => {
  console.log('[createProduct] Action dispatched with data:', productData);
  try {
    const response = await axiosInstance.post('/products', productData);

    if (response.status === 201) {
      console.log('[createProduct] Product created successfully:', response.data);
      // Yönlendirme ve alert kaldırıldı. Bu işlemler artık component seviyesinde yönetiliyor.
      return true;
    } else {
      const errorMessage = `Beklenmedik durum kodu: ${response.status}`;
      console.error('[createProduct] ERROR:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Ürün oluşturulurken bilinmeyen bir hata oluştu.';
    console.error('[createProduct] CATCH BLOCK ERROR:', errorMessage, 'Full error object:', error);
    throw new Error(errorMessage);
  }
};

// YENİ: Ürün Silme için Action Creator'lar
export const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
export const deleteProductSuccess = (productId) => ({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
export const deleteProductFailure = (error) => ({ type: DELETE_PRODUCT_FAILURE, payload: error });

// YENİ: Ürün Silmek İçin Thunk Action (GÜNCELLENDİ)
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(deleteProductRequest());
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`[deleteProduct] Product with ID ${productId} deleted successfully.`);
      dispatch(deleteProductSuccess(productId));
      // alert kaldırıldı, bildirimler component'e bırakıldı.
    } else {
      const errorMessage = `Ürün silinirken beklenmedik bir durum oluştu: ${response.status}`;
      console.error('[deleteProduct] ERROR:', errorMessage);
      dispatch(deleteProductFailure(errorMessage));
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Ürün silinirken bir hata oluştu.';
    console.error(`[deleteProduct] CATCH BLOCK ERROR for productId ${productId}:`, errorMessage, 'Full error object:', error);
    dispatch(deleteProductFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

// YENİ: Ürün Güncelleme için Action Creator'lar
export const updateProductRequest = () => ({ type: UPDATE_PRODUCT_REQUEST });
export const updateProductSuccess = (product) => ({ type: UPDATE_PRODUCT_SUCCESS, payload: product });
export const updateProductFailure = (error) => ({ type: UPDATE_PRODUCT_FAILURE, payload: error });

// YENİ: Ürün Güncellemek İçin Thunk Action
export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch(updateProductRequest());
  try {
    const response = await axiosInstance.put(`/products/${productId}`, productData);

    if (response.status === 200) {
      console.log(`[updateProduct] Product with ID ${productId} updated successfully.`);
      dispatch(updateProductSuccess(response.data));
      alert('Ürün başarıyla güncellendi!');
      return true; // Başarı durumunu döndür
    } else {
      dispatch(updateProductFailure(`Unexpected status: ${response.status}`));
      alert(`Bir hata oluştu. Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Ürün güncellenirken bir hata oluştu.';
    dispatch(updateProductFailure(errorMessage));
    alert(`Hata: ${errorMessage}`);
    return false;
  }
};

// NOT: Eski genel bir 'SET_FILTER' action type ve 'filter' state'i vardı.
// T14 ile 'SET_FILTER_TEXT' ve 'filterText' state'ini daha spesifik olarak ekledik.
// Eğer eski 'SET_FILTER' ve 'filter' artık kullanılmıyorsa, karışıklığı önlemek için kaldırılabilir.
// Şimdilik bu kodda eski 'SET_FILTER' action creator'ı bulunmuyor.

// YENİ EYLEM
export const fetchCategoriesForForm = () => async (dispatch) => {
  dispatch({ type: SET_CATEGORIES_REQUEST });
  try {
    // API.get yerine axiosInstance.get kullan
    const response = await axiosInstance.get('/categories/form-list'); 
    if (response.status === 200 && Array.isArray(response.data)) {
      dispatch({ type: SET_CATEGORIES_SUCCESS, payload: response.data });
    } else {
      throw new Error('Kategorileri formatlı çekerken bir sorun oluştu.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Kategoriler yüklenemedi.';
    dispatch({ type: SET_CATEGORIES_FAILURE, payload: errorMessage });
    // toast.error(errorMessage); // toastr bildirimleri component seviyesinde yönetilirse daha iyi olur.
  }
};