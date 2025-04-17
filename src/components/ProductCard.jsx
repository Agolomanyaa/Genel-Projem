import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react'; // Assuming you might add icons later

function ProductCard({ imageUrl, title, category, originalPrice, discountedPrice, colors = [], isNew = false }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col group">
      {/* Image Container */}
      <div className="relative bg-gray-200 h-60"> 
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        {/* Optional: New Tag */}
        {isNew && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {/* Optional: Hover Icons (Initially hidden, appear on group hover) */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100">
            <ShoppingCart size={18} className="text-gray-700" />
          </button>
          <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100">
            <Heart size={18} className="text-gray-700" />
          </button>
          <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100">
            <Eye size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Title */}
          <h5 className="text-base font-bold text-slate-800 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {title}
          </h5>
          {/* Category */}
          <p className="text-sm font-bold text-gray-500 mb-2">{category}</p>
          {/* Pricing */}
          <div className="flex items-center gap-x-2 mb-3">
            <span className="text-base font-bold text-gray-400 line-through">
              ${originalPrice}
            </span>
            <span className="text-base font-bold text-teal-700"> {/* Changed to teal */}
              ${discountedPrice}
            </span>
          </div>
        </div>
        {/* Color Options */}
        {colors.length > 0 && (
          <div className="flex gap-x-1 mt-2">
            {colors.map((color, index) => (
              <span 
                key={index} 
                className={`block w-4 h-4 rounded-full ${color}`}
                aria-label={`Color option ${index + 1}`} // Accessibility
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
