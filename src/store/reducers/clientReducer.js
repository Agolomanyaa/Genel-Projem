import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../actions/clientActions';

// Başlangıç Durumu (Initial State)
const initialState = {
  user: null, // Başlangıçta kullanıcı yok
  addressList: [], // Başlangıçta boş liste
  creditCards: [], // Başlangıçta boş liste
  roles: [], // Başlangıçta roller boş, API'den gelecek
  theme: 'light', // Varsayılan tema
  language: 'en', // Varsayılan dil
};

// Client Reducer Fonksiyonu
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, // Önceki state'i kopyala
        user: action.payload, // user alanını güncelle
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
    // TODO: addressList ve creditCards için action'lar gerekirse eklenebilir
    default:
      return state; // Bilinmeyen action tipi için mevcut state'i döndür
  }
};

export default clientReducer; 