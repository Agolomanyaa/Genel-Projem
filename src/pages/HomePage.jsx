import React from 'react';
import MainLayout from '../layouts/MainLayout'; // Uzantı belirtmeye gerek yok
import HeroSection from '../components/HeroSection'; // Uzantı belirtmeye gerek yok
import EditorPicks from '../components/EditorPicks'; // Uzantı belirtmeye gerek yok
import ProductGrid from '../components/ProductGrid'; // Uzantı belirtmeye gerek yok
// Import other sections as needed
// import FeaturedPosts from '../components/FeaturedPosts';

// HomePage'e özgü diğer bileşenleri buraya import edebilirsiniz
// import HeroSection from '../components/HeroSection';
// import ProductList from '../components/ProductList';
// import EditorPicks from '../components/EditorPicks';

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <EditorPicks />
      <ProductGrid title="BESTSELLER PRODUCTS" />
      {/* Add other sections like Featured Posts below */}
      {/* <FeaturedPosts /> */}
    </MainLayout>
  );
};

export default HomePage;
