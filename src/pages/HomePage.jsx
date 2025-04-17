import React from 'react';
import ProductCard from '../components/ProductCard'; // Import ProductCard

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function HomePage() {
  // Placeholder data for slides (can be fetched from API later)
  const heroSlides = [
    {
      tag: 'SUMMER 2024',
      title: 'NEW COLLECTION',
      description: 'We know how large objects will act, but things on a small scale.',
      buttonText: 'SHOP NOW',
      imageUrlMobile: '', // Optional: Add mobile-specific image URL if needed
      imageUrlDesktop: 'https://via.placeholder.com/1920x800/E0F2F7/cccccc?text=Hero+Slide+1' // Placeholder desktop background
    },
    // Add more slide objects here if needed
    // {
    //   tag: 'WINTER SALE',
    //   title: 'UP TO 50% OFF',
    //   description: 'Discover amazing deals on winter essentials.',
    //   buttonText: 'EXPLORE DEALS',
    //   imageUrlMobile: '',
    //   imageUrlDesktop: 'https://via.placeholder.com/1920x800/B0BEC5/cccccc?text=Hero+Slide+2' 
    // },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - Swiper Implementation */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Enable modules
        spaceBetween={0} // No space between slides
        slidesPerView={1} // Show one slide at a time
        navigation // Enable navigation arrows
        pagination={{ clickable: true }} // Enable clickable pagination dots
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Autoplay slides every 5 seconds
        loop={true} // Loop back to the first slide
        className="w-full" // Ensure Swiper takes full width
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Slide Content - Using a structure similar to the original static section */}
            <section 
              className="relative text-center py-16 px-4 md:text-left md:py-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrlDesktop})` }} // Set background image dynamically
            >
               {/* Optional Overlay */}
               <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div>
              {/* Content Container */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                <div className="md:max-w-lg lg:max-w-xl"> 
                  <h5 className="text-green-600 font-bold text-base tracking-wider mb-4 md:mb-8">{slide.tag}</h5> 
                  <h1 className="text-slate-800 text-4xl md:text-6xl font-bold leading-tight mb-4 md:mb-8">{slide.title}</h1>
                  <p className="text-gray-600 text-lg md:text-xl mb-6 md:mb-10">
                    {slide.description}
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded text-sm md:text-base transition duration-300">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Editor's Pick / Category Cards Section (Keeping existing placeholders) */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">EDITOR'S PICK</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

            {/* Card 1 (MEN) */}
            <div className="relative h-96 md:h-[500px] lg:col-span-6 bg-gray-300 rounded overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center bg-[url('https://via.placeholder.com/600x500/cccccc/888888?text=MEN')] group-hover:scale-105 transition-transform duration-500 ease-in-out"></div>
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
              <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
                <h5 className="text-base font-bold text-slate-800 text-center">MEN</h5>
              </div>
            </div>

            {/* Card 2 (WOMEN) */}
            <div className="relative h-96 md:h-[500px] lg:col-span-6 bg-gray-300 rounded overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center bg-[url('https://via.placeholder.com/600x500/cccccc/888888?text=WOMEN')] group-hover:scale-105 transition-transform duration-500 ease-in-out"></div>
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
              <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
                <h5 className="text-base font-bold text-slate-800 text-center">WOMEN</h5>
              </div>
            </div>

            {/* Card 3 (ACCESSORIES) */}
             <div className="relative h-64 md:h-[242px] lg:col-span-12 bg-gray-300 rounded overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center bg-[url('https://via.placeholder.com/1200x242/cccccc/888888?text=ACCESSORIES')] group-hover:scale-105 transition-transform duration-500 ease-in-out"></div>
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
              <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
                <h5 className="text-base font-bold text-slate-800 text-center">ACCESSORIES</h5>
              </div>
            </div>

            {/* Card 4 (KIDS) */}
            <div className="relative h-64 md:h-[242px] lg:col-span-12 bg-gray-300 rounded overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center bg-[url('https://via.placeholder.com/1200x242/cccccc/888888?text=KIDS')] group-hover:scale-105 transition-transform duration-500 ease-in-out"></div>
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
              <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
                <h5 className="text-base font-bold text-slate-800 text-center">KIDS</h5>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bestseller Products Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h4 className="text-lg text-gray-600 mb-2">Featured Products</h4>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 uppercase">Bestseller Products</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Product Cards Grid - Using ProductCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[...Array(8)].map((_, index) => (
              <ProductCard 
                key={index}
                imageUrl={`https://via.placeholder.com/300x200/cccccc/888888?text=Product+${index + 1}`}
                title={`Graphic Design ${index + 1}`} // Example title
                category="English Department" // Example category
                originalPrice="19.99"
                discountedPrice="9.99"
                colors={['bg-blue-500', 'bg-teal-600', 'bg-orange-500', 'bg-slate-800']} // Example colors
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <button className="text-blue-500 border border-blue-500 font-bold py-3 px-16 rounded hover:bg-blue-500 hover:text-white transition duration-300">
              LOAD MORE PRODUCTS
            </button>
          </div>

        </div>
      </section>

      {/* Diğer Ana Sayfa bölümleri buraya gelecek (Placeholder) */}
      {/* <h1 className="text-3xl font-bold text-center py-10">Diğer İçerikler...</h1> */}

    </div>
  );
}

export default HomePage;
