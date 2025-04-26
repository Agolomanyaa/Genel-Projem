import React from 'react';
import MainLayout from '../layouts/MainLayout';
// Doğru dosya adı ve uzantısıyla import et
import tandoganImage from '../assets/tandogangoncu.png';

// Tek bir ekip üyesi kartı için bileşen
const TeamMemberCard = ({ name, title, imageUrl }) => {
  return (
    <div className="text-center shadow-lg rounded-lg overflow-hidden bg-white">
      {/* Resim Alanı - aspect-ratio ile orantılı tutalım */}
      <div className="aspect-[4/5] bg-gray-200">
        <img
          src={imageUrl || "https://via.placeholder.com/400x500/eee/aaa?text=Profile+Pic"}
          alt={`Profile picture of ${name}`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      {/* Bilgi Alanı */}
      <div className="p-6">
        <h5 className="font-bold text-base text-dark-text mb-1">{name}</h5>
        <p className="text-sm text-second-text font-bold mb-4">{title}</p>
        {/* Sosyal Medya İkonları (Placeholder) */}
        <div className="flex justify-center gap-4 text-primary">
           <a href="#" aria-label={`${name} Facebook`} className="hover:text-sky-700">👍</a>
           <a href="#" aria-label={`${name} Instagram`} className="hover:text-sky-700">📷</a>
           <a href="#" aria-label={`${name} Twitter`} className="hover:text-sky-700">🐦</a>
        </div>
      </div>
    </div>
  );
};


const TeamPage = () => {
  // Ekip Üyeleri Verisi
  const teamMembers = [
    {
      name: "Emre ŞAHİNER",
      title: "Project Manager",
      imageUrl: "https://media.licdn.com/dms/image/v2/C5103AQGifdRLFJgXHQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517235402954?e=1750896000&v=beta&t=IHYBe91wHt9OGsDc_NxCg9SQJXlzkEELsQbGisbGJdk"
    },
    {
      name: "Tandoğan GÖNCÜ",
      title: "Full Stack Developer",
      imageUrl: tandoganImage
    },
    {
      name: "Orhan Emir KORAL",
      title: "Full Stack Developer",
      imageUrl: "https://media.licdn.com/dms/image/v2/D4D35AQE2qS7BoR94Fw/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1685388222110?e=1746039600&v=beta&t=SmARlek4mBiU5zMX3tMjr6_IB2Hv3b8IfBbmGuhAKIk"
    },
  ];

  return (
    <MainLayout>
      {/* 1. Sayfa Başlığı Alanı */}
      <section className="container mx-auto px-6 py-12 md:py-16 text-center">
        <h4 className="text-base font-bold text-second-text mb-3">WHAT WE DO</h4>
        <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">Meet Our Team</h1>
        <p className="text-sm text-second-text max-w-xl mx-auto">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
      </section>

      {/* 2. Ekip Üyeleri Grid */}
      <section className="container mx-auto px-6 pb-12 md:pb-16">
        {/* Responsive Grid: Mobilde 1, sm'de 2, lg'de 3 kolon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              title={member.title}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </section>

      {/* İsteğe bağlı olarak sayfanın altına başka bölümler eklenebilir */}

    </MainLayout>
  );
};

export default TeamPage; 