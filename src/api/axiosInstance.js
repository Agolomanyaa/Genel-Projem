import axios from 'axios';

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com', // Görevde belirtilen base URL
  timeout: 60000, // İstek zaman aşımı süresini 30 saniyeye çıkaralım
  headers: {
    'Content-Type': 'application/json', // Genellikle JSON gönderip alacağız
    // Gelecekte gerekirse buraya Authorization header'ı gibi başka başlıklar eklenebilir
  }
});

// --- Axios Request Interceptor - GÜNCELLENDİ ---
axiosInstance.interceptors.request.use(
  (config) => {
    // Önce localStorage'dan token'ı al
    let token = localStorage.getItem('token');

    // localStorage'da yoksa sessionStorage'dan al
    if (!token) {
      token = sessionStorage.getItem('token');
    }

    // Eğer token varsa ve config.headers varsa
    if (token && config.headers) {
      // Authorization başlığını ayarla
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Boşlukları - ile değiştir
    .replace(/[^\w-]+/g, '')       // Alfanümerik olmayan karakterleri (tire hariç) kaldır
    .replace(/--+/g, '-');          // Birden fazla tireyi tek tireye indir
}; 