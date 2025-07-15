import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditProductModal = ({ product, onClose, onSave }) => {
  const { categories } = useSelector(state => state.product);

  const { register, control, handleSubmit, reset } = useForm();

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images"
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: "variants"
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
        images: product.images?.length > 0 ? product.images.map(img => ({ url: img.url })) : [{ url: '' }],
        variants: product.variants?.length > 0 ? product.variants.map(v => ({ color: v.color, size: v.size, stock: v.stock })) : [{ color: '', size: '', stock: 0 }]
      });
    }
  }, [product, reset]);

  const onFormSubmit = (data) => {
    const formattedImageUrls = data.images.map(item => item.url).filter(url => url.trim() !== '');
    if (formattedImageUrls.length === 0) {
      toast.error("Ürünün en az bir resmi olmalıdır.");
      return;
    }

    const formattedVariants = data.variants
      .map(v => ({ ...v, stock: parseInt(v.stock, 10) || 0 }))
      .filter(v => v.color?.trim() && v.size?.trim() && v.stock >= 0);

    if (formattedVariants.length === 0 && data.variants.length > 0) {
      toast.error("Kaydedilecek en az bir geçerli varyant (Renk ve Beden dolu olmalı) gereklidir.");
      return;
    }
    
    const payload = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      categoryId: parseInt(data.categoryId),
      imageUrls: formattedImageUrls,
      variants: formattedVariants,
    };
    onSave(product.id, payload);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-8">
          <h2 className="text-2xl font-bold text-dark-text mb-6">Ürünü Düzenle: {product.name}</h2>
          
          <div className="mb-4">
            <label htmlFor="edit-name" className="block text-gray-700 font-bold mb-2">Ürün Adı</label>
            <input type="text" id="edit-name" {...register("name")} className="w-full p-3 border border-gray-300 rounded-md" required />
          </div>

          <div className="mb-4">
             <label htmlFor="edit-description" className="block text-gray-700 font-bold mb-2">Açıklama</label>
             <textarea id="edit-description" rows="3" {...register("description")} className="w-full p-3 border border-gray-300 rounded-md" required />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                 <label htmlFor="edit-price" className="block text-gray-700 font-bold mb-2">Fiyat</label>
                 <input type="number" id="edit-price" step="0.01" {...register("price")} className="w-full p-3 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="edit-category" className="block text-gray-700 font-bold mb-2">Kategori</label>
                <select id="edit-category" {...register("categoryId")} className="w-full p-3 border border-gray-300 rounded-md bg-white" required>
                  {categories.map(cat => (<option key={cat.id} value={cat.id}>{`[${cat.gender.toUpperCase()}] - ${cat.name}`}</option>))}
                </select>
              </div>
           </div>

           {/* YENİ: Varyantları Düzenleme Bölümü */}
           <div className="mb-4 p-4 border rounded-md">
             <label className="block text-gray-700 font-bold mb-2">Ürün Varyantları</label>
             <div className="space-y-3">
               {variantFields.map((item, index) => (
                 <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <input {...register(`variants.${index}.color`)} placeholder="Renk" className="col-span-4 border p-2 rounded-md" />
                    <input {...register(`variants.${index}.size`)} placeholder="Beden" className="col-span-3 border p-2 rounded-md" />
                    <input type="number" {...register(`variants.${index}.stock`)} placeholder="Stok" className="col-span-3 border p-2 rounded-md" />
                    <button type="button" onClick={() => removeVariant(index)} className="col-span-2 p-2 text-red-600 hover:text-red-800 flex justify-center">
                      <FaTrash />
                    </button>
                  </div>
               ))}
             </div>
             <button type="button" onClick={() => appendVariant({ color: '', size: '', stock: 0 })} className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-semibold">
               <FaPlus /> Varyant Ekle
             </button>
           </div>
          
           <div className="mb-4 p-4 border rounded-md">
             <label className="block text-gray-700 font-bold mb-2">Resim URL'leri</label>
             <div className="space-y-3">
               {imageFields.map((item, index) => (
                 <div key={item.id} className="flex items-center gap-2">
                   <input {...register(`images.${index}.url`)} type="url" placeholder={`Resim URL ${index + 1}`} className="flex-grow w-full p-3 border border-gray-300 rounded-md"/>
                   {imageFields.length > 1 && (
                     <button type="button" onClick={() => removeImage(index)} className="p-3 text-red-600 hover:text-red-800"><FaTrash /></button>
                   )}
                 </div>
               ))}
             </div>
             <button type="button" onClick={() => appendImage({ url: '' })} className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-semibold">
               <FaPlus /> Yeni Resim Ekle
             </button>
           </div>
            
          <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold">İptal</button>
            <button type="submit" className="px-6 py-2 rounded-lg text-white bg-primary hover:bg-primary-dark font-semibold">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
