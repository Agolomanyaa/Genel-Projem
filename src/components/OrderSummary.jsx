import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Eğer butonlar Link olacaksa

const OrderSummary = () => {
  const { cart } = useSelector((state) => state.shoppingCart);
  const history = useHistory(); // useHistory hook'unu kullan

  const productsTotal = cart.reduce((acc, item) => acc + item.product.price * item.count, 0);
  
  const shippingCost = 10.00; // Örnek kargo ücreti Dolar olarak
  const shippingDiscountThreshold = 50; // 50 Dolar ve üzeri
  const shippingDiscount = productsTotal >= shippingDiscountThreshold ? shippingCost : 0;
  const finalShipping = shippingCost - shippingDiscount;
  const grandTotal = productsTotal + finalShipping;

  const handleProceedToCheckout = () => { // Fonksiyon adını değiştirebiliriz
    console.log('Proceed to Checkout button clicked - redirecting to /checkout');
    // Kullanıcıyı /checkout sayfasına yönlendir
    history.push('/checkout'); 
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sipariş Özeti</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Ürünlerin Toplamı</span>
          <span>${productsTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Kargo Toplamı</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        {shippingDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Kargo İndirimi (${shippingDiscountThreshold}+)</span>
            <span>-${shippingDiscount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-gray-800 font-bold text-lg mb-4">
        <span>Toplam</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>

      <div className="mb-6">
        <button className="w-full text-primary border border-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition duration-150 ease-in-out text-sm font-semibold">
          + İNDİRİM KODU GİR
        </button>
        {/* İleride buraya input alanı eklenebilir */}
      </div>

      <button
        onClick={handleProceedToCheckout}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out"
      >
        Sepeti Onayla
      </button>
    </div>
  );
};

export default OrderSummary;
