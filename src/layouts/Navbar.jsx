import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'blueimp-md5';
import { FETCH_STATES } from '../store/actions/productActions';
import CartDropdown from '../components/CartDropdown';
import { logoutUser } from '../store/actions/clientActions';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.client.user);
    const {
        categories: apiCategories,
        categoriesFetchState,
        categoriesError
    } = useSelector((state) => state.product);

    const { cart } = useSelector((state) => state.shoppingCart);

    const totalCartItems = useMemo(() => {
        return cart.reduce((total, item) => total + item.count, 0);
    }, [cart]);

    // --- BU BÖLÜM TAMAMEN GÜNCELLENDİ ---
    const hierarchicalCategories = useMemo(() => {
        if (categoriesFetchState !== FETCH_STATES.FETCHED || !apiCategories || apiCategories.length === 0) {
            return [];
        }

        const categoryMap = {};
        const rootCategories = [];

        apiCategories.forEach(category => {
            categoryMap[category.id] = { ...category, children: [] };
        });

        Object.values(categoryMap).forEach(category => {
            // parentId'yi kontrol et
            if (category.parentId && categoryMap[category.parentId]) {
                categoryMap[category.parentId].children.push(category);
            } 
            // parentId yoksa, ana kategoridir
            else if (!category.parentId) {
                rootCategories.push(category);
            }
        });

        return rootCategories;
    }, [apiCategories, categoriesFetchState]);
    // --- GÜNCELLEME BİTTİ ---

    const getGravatarUrl = (email, size = 30) => {
        if (!email) return `https://www.gravatar.com/avatar/?d=mp&s=${size}`;
        const hash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}?d=mp&s=${size}`;
    };

    const handleLogout = () => {
        dispatch(logoutUser(history));
    };
    
    // ... dosyanın geri kalanı önceki verdiğim doğru versiyon ile aynı ...
    // ... kopyala-yapıştır yapabilirsin ...
    
    const renderSubCategoryLinks = (subCategoryList) => {
        if (!subCategoryList || subCategoryList.length === 0) {
            return null;
        }
        return subCategoryList.map((category) => (
            <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                {category.name}
            </Link>
        ));
    };

    const toggleCartDropdown = () => {
        setIsCartOpen(prev => !prev);
    };

    const cartDropdownContainerRef = useRef(null);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartDropdownContainerRef.current && !cartDropdownContainerRef.current.contains(event.target)) {
                const desktopCartIcon = document.getElementById('cart-icon-button');
                const mobileCartIcon = document.getElementById('cart-icon-button-mobile');
                if (
                    !(desktopCartIcon && desktopCartIcon.contains(event.target)) &&
                    !(mobileCartIcon && mobileCartIcon.contains(event.target)) &&
                    isCartOpen
                ) {
                    setIsCartOpen(false);
                }
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                const userMenuButton = document.getElementById('user-menu-button');
                if (!(userMenuButton && userMenuButton.contains(event.target)) && isUserMenuOpen) {
                    setIsUserMenuOpen(false);
                }
            }
        };

        if (isCartOpen || isUserMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isCartOpen, isUserMenuOpen]);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
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
                        {/* BU DIV'I GÜNCELLE */}
                        <div className="absolute top-full bg-slate-800 border border-slate-700 rounded shadow-lg p-4 min-w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible flex flex-row gap-4">
                            {categoriesFetchState === FETCH_STATES.FETCHING && <p className="px-4 py-2 text-sm text-gray-400">Loading...</p>}
                            {categoriesFetchState === FETCH_STATES.FAILED && <p className="px-4 py-2 text-sm text-red-400">Error: {categoriesError}</p>}
                            {categoriesFetchState === FETCH_STATES.FETCHED && hierarchicalCategories.map(rootCat => (
                                <div key={rootCat.id}>
                                    <h3 className="font-bold text-white px-4 py-2 text-md">{rootCat.name}</h3>
                                    <div className="flex flex-col">
                                        {rootCat.children && rootCat.children.map(childCat => (
                                            <Link
                                                key={childCat.id}
                                                to={`/shop?category=${childCat.id}`}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white rounded"
                                            >
                                                {childCat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to="/about" className="hover:text-white py-2">About Us</Link>
                    <Link to="/contact" className="hover:text-white py-2">Contact</Link>
                    <Link to="/team" className="hover:text-white py-2">Team</Link>
                </div>

                <div className="hidden lg:flex gap-x-4 items-center text-gray-300 font-bold text-sm">
                    {user ? (
                        <div className="relative" ref={userMenuRef}>
                            <button id="user-menu-button" onClick={toggleUserMenu} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-700">
                                <img src={getGravatarUrl(user.email)} alt={user.name || 'User Avatar'} className="w-8 h-8 rounded-full border-2 border-gray-400" />
                                <span className="text-white">{user.name || 'User'}</span>
                                <span className={`ml-1 text-xs transform transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded shadow-lg py-1 z-50">
                                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white" onClick={() => setIsUserMenuOpen(false)}>Siparişlerim</Link>
                                    <button onClick={() => { handleLogout(); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1 py-2 text-white hover:text-gray-200">
                            👤 <span className="ml-1">Login / Register</span>
                        </Link>
                    )}
                    <button className="p-2 hover:text-white" aria-label="Search">🔍</button>
                    <div className="relative">
                        <button id="cart-icon-button" onClick={toggleCartDropdown} className="flex items-center gap-1 p-2 hover:text-white" aria-label="Cart">
                            🛒
                            {totalCartItems > 0 && <span className="text-xs bg-primary text-white rounded-full px-1.5 py-0.5 leading-none">{totalCartItems}</span>}
                        </button>
                        <div ref={cartDropdownContainerRef}>
                            <CartDropdown isOpen={isCartOpen} toggleDropdown={toggleCartDropdown} />
                        </div>
                    </div>
                </div>

                <div className="flex lg:hidden items-center gap-x-5 text-white">
                    <button className="p-1" aria-label="Search">🔍</button>
                    <div className="relative">
                        <button id="cart-icon-button-mobile" onClick={toggleCartDropdown} className="p-1 flex items-center" aria-label="Cart">
                            🛒
                            {totalCartItems > 0 && <span className="ml-1 text-xs bg-primary text-white rounded-full px-1 py-0.5 leading-none">{totalCartItems}</span>}
                        </button>
                        <div ref={cartDropdownContainerRef}>
                            <CartDropdown isOpen={isCartOpen} toggleDropdown={toggleCartDropdown} />
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1" aria-label="Toggle Menu">
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            <div className={`lg:hidden absolute top-[90px] left-0 right-0 bg-slate-800 shadow-md transition-all duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'max-h-screen py-10 border-t border-slate-700' : 'max-h-0 py-0 border-t-0'}`}>
                <div className="container mx-auto px-6 flex flex-col items-center gap-y-6 text-gray-300 text-2xl font-normal">
                    <Link to="/" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <div className="w-full text-center">
                        <h3 className="text-primary font-bold mb-2">Shop</h3>
                        {hierarchicalCategories.map(rootCat => (
                            <div key={rootCat.id} className="mb-4">
                                <h4 className="font-semibold text-white text-xl mb-1">{rootCat.name}</h4>
                                <div className="flex flex-col items-center gap-y-2 text-lg">
                                    {rootCat.children && rootCat.children.map(childCat => (
                                        <Link
                                            key={childCat.id}
                                            to={`/shop?category=${childCat.id}`}
                                            className="block text-gray-300 hover:text-white rounded"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {childCat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/about" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                    <Link to="/contact" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    <Link to="/team" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Team</Link>
                    <div className="border-t border-slate-700 w-full my-4"></div>
                    {user ? (
                        <>
                            <Link to="/orders" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Siparişlerim</Link>
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-primary hover:text-primary-light" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;