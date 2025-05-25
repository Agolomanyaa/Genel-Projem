import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

// Bu bileşen, sarmaladığı Route'u sadece kullanıcı giriş yapmışsa render eder.
// Giriş yapmamışsa, kullanıcıyı login sayfasına yönlendirir.
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Redux store'dan kullanıcı bilgisini al
  const user = useSelector((state) => state.client.user);
  // YENİ: Oturum kontrol durumunu da Redux'tan al
  // Bu state'in adını ve yapısını reducer'ınızda nasıl tanımladığınıza göre değiştirin
  const authStatus = useSelector((state) => state.client.authStatus); // Örnek: 'IDLE', 'PENDING', 'SUCCESS', 'FAILURE'
  // VEYA
  // const isUserLoaded = useSelector((state) => state.client.isUserLoaded); 

  const location = useLocation(); // Kullanıcının gitmeye çalıştığı mevcut konumu al

  // Eğer oturum kontrolü henüz yapılmadıysa veya devam ediyorsa,
  // bir yükleme göstergesi göster veya hiçbir şey render etme (yönlendirme yapma).
  // 'IDLE' ve 'PENDING' durumları için bunu yapabiliriz.
  if (authStatus === 'IDLE' || authStatus === 'PENDING') {
  // if (!isUserLoaded) { // Eğer isUserLoaded kullanıyorsanız
    // return <div>Oturum kontrol ediliyor...</div>; // Veya null dönerek hiçbir şey göstermeyin
    return null; // Şimdilik null dönelim, render engellensin ama sayfa boş kalır.
                   // Daha iyi bir UX için bir spinner gösterilebilir.
  }

  return (
    <Route
      {...rest} // path, exact gibi diğer Route prop'larını aktar
      render={(props) => {
        // authStatus 'SUCCESS' ise ve user varsa VEYA sadece user varsa (eski mantıkla uyum için)
        if ((authStatus === 'SUCCESS' && user) || (user && authStatus !== 'FAILURE')) {
          // Kullanıcı giriş yapmışsa, istenen bileşeni (Component) render et
          return <Component {...props} />;
        } else {
          // Kullanıcı giriş yapmamışsa, /login sayfasına yönlendir
          // state: { from: location } -> Giriş yaptıktan sonra geri dönebilmesi için
          // kullanıcının nereden geldiğini (gitmeye çalıştığı sayfayı) login sayfasına iletiyoruz.
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute; 