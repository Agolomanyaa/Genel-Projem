import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/actions/clientActions';
import { fetchCategories, fetchProducts } from './store/actions/productActions';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ShopPage from './pages/ShopPage';
import AboutUsPage from './pages/AboutUsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(fetchCategories());
    // dispatch(fetchProducts()); // App.js'de genel ürün çekme yerine ShopPage'de çekiliyor
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* T16 İÇİN YENİ ÜRÜN DETAY ROTASI */}
        <Route 
          path="/shop/:gender/:categorySlug/:categoryId/:productNameSlug/:productId" 
          component={ProductDetailPage} 
        />
        {/* Mevcut basit ürün detay rotası (belki ileride kaldırılabilir veya yönlendirme yapılabilir) */}
        <Route path="/product/:productId" component={ProductDetailPage} /> 
        
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutUsPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />

        {/* SHOP ROTASLARI */}
        <Route path="/shop/home-living" component={ShopPage} />
        <Route path="/shop/:gender/:categorySlug/:categoryId" component={ShopPage} />
        <Route path="/shop/:gender" component={ShopPage} />
        <Route path="/shop" exact component={ShopPage} />

        <ProtectedRoute path="/checkout" component={() => <div>Checkout Page (Protected)</div>} />
        <ProtectedRoute path="/orders" component={() => <div>Order History Page (Protected)</div>} />
        <ProtectedRoute path="/cart" component={() => <div>Cart Page (Protected)</div>} />
        <ProtectedRoute path="/order" component={() => <div>Order Page (Protected)</div>} />
        <ProtectedRoute path="/order-confirmation" component={() => <div>Order Confirmation Page (Protected)</div>} />
      </Switch>
    </Router>
  );
}

export default App;
