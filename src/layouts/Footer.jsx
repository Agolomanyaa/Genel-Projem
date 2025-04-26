import React from 'react';

const FooterLinkList = ({ title, links }) => (
  <div className="mb-6 md:mb-0">
    <h5 className="mb-4 font-bold text-dark-text text-base">{title}</h5>
    <ul className="list-none p-0 m-0 flex flex-col gap-2 text-second-text font-bold text-sm">
      {links.map((link, index) => (
        <li key={index}><a href="#" className="hover:text-dark-text transition duration-200">{link}</a></li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const kadınLinks = ["Bags", "Belts", "Cosmetics", "Bags", "Hats"];
  const erkekLinks = ["Bags", "Belts", "Cosmetics", "Bags", "Hats"];
  // Diğer kolonlar için örnek linkler
  const companyLinks = ["About Us", "Carrier", "We are hiring", "Blog"];
  const featuresLinks = ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"];
  const resourcesLinks = ["IOS & Android", "Watch a Demo", "Customers", "API"];


  return (
     <footer className="mt-10 border-t border-gray-100">
        {/* Üst Kısım (Logo ve Sosyal Medya) */}
        <div className="bg-lighter-bg"> {/* Figma: #FAFAFA */}
             <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                <h3 className="text-2xl font-bold text-dark-text">Bandage</h3>
                <div className="flex gap-4 text-primary text-2xl">
                     <a href="#" aria-label="Facebook" className="hover:text-sky-700">👍</a>
                     <a href="#" aria-label="Instagram" className="hover:text-sky-700">📷</a>
                     <a href="#" aria-label="Twitter" className="hover:text-sky-700">🐦</a>
                </div>
            </div>
        </div>
         <hr className="border-gray-200"/>

        {/* Ana Footer Kolonları */}
        <div className="bg-white py-10 md:py-12">
             {/* Responsive Grid: Mobilde 1, sm'de 2, lg'de 6 kolon */}
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 text-center sm:text-left">
                 {/* Figma'dan gelen Kadın/Erkek listeleri */}
                 {/* <FooterLinkList title="Kadın" links={kadınLinks} /> */}
                 {/* <FooterLinkList title="Erkek" links={erkekLinks} /> */}

                 {/* Örnek kolonlar (Figma'daki diğer kolonlara göre güncelleyin) */}
                 <FooterLinkList title="Company Info" links={companyLinks} />
                 <FooterLinkList title="Legal" links={["Privacy Policy", "Terms of Use", "FAQ"]} /> {/* Örnek */}
                 <FooterLinkList title="Features" links={featuresLinks} />
                 <FooterLinkList title="Resources" links={resourcesLinks} />

                 {/* Newsletter Kolonu (lg'de 2 kolon kaplasın) */}
                 <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
                      <h5 className="mb-4 font-bold text-dark-text text-base">Get In Touch</h5>
                      <form className="flex items-center border border-gray-200 rounded-md overflow-hidden max-w-sm mx-auto sm:mx-0">
                        <input
                            type="email" placeholder="Your Email"
                            className="py-3 px-4 border-none focus:outline-none focus:ring-0 flex-grow text-sm bg-lighter-bg"
                            aria-label="Your Email" />
                        <button type="submit" className="py-3 px-5 bg-primary text-light-text hover:bg-sky-600 transition duration-300 text-sm font-medium">
                             Subscribe
                         </button>
                      </form>
                      <p className="text-xs text-muted-text mt-2">Lore imp sum dolor Amit</p>
                 </div>
            </div>
        </div>

        {/* Alt Bar */}
        <div className="py-5 px-6 bg-lighter-bg text-center md:text-left">
             <div className="container mx-auto">
                <p className="text-sm text-second-text font-bold">
                    Made With Love By Finland All Right Reserved
                 </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer; 