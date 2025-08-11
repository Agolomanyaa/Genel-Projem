import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryItem = ({ imageUrl, label, className = "", isMobile = false, categories = [] }) => {
  let targetCategoryName = '';
  // Gelen İngilizce etiketleri, veritabanındaki Türkçe kategori isimleriyle eşleştiriyoruz.
  if (label === 'MEN') {
    targetCategoryName = 'Erkek';
  } else if (label === 'WOMEN') {
    targetCategoryName = 'Kadın';
  } else if (label === 'HOME & LIVING') {
    targetCategoryName = 'Home & Living';
  }

  // Sadece ana kategoriyi bulduğumuzdan emin oluyoruz (parent'ı olmayan).
  const targetCategory = categories.find(cat => cat.name === targetCategoryName && !cat.parentId);
  
  // Eğer kategoriyi bulursak doğru linki oluştur, bulamazsak ana shop sayfasına gitsin.
  const categoryPath = targetCategory ? `/shop?category=${targetCategory.id}` : '/shop';

  return (
    <Link to={categoryPath} className={`relative block overflow-hidden group ${className} ${isMobile ? 'aspect-[3/4]' : 'md:aspect-auto'} bg-gray-200`}>
      <img
        src={imageUrl}
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
  const { categories } = useSelector(state => state.product);

  const menImageUrl = "https://images.unsplash.com/photo-1611233361198-dc49830c2ef7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const womenImageUrl = "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const homeLivingImageUrl = "https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=3134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="py-12 md:py-16 container mx-auto px-5 text-center">
      <h2 className="text-2xl font-bold mb-2 text-dark-text">EDITOR'S PICK</h2>
      <p className="text-second-text mb-8 md:mb-10 text-sm">Create Your Own Style</p>

      <div className="hidden md:grid grid-cols-3 gap-6 h-[32rem]">
        <div className="col-span-1 h-full">
          <CategoryItem label="MEN" imageUrl={menImageUrl} className="h-full" categories={categories} />
        </div>
        <div className="col-span-1 h-full">
          <CategoryItem label="WOMEN" imageUrl={womenImageUrl} className="h-full" categories={categories} />
        </div>
        <div className="col-span-1 h-full">
          <CategoryItem label="HOME & LIVING" imageUrl={homeLivingImageUrl} className="h-full" categories={categories} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:hidden">
        <CategoryItem label="MEN" imageUrl={menImageUrl} isMobile={true} categories={categories} />
        <CategoryItem label="WOMEN" imageUrl={womenImageUrl} isMobile={true} categories={categories} />
        <CategoryItem label="HOME & LIVING" imageUrl={homeLivingImageUrl} isMobile={true} categories={categories} />
      </div>
    </section>
  );
};

export default EditorPicks; 