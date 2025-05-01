import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ShopPage from './pages/ShopPage';
import AboutUsPage from './pages/AboutUsPage';
import SignupPage from './pages/SignupPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
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
        <Route path="/shop/:categoryName" component={ShopPage} />
        <Route path="/shop" exact component={ShopPage} />
      </Switch>
    </Router>
  );
}

export default App;
