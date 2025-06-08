import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import ProductCard from '../components/ProductCard';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { 
  fetchProductById, 
  clearSelectedProduct,
} from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import { FETCH_STATES } from '../store/actions/productActions';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { 
    selectedProduct, 
    selectedProductFetchState, 
    selectedProductError,
    categories: allApiCategories,
  } = useSelector(state => state.product);

  useEffect(() => {
    if (productId) {
      console.log(`[ProductDetailPage EFFECT] productId: ${productId}. Fetching product.`);
      dispatch(fetchProductById(productId));
    }
    return () => {
      console.log('[ProductDetailPage EFFECT CLEANUP] Clearing selected product.');
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialSlide, setLightboxInitialSlide] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedProduct.stock > 0) {
      const productToAdd = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageUrl: (selectedProduct.images && selectedProduct.images.length > 0) 
                    ? selectedProduct.images[0].url 
                    : 'https://via.placeholder.com/100',
        stock: selectedProduct.stock,
      };

      dispatch(addToCart(productToAdd, quantity));
      console.log(`[ProductDetailPage] Added to cart: ${quantity} x ${selectedProduct.name}`);
    } else {
      console.warn('[ProductDetailPage] Cannot add to cart: Product not loaded or out of stock.');
    }
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + amount;
      if (newQuantity < 1) return 1;
      if (selectedProduct && newQuantity > selectedProduct.stock) return selectedProduct.stock;
      return newQuantity;
    });
  };

  if (selectedProductFetchState === FETCH_STATES.FETCHING) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-20 text-center flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
          <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
          <p className="text-xl text-gray-700">Loading product details...</p>
        </div>
      </MainLayout>
    );
  }

  if (selectedProductFetchState === FETCH_STATES.FAILED) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-20 text-center min-h-[calc(100vh-180px)]">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-md text-gray-700 mb-6">{selectedProductError || 'An unknown error occurred.'}</p>
          <button
            onClick={handleGoBack}
            className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-primary-dark flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </MainLayout>
    );
  }

  if (selectedProductFetchState === FETCH_STATES.FETCHED && !selectedProduct) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-20 text-center min-h-[calc(100vh-180px)]">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <p className="text-md text-gray-500 mb-6">The product you are looking for does not exist or could not be loaded.</p>
           <button
            onClick={handleGoBack}
            className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-primary-dark flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </MainLayout>
    );
  }
  
  if (!selectedProduct) {
      return null;
  }

  const { name, description, price, images, category_id, rating, stock, sell_count } = selectedProduct;
  const productImages = Array.isArray(images) && images.length > 0 ? images.map(img => img.url) : ['https://via.placeholder.com/600x600?text=No+Image'];
  const mainImageForDisplay = productImages[0];

  const currentCategory = allApiCategories.find(cat => cat.id === category_id);

  const openLightbox = (index) => {
    setLightboxInitialSlide(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <MainLayout>
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-4 sm:px-6 flex items-center flex-wrap">
          <button
            onClick={handleGoBack}
            className="text-sm text-primary font-bold hover:underline mr-2 mb-2 sm:mb-0 flex items-center"
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
          <span className="text-muted-text mx-1 hidden sm:inline">|</span>
          <Link to="/" className="text-dark-text hover:text-primary text-sm mr-2 ml-1">Home</Link>
          <span className="text-muted-text mx-2">{'>'}</span>
          <Link to="/shop" className="text-muted-text hover:text-primary text-sm">Shop</Link>
          {currentCategory && (
             <>
              <span className="text-muted-text mx-2">{'>'}</span>
              <Link to={`/shop/${currentCategory.gender}/${currentCategory.code.substring(2)}/${currentCategory.id}`} className="text-muted-text hover:text-primary text-sm">
                 {currentCategory.title}
              </Link>
             </>
          )}
          <span className="text-muted-text mx-2 hidden sm:inline">{'>'}</span>
          <span className="text-second-text text-sm font-bold w-full sm:w-auto mt-1 sm:mt-0 sm:ml-2">{name}</span>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="w-full lg:w-1/2">
            <div
              className="border border-gray-200 rounded mb-4 overflow-hidden aspect-square cursor-pointer"
              onClick={() => productImages.length > 0 && openLightbox(0)}
            >
              <img src={mainImageForDisplay} alt={name} className="w-full h-full object-cover" />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {productImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded p-1 cursor-pointer w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
                    onClick={() => openLightbox(index)}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-dark-text mb-3">{name}</h1>
            {typeof rating === 'number' && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.round(rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-second-text font-bold text-sm">{rating.toFixed(1)} ({sell_count} reviews)</span>
              </div>
            )}
            <p className="text-2xl font-bold text-primary mb-6">${price?.toFixed(2)}</p>
            
            {stock > 0 ? (
                <p className="text-sm text-green-600 font-semibold mb-4">In Stock ({stock} available)</p>
            ) : (
                <p className="text-sm text-red-600 font-semibold mb-4">Out of Stock</p>
            )}

            <div className="text-second-text text-sm mb-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: description || "<p>No description available.</p>" }}>
            </div>
            
            <hr className="mb-6"/>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-bold text-dark-text mb-2">Quantity:</label>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  readOnly
                  className="w-12 text-center border-t border-b border-gray-300 py-1"
                />
                <button 
                  onClick={() => handleQuantityChange(1)} 
                  className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100"
                  disabled={selectedProduct && quantity >= selectedProduct.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className={`bg-primary text-white font-bold py-3 px-8 rounded hover:bg-primary-dark transition-colors
                            ${(selectedProduct && selectedProduct.stock === 0) || selectedProductFetchState === FETCH_STATES.FETCHING ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={(selectedProduct && selectedProduct.stock === 0) || selectedProductFetchState === FETCH_STATES.FETCHING}
              >
                {selectedProduct && selectedProduct.stock > 0 ? 'Add to Cart' : (selectedProductFetchState === FETCH_STATES.FETCHING ? 'Loading...' : 'Out of Stock')}
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500">
                <p>Category: <Link to={`/shop/${currentCategory?.gender}/${currentCategory?.code?.substring(2)}/${currentCategory?.id}`} className="hover:underline">{currentCategory?.title || 'N/A'}</Link></p>
                <p>Product ID: {productId}</p>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && productImages.length > 0 && (
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
                className="h-full"
              >
                {productImages.map((imgUrl, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center">
                    <img src={imgUrl} alt={`Product image ${index + 1}`} className="max-w-full max-h-[85vh] object-contain"/>
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