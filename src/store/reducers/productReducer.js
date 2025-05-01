import {
  FETCH_STATES,
  SET_CATEGORIES,
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
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
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