import React from 'react';
import { Link } from 'react-router-dom'; // For Breadcrumbs
import { ChevronRight, LayoutGrid, List, ChevronDown } from 'lucide-react'; // Icons
import ProductCard from '../components/ProductCard'; // Import ProductCard

function ShopPage() {

  // Placeholder data for products (replace with actual data later)
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://via.placeholder.com/300x200/E8F5E9/888888?text=Product+${i + 1}`,
    title: `Product Title ${i + 1}`,
    category: 'Department',
    originalPrice: (Math.random() * 50 + 20).toFixed(2),
    discountedPrice: (Math.random() * 20 + 10).toFixed(2),
    colors: ['bg-blue-500', 'bg-teal-600', 'bg-orange-500', 'bg-slate-800'].slice(0, Math.floor(Math.random() * 5)),
    isNew: Math.random() > 0.8 // ~20% chance of being new
  }));

  // Placeholder data for categories
  const categories = [
    { name: 'CLOTHS', count: 5, imageUrl: 'https://via.placeholder.com/210x210/cccccc/888888?text=Cloths' },
    { name: 'SHOES', count: 8, imageUrl: 'https://via.placeholder.com/210x210/cccccc/888888?text=Shoes' },
    { name: 'BAGS', count: 12, imageUrl: 'https://via.placeholder.com/210x210/cccccc/888888?text=Bags' },
    { name: 'ACCESSORIES', count: 7, imageUrl: 'https://via.placeholder.com/210x210/cccccc/888888?text=Accessories' },
    { name: 'JEWELRY', count: 3, imageUrl: 'https://via.placeholder.com/210x210/cccccc/888888?text=Jewelry' },
  ];

  return (
    <div className="bg-white">

      {/* 1. Header/Breadcrumbs Section */}
      <section className="bg-gray-50 py-6 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2 md:mb-0">SHOP</h1>
          <div className="flex items-center text-sm font-bold">
            <Link to="/" className="text-slate-800 hover:text-blue-600">Home</Link>
            <ChevronRight size={16} className="text-gray-400 mx-1" />
            <span className="text-gray-500">Shop</span>
          </div>
        </div>
      </section>

      {/* 2. Category Cards Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="relative h-56 bg-gray-200 rounded overflow-hidden group cursor-pointer"
              >
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-2">
                  <h5 className="text-base font-bold uppercase tracking-wide">{category.name}</h5>
                  <p className="text-xs font-bold">{category.count} Items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filter/Sort Row Section */}
      <section className="bg-gray-50 py-4 px-4 mb-8">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Left: Results Count */}
          <div className="text-slate-800 font-bold mb-4 md:mb-0">
            Showing 1–{products.length} of {products.length * 2} results {/* Example total */}
          </div>

          {/* Right: View Toggle & Sort Dropdown */}
          <div className="flex items-center gap-x-4">
            {/* View Toggle */}
            <div className="flex items-center gap-x-2">
              <span className="text-slate-800 font-bold">Views:</span>
              <button className="p-2 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200">
                <LayoutGrid size={16} className="text-slate-800" />
              </button>
              <button className="p-2 rounded border border-gray-300 hover:bg-gray-200">
                <List size={16} className="text-slate-800" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-x-2">
              <select 
                className="px-4 py-2 border border-gray-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8" 
                style={{ backgroundImage: 'none'}} // Remove default arrow
              >
                <option>Popularity</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              {/* Custom dropdown arrow if needed, or rely on browser default */}
              {/* <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" /> */}
              
              <button className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Grid Section */}
      <section className="px-4 mb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                category={product.category}
                originalPrice={product.originalPrice}
                discountedPrice={product.discountedPrice}
                colors={product.colors}
                isNew={product.isNew}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pagination Section */}
      <section className="px-4 mb-16">
        <div className="container mx-auto max-w-7xl flex justify-center">
          <nav aria-label="Page navigation">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                  First
                </a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">2</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">3</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

    </div>
  );
}

export default ShopPage; 