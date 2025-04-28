import React from 'react';
import MainLayout from '../layouts/MainLayout'; // Uzantı belirtmeye gerek yok
import HeroSection from '../components/HeroSection'; // Uzantı belirtmeye gerek yok
import EditorPicks from '../components/EditorPicks'; // Uzantı belirtmeye gerek yok
import ProductGrid from '../components/ProductGrid'; // Uzantı belirtmeye gerek yok
// Veriyi yeni merkezi dosyadan import et
import { getProductsData } from '../data/products.js';
// Import other sections as needed
// import FeaturedPosts from '../components/FeaturedPosts';

// HomePage'e özgü diğer bileşenleri buraya import edebilirsiniz
// import HeroSection from '../components/HeroSection';
// import ProductList from '../components/ProductList';
// import EditorPicks from '../components/EditorPicks';

const HomePage = () => {
  const allProducts = getProductsData();

  // Bestseller için ilk 5 erkek (1-5) VE ilk 5 kadın (11-15) ürün ID'lerini seçelim
  const bestsellerProductIds = [
    'product-1', 'product-2', 'product-3', 'product-4', 'product-5', // Erkek
    'product-11', 'product-12', 'product-13', 'product-14', 'product-15' // Kadın
  ];
  const bestsellerProducts = allProducts.filter(product => bestsellerProductIds.includes(product.productId));

  return (
    <MainLayout>
      <HeroSection />
      <EditorPicks />
      <ProductGrid title="BESTSELLER PRODUCTS" products={bestsellerProducts} />
      {/* <FeaturedPosts /> */}
    </MainLayout>
  );
};

export default HomePage;
