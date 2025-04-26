import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage = () => {
  const product = {
    name: "Floating Phone",
    rating: 4,
    reviews: 10,
    price: 1138.00,
    availability: "In Stock",
    description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"],
    images: [
        "https://via.placeholder.com/500x575/eee/aaa?text=Product+Main",
        "https://via.placeholder.com/100x100/eee/aaa?text=Thumb+1",
        "https://via.placeholder.com/100x100/eee/aaa?text=Thumb+2",
        "https://via.placeholder.com/100x100/eee/aaa?text=Thumb+3",
    ]
  };

  return (
    <MainLayout>
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-6 flex items-center">
          <a href="/" className="text-dark-text font-bold hover:text-primary text-sm">Home</a>
          <span className="text-muted-text mx-2">{'>'}</span>
          <a href="/shop" className="text-muted-text hover:text-primary text-sm">Shop</a>
          <span className="text-muted-text mx-2">{'>'}</span>
          <span className="text-second-text text-sm font-bold">{product.name}</span>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="border border-gray-200 rounded mb-4 overflow-hidden aspect-square">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {product.images.slice(1).map((img, index) => (
                <div key={index} className="border border-gray-200 rounded p-1 cursor-pointer w-1/4 aspect-square">
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-xl text-dark-text mb-3">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < product.rating ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-second-text font-bold text-sm">{product.reviews} Reviews</span>
            </div>
            <div className="text-2xl font-bold text-dark-text mb-4">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-sm mb-6">
              <span className="text-second-text font-bold">Availability :</span>
              <span className="text-primary font-bold ml-2">{product.availability}</span>
            </div>
            <p className="text-second-text text-sm mb-6 border-t border-gray-200 pt-4">{product.description}</p>
            <div className="flex items-center gap-2 mb-8">
              {product.colors.map((color, index) => (
                <span key={index} style={{ backgroundColor: color }} className={`w-6 h-6 rounded-full inline-block ring-2 ring-offset-1 cursor-pointer ${index === 0 ? 'ring-primary' : 'ring-transparent'}`}></span>
              ))}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
               <button className="bg-primary text-white font-bold py-3 px-6 rounded hover:bg-sky-600 text-sm">Select Options</button>
               <button className="border border-gray-300 rounded-full p-3 text-dark-text hover:bg-gray-100" aria-label="Add to Wishlist">
                   ❤️
               </button>
               <button className="border border-gray-300 rounded-full p-3 text-dark-text hover:bg-gray-100" aria-label="Add to Cart">
                   🛒
               </button>
               <button className="border border-gray-300 rounded-full p-3 text-dark-text hover:bg-gray-100" aria-label="View Product">
                   👁️
               </button>
            </div>
          </div>
        </div>
      </section>

       <section className="bg-white border-t border-gray-200 py-10">
           <div className="container mx-auto px-6">
               <div className="flex justify-center gap-4 md:gap-8 mb-8 border-b border-gray-200">
                   <button className="py-3 text-second-text font-semibold hover:text-dark-text">Description</button>
                   <button className="py-3 text-dark-text font-bold border-b-2 border-dark-text">Additional Information</button>
                   <button className="py-3 text-second-text font-semibold hover:text-dark-text">Reviews <span className="text-secondary">({product.reviews})</span></button>
               </div>
               <div className="text-second-text text-sm leading-relaxed max-w-3xl mx-auto">
                   <h3 className="font-bold text-lg text-dark-text mb-4">the quick fox jumps over</h3>
                   <p className="mb-4">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                   <p className="mb-4">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                   <p>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
               </div>
           </div>
       </section>

        <section className="bg-lighter-bg py-12">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold text-dark-text mb-8">BESTSELLER PRODUCTS</h2>
                 <ProductGrid title="" />
            </div>
        </section>

    </MainLayout>
  );
};

export default ProductDetailPage; 