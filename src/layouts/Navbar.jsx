import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'blueimp-md5';
import { FETCH_STATES } from '../store/actions/productActions';

const createCategorySlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const {
    categories: apiCategories,
    categoriesFetchState,
    categoriesError
  } = useSelector((state) => state.product);

  const groupedCategories = useMemo(() => {
    if (categoriesFetchState === FETCH_STATES.FETCHED && apiCategories.length > 0) {
      return {
        women: apiCategories.filter(cat => cat.gender === 'k'),
        men: apiCategories.filter(cat => cat.gender === 'e'),
      };
    }
    return { women: [], men: [] };
  }, [apiCategories, categoriesFetchState]);

  const getGravatarUrl = (email, size = 30) => {
    if (!email) return `https://www.gravatar.com/avatar/?d=mp&s=${size}`;
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=${size}`;
  };

  const handleLogout = () => {
    alert('Logout işlemi için Redux action tanımlanmalı ve token silinmeli.');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  const renderCategoryLinks = (categoryList, genderCode) => {
    if (!categoryList || categoryList.length === 0) {
      return <p className="px-4 py-2 text-sm text-gray-400">No categories</p>;
    }
    return categoryList.map((category) => (
      <Link
        key={category.id}
        to={`/shop/${genderCode}/${createCategorySlug(category.title)}/${category.id}`}
        className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {category.title}
      </Link>
    ));
  };

  return (
    <nav className="bg-slate-800 font-sans fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 h-[90px] flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl text-white tracking-wide">
          Bandage
        </Link>

        <div className="hidden lg:flex gap-x-5 text-gray-300 font-bold text-sm items-center">
          <Link to="/" className="hover:text-white py-2">Home</Link>
          <div className="relative group py-2">
            <button className="hover:text-white flex items-center">
              Shop <span className="ml-1 text-xs">▼</span>
            </button>
            <div className="absolute top-full left-0 bg-slate-800 border border-slate-700 rounded shadow-lg py-2 min-w-[320px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible flex">
              {categoriesFetchState === FETCH_STATES.FETCHING && <p className="px-4 py-2 text-sm text-gray-400">Loading...</p>}
              {categoriesFetchState === FETCH_STATES.FAILED && <p className="px-4 py-2 text-sm text-red-400">Error: {categoriesError}</p>}
              {categoriesFetchState === FETCH_STATES.FETCHED && (
                <>
                  <div className="w-1/2 px-2">
                    <h3 className="font-bold text-md text-white px-4 py-2 border-b border-slate-700 mb-1">Kadın</h3>
                    {renderCategoryLinks(groupedCategories.women, 'k')}
                  </div>
                  <div className="w-1/2 px-2 border-l border-slate-700">
                    <h3 className="font-bold text-md text-white px-4 py-2 border-b border-slate-700 mb-1">Erkek</h3>
                    {renderCategoryLinks(groupedCategories.men, 'e')}
                  </div>
                </>
              )}
            </div>
          </div>
          <Link to="/shop/home-living" className="hover:text-white py-2">Home & Living</Link>
          <Link to="/about" className="hover:text-white py-2">About Us</Link>
          <Link to="/contact" className="hover:text-white py-2">Contact</Link>
          <Link to="/team" className="hover:text-white py-2">Team</Link>
        </div>

        <div className="hidden lg:flex gap-x-4 items-center text-gray-300 font-bold text-sm">
          {user ? (
            <>
              <img
                src={getGravatarUrl(user.email)}
                alt={user.name || 'User Avatar'}
                className="w-8 h-8 rounded-full border-2 border-gray-400"
              />
              <span className="text-white">{user.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="p-2 hover:text-white text-xs bg-red-600 hover:bg-red-700 rounded"
                title="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1 py-2 text-white hover:text-gray-200">
              👤 <span className="ml-1">Login / Register</span>
            </Link>
          )}
          <button className="p-2 hover:text-white" aria-label="Search">🔍</button>
          <Link to="/cart" className="flex items-center gap-1 p-2 hover:text-white" aria-label="Cart">
            🛒 <span className="text-xs text-white">1</span>
          </Link>
          <Link to="/wishlist" className="flex items-center gap-1 p-2 hover:text-white" aria-label="Wishlist">
            ❤️ <span className="text-xs text-white">1</span>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-x-5 text-white">
           <button className="p-1" aria-label="Search">🔍</button>
           <Link to="/cart" className="p-1 flex items-center" aria-label="Cart">
               🛒
           </Link>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1" aria-label="Toggle Menu">
             {isMobileMenuOpen ? '✕' : '☰'}
           </button>
        </div>
      </div>

       <div className={`lg:hidden absolute top-[90px] left-0 right-0 bg-slate-800 shadow-md transition-all duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'max-h-screen py-10 border-t border-slate-700' : 'max-h-0 py-0 border-t-0'}`}>
           <div className="container mx-auto px-6 flex flex-col items-center gap-y-6 text-gray-300 text-2xl font-normal">
               <Link to="/" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
               
               {categoriesFetchState === FETCH_STATES.FETCHING && <p className="text-sm text-gray-400">Loading categories...</p>}
               {categoriesFetchState === FETCH_STATES.FAILED && <p className="text-sm text-red-400">Error: {categoriesError}</p>}
               {categoriesFetchState === FETCH_STATES.FETCHED && (
                 <>
                   {groupedCategories.women.length > 0 && (
                     <div className="text-center w-full">
                       <h3 className="text-xl text-white mb-2 mt-3">Kadın</h3>
                       {renderCategoryLinks(groupedCategories.women, 'k')}
                     </div>
                   )}
                   {groupedCategories.men.length > 0 && (
                     <div className="text-center w-full">
                       <h3 className="text-xl text-white mb-2 mt-3">Erkek</h3>
                       {renderCategoryLinks(groupedCategories.men, 'e')}
                     </div>
                   )}
                 </>
               )}

               <Link to="/shop/home-living" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home & Living</Link>
               <Link to="/about" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
               <Link to="/contact" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
               <Link to="/team" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Team</Link>

               {user ? (
                 <div className='text-center mt-4 w-full'>
                    <img
                        src={getGravatarUrl(user.email, 60)}
                        alt={user.name || 'User Avatar'}
                        className="w-16 h-16 rounded-full border-2 border-gray-400 mx-auto mb-2"
                    />
                   <span className="text-white block mb-4 text-xl">{user.name || 'User'}</span>
                    <button
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        className="p-2 hover:text-white text-lg bg-red-600 hover:bg-red-700 rounded w-full max-w-xs mx-auto"
                        title="Logout"
                    >
                        Logout
                    </button>
                 </div>
               ) : (
                 <Link to="/login" className="text-white hover:text-gray-200 mt-4" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
               )}
           </div>
       </div>
    </nav>
  );
};

export default Navbar; 