import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { FaSpinner, FaArrowLeft, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Gerekli action'ları import ediyoruz
import { fetchProductById, clearSelectedProduct, FETCH_STATES } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';

// Yeni yüklediğimiz Lightbox kütüphanesi ve stil dosyası
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- YENİ ÇEVİRMEN FONKSİYONU ---
// Backend'den gelen Türkçe renk isimlerini CSS'in anlayacağı dile çevirir.
const mapColorNameToCss = (colorName = '') => {
  if (!colorName) return 'transparent'; // Eğer renk adı yoksa şeffaf yap
  const lowerColor = colorName.toLowerCase();
  switch (lowerColor) {
    case 'kırmızı': return 'red';
    case 'siyah': return 'black';
    case 'beyaz': return 'white';
    case 'mavi': return 'blue';
    case 'açık mavi': return '#add8e6'; // lightblue
    // Gelecekte eklenebilecek diğer renkler buraya gelebilir
    default: return lowerColor; // Eşleşme yoksa, adı doğrudan kullanmayı dene (örn: 'green')
  }
};


const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // State'ler
  const { selectedProduct, selectedProductFetchState, selectedProductError } = useSelector(state => state.product);
  const [mainImageIndex, setMainImageIndex] = useState(0); // Hangi resmin ana resim olduğunu takip eder
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Büyüyen galeri açık mı?
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false); // Yeni state

  // --- YENİ STATE'LER ---
  // Hangi renk ve bedenin seçili olduğunu takip etmek için.
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Beden Tablosu Linkleri
  const sizeChartLinks = {
    erkek: "https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/24ff548c-de01-4984-947b-7f122d9f5455/image_3840.webp",
    kadın: "https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/758846d8-b5d4-4db6-a5f0-e021404b6f95/image_3840.webp"
  };

  // Ürün yüklendiğinde veya productId değiştiğinde çalışır
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);
  
  // --- YENİ useEffect ---
  // Ürün yüklendiğinde, mevcut ilk rengi ve bedeni otomatik seçili hale getir.
  useEffect(() => {
    if (selectedProduct && selectedProduct.variants && selectedProduct.variants.length > 0) {
      const firstVariant = selectedProduct.variants[0];
      setSelectedColor(firstVariant.color);
      // İlk başta hiçbir beden seçili olmasın.
      setSelectedSize(null);
    }
  }, [selectedProduct]);

  // --- GÜNCELLENEN SEPETE EKLEME FONKSİYONU ---
  const handleAddToCart = () => {
    // Önce bir beden seçilmiş mi diye kontrol et.
    if (!selectedSize) {
      toast.warn('Lütfen bir beden seçiniz.');
      return;
    }
    
    // Seçilen renk ve bedene uyan varyantı bul.
    const selectedVariant = selectedProduct.variants.find(
      v => v.color === selectedColor && v.size === selectedSize
    );

    // Varyant bulunduysa ve stokta varsa sepete ekle.
    if (selectedVariant && selectedVariant.stock > 0) {
      const productToAdd = {
        id: selectedProduct.id,
        variantId: selectedVariant.id,
        name: `${selectedProduct.name} (${selectedVariant.color} / ${selectedVariant.size})`,
        price: selectedProduct.price,
        imageUrl: selectedProduct.images?.[0]?.url || '',
        stock: selectedVariant.stock,
      };
      dispatch(addToCart(productToAdd, 1));
      toast.success(`${productToAdd.name} sepete eklendi!`);
    } else {
      toast.error('Bu ürün bu bedende stokta olmadığı için sepete eklenemedi.');
    }
  };

  const handleGoBack = () => history.goBack();

  // --- Yüklenme ve Hata Durumları ---
  if (selectedProductFetchState === FETCH_STATES.FETCHING) {
    return (
      <MainLayout>
        <div className="container mx-auto flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (selectedProductFetchState === FETCH_STATES.FAILED || !selectedProduct) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ürün Yüklenemedi</h2>
          <p className="text-md text-gray-700 mb-6">{selectedProductError || 'Aradığınız ürün bulunamadı.'}</p>
          <button onClick={handleGoBack} className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-primary-dark">Geri Dön</button>
        </div>
      </MainLayout>
    );
  }

  // --- Ürün Verilerini Hazırlama ---
  const { name, description, price, images, category, variants } = selectedProduct;
  const productImages = Array.isArray(images) && images.length > 0 ? images.map(img => ({ src: img.url })) : [{ src: 'https://via.placeholder.com/600x600?text=No+Image' }];
  const gender = category?.gender === 'k' ? 'kadın' : (category?.gender === 'e' ? 'erkek' : null);
  const sizeChartLink = gender ? sizeChartLinks[gender] : null;

  // --- YENİ YARDIMCI VERİLER ---
  // Mevcut renkleri ve o renge ait bedenleri bul.
  const availableColors = [...new Set(variants.map(v => v.color))];
  const availableSizesForSelectedColor = variants.filter(v => v.color === selectedColor);
  const selectedVariantStock = variants.find(v => v.color === selectedColor && v.size === selectedSize)?.stock || 0;

  return (
    <MainLayout>
      {/* Breadcrumb - Sayfa yolu navigasyonu */}
      <section className="bg-lighter-bg py-4 border-b">
        <div className="container mx-auto px-4 text-sm">
          <span onClick={handleGoBack} className="hover:underline cursor-pointer">Geri</span>
          <span className="mx-2">/</span>
          <Link to="/" className="hover:underline">Anasayfa</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop`} className="hover:underline">{category?.gender === 'k' ? 'Kadın' : 'Erkek'}</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">{name}</span>
        </div>
      </section>

      {/* Ürün Detay Ana Alanı */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Sol Taraf: Resim Galerisi */}
          <div>
            <div className="border rounded-lg overflow-hidden mb-4 aspect-square">
              <img
                src={productImages[mainImageIndex]?.src}
                alt={name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-3">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 border-2 rounded-md cursor-pointer overflow-hidden ${mainImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setMainImageIndex(index)}
                  >
                    <img src={img.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sağ Taraf: Ürün Bilgileri ve Aksiyonlar */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-dark-text">{name}</h1>
            <p className="text-xs text-gray-500 mt-1">Ürün Kodu: {productId}</p>
            
            <div className="flex items-center gap-2 my-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <span className="text-sm text-gray-600">5 / 5.0</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">{price?.toFixed(2)} TL</p>
            
            {/* Renk ve Beden Tablosu Alanı */}
            <div className="flex justify-between items-center mb-4">
               <div>
                  <h3 className="text-sm font-semibold mb-2">Renk</h3>
                  {/* --- RENK SEÇENEKLERİ DİNAMİK OLARAK GELDİ --- */}
                  <div className="flex gap-2">
                    {availableColors.map(color => (
                        <button 
                            key={color}
                            onClick={() => { setSelectedColor(color); setSelectedSize(null); }}
                            className={`w-8 h-8 rounded-full border-2 p-0.5 ${selectedColor === color ? 'border-primary' : 'border-gray-300'}`}
                            title={color}
                        >
                          {/* --- DÜZELTME BURADA --- */}
                          {/* Renk kutucuğunun arkaplanını çevirmen fonksiyonuyla ayarlıyoruz. */}
                          <div 
                            className="w-full h-full rounded-full border border-gray-200" 
                            style={{ backgroundColor: mapColorNameToCss(color) }}
                          ></div>
                        </button>
                    ))}
                  </div>
               </div>
               {sizeChartLink && (
                  <button onClick={() => setIsSizeChartOpen(true)} className="text-sm font-semibold text-gray-600 hover:underline">
                    Beden Tablosu
                  </button>
               )}
            </div>

            {/* --- BEDEN SEÇENEKLERİ DİNAMİK OLARAK GELDİ --- */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Beden</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizesForSelectedColor.map(variant => (
                  <button 
                    key={variant.size} 
                    onClick={() => setSelectedSize(variant.size)}
                    disabled={variant.stock === 0}
                    className={`px-4 py-2 border rounded transition 
                      ${selectedSize === variant.size ? 'bg-primary text-white border-primary' : 'hover:border-black'}
                      ${variant.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
                    `}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* --- SEPETE EKLE BUTONU DİNAMİK OLARAK GÜNCELLENDİ --- */}
            <div className="flex items-stretch gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || selectedVariantStock === 0}
                className="flex-grow bg-black text-white font-bold py-3 px-8 rounded hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {!selectedSize
                  ? 'Beden Seçiniz'
                  : selectedVariantStock > 0
                    ? 'Sepete Ekle'
                    : 'Stokta Yok'}
              </button>
              <button className="px-4 border border-gray-300 rounded text-gray-700 hover:border-black flex items-center justify-center">
                <FaRegHeart size={20} />
              </button>
            </div>

            {/* Ücretsiz Gönderi Bilgisi */}
            <p className="text-xs text-gray-500 mt-4">
              ✓ 1000 TL üzeri ücretsiz kargo!
            </p>

            {/* Ürün Detayı (Akordiyon gibi) */}
            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Ürün Detayı</h3>
              <div className="text-second-text text-sm space-y-2 prose max-w-none" dangerouslySetInnerHTML={{ __html: description || "<p>Açıklama mevcut değil.</p>" }}>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Component'i */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={productImages}
        index={mainImageIndex} // Tıklanan resimden başla
      />

      {/* --- YENİ: BEDEN TABLOSU MODAL'I --- */}
      {isSizeChartOpen && sizeChartLink && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4"
          onClick={() => setIsSizeChartOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full text-black text-xl font-bold"
              aria-label="Kapat"
            >
              &times;
            </button>
            <img 
              src={sizeChartLink} 
              alt="Beden Tablosu" 
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-md" 
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductDetailPage; 