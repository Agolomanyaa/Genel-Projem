// Action Tipleri
export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_COUNT = 'UPDATE_CART_ITEM_COUNT';
export const CLEAR_CART = 'CLEAR_CART'; // Tüm sepeti temizlemek için opsiyonel
// export const TOGGLE_CART_ITEM_CHECKED = 'TOGGLE_CART_ITEM_CHECKED'; // Şimdilik kullanmayabiliriz

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

/**
 * Sepete ürün ekler veya mevcut ürünün sayısını artırır.
 * @param {Object} product - Eklenecek ürün objesi (id, name, price, images vb. içermeli)
 * @param {number} count - Eklenecek miktar (varsayılan 1)
 */
export const addToCart = (product, count = 1) => ({
  type: ADD_TO_CART,
  payload: { product, count },
});

/**
 * Sepetten bir ürünü ID'sine göre tamamen kaldırır.
 * @param {string|number} productId - Kaldırılacak ürünün ID'si
 */
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});

/**
 * Sepetteki bir ürünün miktarını günceller.
 * @param {string|number} productId - Miktarı güncellenecek ürünün ID'si
 * @param {number} count - Yeni miktar (0'dan büyük olmalı, 0 ise ürünü kaldırır gibi davranabilir)
 */
export const updateCartItemCount = (productId, count) => ({
  type: UPDATE_CART_ITEM_COUNT,
  payload: { productId, count },
});

/**
 * Tüm sepeti temizler.
 */
export const clearCart = () => ({
  type: CLEAR_CART,
});

// Opsiyonel: Ürünün işaretli olup olmadığını değiştirmek için (checkout'ta kullanılabilir)
// export const toggleCartItemChecked = (productId) => ({
//   type: TOGGLE_CART_ITEM_CHECKED,
//   payload: { productId },
// });

// TODO: Action Creator fonksiyonları buraya eklenecek
// TODO: Sepete ekleme/çıkarma/güncelleme gibi daha karmaşık action'lar ileride eklenebilir 