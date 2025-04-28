import React from 'react';
// Swiper React bileşenlerini ve temel stilleri import et
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Gerekli modülleri import et

// Swiper CSS dosyalarını import et
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const HeroSection = () => {
  // Slider içeriği için veri
  const slides = [
    {
      id: 1,
      subtitle: "SUMMER 2020",
      title: "NEW COLLECTION",
      description: "We know how large objects will act, but things on a small scale.",
      imageUrl: "https://cdn.myikas.com/images/theme-images/392ea2c4-fa33-4dcb-b537-d60ad8ea4ae7/image_3840.webp",
      buttonText: "SHOP NOW",
      bgColor: "bg-white" // Nötr arkaplan
    },
    {
      id: 2,
      subtitle: "WINTER SALE", // Bu metinler gösterilmeyecek
      title: "UP TO 50% OFF", // Bu metinler gösterilmeyecek
      description: "Discover amazing deals on your favorite winter essentials.", // Bu metinler gösterilmeyecek
      // imageUrl güncellendi
      imageUrl: "https://cdn.myikas.com/images/theme-images/54deaaf9-a711-43ad-b57c-5c2e5d914d33/image_3840.webp",
      buttonText: "EXPLORE DEALS", // Bu metinler gösterilmeyecek
      bgColor: "bg-white" // Nötr arkaplan
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="relative w-full"
    >
      {slides.map((slide) => (
        // ID'si 1 veya 2 olanlar için arkaplan rengi, diğerleri için önceki stil
        <SwiperSlide key={slide.id} className={`${(slide.id === 1 || slide.id === 2) ? slide.bgColor : slide.bgColor + ' relative overflow-hidden'}`}>
          {/* ID'si 1 veya 2 olan slide için sadece tam ekran resim */}
          {(slide.id === 1 || slide.id === 2) ? (
            
            <div className="w-full h-full min-h-[80vh] md:min-h-[90vh]">
              <img
                src={slide.imageUrl}
                alt="Full screen background"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ) : (
            // Diğer slide'lar için önceki düzen (Şu anda başka slide yok ama olursa diye)
            <div className="container mx-auto px-6 py-24 md:py-32 lg:py-48 flex items-center relative z-10 min-h-[60vh] md:min-h-[70vh]">
              {/* Metin İçeriği */}
              <div className="max-w-md text-center md:text-left">
                <p className="text-base font-bold text-success mb-4">{slide.subtitle}</p>
                <h1 className="text-4xl md:text-6xl font-bold my-5 leading-tight text-dark-text">{slide.title}</h1>
                <p className="text-lg text-second-text mb-8 mx-auto md:mx-0 max-w-xs md:max-w-none">{slide.description}</p>
                <button className="px-10 py-4 bg-success text-light-text text-lg md:text-xl font-bold rounded hover:bg-green-600 transition duration-300 shadow-md">
                  {slide.buttonText}
                </button>
              </div>

              {/* Sağdaki Resim Alanı */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5 hidden md:block opacity-90 z-0">
                   <img
                       src={slide.imageUrl}
                       alt={`${slide.title} background`}
                       className="w-full h-full object-cover object-center"
                       loading="lazy"
                   />
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection; 