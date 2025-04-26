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
      imageUrl: "https://plus.unsplash.com/premium_photo-1695575593603-1f42ca27bb6d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: "SHOP NOW",
      bgColor: "bg-gradient-to-r from-cyan-50 to-blue-100" // Slide 1 arkaplanı
    },
    {
      id: 2,
      subtitle: "WINTER SALE", // Örnek farklı metin
      title: "UP TO 50% OFF", // Örnek farklı metin
      description: "Discover amazing deals on your favorite winter essentials.", // Örnek farklı metin
      imageUrl: "https://images.unsplash.com/photo-1516350621-23eed2307778?q=80&w=2208&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: "EXPLORE DEALS",
      bgColor: "bg-gradient-to-r from-indigo-100 to-purple-100" // Slide 2 farklı arkaplan
    },
    // İstersen daha fazla slide ekleyebilirsin
  ];

  return (
    // Swiper container
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Kullanılacak modüller
      spaceBetween={0} // Slide'lar arası boşluk
      slidesPerView={1} // Aynı anda görünen slide sayısı
      navigation // Navigasyon oklarını etkinleştir
      pagination={{ clickable: true }} // Tıklanabilir sayfalandırma noktalarını etkinleştir
      loop={true} // Sonsuz döngü
      autoplay={{ // Otomatik oynatma ayarları
        delay: 5000, // 5 saniye bekleme süresi
        disableOnInteraction: false, // Kullanıcı etkileşiminden sonra durma
      }}
      className="relative w-full" // Swiper'a stil vermek için class
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className={`${slide.bgColor} relative overflow-hidden`}>
          {/* Her slide'ın içeriği */}
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

             {/* Sağdaki Resim Alanı (Opsiyonel, arkaplan yerine) */}
             {/* Eğer resmi arkaplan yerine sağda istiyorsan bu div'i kullan */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5 hidden md:block opacity-90 z-0">
                 <img
                     src={slide.imageUrl}
                     alt={`${slide.title} background`}
                     className="w-full h-full object-cover object-center"
                     loading="lazy"
                 />
                 {/* Hafif karartma efekti */}
                 {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Swiper stillerini özelleştirmek gerekebilir (oklar, noktalar) */}
      {/* Örneğin, Tailwind ile okların stilini değiştirmek için CSS'te .swiper-button-next, .swiper-button-prev seçicilerini kullanabilirsin */}
    </Swiper>
  );
};

export default HeroSection; 