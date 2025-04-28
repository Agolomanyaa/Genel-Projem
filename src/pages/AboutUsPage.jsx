import React from 'react';
import MainLayout from '../layouts/MainLayout';
// İleride ekleyebileceğimiz görseller için örnek import
// import aboutImage from '../assets/images/about-us-banner.jpg'; // Gerçek dosya yoluyla değiştir

const AboutUsPage = () => {
  return (
    <MainLayout>
      {/* Sayfa Başlığı ve Hero Alanı */}
      <section className="bg-primary text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Learn more about our mission, vision, and the story behind Bandage.
          </p>
        </div>
      </section>

      {/* İçerik Bölümü 1 */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            {/* Metin Alanı */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-dark-text mb-6">Our Story</h2>
              <p className="text-second-text mb-4 leading-relaxed">
                Welcome to Bandage! This project was started with the goal of creating a functional and modern e-commerce experience for educational purposes. We aim to showcase best practices in web development using React and Tailwind CSS.
              </p>
              <p className="text-second-text leading-relaxed">
                Our journey involved building various components, integrating product data, managing state, and ensuring a responsive design across different devices. We focused on clean code, reusability, and a user-friendly interface.
              </p>
            </div>
            {/* Görsel Alanı */}
            <div className="lg:w-1/2">
              <img
                src="https://files.sikayetvar.com/lg/cmp/27/272111.png?1685435197" // Sağlanan URL eklendi
                alt="Team meeting or relevant about us visual" // Açıklayıcı alt metin eklendi
                className="rounded-lg shadow-lg w-full h-auto object-cover" // Stil sınıfları korundu
                loading="lazy"
              />
              {/* Placeholder div kaldırıldı */}
              {/* <div className="bg-gray-200 h-64 lg:h-80 rounded-lg shadow-lg flex items-center justify-center text-gray-500">
                   Placeholder for an image
               </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* İçerik Bölümü 2 (Misyon/Vizyon) */}
      <section className="py-12 md:py-20 bg-lighter-bg">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-dark-text mb-10">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-10">
               <div>
                  <h3 className="text-xl font-bold text-dark-text mb-3">Mission</h3>
                  <p className="text-second-text leading-relaxed">
                     To provide a clear and practical example of building a modern web application, serving as a valuable learning resource for aspiring developers.
                  </p>
               </div>
               <div>
                  <h3 className="text-xl font-bold text-dark-text mb-3">Vision</h3>
                  <p className="text-second-text leading-relaxed">
                     To inspire and facilitate learning in web development through hands-on project examples and clear code demonstrations.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* İsteğe Bağlı: Takım veya Değerler Bölümü */}
      {/* ... */}

    </MainLayout>
  );
};

export default AboutUsPage; 