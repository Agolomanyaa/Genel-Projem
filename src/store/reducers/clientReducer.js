import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, GET_ADDRESSES_REQUEST, GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, AUTH_VERIFY_PENDING, AUTH_VERIFY_SUCCESS, AUTH_VERIFY_FAILURE, GET_CREDIT_CARDS_REQUEST, GET_CREDIT_CARDS_SUCCESS, GET_CREDIT_CARDS_FAILURE, ADD_CREDIT_CARD_REQUEST, ADD_CREDIT_CARD_SUCCESS, ADD_CREDIT_CARD_FAILURE, UPDATE_CREDIT_CARD_REQUEST, UPDATE_CREDIT_CARD_SUCCESS, UPDATE_CREDIT_CARD_FAILURE, DELETE_CREDIT_CARD_REQUEST, DELETE_CREDIT_CARD_SUCCESS, DELETE_CREDIT_CARD_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from '../actions/clientActions';

// Başlangıç Durumu (Initial State)
const FETCH_STATES = { // Örnek, eğer productReducer'daki gibi merkezi bir yapınız yoksa
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
  IDLE: 'IDLE', // IDLE durumunu da ekleyebiliriz veya NOT_FETCHED kullanabiliriz
  PENDING: 'PENDING', // FETCHING yerine PENDING de kullanılabilir
  SUCCESS: 'SUCCESS', // FETCHED yerine SUCCESS de kullanılabilir
  FAILURE: 'FAILURE', // FAILED yerine FAILURE da kullanılabilir
};

const initialState = {
  user: null, // Başlangıçta kullanıcı yok
  authStatus: FETCH_STATES.IDLE, // Başlangıçta 'IDLE' veya 'NOT_FETCHED' olabilir
  addressList: [], // Başlangıçta boş liste
  getAddressFetchState: FETCH_STATES.NOT_FETCHED,
  getAddressError: null,
  creditCards: [], // Başlangıçta boş liste
  roles: [], // Başlangıçta roller boş, API'den gelecek
  theme: 'light', // Varsayılan tema
  language: 'en', // Varsayılan dil
  addAddressFetchState: FETCH_STATES.NOT_FETCHED,
  addAddressError: null,
  updateAddressFetchState: FETCH_STATES.NOT_FETCHED,
  updateAddressError: null,
  deleteAddressFetchState: FETCH_STATES.NOT_FETCHED,
  deleteAddressError: null,
  getCreditCardsFetchState: FETCH_STATES.NOT_FETCHED,
  getCreditCardsError: null,
  addCreditCardFetchState: FETCH_STATES.NOT_FETCHED,
  addCreditCardError: null,
  updateCreditCardFetchState: FETCH_STATES.NOT_FETCHED,
  updateCreditCardError: null,
  deleteCreditCardFetchState: FETCH_STATES.NOT_FETCHED,
  deleteCreditCardError: null,
  createOrderFetchState: FETCH_STATES.NOT_FETCHED,
  createOrderError: null,
  lastOrder: null, // Oluşturulan son sipariş bilgisini tutmak için
  orders: [], // Başlangıçta boş sipariş listesi
  fetchOrdersState: FETCH_STATES.NOT_FETCHED,
  fetchOrdersError: null,
};

