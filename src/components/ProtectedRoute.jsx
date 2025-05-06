import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

// Bu bileşen, sarmaladığı Route'u sadece kullanıcı giriş yapmışsa render eder.
// Giriş yapmamışsa, kullanıcıyı login sayfasına yönlendirir.
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Redux store'dan kullanıcı bilgisini al
  const user = useSelector((state) => state.client.user);
  const location = useLocation(); // Kullanıcının gitmeye çalıştığı mevcut konumu al

  return (
    <Route
      {...rest} // path, exact gibi diğer Route prop'larını aktar
      render={(props) => {
        if (user) {
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