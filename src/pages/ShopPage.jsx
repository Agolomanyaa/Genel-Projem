import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { getProductsData } from '../data/products.js';

const ShopPage = () => {
  const { categoryName } = useParams();
  const allProducts = getProductsData();

  // Kategoriye göre filtrele
  const filteredProducts = categoryName
    ? allProducts.filter(product =>
        // Ürün kategorisini küçük harfe çevirip boşlukları tire ile değiştirerek karşılaştır
        product.category?.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-') === categoryName
      )
    : allProducts;

  // Kategori adını başlık için düzenle (tireleri boşluğa çevir, ilk harfleri büyük yap)
  const pageTitle = categoryName
    ? categoryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'All Products';

  return (
    <MainLayout>
      {/* Breadcrumb (İsteğe bağlı) */}
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-6 flex items-center">
          <Link to="/" className="text-dark-text font-bold hover:text-primary text-sm">Home</Link>
          <span className="text-muted-text mx-2">{'>'}</span>
          {/* Shop ana sayfasına link ekleyebiliriz */}
          <Link to="/shop" className="text-muted-text hover:text-primary text-sm">Shop</Link>
          {categoryName && (
            <>
              <span className="text-muted-text mx-2">{'>'}</span>
              <span className="text-second-text text-sm font-bold">{pageTitle}</span>
            </>
          )}
        </div>
      </section>

      {/* Filtreleme/Sıralama Çubuğu (İsteğe Bağlı - Şimdilik Basit) */}
       <section className="bg-white py-4 border-b border-gray-200">
          <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-second-text text-sm font-bold">
                  Showing {filteredProducts.length} results{categoryName ? ` for ${pageTitle}` : ''}
              </div>
              {/* Diğer filtreleme/sıralama seçenekleri buraya eklenebilir */}
          </div>
      </section>


      {/* Ürün Grid'i */}
      <div className="container mx-auto px-6 py-10">
        {/* Filtrelenmiş ürünleri ProductGrid'e prop olarak geçir */}
        <ProductGrid title={categoryName ? `${pageTitle} Products` : ''} products={filteredProducts} />
      </div>
    </MainLayout>
  );
};

export default ShopPage;

// Önemli Not: ProductGrid bileşeninin (src/components/ProductGrid.jsx)
// dışarıdan bir 'products' prop'u alacak şekilde güncellenmesi gerekebilir.
// Eğer şu an sadece kendi içindeki getProductsData'yı kullanıyorsa,
// prop olarak gelen ürünleri de işleyebilmesi için düzenlenmelidir.
// Şimdilik getProductsData'yı import edip filtrelemeyi ShopPage'de yaptık.
// Eğer ProductGrid'i direkt products prop'u ile kullanacaksak, ProductGrid'i de güncelleyelim.

// ProductGrid'in güncellenmiş hali şöyle olabilir:
/*
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsData as fetchAllProducts } from './ProductGrid'; // Veri alma fonksiyonunu farklı isimle import et

const ProductCard = ({ product }) => {
  // ... (ProductCard aynı kalabilir)
};

// Ürün verisini dışarı export et
export const getProductsData = fetchAllProducts;

const ProductGrid = ({ title, products }) => { // 'products' prop'unu ekledik
  // Eğer products prop'u gelmediyse, tüm ürünleri fetch et (opsiyonel fallback)
  const productsToDisplay = products || fetchAllProducts();

  return (
    <section className="container mx-auto px-6 py-10">
      {title && <h2 className="text-2xl font-bold text-dark-text text-center mb-8">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productsToDisplay.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
*/
// Şimdilik ProductGrid'i değiştirmeden, ShopPage'de filtreleme yapıyoruz. 