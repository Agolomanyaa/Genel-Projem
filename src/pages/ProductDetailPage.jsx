import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import { getProductsData } from '../data/products.js';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const allProducts = getProductsData();
  const product = allProducts.find(p => p.productId === productId);

  // Modal state'i
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  // Lightbox state'leri
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialSlide, setLightboxInitialSlide] = useState(0);
  // Seçili bedeni tutacak state
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return <MainLayout><div className="container mx-auto px-6 py-10 text-center">Product not found.</div></MainLayout>;
  }

  const mainImage = product.detailImages[0];
  const thumbnailImages = product.detailImages.slice(1);

  // Lightbox'ı açan fonksiyon
  const openLightbox = (index) => {
    setLightboxInitialSlide(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);

  // Modal açma/kapama fonksiyonları
  const openSizeChart = () => setIsSizeChartOpen(true);
  const closeSizeChart = () => setIsSizeChartOpen(false);

  // Beden seçme fonksiyonu
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    console.log("Selected size:", size);
  };

  // "Size" bölümünün gösterilip gösterilmeyeceğini kontrol et
  const showSizeSection = product.sizes && product.sizes.length > 0 && product.category !== 'Home & Living';

  // Benzer Ürünleri Filtrele
  const relatedProducts = allProducts.filter(p =>
    p.category === product.category && p.productId !== product.productId
  ).slice(0, 10);

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-6 flex items-center flex-wrap">
          <Link to="/" className="text-dark-text font-bold hover:text-primary text-sm">Home</Link>
          <span className="text-muted-text mx-2">{'>'}</span>
          <Link to="/shop" className="text-muted-text hover:text-primary text-sm">Shop</Link>
          {product.category && (
             <>
              <span className="text-muted-text mx-2">{'>'}</span>
              <Link to={`/shop/${product.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`} className="text-muted-text hover:text-primary text-sm">
                {product.category}
              </Link>
             </>
          )}
          <span className="text-muted-text mx-2 hidden sm:inline">{'>'}</span>
          <span className="text-second-text text-sm font-bold w-full sm:w-auto mt-1 sm:mt-0 sm:ml-2">{product.title}</span>
        </div>
      </section>

      {/* Ürün Detayları */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Resim Galerisi */}
          <div className="w-full lg:w-1/2">
            {/* Ana Resim (Tıklanabilir) */}
            <div
              className="border border-gray-200 rounded mb-4 overflow-hidden aspect-square cursor-pointer"
              onClick={() => openLightbox(0)} // Tıklandığında lightbox'ı ilk resimle aç
            >
              <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {/* Küçük Resimler (Tıklanabilir) */}
            <div className="flex gap-3">
              {product.detailImages.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded p-1 cursor-pointer w-1/4 aspect-square"
                  onClick={() => openLightbox(index + 1)} // index'e +1 ekleyerek doğru slide'ı açarız
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Ürün Bilgileri & Detayları */}
          <div className="w-full lg:w-1/2">
            <h4 className="text-base text-gray-500 mb-1">{product.brand || 'Brand'}</h4>
            <h2 className="text-2xl font-bold text-dark-text mb-2">{product.title}</h2>
            {/* Ürün Kodu İngilizce'ye çevrildi */}
            <p className="text-sm text-gray-400 mb-3">Product Code: {product.productCode || 'N/A'}</p>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-second-text font-bold text-sm">{product.rating?.toFixed(2)} / 5.0</span>
            </div>
            {/* Fiyat (Güncellendi: $ ve kart fiyatları) */}
            <div className="text-2xl font-bold text-dark-text mb-6 flex items-baseline gap-3"> {/* Alt boşluk artırıldı */}
               {product.detailOldPrice && (
                 <span className="text-lg text-muted-text line-through">${product.detailOldPrice}</span>
               )}
               <span className="text-primary">${product.detailPrice}</span>
            </div>
             {/* Taksit Bilgisi kaldırıldı */}
             {/* <p className="text-sm text-gray-500 mb-6">12 Aya Varan Taksit Fırsatı</p> */}
             <hr className="mb-6"/>

            {/* Renk Seçimi (İngilizce) */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-base font-bold text-dark-text">Color</h5>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors?.map((color, index) => (
                    <span key={index} style={{ backgroundColor: color }} className={`w-8 h-8 rounded-md inline-block ring-2 ring-offset-1 cursor-pointer ${index === 0 ? 'ring-primary' : 'ring-transparent'}`}></span>
                  ))}
                </div>
              </div>
            )}

            {/* Beden Seçimi (Koşullu Render) */}
            {showSizeSection && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-base font-bold text-dark-text">Size</h5>
                  {/* Size Chart butonu sadece URL varsa gösterilir (koşul yukarıda kontrol edildi) */}
                  <button
                    onClick={openSizeChart}
                    className="text-sm text-primary font-bold underline"
                    // disabled={!product.sizeChartUrl} // Bu kontrole artık gerek yok, showSizeSection zaten kontrol ediyor
                  >
                    Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`py-2 px-4 border rounded font-bold text-sm transition-colors duration-150 ease-in-out
                          ${selectedSize === size
                            ? 'bg-[#252B42] text-white border-[#252B42]'
                            : 'border-gray-300 text-gray-700 hover:border-gray-500'
                          }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Aksiyon Butonları */}
            <div className="flex items-stretch gap-3 mb-8">
                <button
                  className={`bg-black text-white font-bold py-3 px-5 rounded-lg text-sm flex-grow text-center transition-opacity duration-200 ${showSizeSection && !selectedSize ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  disabled={showSizeSection && !selectedSize} // Beden seçimi gerekiyorsa ve seçilmediyse pasif yap
                  onClick={() => {
                    // Beden seçimi gerekmiyorsa veya seçildiyse sepete ekle
                    if (!showSizeSection || selectedSize) {
                      console.log(`Adding ${product.title} ${selectedSize ? `(Size: ${selectedSize})` : ''} to cart`);
                      // Sepete ekleme mantığı buraya gelecek
                    }
                  }}
                >
                  Add to Cart
                </button>
                <button className="bg-black text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center hover:bg-gray-800" aria-label="Add to Wishlist">
                  <span className="text-xl">♡</span>
                </button>
             </div>

            {/* Product Details (Yeni Eklenen Alan) */}
            {product.detailedDescription && product.detailedDescription.length > 0 && (
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-bold text-dark-text mb-4">Product Details</h3>
                <div className="text-second-text text-sm space-y-2">
                  {product.detailedDescription.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Benzer Ürünler Slider (Yeni Eklenen Bölüm) */}
      {relatedProducts.length > 0 && (
        <section className="bg-lighter-bg py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-dark-text text-center mb-8 uppercase">Related Products</h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
              }}
              navigation
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className="related-products-swiper"
            >
              {relatedProducts.map((relatedProduct) => (
                <SwiperSlide key={relatedProduct.productId}>
                  <ProductCard product={relatedProduct} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Modallar (Beden Tablosu Modalı sadece showSizeSection true ise render edilebilir ama URL kontrolü yeterli) */}
      {isSizeChartOpen && product.sizeChartUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-5 rounded-lg shadow-xl max-w-3xl w-full relative">
              <button onClick={closeSizeChart} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl" aria-label="Close size chart">&times;</button>
              <h4 className="text-xl font-bold text-dark-text mb-4">Size Chart</h4>
              <div className="overflow-auto max-h-[70vh]">
                <img src={product.sizeChartUrl} alt="Size Chart" className="w-full h-auto"/>
              </div>
            </div>
          </div>
      )}

      {/* Resim Lightbox Modalı */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute -top-2 -right-2 md:top-0 md:right-0 m-2 text-white bg-black bg-opacity-50 rounded-full p-1 z-10 text-3xl leading-none" aria-label="Close lightbox">&times;</button>
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              initialSlide={lightboxInitialSlide}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={false}
              className="h-full"
            >
              {product.detailImages.map((img, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <img src={img} alt={`Product image ${index + 1}`} className="max-w-full max-h-[85vh] object-contain"/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

    </MainLayout>
  );
};

export default ProductDetailPage; 