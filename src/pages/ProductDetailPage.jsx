import React, { useState, useEffect, useMemo } from 'react';
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

  // 1. allProducts'ı useMemo ile al (getProductsData çok maliyetli değilse şart değil ama iyi pratik)
  const allProducts = useMemo(() => getProductsData(), []);

  // 2. product objesini useMemo ile bul ve referansını sabitle
  const product = useMemo(() => {
    return allProducts.find(p => p.productId === productId);
  }, [allProducts, productId]); // Sadece allProducts veya productId değişirse yeniden bulunur

  // State'ler
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialSlide, setLightboxInitialSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);

  // useEffect şimdi memoized product'a bağlı olacak
  useEffect(() => {
    console.log('[EFFECT] Running effect. Product available:', !!product);

    if (product && Array.isArray(product.colors) && product.colors.length > 0) {
        // Renklerin obje formatında olduğunu varsayıyoruz
        const defaultColorObj = product.colors.find(c => c && c.default) || product.colors[0];

        // defaultColorObj'nin gerçekten bir obje ve images array'i içerdiğini kontrol et
        if (defaultColorObj && typeof defaultColorObj === 'object' && Array.isArray(defaultColorObj.images)) {
            console.log('[EFFECT] Found default color object:', defaultColorObj);
            // Sadece state farklıysa güncelle
            setSelectedColor(prevColor => {
                if (prevColor?.hex !== defaultColorObj.hex) {
                    console.log('[EFFECT] Setting selectedColor state:', defaultColorObj);
                    setCurrentImages(defaultColorObj.images); // Görselleri burada ayarla
                    return defaultColorObj;
                }
                return prevColor;
            });
             // Eğer selectedColor zaten doğruysa ama currentImages boşsa, görselleri yine de ayarla
            if (selectedColor?.hex === defaultColorObj.hex && currentImages.length === 0) {
                 console.log('[EFFECT] Setting initial images as currentImages were empty.');
                 setCurrentImages(defaultColorObj.images);
            }

        } else {
            console.error('[EFFECT] Default color object or its images are invalid:', defaultColorObj);
            // Fallback: Renk objesi hatalıysa, detailImages veya ana görseli kullan
             const initialImages = product.detailImages || [product.imageUrl].filter(Boolean);
             setCurrentImages(initialImages);
             setSelectedColor(null);
        }
    } else if (product) {
      // Renk yoksa, eski görselleri veya ana görseli kullan
      const initialImages = product.detailImages || [product.imageUrl].filter(Boolean);
      console.log('[EFFECT] No colors defined, setting initial images:', initialImages);
      setSelectedColor(null);
      setCurrentImages(initialImages);
    } else {
      console.log('[EFFECT] Product not found, clearing states.');
      setSelectedColor(null);
      setCurrentImages([]);
    }
  }, [product]); // Sadece product değiştiğinde çalışsın

  const handleColorSelect = (colorOption) => {
    console.log('[COLOR SELECT] Clicked color option:', colorOption);
    // colorOption'ın bir obje olduğundan ve hex özelliğine sahip olduğundan emin ol
    if (colorOption && typeof colorOption === 'object' && colorOption.hex && colorOption.hex !== selectedColor?.hex) {
        setSelectedColor(colorOption);
        const newImages = Array.isArray(colorOption.images) ? colorOption.images : [];
        console.log('[COLOR SELECT] Setting current images to:', newImages);
        setCurrentImages(newImages);
        setLightboxInitialSlide(0);
    } else {
        console.log('[COLOR SELECT] Clicked the same color or invalid/malformed color option.');
    }
  };

  // Eğer product henüz yüklenmediyse veya bulunamadıysa yükleniyor veya bulunamadı göster
  if (!product) {
    // product'ın undefined mı yoksa null mı olduğunu kontrol etmek yerine,
    // allProducts yüklendikten sonra bulunup bulunamadığına bakmak daha iyi olabilir,
    // ama şimdilik bu kontrol yeterli olabilir.
    return <MainLayout><div className="container mx-auto px-6 py-10 text-center">Loading product or product not found...</div></MainLayout>;
  }

  const mainImage = currentImages[0] || product?.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image';

  const openLightbox = (index) => {
    setLightboxInitialSlide(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);
  const openSizeChart = () => setIsSizeChartOpen(true);
  const closeSizeChart = () => setIsSizeChartOpen(false);
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const showSizeSection = product.sizes && product.sizes.length > 0 && product.category !== 'Home & Living';
  const relatedProducts = allProducts.filter(p =>
    p.category === product.category && p.productId !== product.productId
  ).slice(0, 10);

  // KÜÇÜK RESİMLERİN RENDER EDİLDİĞİ YERDEN ÖNCE LOG EKLE
  console.log(`[RENDER] Checking thumbnails. currentImages length: ${currentImages?.length}`); 

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
              {product.apiCategoryId ? (
                  <Link to={`/shop/${product.gender}/${product.category.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}/${product.apiCategoryId}`} className="text-muted-text hover:text-primary text-sm">
                     {product.category}
                  </Link>
              ) : product.category === 'Home & Living' ? (
                   <Link to="/shop/home-living" className="text-muted-text hover:text-primary text-sm">
                     Home & Living
                  </Link>
              ) : (
                  <span className="text-muted-text text-sm">{product.category}</span>
              )}
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
            {/* Ana Resim */}
            <div
              className="border border-gray-200 rounded mb-4 overflow-hidden aspect-square cursor-pointer"
              onClick={() => currentImages.length > 0 && openLightbox(0)}
            >
              {/* Ana görsel için key ekleyerek renk değiştiğinde yeniden render olmasını sağlayalım */}
              <img key={mainImage} src={mainImage} alt={`${product.title}${selectedColor ? ` - ${selectedColor.name}` : ''}`} className="w-full h-full object-cover" />
            </div>
            {/* Küçük Resimler (Thumbnails) */}
            {/* Koşulu tekrar kontrol edelim ve key'i img yapalım (URL'ler benzersiz olmalı) */}
            {currentImages && currentImages.length > 1 ? (
              <div className="flex gap-3">
                {currentImages.map((img, index) => (
                  <div
                    key={img} // Key olarak direkt image URL'sini kullanalım (daha güvenli)
                    className="border border-gray-200 rounded p-1 cursor-pointer w-1/4 aspect-square"
                    onClick={() => openLightbox(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}${selectedColor ? ` - ${selectedColor.name}` : ''}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
                 // Eğer birden fazla resim yoksa veya currentImages boşsa buraya log koyalım
                 <p className='text-xs text-gray-400'>No additional thumbnails to display. (Image count: {currentImages?.length ?? 0})</p>
            )}
          </div>

          {/* Ürün Bilgileri & Detayları */}
          <div className="w-full lg:w-1/2">
            <h4 className="text-base text-gray-500 mb-1">{product.brand || 'Brand'}</h4>
            <h2 className="text-2xl font-bold text-dark-text mb-2">{product.title}</h2>
            <p className="text-sm text-gray-400 mb-3">Product Code: {product.productCode || 'N/A'}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-second-text font-bold text-sm">{product.rating?.toFixed(2)} / 5.0</span>
            </div>
            <div className="text-2xl font-bold text-dark-text mb-6 flex items-baseline gap-3">
               {product.detailOldPrice && (
                 <span className="text-lg text-muted-text line-through">${product.detailOldPrice}</span>
               )}
               <span className="text-primary">${product.detailPrice}</span>
            </div>
             <hr className="mb-6"/>

            {/* Renk Seçimi */}
            {Array.isArray(product.colors) && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                   <h5 className="text-base font-bold text-dark-text">Color: <span className='font-normal'>{selectedColor?.name || 'N/A'}</span></h5>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((colorOption) => {
                    // colorOption'ın geçerli bir obje olduğundan emin ol
                    if (!colorOption || typeof colorOption !== 'object' || !colorOption.hex) {
                        console.warn("Invalid color option found:", colorOption);
                        return null; // Geçersizse render etme
                    }
                    return (
                        <button
                            // Key olarak hex kullanalım, benzersiz olmalı
                            key={colorOption.hex} 
                            style={{ backgroundColor: colorOption.hex }}
                            className={`w-8 h-8 rounded-md inline-block border border-gray-400 ring-2 ring-offset-1 cursor-pointer transition-all duration-150 ${selectedColor?.hex === colorOption.hex ? 'ring-primary scale-110' : 'ring-transparent hover:ring-gray-400'}`}
                            onClick={() => handleColorSelect(colorOption)}
                            aria-label={`Select color ${colorOption.name || colorOption.hex}`}
                        ></button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Beden Seçimi (Aynı) */}
             {showSizeSection && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-base font-bold text-dark-text">Size</h5>
                    <button
                      onClick={openSizeChart}
                      className="text-sm text-primary font-bold underline"
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

            {/* Aksiyon Butonları (Aynı) */}
            <div className="flex items-stretch gap-3 mb-8">
                <button
                  className={`bg-black text-white font-bold py-3 px-5 rounded-lg text-sm flex-grow text-center transition-opacity duration-200 ${showSizeSection && !selectedSize ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  disabled={showSizeSection && !selectedSize} 
                  onClick={() => {
                    if (!showSizeSection || selectedSize) {
                      console.log(`Adding ${product.title} ${selectedColor ? `(${selectedColor.name})` : ''} ${selectedSize ? `(Size: ${selectedSize})` : ''} to cart`);
                    }
                  }}
                >
                  Add to Cart
                </button>
                <button className="bg-black text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center hover:bg-gray-800" aria-label="Add to Wishlist">
                  <span className="text-xl">♡</span>
                </button>
             </div>

            {/* Product Details (Aynı) */}
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

      {/* Benzer Ürünler Slider (SwiperSlide'a key eklendi) */}
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

      {/* Modallar (Aynı) */}
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

      {/* Resim Lightbox Modalı (Aynı) */}
      {isLightboxOpen && currentImages && currentImages.length > 0 && (
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
                key={selectedColor?.hex || 'no-color'} // Renk değiştiğinde Swiper'ı yeniden başlatmak için key ekle
              >
                {currentImages.map((img, index) => (
                  <SwiperSlide key={img + index} className="flex items-center justify-center">
                    <img src={img} alt={`Product image ${index + 1}${selectedColor ? ` - ${selectedColor.name}` : ''}`} className="max-w-full max-h-[85vh] object-contain"/>
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