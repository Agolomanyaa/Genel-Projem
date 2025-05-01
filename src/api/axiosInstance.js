import axios from 'axios';

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com', // Görevde belirtilen base URL
  timeout: 10000, // İstek zaman aşımı süresi (milisaniye cinsinden, örn: 10 saniye)
  headers: {
    'Content-Type': 'application/json', // Genellikle JSON gönderip alacağız
    // Gelecekte gerekirse buraya Authorization header'ı gibi başka başlıklar eklenebilir
  }
});

export default axiosInstance; 