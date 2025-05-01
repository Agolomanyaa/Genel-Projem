import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/clientActions';

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const credentials = {
      email: data.email,
      password: data.password,
    };
    const rememberMe = data.rememberMe;

    const errorResult = await dispatch(loginUser(credentials, rememberMe, history));

    if (errorResult) {
      setSubmitError(errorResult);
    }
    setIsSubmitting(false);
  };

  return (
    <MainLayout>
      <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-3">Login</h1>
            <p className="text-second-text">Enter your credentials to access your account.</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-gray-200 p-6 sm:p-8 rounded-md shadow-sm bg-white">
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
                {...register("password", { required: "Password is required." })}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-primary focus:border-primary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 font-medium">
                Remember Me
              </label>
            </div>

            <div>
              {submitError && (
                <p className="text-red-600 text-sm text-center mb-4 p-3 bg-red-100 border border-red-300 rounded">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          <p className="text-center text-second-text text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;