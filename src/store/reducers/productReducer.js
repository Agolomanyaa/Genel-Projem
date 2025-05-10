import {
  FETCH_STATES,
  SET_CATEGORIES_REQUEST,
  SET_CATEGORIES_SUCCESS,
  SET_CATEGORIES_FAILURE,
  SET_PRODUCTS_REQUEST,
  SET_PRODUCTS_SUCCESS,
  SET_PRODUCTS_FAILURE,
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
  totalProducts: 0, // Toplam ürün sayısı
  productsFetchState: FETCH_STATES.NOT_FETCHED, // Ürünler için yüklenme durumu
  productsError: null, // Ürün çekme hatası
  fetchState: FETCH_STATES.NOT_FETCHED, // Başlangıç yüklenme durumu
  limit: 25, // Sayfa başına ürün sayısı
  offset: 0, // Sayfalama başlangıç noktası
  filter: '', // Filtre metni
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

    // --- YENİ ÜRÜN ACTION'LARI ---
    case SET_PRODUCTS_REQUEST:
      return {
        ...state,
        productsFetchState: FETCH_STATES.FETCHING,
        productsError: null, // Önceki hatayı temizle
      };
    case SET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload.products, // Payload'dan ürünleri al
        totalProducts: action.payload.total,   // Payload'dan toplam sayıyı al
        productsFetchState: FETCH_STATES.FETCHED,
      };
    case SET_PRODUCTS_FAILURE:
      return {
        ...state,
        productsFetchState: FETCH_STATES.FAILED,
        productsError: action.payload,
      };
    // -----------------------------

    // Eski Product Action'ları (SET_PRODUCT_LIST ve SET_TOTAL kaldırıldı)
    // case SET_PRODUCT_LIST:
    //   return { ...state, productList: action.payload };
    // case SET_TOTAL:
    //   return { ...state, total: action.payload }; // totalProducts olarak değişti

    // Bu genel fetchState, eğer sadece ürünlerle ilgiliyse `productsFetchState` ile birleştirilebilir.
    // Şimdilik ayrı tutuyorum.
    case SET_FETCH_STATE:
      if (Object.values(FETCH_STATES).includes(action.payload)) {
        return { ...state, fetchState: action.payload };
      }
      return state;
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