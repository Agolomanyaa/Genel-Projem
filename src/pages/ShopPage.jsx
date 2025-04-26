import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/ProductGrid'; // ProductGrid'i burada da kullanabiliriz

const ShopPage = () => {
  return (
    <MainLayout>
      {/* 1. Sayfa Başlığı ve Breadcrumb */}
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-text mb-2 md:mb-0">Shop</h1>
          <div className="text-sm font-bold">
            <a href="/" className="text-dark-text hover:text-primary">Home</a>
            <span className="text-muted-text mx-2">{'>'}</span>
            <span className="text-second-text">Shop</span>
          </div>
        </div>
      </section>

      {/* 2. Filtreler ve Ürün Sayısı (Opsiyonel) */}
      <section className="bg-white py-4 border-b border-gray-200">
          <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-second-text text-sm font-bold">
                  Showing 1–10 of 123 results {/* Placeholder */}
              </div>
              <div className="flex items-center gap-4">
                  <span className="text-second-text text-sm font-bold">Views:</span>
                  {/* Placeholder view icons */}
                  <button className="p-2 border rounded border-gray-300 text-dark-text">▦</button>
                  <button className="p-2 border rounded border-gray-300 text-muted-text">≡</button>
              </div>
              <div className="flex gap-4">
                   {/* Placeholder filtre/sıralama dropdownları */}
                  <select className="p-2 border rounded border-gray-300 text-sm">
                      <option>Default Sorting</option>
                      <option>Sort by Price</option>
                  </select>
                  <button className="bg-primary text-white px-4 py-2 rounded text-sm font-bold hover:bg-sky-600">
                      Filter
                  </button>
              </div>
          </div>
      </section>

      {/* 3. Ana İçerik Alanı (Filtreler + Ürünler) */}
      <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Filtreleme Kenar Çubuğu (Masaüstü) / Buton (Mobil) */}
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          {/* Mobilde Filtre Butonu */}
          <button className="w-full bg-gray-100 p-3 rounded mb-4 text-dark-text font-bold lg:hidden">
            Show Filters
          </button>
          {/* Masaüstü Filtreleri */}
          <div className="hidden lg:block space-y-6">
            <h3 className="font-bold text-dark-text border-b pb-2">Categories</h3>
            {/* Placeholder Kategori Listesi */}
            <ul className="space-y-2 text-second-text">
              <li><a href="#" className="hover:text-primary">Category 1 (15)</a></li>
              <li><a href="#" className="hover:text-primary">Category 2 (23)</a></li>
              {/* ... */}
            </ul>
            <h3 className="font-bold text-dark-text border-b pb-2">Filter by Price</h3>
            {/* Placeholder Fiyat Filtresi */}
            <div>Price Slider Placeholder</div>
            <h3 className="font-bold text-dark-text border-b pb-2">Filter by Color</h3>
            {/* Placeholder Renk Filtresi */}
            <div>Color Swatches Placeholder</div>
          </div>
        </aside>

        {/* Ürün Listesi */}
        <main className="w-full lg:w-3/4 xl:w-4/5">
          {/* ProductGrid'i farklı sayıda ürünle veya filtre sonuçlarıyla kullanacağız */}
          {/* Şimdilik 12 ürünlük placeholder kullanalım */}
          <ProductGrid title="" /> {/* Başlığı boş bıraktım veya kaldırılabilir */}
        </main>
      </div>

       {/* 4. Sayfalama (Pagination) */}
       <section className="container mx-auto px-6 pb-10 flex justify-center">
           {/* Placeholder Pagination */}
           <div className="flex items-center gap-2">
               <button className="px-4 py-2 border rounded text-primary border-primary hover:bg-primary hover:text-white">First</button>
               <button className="px-4 py-2 border rounded text-white bg-primary border-primary">1</button>
               <button className="px-4 py-2 border rounded text-primary border-gray-300 hover:border-primary hover:text-white hover:bg-primary">2</button>
               <button className="px-4 py-2 border rounded text-primary border-gray-300 hover:border-primary hover:text-white hover:bg-primary">3</button>
               <button className="px-4 py-2 border rounded text-primary border-primary hover:bg-primary hover:text-white">Next</button>
           </div>
       </section>
    </MainLayout>
  );
};

export default ShopPage; 