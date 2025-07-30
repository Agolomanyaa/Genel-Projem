// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/ProductGrid';
import { useSelector, useDispatch } from 'react-redux';
import {
  FETCH_STATES,
  fetchProducts,
  setSelectedCategoryId,
  setSortOption,
  setFilterText,
  setCurrentPage,
} from '../store/actions/productActions';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ShopPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    products: productList,
    totalProducts,
    productsFetchState,
    categories: allApiCategories,
    selectedCategoryId: categoryIdFromStore,
    sortOption: sortOptionFromStore,
    filterText: filterTextFromStore,
    limit,
    currentPage,
  } = useSelector((state) => state.product);

  const [localFilterInput, setLocalFilterInput] = useState(filterTextFromStore || '');

  // Debounce Effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localFilterInput !== filterTextFromStore) {
        dispatch(setFilterText(localFilterInput));
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [localFilterInput, dispatch, filterTextFromStore]);

  // Effect 1: Sync URL query param `?category=X` to Redux state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryIdFromUrl = searchParams.get('category');
    
    if (categoryIdFromUrl && categoryIdFromUrl !== categoryIdFromStore) {
      dispatch(setSelectedCategoryId(categoryIdFromUrl));
    } else if (!categoryIdFromUrl && categoryIdFromStore !== null) {
      dispatch(setSelectedCategoryId(null));
    }
  }, [dispatch, location.search, categoryIdFromStore]);
  
  // Effect 2: Fetch products whenever filters in Redux state change
  useEffect(() => {
    const paramsForAPI = {
      limit: limit,
      offset: 0, 
    };
    if (categoryIdFromStore) paramsForAPI.category = categoryIdFromStore;
    if (sortOptionFromStore) paramsForAPI.sort = sortOptionFromStore;
    if (filterTextFromStore) paramsForAPI.filter = filterTextFromStore;
    
    dispatch(fetchProducts(paramsForAPI));

  }, [dispatch, categoryIdFromStore, sortOptionFromStore, filterTextFromStore, limit]);

  const sortOptions = [
    { value: '', label: 'Default Sorting' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'rating:asc', label: 'Rating: Low to High' },
    { value: 'rating:desc', label: 'Rating: High to Low' },
  ];

  const handleSortChange = (e) => dispatch(setSortOption(e.target.value));
  const handleFilterInputChange = (e) => setLocalFilterInput(e.target.value);
  
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      dispatch(setCurrentPage(newPage));
      const newOffset = (newPage - 1) * limit;
      const paramsForAPI = {
        limit,
        offset: newOffset,
      };
      if (categoryIdFromStore) paramsForAPI.category = categoryIdFromStore;
      if (sortOptionFromStore) paramsForAPI.sort = sortOptionFromStore;
      if (filterTextFromStore) paramsForAPI.filter = filterTextFromStore;
      
      dispatch(fetchProducts(paramsForAPI));
      window.scrollTo(0, 0);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) endPage = Math.min(totalPages, 5);
    if (currentPage > totalPages - 3) startPage = Math.max(1, totalPages - 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation" className="flex justify-center mt-10 mb-6">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}>
              <FaChevronLeft />
            </button>
          </li>
          {startPage > 1 && (
            <>
              <li><button onClick={() => handlePageChange(1)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>1</button></li>
              {startPage > 2 && <li className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"><span>...</span></li>}
            </>
          )}
          {pageNumbers.map(number => (
            <li key={number}><button onClick={() => handlePageChange(number)} className={`px-3 h-8 leading-tight border border-gray-300 ${currentPage === number ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100'}`}>{number}</button></li>
          ))}
           {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <li className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"><span>...</span></li>}
              <li><button onClick={() => handlePageChange(totalPages)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>{totalPages}</button></li>
            </>
          )}
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}>
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  let pageTitle = 'Shop';
  const breadcrumbSegments = [{ name: 'Home', path: '/' }]; 
  breadcrumbSegments.push({ name: 'Shop', path: '/shop' }); 
  
  if (categoryIdFromStore) {
    const currentCategory = allApiCategories.find(cat => String(cat.id) === String(categoryIdFromStore));
    if (currentCategory) {
      // DÜZELTME: `.title` yerine `.name` kullanılıyor.
      pageTitle = currentCategory.name; 
      breadcrumbSegments.push({ name: currentCategory.name }); 
    } else {
      pageTitle = "Filtered Products"; 
    }
  } else if (filterTextFromStore) {
    pageTitle = `Search results for "${filterTextFromStore}"`;
  } else {
    pageTitle = "All Products"; 
  }

  const safeProductList = productList || [];
  const resultsText = totalProducts > 0 
    ? `Showing ${safeProductList.length} of ${totalProducts} results (Page ${currentPage} of ${totalPages})` 
    : `Showing ${safeProductList.length} results`;

  return (
    <MainLayout>
      <section className="bg-lighter-bg py-6">
         <div className="container mx-auto px-6 flex items-center text-sm">
          {breadcrumbSegments.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-muted-text mx-2">{'>'}</span>}
              {index < breadcrumbSegments.length -1 ? ( 
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

      <section className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={localFilterInput} 
                onChange={handleFilterInputChange} 
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="w-full md:w-auto p-2 border border-gray-300 rounded-md bg-white text-gray-700"
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
            {resultsText}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-10">
         {productsFetchState === FETCH_STATES.FETCHING && (
            <div className="text-center py-20">
                <p className="text-2xl text-gray-500">Loading Products...</p>
            </div>
         )}
         {productsFetchState === FETCH_STATES.FETCHED && safeProductList.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-700">No products found matching your criteria.</p>
          </div>
        )}
        {safeProductList.length > 0 && (
          <ProductGrid products={safeProductList} />
        )}
      </div>

      {renderPagination()}

    </MainLayout>
  );
};

export default ShopPage;