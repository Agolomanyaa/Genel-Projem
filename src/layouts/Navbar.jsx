import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tandoganImage from '../assets/tandogangoncu.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Men", path: "/shop?category=men" },
    { name: "Women", path: "/shop?category=women" },
    { name: "Kids", path: "/shop?category=kids" },
    { name: "Accessories", path: "/shop?category=accessories" },
  ];

  return (
    <nav className="bg-slate-800 font-sans fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-700">
      {/* Ana Nav Bar */}
      <div className="container mx-auto px-4 sm:px-6 h-[90px] flex justify-between items-center">
        {/* Logo (Açık Renk) */}
        <Link to="/" className="font-bold text-2xl text-white tracking-wide">
          Bandage
        </Link>

        {/* Desktop Nav Links (Açık Renk) */}
        {/* text-gray-300 hover:text-white kullandım */}
        <div className="hidden lg:flex gap-x-5 text-gray-300 font-bold text-sm items-center">
          <Link to="/" className="hover:text-white py-2">Home</Link>
          <div className="relative group">
            <button className="hover:text-white py-2 flex items-center">
              Categories <span className="ml-1 text-xs">▼</span>
            </button>
            <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded shadow-lg py-2 min-w-[160px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className="hover:text-white py-2">Contact</Link>
          <Link to="/team" className="hover:text-white py-2">Team</Link>
        </div>

        {/* Desktop Actions (Açık Renk - Login/Register linki farklı olabilir) */}
        {/* Login/Register için text-white, ikonlar için text-gray-300 */}
        <div className="hidden lg:flex gap-x-4 items-center text-gray-300 font-bold text-sm">
          <Link to="/login" className="flex items-center gap-1 py-2 text-white hover:text-gray-200">
            👤 <span className="ml-1">Login / Register</span>
          </Link>
          <button className="p-2 hover:text-white" aria-label="Search">🔍</button>
          <button className="flex items-center gap-1 p-2 hover:text-white" aria-label="Cart">
            🛒 <span className="text-xs text-white">1</span>
          </button>
          <button className="flex items-center gap-1 p-2 hover:text-white" aria-label="Wishlist">
            ❤️ <span className="text-xs text-white">1</span>
          </button>
        </div>

        {/* Mobile Icons (Açık Renk) */}
        <div className="flex lg:hidden items-center gap-x-5 text-white"> {/* İkon rengi beyaz */}
           <button className="p-1" aria-label="Search">🔍</button>
           <button className="p-1 flex items-center" aria-label="Cart">
               🛒
           </button>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1" aria-label="Toggle Menu">
             {isMobileMenuOpen ? '✕' : '☰'}
           </button>
        </div>
      </div>

       {/* Mobile Menu (Antrasit Arka Plan) */}
       <div className={`lg:hidden absolute top-[90px] left-0 right-0 bg-slate-800 shadow-md transition-all duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'max-h-screen py-10 border-t border-slate-700' : 'max-h-0 py-0 border-t-0'}`}>
           {/* Mobil menü link renkleri */}
           <div className="container mx-auto px-6 flex flex-col items-center gap-y-6 text-gray-300 text-3xl font-normal">
               <Link to="/" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
               {/* Mobile Categories */}
               <div className="text-center">
                 <span className="text-gray-400 text-2xl mb-2 block">Categories</span>
                 <div className="flex flex-col items-center gap-y-4">
                   {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="hover:text-white text-3xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                   ))}
                 </div>
               </div>
               <Link to="/contact" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
               <Link to="/team" className="hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Team</Link>
               <Link to="/login" className="text-white hover:text-gray-200 mt-4" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
           </div>
       </div>
    </nav>
  );
};

export default Navbar; 