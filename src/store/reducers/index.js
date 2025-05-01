import { combineReducers } from 'redux';
import clientReducer from './clientReducer'; // clientReducer'ı import et
import productReducer from './productReducer'; // productReducer'ı import et
import shoppingCartReducer from './shoppingCartReducer'; // shoppingCartReducer'ı import et

// TODO: Diğer reducer'ları import et (productReducer, shoppingCartReducer)

const rootReducer = combineReducers({
  client: clientReducer, // client state parçasını clientReducer yönetecek
  product: productReducer, // product state parçasını productReducer yönetecek
  shoppingCart: shoppingCartReducer, // shoppingCart state parçasını shoppingCartReducer yönetecek
  // shoppingCart: shoppingCartReducer,

  // Test reducer'ını kaldırabilir veya yorum satırı yapabiliriz
  // test: (state = { message: "Reducer working!" }, action) => state,
});

export default rootReducer; 