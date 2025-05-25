import React, { useState, useEffect } from 'react';
import citiesData from '../data/turkey-cities.json'; // Oluşturduğumuz JSON dosyasını import et

// initialData prop'u ileride "güncelleme" için kullanılabilir
const AddressForm = ({ onSubmit, initialData = null, onCancel, submitButtonText = "Adresi Kaydet" }) => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '', // Şehir ID'si veya adı (JSON yapısına göre)
    district: '',
    neighborhood: '',
    address: '' // T20 görevinde bu alan formda yoktu ama genellikle olur, ekleyelim. API'ye gönderirken dikkat ederiz.
                // T20 JSON payload'ında "address" yerine "neighborhood" detayları içeriyor gibi.
                // Şimdilik 'address' olarak tutalım, API'ye gönderirken 'neighborhood' ile birleştirebiliriz.
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        name: initialData.name || '',
        surname: initialData.surname || '',
        phone: initialData.phone || '',
        city: initialData.city || '',
        district: initialData.district || '',
        neighborhood: initialData.neighborhood || '', // API'den gelen 'neighborhood' direkt buraya.
        address: initialData.address || '' // Eğer API'den ayrı bir 'address' detayı geliyorsa.
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Adres başlığı gerekli.";
    if (!formData.name.trim()) newErrors.name = "Ad gerekli.";
    if (!formData.surname.trim()) newErrors.surname = "Soyad gerekli.";
    if (!formData.phone.trim()) newErrors.phone = "Telefon numarası gerekli.";
    else if (!/^\d{10,11}$/.test(formData.phone.replace(/\s/g, ''))) { // 05xxxxxxxxx veya 5xxxxxxxxx
        newErrors.phone = "Geçerli bir telefon numarası girin (10 veya 11 haneli).";
    }
    if (!formData.city) newErrors.city = "Şehir seçimi gerekli.";
    if (!formData.district.trim()) newErrors.district = "İlçe gerekli.";
    // neighborhood (mahalle) ve address (detay) için zorunluluk T20'de net değil, şimdilik opsiyonel bırakalım.
    // T20 payload'ında "neighborhood" adres detaylarını içeriyor.
    if (!formData.neighborhood.trim()) newErrors.neighborhood = "Mahalle ve adres detayı gerekli.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // T20'deki API payload'una göre 'address' alanı 'neighborhood' içinde birleşiyor.
      // Eğer 'address' diye ayrı bir alanımız varsa ve API bunu beklemiyorsa, birleştirme yapmalıyız.
      // Şimdilik formdaki 'neighborhood' alanının tüm adres detayını (mahalle, sokak, no vb.) içerdiğini varsayalım.
      const submissionData = {
        title: formData.title,
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone.replace(/\s/g, ''), // Boşlukları temizle
        city: formData.city, // JSON'daki city.name veya city.id olabilir, API'ye göre ayarlanacak
        district: formData.district,
        neighborhood: formData.neighborhood, // Bu alan API'deki "neighborhood" ve "address" detaylarını içerecek
      };
      // Eğer initialData varsa bu bir güncellemedir ve id'yi eklememiz gerekir.
      if (initialData && initialData.id) {
        submissionData.id = initialData.id;
      }
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Adres Başlığı (Örn: Ev, İş)</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
          <input type="text" name="surname" id="surname" value={formData.surname} onChange={handleChange} className={`w-full p-2 border rounded-md ${errors.surname ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.surname && <p className="text-xs text-red-500 mt-1">{errors.surname}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="05XX XXX XX XX" className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">İl</label>
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md bg-white ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">İl Seçiniz...</option>
            {citiesData.map(city => (
              // API'nin city için ne beklediğine bağlı (id mi, name mi?)
              // Şimdilik 'name' gönderdiğimizi varsayalım. T20 payload'ında "istanbul" gibi string bekleniyor.
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
          <input type="text" name="district" id="district" value={formData.district} onChange={handleChange} className={`w-full p-2 border rounded-md ${errors.district ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">Mahalle ve Adres Detayı (Sokak, Bina No, Daire No)</label>
        <textarea
          name="neighborhood"
          id="neighborhood"
          rows="3"
          value={formData.neighborhood}
          onChange={handleChange}
          placeholder="Örn: Cumhuriyet Mah. Atatürk Cad. No:15 D:3"
          className={`w-full p-2 border rounded-md ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'}`}
        ></textarea>
         {errors.neighborhood && <p className="text-xs text-red-500 mt-1">{errors.neighborhood}</p>}
      </div>
      
      {/* 
        T20 görev tanımında formda ayrı bir "address" alanı görünmüyor. 
        "neighborhood" alanının tüm detayları kapsadığı varsayılıyor.
        Eğer API ayrı bir "address" alanı bekliyorsa veya formda göstermek isterseniz:
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adres Detayı (Sokak, Bina No, Daire No)</label>
        <textarea name="address" id="address" rows="3" value={formData.address} onChange={handleChange} className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300}`}></textarea>
        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
      </div>
      */}

      <div className="flex items-center justify-end space-x-3 pt-2">
        {onCancel && ( // Eğer bir iptal fonksiyonu verilmişse göster
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
