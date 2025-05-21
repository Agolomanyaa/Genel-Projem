import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_COUNT,
  CLEAR_CART,
  TOGGLE_PRODUCT_CHECKED,
  // TOGGLE_CART_ITEM_CHECKED, // Şimdilik kullanmıyoruz
} from '../actions/shoppingCartActions';

// Başlangıç Durumu (Initial State)
const initialState = {
  cart: [], // { product: { id, name, price, images... }, count: 1, checked: true } formatında objeler içerecek
  // Belki toplam tutar, toplam ürün sayısı gibi state'ler de burada tutulabilir
  // ama bunlar genellikle sepet içeriğinden türetilir (selector ile).
};

// ShoppingCart Reducer Fonksiyonu
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
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
        return { ...state, cart: updatedCart };
      } else {
        // Ürün sepette yok, yeni ürün olarak ekle
        // checked: true varsayılan olarak eklendi, checkout'ta kullanılabilir
        const newItem = { product, count, checked: true };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== productId
      );
      return { ...state, cart: updatedCart };
    }

    case UPDATE_CART_ITEM_COUNT: {
      const { productId, count } = action.payload;
      if (count <= 0) { 
        // Eğer yeni sayı 0 veya daha az ise, ürünü sepetten kaldır
        const updatedCartAfterRemoval = state.cart.filter(
          (item) => item.product.id !== productId
        );
        return { ...state, cart: updatedCartAfterRemoval };
      }
      // Ürünün sayısını güncelle
      const updatedCart = state.cart.map((item) =>
        item.product.id === productId ? { ...item, count: count } : item
      );
      return { ...state, cart: updatedCart };
    }

    case CLEAR_CART:
      return {
        ...state,
        cart: [], // Sepeti boşalt
      };

    case TOGGLE_PRODUCT_CHECKED: {
      const { productId } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.product.id === productId ? { ...item, checked: !item.checked } : item
      );
      return { ...state, cart: updatedCart };
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
};

export default shoppingCartReducer; 