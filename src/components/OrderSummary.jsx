import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Eğer butonlar Link olacaksa

const OrderSummary = () => {
  const { cart } = useSelector((state) => state.shoppingCart);

  const productsTotal = cart.reduce((acc, item) => acc + item.product.price * item.count, 0);
  
  const shippingCost = 10.00; // Örnek kargo ücreti Dolar olarak
  const shippingDiscountThreshold = 50; // 50 Dolar ve üzeri
  const shippingDiscount = productsTotal >= shippingDiscountThreshold ? shippingCost : 0;
  const finalShipping = shippingCost - shippingDiscount;

  const grandTotal = productsTotal + finalShipping;

  // "Create Order" butonunun şimdilik bir işlevi olmayacak
  const handleCreateOrder = () => {
    console.log('Create Order button clicked - no functionality yet.');
    // Gelecekte burada sipariş oluşturma işlemleri yapılacak
    // Örneğin: dispatch(createOrderAction(cart, paymentDetails, shippingAddress));
    // Ve kullanıcıyı ödeme sayfasına veya sipariş onay sayfasına yönlendirme
    // history.push('/checkout'); // react-router-dom v5 için
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
      <button
        onClick={handleCreateOrder}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out mb-6"
      >
        Sepeti Onayla
      </button>

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
        onClick={handleCreateOrder}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out"
      >
        Sepeti Onayla
      </button>
    </div>
  );
};

export default OrderSummary;
