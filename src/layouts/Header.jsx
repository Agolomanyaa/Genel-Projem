import React from 'react';
import Navbar from './Navbar';
// İkonlar için bir kütüphane kullanabilirsiniz (örn. lucide-react) veya SVG'leri doğrudan ekleyebilirsiniz
// import { Phone, Mail, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';

const Header = () => {
  // Mobilde gizle (hidden), md (medium screen) ve üzeri ekranlarda göster (md:flex)
  return (
    <header className="w-full">
      <Navbar />
    </header>
  );
};

export default Header; 