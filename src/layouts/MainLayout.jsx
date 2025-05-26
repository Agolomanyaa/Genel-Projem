import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header /> {/* Sadece Header çağrılıyor */}
      <main className="flex-grow pt-[90px]"> {/* Navbar yüksekliği kadar padding-top eklendi */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 