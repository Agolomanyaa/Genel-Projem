import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { removeFromCart, updateCartItemCount, clearCart } from '../store/actions/shoppingCartActions';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const ShoppingCartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cart } = useSelector((state) => state.shoppingCart);

    const handleRemove = (variantId) => {
        dispatch(removeFromCart(variantId));
    };

    const handleUpdateCount = (variantId, newCount) => {
        if (newCount > 0) {
            dispatch(updateCartItemCount(variantId, newCount));
        } else {
            handleRemove(variantId);
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Sepetinizdeki tüm ürünleri silmek istediğinizden emin misiniz?')) {
            dispatch(clearCart());
        }
    };
    
    const handleProceedToCheckout = () => {
        // Bu fonksiyon şimdilik bir sonraki adım için yer tutucu.
        // TODO: Ödeme sayfasına yönlendirme eklenecek.
        history.push('/checkout');
        console.log("Proceeding to checkout...");
    };

    const subtotal = cart.reduce((total, item) => total + item.product.price * item.count, 0);
    const shippingCost = subtotal >= 1000 ? 0 : 59.99; // 1000 TL ve üzeri kargo bedava
    const total = subtotal + shippingCost;

    return (
        <MainLayout>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-dark-text mb-6">Alışveriş Sepetim</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Sol Taraf: Sepet Listesi */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">Sepetinizde ürün bulunmamaktadır.</p>
                                    <Link to="/shop" className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-primary-dark">
                                        Alışverişe Başla
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="hidden md:grid grid-cols-6 gap-4 text-center font-semibold text-gray-600 mb-4 pb-2 border-b">
                                        <div className="col-span-3 text-left">Ürün</div>
                                        <div>Fiyat</div>
                                        <div>Adet</div>
                                        <div>Toplam</div>
                                    </div>
                                    {cart.map(item => (
                                        <div key={item.product.variantId} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b py-4">
                                            {/* Ürün Bilgisi */}
                                            <div className="col-span-3 flex items-center gap-4">
                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                                                <div>
                                                    <p className="font-semibold text-dark-text">{item.product.name}</p>
                                                    <button onClick={() => handleRemove(item.product.variantId)} className="text-xs text-red-500 hover:underline mt-1">
                                                        Kaldır
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Fiyat */}
                                            <div className="text-center">
                                                <span className="md:hidden font-semibold">Fiyat: </span>
                                                <span>${item.product.price.toFixed(2)}</span>
                                            </div>
                                            {/* Adet */}
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => handleUpdateCount(item.product.variantId, item.count - 1)} className="p-1.5 border rounded-full hover:bg-gray-100">
                                                    <FaMinus size={10} />
                                                </button>
                                                <span className="font-bold w-6 text-center">{item.count}</span>
                                                <button onClick={() => handleUpdateCount(item.product.variantId, item.count + 1)} className="p-1.5 border rounded-full hover:bg-gray-100">
                                                    <FaPlus size={10} />
                                                </button>
                                            </div>
                                            {/* Toplam */}
                                            <div className="text-center font-bold">
                                                <span className="md:hidden font-semibold">Toplam: </span>
                                                <span>${(item.product.price * item.count).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-4 flex justify-end">
                                        <button onClick={handleClearCart} className="text-sm text-gray-500 hover:text-red-600 hover:underline">
                                            Sepeti Temizle
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sağ Taraf: Sipariş Özeti */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-dark-text mb-4">Sipariş Özeti</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Ara Toplam</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Kargo Ücreti</span>
                                        <span>{shippingCost === 0 ? 'Bedava' : `$${shippingCost.toFixed(2)}`}</span>
                                    </div>
                                    <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                                        <span>Toplam</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleProceedToCheckout}
                                    disabled={cart.length === 0}
                                    className="w-full mt-6 bg-primary text-white font-bold py-3 rounded hover:bg-primary-dark transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Ödemeye Geç
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ShoppingCartPage;
