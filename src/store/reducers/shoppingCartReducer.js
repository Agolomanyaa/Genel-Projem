import { SET_CART, SET_PAYMENT, SET_ADDRESS } from '../actions/shoppingCartActions';

// Başlangıç Durumu (Initial State)
const initialState = {
  cart: [], // Başlangıçta sepet boş
  payment: {}, // Başlangıçta ödeme bilgisi boş
  address: {}, // Başlangıçta adres bilgisi boş
};

// ShoppingCart Reducer Fonksiyonu
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload, // cart alanını güncelle (genellikle tüm sepet listesi)
      };
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload, // payment alanını güncelle
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload, // address alanını güncelle
      };
    default:
      return state;
  }
};

export default shoppingCartReducer; 