import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Örnek ikonlar

const Footer = () => {
  return (
    <>
      {/* Üst Kısım (Logo, Linkler, Buton) */}
      <footer className="bg-white py-10 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <Link to="/" className="text-2xl font-bold text-dark-text mb-6 md:mb-0">
              Bandage
            </Link>
            {/* Sosyal Medya İkonları */}
            <div className="flex space-x-5 text-primary text-2xl">
              <a href="#" aria-label="Facebook" className="hover:text-primary-dark"><FaFacebook /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary-dark"><FaInstagram /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary-dark"><FaTwitter /></a>
            </div>
          </div>
          <hr className="mb-10"/>
          {/* Alt Kısım (Link Grupları) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
            {/* Link Grubu 1 */}
            <div>
              <h5 className="font-bold text-dark-text mb-4">Company Info</h5>
              <ul className="space-y-3 text-second-text">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary">Carrier</Link></li>
                <li><Link to="#" className="hover:text-primary">We are hiring</Link></li>
                <li><Link to="#" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            {/* Link Grubu 2 */}
            <div>
              <h5 className="font-bold text-dark-text mb-4">Legal</h5>
              <ul className="space-y-3 text-second-text">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary">Carrier</Link></li>
                <li><Link to="#" className="hover:text-primary">We are hiring</Link></li>
                <li><Link to="#" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            {/* Link Grubu 3 */}
            <div>
              <h5 className="font-bold text-dark-text mb-4">Features</h5>
              <ul className="space-y-3 text-second-text">
                <li><Link to="#" className="hover:text-primary">Business Marketing</Link></li>
                <li><Link to="#" className="hover:text-primary">User Analytic</Link></li>
                <li><Link to="#" className="hover:text-primary">Live Chat</Link></li>
                <li><Link to="#" className="hover:text-primary">Unlimited Support</Link></li>
              </ul>
            </div>
            {/* Link Grubu 4 */}
            <div>
              <h5 className="font-bold text-dark-text mb-4">Resources</h5>
              <ul className="space-y-3 text-second-text">
                <li><Link to="#" className="hover:text-primary">IOS & Android</Link></li>
                <li><Link to="#" className="hover:text-primary">Watch a Demo</Link></li>
                <li><Link to="#" className="hover:text-primary">Customers</Link></li>
                <li><Link to="#" className="hover:text-primary">API</Link></li>
              </ul>
            </div>
            {/* Link Grubu 5 (Get In Touch) */}
            <div>
              <h5 className="font-bold text-dark-text mb-4">Get In Touch</h5>
              {/* Buraya iletişim formu veya input gelebilir */}
              <form className="flex">
                 <input type="email" placeholder="Your Email" className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary" />
                 <button type="submit" className="bg-primary text-white px-5 py-3 rounded-r-md hover:bg-primary-dark">Subscribe</button>
              </form>
              <p className="text-xs text-muted-text mt-2">Subscribe to our newsletter.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* En Alt Kısım (Copyright) - Arka Plan ve Metin Rengi GÜNCELLENDİ */}
      <div className="bg-primary py-6">
        <div className="container mx-auto px-6 text-center md:text-left">
          <p className="text-white font-bold text-sm">
            This site is for educational purposes only, not for commercial use. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer; 