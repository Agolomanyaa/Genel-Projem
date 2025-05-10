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
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/product/:productId" component={ProductDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutUsPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />

        {/* SHOP ROTASLARI - YENİ SIRALAMA VE ROTA */}
        {/* 1. En spesifik: "Home & Living" için özel yol */}
        <Route path="/shop/home-living" component={ShopPage} />

        {/* 2. API Kategorileri (üç parametreli) */}
        <Route path="/shop/:gender/:categorySlug/:categoryId" component={ShopPage} />

        {/* 3. YENİ: Sadece Cinsiyet (iki parametreli, :gender 'k' veya 'e' olacak) */}
        {/*    Bu, /shop/home-living ve /shop/:g/:c/:id ile eşleşmeyenleri yakalar */}
        <Route path="/shop/:gender" component={ShopPage} />

        {/* 4. En genel: Sadece /shop (Tüm Ürünler) */}
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