// Client Reducer Fonksiyonu
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_VERIFY_PENDING:
      return {
        ...state,
        authStatus: FETCH_STATES.PENDING, // Veya 'FETCHING'
        user: null, // Doğrulama başlarken kullanıcıyı null yapabiliriz (isteğe bağlı)
      };
    case AUTH_VERIFY_SUCCESS: // SET_USER ile birleşebilir veya ayrı kalabilir
      return {
        ...state,
        authStatus: FETCH_STATES.SUCCESS, // Veya 'FETCHED'
        user: action.payload, // Kullanıcı bilgisini burada payload'dan alıyoruz
      };
    case AUTH_VERIFY_FAILURE:
      return {
        ...state,
        authStatus: FETCH_STATES.FAILURE, // Veya 'FAILED'
        user: null, // Hata durumunda kullanıcıyı null yap
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authStatus: action.payload ? FETCH_STATES.SUCCESS : FETCH_STATES.FAILURE, 
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload, // roles alanını güncelle
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload, // theme alanını güncelle
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload, // language alanını güncelle
      };
    case GET_ADDRESSES_REQUEST:
      return {
        ...state,
        getAddressFetchState: FETCH_STATES.FETCHING,
        getAddressError: null,
      };
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addressList: action.payload,
        getAddressFetchState: FETCH_STATES.FETCHED,
      };
    case GET_ADDRESSES_FAILURE:
      return {
        ...state,
        getAddressFetchState: FETCH_STATES.FAILED,
        getAddressError: action.payload,
        addressList: [], // Hata durumunda listeyi boşaltmak iyi bir pratik olabilir
      };
    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        addAddressFetchState: FETCH_STATES.FETCHING,
        addAddressError: null,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addAddressFetchState: FETCH_STATES.FETCHED,
        addressList: [action.payload, ...state.addressList],
        addAddressError: null,
      };
    case ADD_ADDRESS_FAILURE:
      return {
        ...state,
        addAddressFetchState: FETCH_STATES.FAILED,
        addAddressError: action.payload,
      };
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        updateAddressFetchState: FETCH_STATES.FETCHING,
        updateAddressError: null,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        updateAddressFetchState: FETCH_STATES.FETCHED,
        addressList: state.addressList.map(address =>
          address.id === action.payload.id ? action.payload : address
        ),
      };
    case UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        updateAddressFetchState: FETCH_STATES.FAILED,
        updateAddressError: action.payload,
      };
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        deleteAddressFetchState: FETCH_STATES.FETCHING,
        deleteAddressError: null,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        deleteAddressFetchState: FETCH_STATES.FETCHED,
        addressList: state.addressList.filter(address => address.id !== action.payload),
        deleteAddressError: null,
      };
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        deleteAddressFetchState: FETCH_STATES.FAILED,
        deleteAddressError: action.payload,
      };
    case GET_CREDIT_CARDS_REQUEST:
      return {
        ...state,
        getCreditCardsFetchState: FETCH_STATES.FETCHING,
        getCreditCardsError: null,
      };
    case GET_CREDIT_CARDS_SUCCESS:
      return {
        ...state,
        getCreditCardsFetchState: FETCH_STATES.FETCHED,
        creditCards: action.payload,
      };
    case GET_CREDIT_CARDS_FAILURE:
      return {
        ...state,
        getCreditCardsFetchState: FETCH_STATES.FAILED,
        getCreditCardsError: action.payload,
        creditCards: [],
      };
    case ADD_CREDIT_CARD_REQUEST:
      return {
        ...state,
        addCreditCardFetchState: FETCH_STATES.FETCHING,
        addCreditCardError: null,
      };
    case ADD_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        addCreditCardFetchState: FETCH_STATES.FETCHED,
        creditCards: [action.payload, ...state.creditCards],
        addCreditCardError: null,
      };
    case ADD_CREDIT_CARD_FAILURE:
      return {
        ...state,
        addCreditCardFetchState: FETCH_STATES.FAILED,
        addCreditCardError: action.payload,
      };
    case UPDATE_CREDIT_CARD_REQUEST:
      return {
        ...state,
        updateCreditCardFetchState: FETCH_STATES.FETCHING,
        updateCreditCardError: null,
      };
    case UPDATE_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        updateCreditCardFetchState: FETCH_STATES.FETCHED,
        creditCards: state.creditCards.map(card =>
          card.id === action.payload.id ? action.payload : card
        ),
        updateCreditCardError: null,
      };
    case UPDATE_CREDIT_CARD_FAILURE:
      return {
        ...state,
        updateCreditCardFetchState: FETCH_STATES.FAILED,
        updateCreditCardError: action.payload,
      };
    case DELETE_CREDIT_CARD_REQUEST:
      return {
        ...state,
        deleteCreditCardFetchState: FETCH_STATES.FETCHING,
        deleteCreditCardError: null,
      };
    case DELETE_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        deleteCreditCardFetchState: FETCH_STATES.FETCHED,
        creditCards: state.creditCards.filter(card => card.id !== action.payload),
        deleteCreditCardError: null,
      };
    case DELETE_CREDIT_CARD_FAILURE:
      return {
        ...state,
        deleteCreditCardFetchState: FETCH_STATES.FAILED,
        deleteCreditCardError: action.payload,
      };
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        createOrderFetchState: FETCH_STATES.FETCHING,
        createOrderError: null,
        lastOrder: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderFetchState: FETCH_STATES.FETCHED,
        lastOrder: action.payload, // API'den dönen sipariş bilgisini kaydet
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        createOrderFetchState: FETCH_STATES.FAILED,
        createOrderError: action.payload,
      };
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        fetchOrdersState: FETCH_STATES.FETCHING,
        fetchOrdersError: null,
        orders: [], // İstek başlarken mevcut listeyi temizleyebiliriz (isteğe bağlı)
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        fetchOrdersState: FETCH_STATES.FETCHED,
        orders: action.payload, // API'den gelen sipariş listesi
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        fetchOrdersState: FETCH_STATES.FAILED,
        fetchOrdersError: action.payload,
        orders: [], // Hata durumunda listeyi boşalt
      };
    default:
      return state; // Bilinmeyen action tipi için mevcut state'i döndür
  }
};

export default clientReducer; 