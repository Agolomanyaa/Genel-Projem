// ... existing code ...
import { useSelector } from 'react-redux'; // Redux store'a erişim için
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import EditorPicks from '../components/EditorPicks';
import ProductGrid from '../components/ProductGrid';
// import { getProductsData } from '../data/products.js'; // ARTIK GEREK YOK!
import { FETCH_STATES } from '../store/actions/productActions';

// URL için 'slug' oluşturma yardımcı fonksiyonu
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
  // Ürünleri Redux store'dan al
  const { productList: allProducts, productsFetchState, productsError } = useSelector((state) => state.product);

  // Bestseller için örnek: ilk 10 ürünü al
  const bestsellerProducts = allProducts.slice(0, 10);

  // Kategorileri Redux store'dan al
  const {
    categories,
    categoriesFetchState,
    categoriesError
  } = useSelector((state) => state.product);

  // ... existing code for topCategoriesContent ...
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
      <div>
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
      </div>
    </MainLayout>
  );
};

export default HomePage;

// ... existing code ...