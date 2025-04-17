import React from 'react';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, ChevronDown, Search, ShoppingCart, Heart, User, Menu } from 'lucide-react';

function Header() {
  return (
    <header className="text-sm">
      {/* Top Bar (Dark) - Hidden on mobile, shown on md screens and up */}
      <div className="hidden md:block bg-[#252B42] text-white">
// ... existing code ...
      </div>

      {/* Main Navigation Bar (Light) */}
      <div className="bg-white shadow-sm"> {/* Added shadow for better separation */}
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          {/* Left Side: Brand */}
          <a href="/" className="text-2xl font-bold text-[#252B42]">
            Bandage
          </a>

          {/* Center: Navigation Links - Hidden on mobile, shown on md screens */}
          <nav className="hidden md:block">
// ... existing code ...
          </nav>

          {/* Right Side: User Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-x-4">
            {/* Login/Register - Consistently blue, hide text on mobile */}
            <a href="#" className="flex items-center gap-x-1 text-[#23A6F0] font-bold"> {/* Ensure blue color */}
              <User size={18} />
              <span className="hidden md:inline">Login / Register</span> {/* Text hidden on mobile */}
            </a>
            {/* Remove separate mobile user icon - Handled by the above link */}

            {/* Search Icon - Consistently blue */}
            <button aria-label="Search" className="text-[#23A6F0]"> {/* Ensure blue color */}
              <Search size={20} />
            </button>

            {/* Cart Icon - Consistently blue, hide count on mobile */}
            <button aria-label="Shopping Cart" className="flex items-center gap-x-1 text-[#23A6F0]"> {/* Ensure blue color */}
              <ShoppingCart size={20} />
              <span className="hidden md:inline text-xs">1</span> {/* Count hidden on mobile */}
            </button>

            {/* Wishlist Icon - Hidden on mobile, blue on desktop */}
            <button aria-label="Wishlist" className="hidden md:flex items-center gap-x-1 text-[#23A6F0]"> {/* Ensure blue color */}
              <Heart size={20} />
              <span className="hidden md:inline text-xs">1</span> {/* Count hidden on mobile */}
            </button>

            {/* Mobile Menu Button - Hidden on md+, dark */}
            <button aria-label="Open Menu" className="md:hidden text-[#252B42]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
