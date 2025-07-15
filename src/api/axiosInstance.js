import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/v1'; // ESKİ ADRESİ BUNUNLA DEĞİŞTİR

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 saniye zaman aşımı
  headers: {
    'Content-Type': 'application/json', // Genellikle JSON gönderip alacağız
    // Gelecekte gerekirse buraya Authorization header'ı gibi başka başlıklar eklenebilir
  }
});

// --- Axios Request Interceptor - NİHAİ SÜRÜM ---
axiosInstance.interceptors.request.use(
  (config) => {
    // Önce sessionStorage'a bak, eğer orada yoksa localStorage'a bak.
    // Bu, "Beni Hatırla" seçeneğinin doğru çalışmasını sağlar.
    let token = sessionStorage.getItem('token');
    if (!token) {
      token = localStorage.getItem('token');
    }

    // Eğer token bulunursa, her isteğin header'ına ekle.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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