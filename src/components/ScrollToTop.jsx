import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rota (pathname) her değiştiğinde pencereyi en üste (0, 0) kaydır
    window.scrollTo(0, 0);
  }, [pathname]); // useEffect'in pathname değiştiğinde çalışmasını sağla

  // Bu bileşen görsel bir çıktı üretmez
  return null;
}

export default ScrollToTop; 