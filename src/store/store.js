import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Yorum satırını kaldır veya tekrar ekle
import logger from 'redux-logger';
import rootReducer from './reducers';

// Middleware dizisine thunk'ı tekrar ekle
const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

// Test logunu 
// console.log("Redux Store Başlatıldı:", store.getState());

export default store; 