import React from 'react';
import { Link } from 'react-router-dom';

// ProductCard remains mostly the same, ensure consistent sizing and spacing
const ProductCard = ({ imageUrl, title, category, price, oldPrice, colors, index, productId }) => (
  // Mobilde ve masaüstünde text align farklı olabilir
  <Link to={`/product/${productId}`} className="text-center md:text-left flex flex-col items-center md:items-start group w-full no-underline">
    {/* Image Container */}
    <div className="bg-gray-100 mb-4 w-full aspect-[4/5] overflow-hidden">
       <img
         // imageUrl prop'u varsa onu, yoksa placeholder'ı kullan
         src={imageUrl || `https://via.placeholder.com/300x375/${'efefef'}/999999?text=Product+${index + 1}`}
         alt={title || `Product ${index + 1}`}
         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
         loading="lazy"
       />
    </div>
    {/* Details */}
    <h5 className="font-bold mb-2 text-base leading-tight text-dark-text group-hover:text-primary transition-colors">{title || "Graphic Design"}</h5>
    <p className="text-second-text text-sm font-bold mb-2">{category || "English Department"}</p>
    <div className="mb-3 text-base font-bold flex flex-wrap justify-center md:justify-start gap-x-2"> {/* Flex wrap for mobile */}
      <span className={`text-muted-text mr-1.5 ${oldPrice ? 'line-through' : ''}`}>{oldPrice ? `$${oldPrice}` : '$0.00'}</span>
      <span className="text-secondary">${price || "16.48"}</span> {/* Figma: #23856D */}
    </div>
    {/* Color dots */}
    <div className="flex justify-center md:justify-start gap-1.5">
       <span className="w-4 h-4 rounded-full inline-block ring-1 ring-inset ring-gray-300 bg-primary"></span>
       <span className="w-4 h-4 rounded-full inline-block ring-1 ring-inset ring-gray-300 bg-secondary"></span>
       <span className="w-4 h-4 rounded-full inline-block ring-1 ring-inset ring-gray-300 bg-alert"></span>
       <span className="w-4 h-4 rounded-full inline-block ring-1 ring-inset ring-gray-300 bg-dark-text"></span>
    </div>
  </Link>
);


const ProductGrid = ({ title }) => {
  // Sağlanan Unsplash URL'leri
  const productImages = [
    "https://images.unsplash.com/photo-1730196342700-8cf9b656bd18?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738999635034-4e2da712f651?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1743972330316-f9597e191587?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1715876268461-7d85ee7b1452?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735846650297-d61a0835474c?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1732492211688-b1984227af93?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734431572586-4fec74ed4f76?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1732492211739-16eea9575e84?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734298497319-bd264ccf0c22?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1727942420153-8573424d2a83?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Kaç ürün kartı gösterilecek (URL sayısı kadar veya daha az)
  const numberOfProductsToShow = productImages.length || 10;
  const products = Array.from({ length: numberOfProductsToShow });

  return (
    <section className="py-12 md:py-16 container mx-auto px-5 text-center">
       {/* Metin boyutları responsive */}
       {title !== "" && <p className="text-second-text text-lg md:text-xl mb-2">Featured Products</p>}
       {title && <h2 className="text-2xl font-bold mb-2 text-dark-text">{title || "BESTSELLER PRODUCTS"}</h2>}
       {title !== "" && <p className="text-second-text mb-8 md:mb-10 text-sm max-w-md mx-auto">Problems trying to resolve the conflict between</p>}

        {/* Responsive Grid: Mobilde 1, sm'de 2, lg'de 4, xl'de 5 kolon */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
        {products.map((_, index) => {
           // Örnek Product ID oluşturma (gerçek projede API'den gelir)
           const productId = `product-${index + 1}`;
           return (
             <ProductCard
               key={productId}
               index={index}
               imageUrl={productImages[index]}
               productId={productId}
             />
           );
         })}
      </div>
       {/* Load More butonu ProductGrid'in bir parçası olmayabilir, sayfa seviyesinde yönetilebilir */}
       {/* <button className="mt-10 px-10 py-3 border-2 border-primary text-primary text-sm font-bold rounded hover:bg-primary hover:text-white transition duration-300">LOAD MORE PRODUCTS</button> */}
    </section>
  );
};

export default ProductGrid; 