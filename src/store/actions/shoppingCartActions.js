// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_COUNT = 'UPDATE_CART_ITEM_COUNT';
export const CLEAR_CART = 'CLEAR_CART';
export const LOAD_CART_FROM_STORAGE = 'LOAD_CART_FROM_STORAGE';

// Action Creators
export const addToCart = (product, count) => ({
  type: ADD_TO_CART,
  payload: { product, count },
});

// --- DÜZELTME ---
// Bu eylemin payload'u olarak artık variantId bekliyoruz.
export const removeFromCart = (variantId) => ({
  type: REMOVE_FROM_CART,
  payload: variantId, 
});

// --- DÜZELTME ---
// Bu eylemin payload'u olarak artık variantId ve yeni adedi bekliyoruz.
export const updateCartItemCount = (variantId, newCount) => ({
  type: UPDATE_CART_ITEM_COUNT,
  payload: { variantId, newCount },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const loadCartFromStorage = () => {
    try {
        const serializedCart = localStorage.getItem('shoppingCart');
        if (serializedCart === null) {
            return { type: LOAD_CART_FROM_STORAGE, payload: [] };
        }
        const cart = JSON.parse(serializedCart);
        return { type: LOAD_CART_FROM_STORAGE, payload: cart };
    } catch (error) {
        console.error("Could not load cart from local storage", error);
        return { type: LOAD_CART_FROM_STORAGE, payload: [] };
    }
}; 