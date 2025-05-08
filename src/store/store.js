import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [thunk];

// Sadece geliştirme ortamında logger'ı ekle (isteğe bağlı ama önerilir)
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// Redux DevTools için enhancer ayarı - YENİ EKLENDİ
// Geliştirme modunda ve tarayıcıda __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ varsa onu kullan, yoksa Redux'ın compose fonksiyonunu kullan.
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  // applyMiddleware'i composeEnhancers ile sarmalıyoruz
  composeEnhancers(applyMiddleware(...middlewares))
);

// Test logunu 
// console.log("Redux Store Başlatıldı:", store.getState());

export default store; 