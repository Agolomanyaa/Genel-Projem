import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_COUNT,
  CLEAR_CART,
  TOGGLE_PRODUCT_CHECKED,
  LOAD_CART_FROM_STORAGE,
  // TOGGLE_CART_ITEM_CHECKED, // Şimdilik kullanmıyoruz
} from '../actions/shoppingCartActions';

// Başlangıç Durumu (Initial State)
const initialState = {
  cart: [], // { product: { id, name, price, images... }, count: 1, checked: true } formatında objeler içerecek
  // Belki toplam tutar, toplam ürün sayısı gibi state'ler de burada tutulabilir
  // ama bunlar genellikle sepet içeriğinden türetilir (selector ile).
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

// ShoppingCart Reducer Fonksiyonu
const shoppingCartReducer = (state = initialState, action) => {
  let newState; // Güncellenmiş state'i tutmak için

  switch (action.type) {
    case LOAD_CART_FROM_STORAGE:
      newState = {
        ...state,
        cart: action.payload || [], // payload varsa onu kullan, yoksa boş dizi
      };
      break;

    case ADD_TO_CART: {
      const { product, count } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.product.id === product.id
        // TODO: Eğer ürünün renk/beden gibi varyasyonları varsa,
        // burada sadece product.id değil, varyasyon ID'lerini de kontrol etmek gerekebilir.
        // Şimdilik sadece product.id'ye bakıyoruz.
      );

      if (existingProductIndex > -1) {
        // Ürün sepette zaten var, sayısını artır
        const updatedCart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, count: item.count + count }
            : item
        );
        newState = { ...state, cart: updatedCart };
      } else {
        // Ürün sepette yok, yeni ürün olarak ekle
        // checked: true varsayılan olarak eklendi, checkout'ta kullanılabilir
        const newItem = { product, count, checked: true };
        newState = { ...state, cart: [...state.cart, newItem] };
      }
      break;
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== productId
      );
      newState = { ...state, cart: updatedCart };
      break;
    }

    case UPDATE_CART_ITEM_COUNT: {
      const { productId, count } = action.payload;
      let updatedCart;
      if (count <= 0) { 
        // Eğer yeni sayı 0 veya daha az ise, ürünü sepetten kaldır
        updatedCart = state.cart.filter(
          (item) => item.product.id !== productId
        );
      } else {
        // Ürünün sayısını güncelle
        updatedCart = state.cart.map((item) =>
          item.product.id === productId ? { ...item, count: count } : item
        );
      }
      newState = { ...state, cart: updatedCart };
      break;
    }

    case CLEAR_CART:
      newState = {
        ...state,
        cart: [], // Sepeti boşalt
      };
      break;

    case TOGGLE_PRODUCT_CHECKED: {
      const { productId } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.product.id === productId ? { ...item, checked: !item.checked } : item
      );
      newState = { ...state, cart: updatedCart };
      break;
    }

    // case TOGGLE_CART_ITEM_CHECKED: {
    //   const { productId } = action.payload;
    //   const updatedCart = state.cart.map((item) =>
    //     item.product.id === productId ? { ...item, checked: !item.checked } : item
    //   );
    //   return { ...state, cart: updatedCart };
    // }

    default:
      return state;
  }

  if (newState) {
    if (action.type !== LOAD_CART_FROM_STORAGE) {
      saveCartToLocalStorage(newState.cart);
    }
  }
  
  return newState || state; // Eğer newState tanımlanmadıysa (default case), orijinal state'i dön
};

export default shoppingCartReducer; 