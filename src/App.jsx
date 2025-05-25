import React, { useEffect } from 'react';
// Routes importu kaldırıldı, sadece Switch kalmalı
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/actions/clientActions';
import { fetchCategories } from './store/actions/productActions';
import { loadCartFromStorage } from './store/actions/shoppingCartActions';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ShopPage from './pages/ShopPage';
import AboutUsPage from './pages/AboutUsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute'; // Bu componentin v5 ile uyumlu olduğundan emin olalım
import ShoppingCartPage from './pages/ShoppingCartPage'; // Bu import doğru
import OrderPage from './pages/OrderPage'; // Yeni sayfayı import et

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(fetchCategories());

    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          dispatch(loadCartFromStorage(parsedCart));
        } else {
          localStorage.removeItem('cart');
        }
      }
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
      localStorage.removeItem('cart');
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Switch> {/* Routes yerine Switch */}
        <Route path="/" exact component={HomePage} />
        
        <Route 
          path="/shop/:gender/:categorySlug/:categoryId/:productNameSlug/:productId" 
          component={ProductDetailPage} 
        />
        <Route path="/product/:productId" component={ProductDetailPage} /> 
        
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutUsPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />

        <Route path="/shop/home-living" component={ShopPage} />
        <Route path="/shop/:gender/:categorySlug/:categoryId" component={ShopPage} />
        <Route path="/shop/:gender" component={ShopPage} />
        <Route path="/shop" exact component={ShopPage} />

        {/* ShoppingCartPage için Route (element yerine component) */}
        <Route path="/cart" component={ShoppingCartPage} /> 

        {/* Checkout sayfası için Korumalı Rota */}
        <ProtectedRoute path="/checkout" component={OrderPage} /> {/* Burası ProtectedRoute kullanımına göre değişebilir */}
        
        {/* ProtectedRoute'lar component prop'u ile kalmalı */}
        <ProtectedRoute path="/orders" component={() => <div>Order History Page (Protected)</div>} />
        <ProtectedRoute path="/order" component={() => <div>Order Page (Protected)</div>} />
        <ProtectedRoute path="/order-confirmation" component={() => <div>Order Confirmation Page (Protected)</div>} />
        
        {/* Eğer hiçbir rota eşleşmezse gösterilecek bir 404 sayfası eklenebilir */}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;