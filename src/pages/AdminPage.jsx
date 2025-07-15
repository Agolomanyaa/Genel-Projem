import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { fetchProducts, createProduct } from '../store/actions/productActions';
import AdminProductList from '../components/AdminProductList';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];

const AdminPage = () => {
  const dispatch = useDispatch();
  const { categories, products, loading, error } = useSelector(state => state.product);
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      imageUrls: [{ url: '' }],
      variants: DEFAULT_SIZES.map(size => ({ color: '', size, stock: 0 }))
    }
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "imageUrls"
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: "variants"
  });

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100, offset: 0, includeInactive: true }));
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      const formattedImageUrls = data.imageUrls.map(item => item.url).filter(url => url.trim() !== '');
      if (formattedImageUrls.length === 0) {
        toast.error("Lütfen en az bir resim URL'si ekleyin.");
        return;
      }

      const formattedVariants = data.variants
        .map(v => ({ ...v, stock: parseInt(v.stock, 10) }))
        .filter(v => v.color.trim() && v.size.trim() && v.stock > 0);

      if (formattedVariants.length === 0) {
        toast.error("Lütfen en az bir geçerli ürün varyantı (Renk, Beden, Stok > 0) ekleyin.");
        return;
      }
      
      const productData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        categoryId: parseInt(data.categoryId, 10),
        imageUrls: formattedImageUrls,
        variants: formattedVariants,
      };

      await dispatch(createProduct(productData));
      toast.success('Ürün başarıyla oluşturuldu!');
      reset({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        imageUrls: [{ url: '' }],
        variants: DEFAULT_SIZES.map(size => ({ color: '', size, stock: 0 }))
      });
      dispatch(fetchProducts({ limit: 100, offset: 0, includeInactive: true }));
    } catch (error) {
      console.error('Ürün oluşturma hatası:', error);
      toast.error(error.message || 'Ürün oluşturulurken bir hata oluştu.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-dark-text">Admin Paneli</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-dark-text">Yeni Ürün Ekle</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ürün Adı</label>
              <input type="text" id="name" {...register('name', { required: 'Ürün adı zorunludur.' })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama</label>
              <textarea id="description" {...register('description', { required: 'Açıklama zorunludur.' })} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Fiyat</label>
              <input type="number" id="price" step="0.01" {...register('price', { required: 'Fiyat zorunludur.', valueAsNumber: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Kategori</label>
              <select id="categoryId" {...register('categoryId', { required: 'Kategori seçimi zorunludur.' })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{`[${cat.gender.toUpperCase()}] - ${cat.name}`}</option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedenler</label>
              <div className="space-y-3">
                {variantFields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <input {...register(`variants.${index}.color`, { required: true })} placeholder="Renk" className="col-span-4 border p-2 rounded-md" />
                    <input {...register(`variants.${index}.size`, { required: true })} placeholder="Beden" className="col-span-3 border p-2 rounded-md" />
                    <input type="number" {...register(`variants.${index}.stock`, { required: true, valueAsNumber: true, min: 0 })} placeholder="Stok" className="col-span-3 border p-2 rounded-md" />
                    <button type="button" onClick={() => removeVariant(index)} className="col-span-2 p-2 text-red-600 hover:text-red-800 flex justify-center">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => appendVariant({ color: '', size: '', stock: 0 })} className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-semibold">
                <FaPlus /> Beden Ekle
              </button>
            </div>
            
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Resim URL'leri</label>
              <div className="space-y-3">
                {imageFields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input {...register(`imageUrls.${index}.url`)} type="url" placeholder={`Resim URL ${index + 1}`} className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"/>
                    {imageFields.length > 1 && (
                      <button type="button" onClick={() => removeImage(index)} className="p-2 text-red-600 hover:text-red-800"><FaTrash /></button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => appendImage({ url: '' })} className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-semibold">
                <FaPlus /> Yeni Resim Ekle
              </button>
            </div>
            
            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">
              Ürünü Ekle
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <AdminProductList products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;