// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react'; // useCallback kaldırıldı, şimdilik gerek yok
import { useParams, Link, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { useSelector, useDispatch } from 'react-redux';
import {
  FETCH_STATES,
  fetchProducts,
  setSelectedCategoryId,
  setSortOption,
  setFilterText,
  setCurrentPage, // Yeni action'ı import et
} from '../store/actions/productActions';
import { FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Sayfalama ikonları

const ShopPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const routeParams = useParams();

  const {
    productList,
    totalProducts,
    productsFetchState,
    productsError,
    categories: allApiCategories,
    selectedCategoryId: categoryIdFromStore,
    sortOption: sortOptionFromStore,
    filterText: filterTextFromStore,
    limit,
    currentPage, // <<<< BU SATIRIN OLDUĞUNDAN VE YAZIMININ DOĞRU OLDUĞUNDAN EMİN OL
  } = useSelector((state) => state.product);

  const [localFilterInput, setLocalFilterInput] = useState(filterTextFromStore || '');

  // Debounce Effect (Aynı kalıyor)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localFilterInput !== filterTextFromStore) {
        dispatch(setFilterText(localFilterInput));
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [localFilterInput, dispatch, filterTextFromStore]);

  // Effect 1: URL'deki categoryId (Aynı kalıyor)
  useEffect(() => {
    if (routeParams.categoryId && routeParams.categoryId !== categoryIdFromStore) {
      dispatch(setSelectedCategoryId(routeParams.categoryId));
    } else if (!routeParams.categoryId && categoryIdFromStore) {
      dispatch(setSelectedCategoryId(null));
    }
  }, [dispatch, routeParams.categoryId, categoryIdFromStore]);

  // --- EFFECT 2: Filtreler (kategori, sıralama, filtre metni, limit) DEĞİŞTİĞİNDE ürünleri çek ---
  // BU EFFECT ARTIK currentPage DEĞİŞTİĞİNDE ÇALIŞMAYACAK.
  // Sayfa değişimi handlePageChange ile yönetilecek.
  useEffect(() => {
    const paramsForAPI = {
      limit: limit,
      offset: 0, // Filtreler değiştiğinde her zaman ilk sayfadan başla (currentPage: 1 olacak)
    };
    if (categoryIdFromStore) paramsForAPI.category = categoryIdFromStore;
    if (sortOptionFromStore) paramsForAPI.sort = sortOptionFromStore;
    if (filterTextFromStore) paramsForAPI.filter = filterTextFromStore;

    // Bu effect sadece ana filtreler veya limit değiştiğinde çalışsın.
    // currentPage değişimi için ayrı bir handlePageChange fonksiyonu var.
    console.log('[ShopPage EFFECT2] Filters changed, fetching products from page 1. Params:', paramsForAPI);
    dispatch(fetchProducts(paramsForAPI));

  }, [dispatch, categoryIdFromStore, sortOptionFromStore, filterTextFromStore, limit]);
  // Bağımlılıklardan currentPage çıkarıldı.

  // Sıralama seçenekleri (Aynı kalıyor)
  const sortOptions = [
    { value: '', label: 'Default Sorting' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'rating:asc', label: 'Rating: Low to High' },
    { value: 'rating:desc', label: 'Rating: High to Low' },
  ];

  // UI Handler'ları (Aynı kalıyor)
  const handleSortChange = (e) => dispatch(setSortOption(e.target.value));
  const handleFilterInputChange = (e) => setLocalFilterInput(e.target.value);

  // --- YENİ: SAYFALAMA İÇİN HESAPLAMALAR VE HANDLER ---
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage) => {
    console.log('[ShopPage] handlePageChange CALLED with newPage:', newPage, 'Current Page Before Dispatch:', currentPage, 'Total Pages:', totalPages);

    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      console.log('[ShopPage] Conditions MET. Dispatching setCurrentPage and fetching products.');
      dispatch(setCurrentPage(newPage));
      const newOffset = (newPage - 1) * limit;
      const paramsForAPI = {
        limit,
        offset: newOffset,
      };
      if (categoryIdFromStore) paramsForAPI.category = categoryIdFromStore;
      if (sortOptionFromStore) paramsForAPI.sort = sortOptionFromStore;
      if (filterTextFromStore) paramsForAPI.filter = filterTextFromStore;
      
      console.log(`[ShopPage] Page changed to ${newPage}. Fetching products with params:`, paramsForAPI);
      dispatch(fetchProducts(paramsForAPI));

      // YENİ EKLENEN SATIR: Sayfanın en üstüne kaydır
      window.scrollTo(0, 0);

    } else {
      console.log('[ShopPage] Conditions NOT MET. newPage:', newPage, 'currentPage:', currentPage, 'totalPages:', totalPages);
    }
  };

  // Sayfalama UI'ını render etmek için yardımcı fonksiyon (isteğe bağlı)
  const renderPagination = () => {
    if (totalPages <= 1) return null; // Tek sayfa varsa sayfalama gösterme

    const pageNumbers = [];
    // Basit bir sayfalama gösterimi, daha karmaşık (örn: "..." ile kısaltma) yapılabilir.
    // Şimdilik maks 5 sayfa butonu gösterelim, aktif sayfa ortada olacak şekilde.
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) { // Başa yakınsak
        endPage = Math.min(totalPages, 5);
    }
    if (currentPage > totalPages - 3) { // Sona yakınsak
        startPage = Math.max(1, totalPages - 4);
    }


    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation" className="flex justify-center mt-10 mb-6">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FaChevronLeft />
            </button>
          </li>
          {startPage > 1 && ( // Başa "..." ve "1" ekle
            <>
              <li>
                <button onClick={() => handlePageChange(1)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>1</button>
              </li>
              {startPage > 2 && <li className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"><span>...</span></li>}
            </>
          )}
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => handlePageChange(number)}
                className={`px-3 h-8 leading-tight border border-gray-300 ${
                  currentPage === number
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                    : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
           {endPage < totalPages && ( // Sona "..." ve son sayfa ekle
            <>
              {endPage < totalPages - 1 && <li className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"><span>...</span></li>}
              <li>
                <button onClick={() => handlePageChange(totalPages)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>{totalPages}</button>
              </li>
            </>
          )}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    );
  };


  // Sayfa başlığı ve Breadcrumb (Aynı kalıyor)
  let pageTitle = 'Shop';
  const breadcrumbSegments = [{ name: 'Home', path: '/' }]; 
  if (location.pathname === '/shop' && !categoryIdFromStore && !filterTextFromStore) {
    pageTitle = 'All Products';
    breadcrumbSegments.push({ name: 'Shop', path: '/shop' });
  } else {
    breadcrumbSegments.push({ name: 'Shop', path: '/shop' }); 
    if (categoryIdFromStore) {
      const currentCategory = allApiCategories.find(cat => String(cat.id) === String(categoryIdFromStore));
      if (currentCategory) {
        pageTitle = currentCategory.title;
        if (routeParams.gender && routeParams.categorySlug) {
            const genderTitle = routeParams.gender.charAt(0).toUpperCase() + routeParams.gender.slice(1);
        }
        breadcrumbSegments.push({ name: currentCategory.title }); 
      } else {
        pageTitle = "Filtered Products"; 
      }
    } else if (filterTextFromStore) {
      pageTitle = `Search results for "${filterTextFromStore}"`;
    } else {
      pageTitle = "Products"; 
    }
  }

  // Sonuç sayısı gösterimi (Aynı kalıyor)
  const resultsText = totalProducts > 0 
    ? `Showing ${productList.length} of ${totalProducts} results (Page ${currentPage} of ${totalPages})` 
    : `Showing ${productList.length} results`;


  return (
    <MainLayout>
      {/* Breadcrumb (Aynı kalıyor) */}
      <section className="bg-lighter-bg py-6 mt-[90px]">
         <div className="container mx-auto px-6 flex items-center text-sm">
          {breadcrumbSegments.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-muted-text mx-2">{'>'}</span>}
              {segment.path && index < breadcrumbSegments.length -1 ? ( 
                <Link to={segment.path} className="text-dark-text hover:text-primary">
                  {segment.name}
                </Link>
              ) : (
                <span className="text-second-text font-bold">{segment.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Filtreleme ve Sıralama UI (Aynı kalıyor) */}
      <section className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={localFilterInput} 
                onChange={handleFilterInputChange} 
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white text-gray-700"
                value={sortOptionFromStore}
                onChange={handleSortChange}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-second-text text-sm font-bold">
            {resultsText} {/* Sonuç metnine sayfa bilgisi eklendi */}
          </div>
        </div>
      </section>

      {/* Ürün Grid'i (Aynı kalıyor) */}
      <div className="container mx-auto px-6 py-10">
         {productsFetchState === FETCH_STATES.FETCHED && productList.length === 0 && totalProducts > 0 && ( 
          <div className="text-center py-10">
            <p className="text-xl text-gray-700">No products found matching your criteria.</p>
          </div>
        )}
        {productsFetchState === FETCH_STATES.FETCHED && totalProducts === 0 && ( 
          <div className="text-center py-10">
            <p className="text-xl text-gray-700">No products available at the moment.</p>
            <p className="text-md text-gray-500">Please check back later.</p>
          </div>
        )}
        {productList.length > 0 && (
          <ProductGrid
            title={pageTitle !== 'All Products' && pageTitle !== 'Shop' && !categoryIdFromStore ? pageTitle : ''} 
            products={productList} 
          />
        )}
      </div>


      {/* YENİ: SAYFALAMA UI RENDER */}
      {renderPagination()}

    </MainLayout>
  );
};

export default ShopPage;