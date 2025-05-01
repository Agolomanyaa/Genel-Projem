// Action Tipleri
export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';

// Action Creator Fonksiyonları
export const setCart = (cartItems) => ({
  type: SET_CART,
  payload: cartItems, // Gönderilecek veri (sepet ürünleri dizisi)
});

export const setPayment = (paymentInfo) => ({
  type: SET_PAYMENT,
  payload: paymentInfo, // Gönderilecek veri (ödeme bilgileri objesi)
});

export const setAddress = (addressInfo) => ({
  type: SET_ADDRESS,
  payload: addressInfo, // Gönderilecek veri (adres bilgileri objesi)
});

// TODO: Action Creator fonksiyonları buraya eklenecek
// TODO: Sepete ekleme/çıkarma/güncelleme gibi daha karmaşık action'lar ileride eklenebilir 