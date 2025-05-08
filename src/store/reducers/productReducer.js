import {
  FETCH_STATES,
  SET_CATEGORIES_REQUEST,
  SET_CATEGORIES_SUCCESS,
  SET_CATEGORIES_FAILURE,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
} from '../actions/productActions';

// Başlangıç Durumu (Initial State)
const initialState = {
  categories: [], // Kategori listesi
  categoriesFetchState: FETCH_STATES.NOT_FETCHED, // Kategoriler için yüklenme durumu - YENİ
  categoriesError: null, // Kategori çekme hatası - YENİ
  productList: [], // Ürün listesi
  total: 0, // Toplam ürün sayısı
  limit: 25, // Sayfa başına ürün sayısı
  offset: 0, // Sayfalama başlangıç noktası
  filter: '', // Filtre metni
  fetchState: FETCH_STATES.NOT_FETCHED, // Başlangıç yüklenme durumu
};

// Product Reducer Fonksiyonu
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Kategori Action'ları - YENİ / GÜNCELLENDİ
    case SET_CATEGORIES_REQUEST:
      return {
        ...state,
        categoriesFetchState: FETCH_STATES.FETCHING,
        categoriesError: null, // Önceki hatayı temizle
      };
    case SET_CATEGORIES_SUCCESS: // Eski SET_CATEGORIES yerine
      return {
        ...state,
        categories: action.payload,
        categoriesFetchState: FETCH_STATES.FETCHED,
      };
    case SET_CATEGORIES_FAILURE:
      return {
        ...state,
        categoriesFetchState: FETCH_STATES.FAILED,
        categoriesError: action.payload,
      };

    // Mevcut Product Action'ları (dokunmayın)
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      // Gelen payload'un geçerli bir fetchState olduğundan emin olalım (isteğe bağlı kontrol)
      if (Object.values(FETCH_STATES).includes(action.payload)) {
        return { ...state, fetchState: action.payload };
      }
      return state; // Geçersizse state'i değiştirme
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default productReducer; 