import React, { useState, useEffect } from 'react';

const CreditCardForm = ({ onSubmit, initialData, onCancel, submitButtonText = "Kartı Kaydet" }) => {
  const [formData, setFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
  });
  // Form validasyon hataları için state (opsiyonel, ileride eklenebilir)
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        card_no: initialData.card_no || '',
        expire_month: initialData.expire_month || '',
        expire_year: initialData.expire_year || '',
        name_on_card: initialData.name_on_card || '',
        // Eğer ID de gerekiyorsa (güncelleme için)
        id: initialData.id || undefined
      });
    } else {
      // initialData yoksa (yeni kart ekleme modu), formu sıfırla
      setFormData({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Kart numarası için sadece rakam ve belirli bir uzunluk
    if (name === 'card_no') {
      processedValue = value.replace(/\D/g, '').slice(0, 16); // Sadece rakam, maks 16 haneli
    }
    // Ay ve yıl için sadece rakam ve belirli uzunluklar
    if (name === 'expire_month') {
      processedValue = value.replace(/\D/g, '').slice(0, 2);
    }
    if (name === 'expire_year') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Temel validasyon eklenebilir
    // Örneğin:
    // if (!formData.card_no || formData.card_no.length < 13) { /* hata */ return; }
    // if (!formData.expire_month || !formData.expire_year) { /* hata */ return; }
    // if (!formData.name_on_card) { /* hata */ return; }
    onSubmit(formData);
  };

  // Ay ve Yıl için seçenekler oluşturma (opsiyonel, daha iyi UX için)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i); // Gelecek 15 yıl
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')); // 01 - 12

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700 mb-1">
          Kart Üzerindeki İsim
        </label>
        <input
          type="text"
          name="name_on_card"
          id="name_on_card"
          value={formData.name_on_card}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="card_no" className="block text-sm font-medium text-gray-700 mb-1">
          Kart Numarası
        </label>
        <input
          type="text"
          name="card_no"
          id="card_no"
          value={formData.card_no}
          onChange={handleChange}
          placeholder="---- ---- ---- ----"
          maxLength="19" // Aralıklarla 19, rakam olarak 16
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="expire_month" className="block text-sm font-medium text-gray-700 mb-1">
            Son Kullanma Ayı
          </label>
          <select
            name="expire_month"
            id="expire_month"
            value={formData.expire_month}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="">Ay</option>
            {months.map(month => <option key={month} value={month}>{month}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="expire_year" className="block text-sm font-medium text-gray-700 mb-1">
            Son Kullanma Yılı
          </label>
          <select
            name="expire_year"
            id="expire_year"
            value={formData.expire_year}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="">Yıl</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>
      
      {/* CVV alanı T21'de belirtilmemiş ama genellikle olur. Şimdilik eklemiyoruz. */}

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
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
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
