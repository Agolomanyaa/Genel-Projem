import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder for individual category item
const CategoryItem = ({ imageUrl, label, className = "", isMobile = false }) => {
  const categoryPath = `/shop/${label.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`;

  return (
    <Link to={categoryPath} className={`relative block overflow-hidden group ${className} ${isMobile ? 'aspect-[3/4]' : 'md:aspect-auto'} bg-gray-200`}>
      <img
        src={imageUrl || `https://via.placeholder.com/500x${isMobile ? 660 : 640}/${isMobile ? 'e0e0e0' : 'f0f0f0'}/a0a0a0?text=${label.toUpperCase()}+Placeholder`}
        alt={`${label} category item`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <span className="inline-block px-5 py-2 bg-white text-dark-text font-bold border-none cursor-pointer hover:bg-gray-100 transition duration-300 z-10 text-base">
          {label}
        </span>
      </div>
    </Link>
  );
};

const EditorPicks = () => {
  // URL'ler
  const menImageUrl = "https://images.unsplash.com/photo-1611233361198-dc49830c2ef7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const womenImageUrl = "https://images.unsplash.com/photo-1735851755365-6057d459facb?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const homeLivingImageUrl = "https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=3134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="py-12 md:py-16 container mx-auto px-5 text-center">
      <h2 className="text-2xl font-bold mb-2 text-dark-text">EDITOR'S PICK</h2>
      <p className="text-second-text mb-8 md:mb-10 text-sm">Create Your Own Style</p>

      {/* Desktop Grid (md ve üzeri) */}
      <div className="hidden md:grid grid-cols-3 gap-6 h-[32rem]">
        {/* Column 1: MEN */}
        <div className="col-span-1 h-full">
          <CategoryItem label="MEN" imageUrl={menImageUrl} className="h-full" />
        </div>
        {/* Column 2: WOMEN */}
        <div className="col-span-1 h-full">
          <CategoryItem label="WOMEN" imageUrl={womenImageUrl} className="h-full" />
        </div>
        {/* Column 3: HOME & LIVING */}
        <div className="col-span-1 h-full">
          <CategoryItem label="HOME & LIVING" imageUrl={homeLivingImageUrl} className="h-full" />
        </div>
      </div>

      {/* Mobile Grid/Stack (md'den küçük) */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {/* Figma mobil CSS'inde bu bölüm farklı görünebilir, taslağa göre uyarlayın */}
        {/* Örnek olarak tümünü alt alta listeliyorum */}
        <CategoryItem label="MEN" imageUrl={menImageUrl} isMobile={true} />
        <CategoryItem label="WOMEN" imageUrl={womenImageUrl} isMobile={true} />
        <CategoryItem label="HOME & LIVING" imageUrl={homeLivingImageUrl} isMobile={true} />
      </div>
    </section>
  );
};

export default EditorPicks; 