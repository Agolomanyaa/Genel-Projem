import React from 'react';
import MainLayout from '../layouts/MainLayout';

const ContactPage = () => {

  // Örnek form gönderme fonksiyonu (şimdilik sadece konsola yazdırıyor)
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    // Burada form gönderme API çağrısı veya başka bir işlem yapılabilir.
    alert("Mesajınız gönderildi! (Bu sadece bir demo)");
    event.target.reset(); // Formu temizle
  };

  return (
    <MainLayout>
      <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="container mx-auto px-6">
          {/* Sayfa Başlığı */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-3">Contact Us</h1>
            <p className="text-second-text text-base md:text-lg">
              Get in touch with us for any inquiries or support.
            </p>
             {/* Başlık Altı Çizgi (Tema Renginde) */}
             <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
          </div>

          {/* Harita ve Form Alanı */}
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">

            {/* Google Harita (Sol Taraf - GÜNCELLENDİ) */}
            <div className="w-full lg:w-1/2 h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-md">
              {/* Kullanıcıdan alınan iframe kodu */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10370.544089738982!2d28.360624535717747!3d37.194760406255014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bf723ff569564f%3A0x12ac1e89bc54f012!2sR%C3%BCya%20Park%20AVM!5e0!3m2!1str!2str!4v1745778436243!5m2!1str!2str" // Bu satır güncellendi
                width="100%" // Genişlik ve yükseklik %100 olarak ayarlandı
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location - Rüya Park AVM" // Başlık güncellendi
              ></iframe>
            </div>

            {/* İletişim Formu (Sağ Taraf) */}
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Ad Soyad */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    {/* İkon Placeholder */} 👤
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  />
                </div>

                {/* E-Posta */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    {/* İkon Placeholder */} ✉️
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  />
                </div>

                {/* Konu */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    {/* İkon Placeholder */} 🏷️
                  </span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  />
                </div>

                {/* Mesaj */}
                <div className="relative">
                   <span className="absolute top-4 left-0 pl-3 flex items-center text-gray-400">
                     {/* İkon Placeholder */} 💬
                   </span>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows="5"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition duration-150 ease-in-out resize-none" // resize-none ile yeniden boyutlandırmayı engelle
                  ></textarea>
                </div>

                {/* Gönderme Butonu */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactPage; 