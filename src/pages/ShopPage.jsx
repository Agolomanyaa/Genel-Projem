import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { getProductsData } from '../data/products.js';
import { useSelector } from 'react-redux';

const ShopPage = () => {
  const params = useParams();
  const location = useLocation();
  const { gender, categorySlug, categoryId } = params;

  const allProducts = getProductsData();
  const { categories: allApiCategories } = useSelector((state) => state.product);

  let filteredProducts = [];
  let pageTitle = 'Shop';
  let breadcrumbSegments = [{ name: 'Shop', path: '/shop' }];

  if (location.pathname === '/shop/home-living') {
    pageTitle = 'Home & Living';
    filteredProducts = allProducts.filter(
      (product) => product.apiCategoryId === null
    );
    breadcrumbSegments.push({ name: pageTitle });
  }
  else if (categoryId && gender && gender !== 'static') {
    const currentCategoryObject = allApiCategories.find(cat => cat.id.toString() === categoryId);

    if (currentCategoryObject) {
      pageTitle = currentCategoryObject.title;
      filteredProducts = allProducts.filter(product => product.apiCategoryId?.toString() === categoryId && product.gender === gender);
      breadcrumbSegments.push({ name: pageTitle });
    } else {
      pageTitle = 'Category Not Found';
      breadcrumbSegments.push({ name: pageTitle });
      console.warn(`[ShopPage] API Category object not found for ID: ${categoryId} and Gender: ${gender}`);
    }
  }
  else if (gender && gender !== 'static' && !categoryId) {
    pageTitle = gender.toLowerCase() === 'k' ? 'Women' : gender.toLowerCase() === 'e' ? 'Men' : 'Shop';
    filteredProducts = allProducts.filter(p => p.gender?.toLowerCase() === gender.toLowerCase());
    breadcrumbSegments.push({ name: pageTitle });
  }
  else if (location.pathname === '/shop') {
    pageTitle = 'All Products';
    filteredProducts = allProducts;
  }
  else {
    console.warn(`[ShopPage] Fallback: No specific category route matched. Path: ${location.pathname}. Params:`, params);
    pageTitle = 'All Products';
    filteredProducts = allProducts;
  }

  return (
    <MainLayout>
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-6 flex items-center text-sm">
          <Link to="/" className="text-dark-text font-bold hover:text-primary">Home</Link>
          {breadcrumbSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <span className="text-muted-text mx-2">{'>'}</span>
              {segment.path ? (
                <Link to={segment.path} className="text-muted-text hover:text-primary">
                  {segment.name}
                </Link>
              ) : (
                <span className="text-second-text font-bold">{segment.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="bg-white py-4 border-b border-gray-200 mt-[90px]">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-second-text text-sm font-bold">
            Showing {filteredProducts.length} results{pageTitle !== 'All Products' && pageTitle !== 'Shop' ? ` for ${pageTitle}` : ''}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-10">
        <ProductGrid 
          title={pageTitle !== 'All Products' && pageTitle !== 'Shop' ? pageTitle : ''} 
          products={filteredProducts} 
        />
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