import React from 'react';
import MainLayout from '../layouts/MainLayout';

const ContactPage = () => {
  return (
    <MainLayout>
      {/* 1. Sayfa Başlığı ve Breadcrumb */}
      <section className="bg-lighter-bg py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-text mb-2 md:mb-0">Contact Us</h1>
          <div className="text-sm font-bold">
            <a href="/" className="text-dark-text hover:text-primary">Home</a>
            <span className="text-muted-text mx-2">{'>'}</span>
            <span className="text-second-text">Contact</span>
          </div>
        </div>
      </section>

      {/* 2. İletişim Bilgileri ve Harita */}
      <section className="container mx-auto px-6 py-12 md:py-16 text-center">
        <div className="max-w-2xl mx-auto mb-10">
            <h2 className="text-sm font-bold text-dark-text">Visit Our Office</h2>
            <h3 className="text-4xl font-bold text-dark-text my-3">We help small businesses with big ideas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* İletişim Kartları */}
          <div className="flex flex-col items-center p-8 shadow-md rounded bg-white">
             📞
             <p className="text-dark-text font-bold text-sm mb-2">support@example.com</p>
             <p className="text-dark-text font-bold text-sm mb-4">georgia.young@example.com</p>
             <p className="text-dark-text font-bold text-base mb-2">Get Support</p>
             <button className="border border-primary text-primary font-bold text-sm py-3 px-6 rounded-full hover:bg-primary hover:text-white transition">
               Submit Request
             </button>
          </div>
          <div className="flex flex-col items-center p-8 shadow-md rounded bg-dark-bg text-white"> {/* Orta Kart Farklı Renk */}
             📍
             <p className="font-bold text-sm mb-2">support@example.com</p>
             <p className="font-bold text-sm mb-4">georgia.young@example.com</p>
             <p className="font-bold text-base mb-2">Get Support</p>
             <button className="border border-primary text-primary font-bold text-sm py-3 px-6 rounded-full hover:bg-primary hover:text-white transition">
               Submit Request
             </button>
          </div>
          <div className="flex flex-col items-center p-8 shadow-md rounded bg-white">
             ✉️
             <p className="text-dark-text font-bold text-sm mb-2">support@example.com</p>
             <p className="text-dark-text font-bold text-sm mb-4">georgia.young@example.com</p>
             <p className="text-dark-text font-bold text-base mb-2">Get Support</p>
             <button className="border border-primary text-primary font-bold text-sm py-3 px-6 rounded-full hover:bg-primary hover:text-white transition">
               Submit Request
             </button>
          </div>
        </div>
      </section>

      {/* 3. İletişim Formu */}
      <section className="container mx-auto px-6 pb-12 md:pb-16">
         <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-sm font-bold text-dark-text mb-3">WE Can't WAIT TO MEET YOU</h4>
            <h2 className="text-5xl font-bold text-dark-text mb-8">Let's Talk</h2>
            <form className="flex flex-col gap-6">
                <input type="text" placeholder="Your Name *" className="p-4 border rounded border-gray-300 bg-lighter-bg" required />
                <input type="email" placeholder="Your Email *" className="p-4 border rounded border-gray-300 bg-lighter-bg" required />
                <input type="text" placeholder="Subject *" className="p-4 border rounded border-gray-300 bg-lighter-bg" required />
                <textarea placeholder="Your Message *" rows="5" className="p-4 border rounded border-gray-300 bg-lighter-bg" required></textarea>
                <button type="submit" className="bg-primary text-white font-bold py-4 px-8 rounded hover:bg-sky-600 transition self-center">
                    Send Message
                </button>
            </form>
         </div>
      </section>

    </MainLayout>
  );
};

export default ContactPage; 