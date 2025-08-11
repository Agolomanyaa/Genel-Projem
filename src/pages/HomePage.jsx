import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import EditorPicks from '../components/EditorPicks';
import ProductGrid from '../components/ProductGrid';
import { FETCH_STATES, fetchProducts } from '../store/actions/productActions';

const HomePage = () => {
  const dispatch = useDispatch();

  const { 
    products: allProducts, 
    productsFetchState 
  } = useSelector((state) => state.product);

  // "Çok Satanlar" bölümü için ürünleri çekmeye devam ediyoruz.
  useEffect(() => {
    if (productsFetchState !== FETCH_STATES.FETCHED && productsFetchState !== FETCH_STATES.FETCHING) {
      dispatch(fetchProducts({ limit: 20, offset: 0 }));
    }
  }, [dispatch, productsFetchState]);

  // `slice(0, 3)` yerine `slice(0, 5)` kullanarak ilk 5 ürünü alıyoruz.
  const bestsellerProducts = (allProducts || []).slice(0, 5);

  return (
    <MainLayout>
      <div>
        <HeroSection />
        <EditorPicks />

        {/* --- "Öne Çıkan Kategoriler" BÖLÜMÜ İSTEĞİNİZ ÜZERİNE TAMAMEN KALDIRILDI --- */}

        {/* "Çok Satanlar" bölümünü, boşluk ve hizalama için kendi bölüm etiketine alıyoruz. */}
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                {productsFetchState === FETCH_STATES.FETCHING && <p className="text-center py-8">Ürünler Yükleniyor...</p>}
                
                {productsFetchState === FETCH_STATES.FETCHED && bestsellerProducts.length > 0 && (
                    <ProductGrid title="ÇOK SATANLAR" products={bestsellerProducts} />
                )}
                
                {productsFetchState === FETCH_STATES.FETCHED && bestsellerProducts.length === 0 && (
                    <p className="text-center py-8">Gösterilecek çok satan ürün bulunamadı.</p>
                )}
            </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;