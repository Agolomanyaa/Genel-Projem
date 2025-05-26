import React, { useState, useEffect } from 'react';

const CreditCardForm = ({ onSubmit, initialData, onCancel, submitButtonText = "Kartı Kaydet" }) => {
  const [formData, setFormData] = useState({
    id: '',
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    ccv: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        card_no: initialData.card_no || '',
        expire_month: initialData.expire_month ? String(initialData.expire_month) : '',
        expire_year: initialData.expire_year ? String(initialData.expire_year) : '',
        name_on_card: initialData.name_on_card || '',
        ccv: '',
      });
    } else {
      setFormData({
        id: '',
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: '',
        ccv: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "card_no") {
      processedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (name === "expire_month") {
      processedValue = value.replace(/\D/g, '').slice(0, 2);
    } else if (name === "expire_year") {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (name === "ccv") {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData({ ...formData, [name]: processedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.card_no) newErrors.card_no = "Kart numarası gerekli.";
    else if (formData.card_no.length < 13 || formData.card_no.length > 16) newErrors.card_no = "Geçerli bir kart numarası girin (13-16 hane).";

    if (!formData.expire_month) newErrors.expire_month = "Ay gerekli.";
    else if (parseInt(formData.expire_month, 10) < 1 || parseInt(formData.expire_month, 10) > 12) newErrors.expire_month = "Geçerli bir ay girin (01-12).";

    if (!formData.expire_year) newErrors.expire_year = "Yıl gerekli.";
    else if (formData.expire_year.length !== 4 || parseInt(formData.expire_year, 10) < new Date().getFullYear()) newErrors.expire_year = "Geçerli bir yıl girin (örn: 2025).";
    
    if (formData.expire_year && formData.expire_month) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      if (parseInt(formData.expire_year, 10) === currentYear && parseInt(formData.expire_month, 10) < currentMonth) {
        newErrors.expire_month = "Geçmiş bir tarih seçilemez.";
      }
    }

    if (!formData.name_on_card) newErrors.name_on_card = "Kart üzerindeki isim gerekli.";

    if (!formData.ccv) newErrors.ccv = "CCV/CVV güvenlik kodu gerekli.";
    else if (formData.ccv.length < 3 || formData.ccv.length > 4) newErrors.ccv = "CCV 3 veya 4 haneli olmalıdır.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const submissionData = {
        ...formData,
        expire_month: parseInt(formData.expire_month, 10),
        expire_year: parseInt(formData.expire_year, 10),
      };
      if (!submissionData.id) {
        delete submissionData.id;
      }
      onSubmit(submissionData);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
        <input
          type="text"
          name="name_on_card"
          id="name_on_card"
          value={formData.name_on_card}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${errors.name_on_card ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
        />
        {errors.name_on_card && <p className="mt-1 text-xs text-red-500">{errors.name_on_card}</p>}
      </div>

      <div>
        <label htmlFor="card_no" className="block text-sm font-medium text-gray-700">Kart Numarası</label>
        <input
          type="text"
          name="card_no"
          id="card_no"
          value={formData.card_no}
          onChange={handleChange}
          placeholder="---- ---- ---- ----"
          maxLength="16"
          className={`mt-1 block w-full px-3 py-2 border ${errors.card_no ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
        />
        {errors.card_no && <p className="mt-1 text-xs text-red-500">{errors.card_no}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="expire_month" className="block text-sm font-medium text-gray-700">Son Kul. Ay</label>
          <input
            type="text"
            name="expire_month"
            id="expire_month"
            value={formData.expire_month}
            onChange={handleChange}
            placeholder="AA"
            maxLength="2"
            className={`mt-1 block w-full px-3 py-2 border ${errors.expire_month ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          />
          {errors.expire_month && <p className="mt-1 text-xs text-red-500">{errors.expire_month}</p>}
        </div>
        <div>
          <label htmlFor="expire_year" className="block text-sm font-medium text-gray-700">Son Kul. Yıl</label>
          <input
            type="text"
            name="expire_year"
            id="expire_year"
            value={formData.expire_year}
            onChange={handleChange}
            placeholder="YYYY"
            maxLength="4"
            className={`mt-1 block w-full px-3 py-2 border ${errors.expire_year ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          />
          {errors.expire_year && <p className="mt-1 text-xs text-red-500">{errors.expire_year}</p>}
        </div>
        <div>
          <label htmlFor="ccv" className="block text-sm font-medium text-gray-700">CCV/CVV</label>
          <input
            type="text"
            name="ccv"
            id="ccv"
            value={formData.ccv}
            onChange={handleChange}
            placeholder="123"
            maxLength="4"
            className={`mt-1 block w-full px-3 py-2 border ${errors.ccv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          />
          {errors.ccv && <p className="mt-1 text-xs text-red-500">{errors.ccv}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring_primary"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
