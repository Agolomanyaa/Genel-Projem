import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateProduct } from '../store/actions/productActions';
import EditProductModal from './EditProductModal';

const AdminProductList = ({ products, loading, error }) => {
  const dispatch = useDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) {
    return <p className="text-center py-8">Ürünler yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-8">Hata: {error}</p>;
  }
  
  if (!products || products.length === 0) {
    return <p className="text-second-text text-center py-8">Gösterilecek ürün bulunamadı.</p>;
  }

  const handleDelete = (productId, productName) => {
    if (window.confirm(`"${productName}" adlı ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (productId, productData) => {
    const success = await dispatch(updateProduct(productId, productData));
    if (success) {
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  return (
    <>
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50">
            <tr className="border-b-2 border-gray-200">
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Resim</th>
              <th className="p-4 font-semibold text-gray-600">İsim</th>
              <th className="p-4 font-semibold text-gray-600">Kategori</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Fiyat</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Stok</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Durum</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const totalStock = product.variants?.reduce((acc, variant) => acc + variant.stock, 0) || 0;
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{product.id}</td>
                  <td className="p-4">
                    <img
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category.name}</td>
                  <td className="p-4 font-mono text-gray-800 text-right">${product.price.toFixed(2)}</td>
                  <td className="p-4 text-gray-800 text-center">{totalStock}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      totalStock > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {totalStock > 0 ? 'Satışta' : 'Stok Tükendi'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-4"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default AdminProductList;
