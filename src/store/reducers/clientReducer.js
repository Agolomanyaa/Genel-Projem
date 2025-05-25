import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, GET_ADDRESSES_REQUEST, GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, AUTH_VERIFY_PENDING, AUTH_VERIFY_SUCCESS, AUTH_VERIFY_FAILURE } from '../actions/clientActions';

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
    // TODO: addressList ve creditCards için action'lar gerekirse eklenebilir
    default:
      return state; // Bilinmeyen action tipi için mevcut state'i döndür
  }
};

export default clientReducer; 