import React from 'react';
import { Link } from 'react-router-dom';
// ProductCard'ı kendi dosyasından import et
import ProductCard from './ProductCard';
// Veri alma fonksiyonu merkezi yerden import ediliyor olmalı
// import { getProductsData } from '../data/products.js'; // Örnek

const ProductGrid = ({ title, products }) => {
  const productsToDisplay = products || [];

  if (productsToDisplay.length === 0 && title) { // Sadece başlık varsa ve ürün yoksa mesaj göster
    return (
      <section className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-dark-text mb-8">{title}</h2>
        <p className="text-second-text">No products found in this section.</p>
      </section>
    );
  }
   if (productsToDisplay.length === 0) { // Başlık yoksa ve ürün yoksa hiçbir şey gösterme
    return null;
   }


  return (
    <section className="container mx-auto px-6 py-10">
      {title && <h2 className="text-2xl font-bold text-dark-text text-center mb-8 uppercase">{title}</h2>} {/* Başlık büyük harf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        {productsToDisplay.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      {/* İsteğe bağlı: Daha Fazla Yükle butonu */}
      {/* <div className="text-center mt-10">
          <button className="px-10 py-3 border border-primary text-primary font-bold rounded hover:bg-primary hover:text-white transition duration-300">
              LOAD MORE PRODUCTS
          </button>
      </div> */}
    </section>
  );
};

export default ProductGrid; 