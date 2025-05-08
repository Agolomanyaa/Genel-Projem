import React from 'react';
import { useSelector } from 'react-redux'; // Redux store'a erişim için
import { Link } from 'react-router-dom'; // Link oluşturmak için
import MainLayout from '../layouts/MainLayout'; // Uzantı belirtmeye gerek yok
import HeroSection from '../components/HeroSection'; // Uzantı belirtmeye gerek yok
import EditorPicks from '../components/EditorPicks'; // Uzantı belirtmeye gerek yok
import ProductGrid from '../components/ProductGrid'; // Uzantı belirtmeye gerek yok
// Veriyi yeni merkezi dosyadan import et
import { getProductsData } from '../data/products.js';
// Import other sections as needed
// import FeaturedPosts from '../components/FeaturedPosts';
import { FETCH_STATES } from '../store/actions/productActions'; // FETCH_STATES'i import ediyoruz

// HomePage'e özgü diğer bileşenleri buraya import edebilirsiniz
// import HeroSection from '../components/HeroSection';
// import ProductList from '../components/ProductList';
// import EditorPicks from '../components/EditorPicks';

// URL için 'slug' oluşturma yardımcı fonksiyonu
// Bu fonksiyonu projenizde bir utils dosyasına taşıyıp oradan import edebilirsiniz (örn: src/utils/slugify.js)
const createCategorySlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/[^a-z0-9-]/g, ''); // URL'de izin verilmeyen özel karakterleri ve Türkçe karakterleri kaldır/dönüştür
};

const HomePage = () => {
  const allProducts = getProductsData();

  // Bestseller için ilk 5 erkek (1-5) VE ilk 5 kadın (11-15) ürün ID'lerini seçelim
  const bestsellerProductIds = [
    'product-1', 'product-2', 'product-3', 'product-4', 'product-5', // Erkek
    'product-11', 'product-12', 'product-13', 'product-14', 'product-15' // Kadın
  ];
  const bestsellerProducts = allProducts.filter(product => bestsellerProductIds.includes(product.productId));

  // Redux store'dan kategorileri ve yüklenme durumunu al
  const {
    categories,
    categoriesFetchState,
    categoriesError
  } = useSelector((state) => state.product);

  let topCategoriesContent;

  if (categoriesFetchState === FETCH_STATES.FETCHING) {
    topCategoriesContent = <p className="text-center py-4">Loading top categories...</p>;
  } else if (categoriesFetchState === FETCH_STATES.FAILED) {
    topCategoriesContent = <p className="text-center py-4 text-red-500">Error: {categoriesError}</p>;
  } else if (categoriesFetchState === FETCH_STATES.FETCHED && categories.length > 0) {
    const sortedCategories = [...categories]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    if (sortedCategories.length > 0) {
      topCategoriesContent = (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sortedCategories.map((category) => (
            <div key={category.id} className="category-item text-center group">
              <Link to={`/shop/${category.gender}/${createCategorySlug(category.title)}/${category.id}`} className="block">
                <div className="aspect-square overflow-hidden rounded-md mb-2 transition-all duration-300 group-hover:shadow-lg">
                  <img 
                    src={category.img} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <h3 className="text-md font-semibold text-gray-800 group-hover:text-primary">
                  {category.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      topCategoriesContent = <p className="text-center py-4">No top categories to display.</p>;
    }
  } else {
    topCategoriesContent = <p className="text-center py-4">No categories found.</p>;
  }

  return (
    <MainLayout>
      {/* Navbar için boşluk bırakacak sarmalayıcı div */}
      <div className="mt-[90px]"> {/* TÜM İÇERİĞİ AŞAĞI İTMEK İÇİN */}
        <HeroSection />
        <EditorPicks />

        {/* En İyi Kategoriler Bölümü */}
        <section className="top-categories-section py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Top Categories
            </h2>
            {topCategoriesContent}
          </div>
        </section>

        <ProductGrid title="BESTSELLER PRODUCTS" products={bestsellerProducts} />
        {/* <FeaturedPosts /> */}
      </div> {/* Sarmalayıcı div'in kapanışı */}
    </MainLayout>
  );
};

export default HomePage;
