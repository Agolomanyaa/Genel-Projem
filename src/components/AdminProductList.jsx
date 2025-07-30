import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/actions/productActions';
import EditProductModal from './EditProductModal'; // Modal'ı import ediyoruz
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminProductList = ({ products, loading, error }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      dispatch(deleteProduct(productId))
        .then(() => toast.success('Ürün başarıyla silindi.'))
        .catch((err) => toast.error(`Hata: ${err.message}`));
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">Hata: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500 p-8">Gösterilecek ürün bulunamadı.</div>;
  }

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-dark-text">Ürün Listesi</h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Resim</th>
              <th scope="col" className="px-6 py-3">İsim</th>
              <th scope="col" className="px-6 py-3">Kategori</th>
              <th scope="col" className="px-6 py-3">Fiyat</th>
              <th scope="col" className="px-6 py-3">Toplam Stok</th>
              <th scope="col" className="px-6 py-3">Durum</th>
              <th scope="col" className="px-6 py-3">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody>
            {safeProducts.map((product) => (
              <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{product.id}</td>
                <td className="px-6 py-4">
                  <img src={product.images?.[0]?.url || 'https://picsum.photos/80/80'} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4">{product.category?.name || 'N/A'}</td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.totalStock}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 items-start">
                    {/* YENİ EKLENEN KISIM: Aktiflik Durumu */}
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.active ? 'Aktif' : 'Pasif'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.totalStock > 0
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.totalStock > 0 ? 'Stokta Var' : 'Stok Tükendi'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleEdit(product)} className="font-medium text-blue-600 hover:underline">Düzenle</button>
                    <button onClick={() => handleDelete(product.id)} className="font-medium text-red-600 hover:underline">Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default AdminProductList;
