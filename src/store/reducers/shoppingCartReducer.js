import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_COUNT, CLEAR_CART, LOAD_CART_FROM_STORAGE } from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
};

// Yardımcı fonksiyon: Sepeti localStorage'a kaydeder.
const saveCartToLocalStorage = (cart) => {
  try {
    const serializableCart = JSON.stringify(cart);
    localStorage.setItem('shoppingCart', serializableCart);
  } catch (e) {
    console.error("Could not save cart to local storage", e);
  }
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, count } = action.payload;
      const newCart = [...state.cart];
      
      // --- ANA DÜZELTME BURADA ---
      // Ürünün sepette olup olmadığını `id` yerine `variantId` ile kontrol ediyoruz.
      // Bu sayede aynı ürünün farklı bedenleri, sepette farklı ürünler olarak kabul edilir.
      const existingProductIndex = newCart.findIndex(
        (item) => item.product.variantId === product.variantId
      );

      if (existingProductIndex > -1) {
        // Eğer aynı varyant zaten sepette varsa, sadece miktarını artır.
        newCart[existingProductIndex].count += count;
      } else {
        // Eğer bu varyant sepette yoksa, yeni bir ürün olarak ekle.
        newCart.push({ product, count });
      }
      
      saveCartToLocalStorage(newCart);
      return { ...state, cart: newCart };
    }

    case REMOVE_FROM_CART: {
      // --- GÜNCELLEME ---
      // Ürünü silerken de `variantId` ile kontrol ediyoruz.
      const filteredCart = state.cart.filter(
        (item) => item.product.variantId !== action.payload
      );
      saveCartToLocalStorage(filteredCart);
      return { ...state, cart: filteredCart };
    }

    case UPDATE_CART_ITEM_COUNT: {
      const { variantId, newCount } = action.payload;
      
      if (newCount <= 0) {
         // Eğer adet 0 veya daha az ise, ürünü sepetten tamamen kaldır.
         const cartAfterRemoval = state.cart.filter(
           (item) => item.product.variantId !== variantId
         );
         saveCartToLocalStorage(cartAfterRemoval);
         return { ...state, cart: cartAfterRemoval };
      }

      // --- GÜNCELLEME ---
      // Miktarı güncellerken de doğru varyantı bulmak için `variantId` kullanıyoruz.
      const updatedCart = state.cart.map((item) => {
        if (item.product.variantId === variantId) {
          return { ...item, count: newCount };
        }
        return item;
      });

      saveCartToLocalStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case CLEAR_CART: {
      saveCartToLocalStorage([]);
      return { ...state, cart: [] };
    }

    case LOAD_CART_FROM_STORAGE: {
      return { ...state, cart: action.payload };
    }

    default:
      return state;
  }
};

export default shoppingCartReducer; 