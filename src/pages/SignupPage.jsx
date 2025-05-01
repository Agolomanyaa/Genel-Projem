import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axiosInstance';
// Toastify importları (eğer kullanacaksak)
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [apiError, setApiError] = useState(null); // Rolleri çekerken oluşan hata
  const [isSubmitting, setIsSubmitting] = useState(false); // Form gönderme durumu
  const [submitError, setSubmitError] = useState(null); // Form gönderme hatası

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    mode: "onChange",
  });
  const history = useHistory();

  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        setApiError(null);
        const response = await axiosInstance.get('/roles');
        if (Array.isArray(response.data)) {
           setRoles(response.data);
           const customerRole = response.data.find(role => role.code === 'customer');
           if (customerRole) {
             setValue('role_id', customerRole.id.toString(), { shouldValidate: false, shouldDirty: false });
           } else {
             if(response.data.length > 0){
                setValue('role_id', response.data[0].id.toString(), { shouldValidate: false, shouldDirty: false });
             }
             console.warn("Customer role not found in API response. Setting default to first role or none.");
           }
        } else {
            console.error("Unexpected API response format:", response.data);
            setApiError("Could not load roles properly.");
        }
        setLoadingRoles(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setLoadingRoles(false);
        setApiError(error.response?.data?.message || "Failed to fetch roles. Please try again later.");
      }
    };

    fetchRoles();
  }, [setValue]);

  useEffect(() => {
    if (roles.length > 0 && !loadingRoles) {
      const customerRole = roles.find(role => role.code === 'customer');
      if (customerRole) {
        setValue('role_id', customerRole.id.toString(), { shouldValidate: false, shouldDirty: false });
      } else {
         if(roles.length > 0){
             setValue('role_id', roles[0].id.toString(), { shouldValidate: false, shouldDirty: false });
         }
         console.warn("Customer role not found. Defaulting to the first available role.");
      }
    }
  }, [roles, loadingRoles, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Gönderim başladı
    setSubmitError(null);  // Önceki hatayı temizle

    // API'ye gönderilecek veriyi hazırlayalım
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: parseInt(data.role_id, 10), // ID'yi integer yap
    };

    // Eğer rol Mağaza ise, store bilgilerini ekle
    if (payload.role_id === 2) { // Mağaza ID'si 2 varsayımı
      payload.store = {
        name: data.store.name,
        phone: data.store.phone,
        tax_no: data.store.tax_no,
        bank_account: data.store.bank_account,
      };
    }

    console.log("Sending payload:", payload);

    try {
      // API'ye POST isteği gönder
      const response = await axiosInstance.post('/signup', payload);
      console.log("Signup successful:", response.data);

      // Başarılı ise mesaj göster ve önceki sayfaya yönlendir
      // toast.success("Signup successful! Please check your email to activate.", { position: "top-center" }); // Toastify ile
      alert("Signup successful! You need to click link in email to activate your account!"); // Basit alert ile
      history.goBack(); // Önceki sayfaya git

    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      // API'den gelen hata mesajını veya genel bir mesajı state'e kaydet
      setSubmitError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Gönderim bitti
    }
  };

  const selectedRoleId = watch("role_id");
  const isStoreRoleSelected = selectedRoleId === "2";

  return (
    <MainLayout>
      {/* <ToastContainer /> */} {/* Toastify kullanacaksak */}
      <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-3">Sign Up</h1>
            <p className="text-second-text">Create your account to get started.</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-gray-200 p-6 sm:p-8 rounded-md shadow-sm bg-white">

            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required.",
                  minLength: { value: 3, message: "Name must be at least 3 characters." }
                })}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address." }
                })}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: { value: 8, message: "Password must be at least 8 characters." },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
                    message: "Password must include uppercase, lowercase, number, and special character."
                  }
                })}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Min 8 chars (Aa, 1, @)"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: value =>
                    value === password.current || "Passwords do not match."
                })}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <label htmlFor="role_id" className="block text-sm font-bold text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role_id"
                {...register("role_id", { required: "Please select a role." })}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary bg-white ${errors.role_id ? 'border-red-500' : 'border-gray-300'}`}
                disabled={loadingRoles}
              >
                {loadingRoles ? (
                  <option value="">Loading roles...</option>
                ) : apiError ? (
                   <option value="">{apiError}</option>
                ) : (
                  roles.map((role) => (
                    <option key={role.id} value={role.id.toString()}>
                      {role.name}
                    </option>
                  ))
                )}
              </select>
              {errors.role_id && <p className="text-red-500 text-xs mt-1">{errors.role_id.message}</p>}
            </div>

            {isStoreRoleSelected && (
               <>
                 <hr className="my-4 border-t border-gray-300"/>
                 <h3 className="text-lg font-bold text-dark-text mb-4">Store Information</h3>

                 <div>
                   <label htmlFor="storeName" className="block text-sm font-bold text-gray-700 mb-1">
                     Store Name <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="text"
                     id="storeName"
                     {...register("store.name", {
                       required: "Store name is required.",
                       minLength: { value: 3, message: "Store name must be at least 3 characters." }
                     })}
                     className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.store?.name ? 'border-red-500' : 'border-gray-300'}`}
                     placeholder="Your store's name"
                   />
                   {errors.store?.name && <p className="text-red-500 text-xs mt-1">{errors.store.name.message}</p>}
                 </div>

                 <div>
                   <label htmlFor="storePhone" className="block text-sm font-bold text-gray-700 mb-1">
                     Store Phone <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="tel"
                     id="storePhone"
                     {...register("store.phone", {
                       required: "Store phone number is required.",
                       pattern: { value: /^(?:0|\+?90)?(5\d{9})$/, message: "Please enter a valid Turkish mobile phone number (e.g., 5xxxxxxxxx)." }
                     })}
                     className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.store?.phone ? 'border-red-500' : 'border-gray-300'}`}
                     placeholder="5xxxxxxxxx"
                   />
                   {errors.store?.phone && <p className="text-red-500 text-xs mt-1">{errors.store.phone.message}</p>}
                 </div>

                 <div>
                   <label htmlFor="storeTaxId" className="block text-sm font-bold text-gray-700 mb-1">
                     Store Tax ID <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="text"
                     id="storeTaxId"
                     {...register("store.tax_no", {
                       required: "Store Tax ID is required.",
                       pattern: { value: /^T\d{4}V\d{6}$/, message: "Tax ID must match the format TXXXXVXXXXXX." }
                     })}
                     className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.store?.tax_no ? 'border-red-500' : 'border-gray-300'}`}
                     placeholder="TXXXXVXXXXXX"
                     maxLength="12"
                   />
                   {errors.store?.tax_no && <p className="text-red-500 text-xs mt-1">{errors.store.tax_no.message}</p>}
                 </div>

                 <div>
                   <label htmlFor="storeBankAccount" className="block text-sm font-bold text-gray-700 mb-1">
                     Store Bank Account (IBAN) <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="text"
                     id="storeBankAccount"
                     {...register("store.bank_account", {
                       required: "Store bank account (IBAN) is required.",
                       pattern: { value: /^TR\d{24}$/, message: "Please enter a valid Turkish IBAN (TR followed by 24 digits)." }
                     })}
                     className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.store?.bank_account ? 'border-red-500' : 'border-gray-300'}`}
                     placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
                     maxLength="26"
                   />
                   {errors.store?.bank_account && <p className="text-red-500 text-xs mt-1">{errors.store.bank_account.message}</p>}
                 </div>
               </>
             )}

            <div>
              {/* Genel API Hata Mesajı */}
              {submitError && (
                <p className="text-red-600 text-sm text-center mb-4 p-3 bg-red-100 border border-red-300 rounded">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting} // Gönderilirken butonu deaktif et
                className={`w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Sign Up'} {/* Metni değiştir */}
              </button>
            </div>
          </form>

          <p className="text-center text-second-text text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-bold">
              Log In
            </Link>
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default SignupPage;