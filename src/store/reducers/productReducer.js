// src/store/reducers/productReducer.js
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
  // SET_FILTER, // <<< BU SATIRIN OLMADIĞINDAN EMİN OLUN
  // T14 için Action Tipleri
  SET_SELECTED_CATEGORY_ID,
  SET_SORT_OPTION,
  SET_FILTER_TEXT,
  CLEAR_ALL_FILTERS, // Opsiyonel
  SET_CURRENT_PAGE, // <<<< BU IMPORT'UN OLDUĞUNDAN EMİN OL (productActions.js'de export edilmişti)
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
  CLEAR_SELECTED_PRODUCT,
} from '../actions/productActions';

const initialState = {
  categories: [],
  categoriesFetchState: FETCH_STATES.NOT_FETCHED,
  categoriesError: null,
  productList: [],
  totalProducts: 0,
  productsFetchState: FETCH_STATES.NOT_FETCHED,
  productsError: null,
  fetchState: FETCH_STATES.NOT_FETCHED,
  limit: 25,
  offset: 0,
  currentPage: 1,
  selectedCategoryId: null,
  sortOption: '',
  filterText: '',
  // filter: '', // <<< ESKİ 'filter' STATE'İNİN DE OLMADIĞINDAN EMİN OLUN (isteğe bağlı ama önerilir)
  selectedProduct: null,
  selectedProductFetchState: FETCH_STATES.NOT_FETCHED,
  selectedProductError: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES_REQUEST:
      return {
        ...state,
        categoriesFetchState: FETCH_STATES.FETCHING,
        categoriesError: null,
      };
    case SET_CATEGORIES_SUCCESS:
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
    case SET_PRODUCTS_REQUEST:
      return {
        ...state,
        productsFetchState: FETCH_STATES.FETCHING,
        productsError: null,
      };
    case SET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload.products,
        totalProducts: action.payload.total,
        productsFetchState: FETCH_STATES.FETCHED,
      };
    case SET_PRODUCTS_FAILURE:
      return {
        ...state,
        productsFetchState: FETCH_STATES.FAILED,
        productsError: action.payload,
      };
    case SET_SELECTED_CATEGORY_ID:
      return {
        ...state,
        selectedCategoryId: action.payload,
        offset: 0, // Kategori değişince başa dön
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        sortOption: action.payload,
        offset: 0, // Sıralama değişince başa dön
      };
    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: action.payload,
        offset: 0, // Filtre değişince başa dön
      };
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        selectedCategoryId: null,
        sortOption: '',
        filterText: '',
        offset: 0,
      };
    case SET_FETCH_STATE:
      if (Object.values(FETCH_STATES).includes(action.payload)) {
        return { ...state, fetchState: action.payload };
      }
      return state;
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    
    // case SET_FILTER: // <<< BU CASE BLOĞUNUN TAMAMEN KALDIRILDIĞINDAN EMİN OLUN
    //   return { ...state, filter: action.payload };

    case SET_CURRENT_PAGE: // <<<< YENİ EKLE
      return {
        ...state,
        currentPage: action.payload,
        // Not: Offset burada güncellenmiyor, çünkü fetchProducts
        // çağrılmadan önce ShopPage'deki handlePageChange içinde
        // yeni offset hesaplanıp doğrudan fetchProducts'a veriliyor.
        // Eğer istersen, currentPage değiştiğinde offset'i de burada
        // (state.limit * (action.payload - 1)) olarak ayarlayabilirsin,
        // ama mevcut ShopPage mantığına göre bu gerekli değil.
      };

    case FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        selectedProductFetchState: FETCH_STATES.FETCHING,
        selectedProductError: null,
      };
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedProductFetchState: FETCH_STATES.FETCHED,
        selectedProduct: action.payload,
      };
    case FETCH_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        selectedProductFetchState: FETCH_STATES.FAILED,
        selectedProductError: action.payload,
      };
    case CLEAR_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: null,
        selectedProductFetchState: FETCH_STATES.NOT_FETCHED,
        selectedProductError: null,
      };

    default:
      return state;
  }
};

export default productReducer;