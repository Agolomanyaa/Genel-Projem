import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const SignupPage = () => {
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [apiError, setApiError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const history = useHistory();
    const password = watch("password", "");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                setLoadingRoles(true);
                const response = await axiosInstance.get('/roles');
                if (Array.isArray(response.data)) {
                    // SADECE BU SATIRI DEĞİŞTİR: Gelen rollerden ADMIN'i filtrele
                    setRoles(response.data.filter(role => role !== 'ADMIN'));
                } else {
                    throw new Error("Roles data is not in the expected format.");
                }
            } catch (error) {
                console.error("Error fetching roles:", error);
                setApiError("Failed to fetch roles. Please try again later.");
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchRoles();
    }, []);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setApiError(null);

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role, // Artık ID değil, direkt string ('USER' veya 'ADMIN')
        };

        try {
            await axiosInstance.post('/register', payload); // Register endpoint'i /api/v1/register
            toast.success("Registration successful! You can now log in.", { position: "top-center" });
            history.push('/login'); // Başarılı kayıt sonrası login sayfasına yönlendir
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
            setApiError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MainLayout>
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
                                {...register("name", { required: "Name is required." })}
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
                                {...register("email", { required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address." } })}
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
                                {...register("password", { required: "Password is required.", minLength: { value: 6, message: "Password must be at least 6 characters." } })}
                                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Min 6 characters"
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
                                {...register("confirmPassword", { required: "Please confirm your password.", validate: value => value === password || "Passwords do not match." })}
                                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-1">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="role"
                                {...register("role", { required: "Please select a role." })}
                                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary bg-white ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                                disabled={loadingRoles}
                            >
                                {loadingRoles ? (
                                    <option value="">Loading roles...</option>
                                ) : apiError ? (
                                    <option value="">{apiError}</option>
                                ) : (
                                    roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))
                                )}
                            </select>
                            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                        </div>

                        <div>
                            {apiError && !errors.role && (
                                <p className="text-red-600 text-sm text-center mb-4 p-3 bg-red-100 border border-red-300 rounded">
                                    {apiError}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition duration-150 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Sign Up'}
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