"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form } from '../components/Form';
import { useAuthStore } from '../store/auth-store';

interface ResponseInterface {
  token: string;
  user: {
    email: string;
    id: number;
    name: string;
  };
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { email, password, setAuthData } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleMockResponse = (response: ResponseInterface) => {
    const { token, user } = response || {};

    if (!token) {
      console.warn("No token found in mock response.");
      return false;
    }

    // Store in Zustand
    setAuthData(user, token);
    
    // Store in localStorage for client-side access
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set cookie for server-side access (middleware)
    document.cookie = `jwt=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
    
    return true;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock response - replace with actual API call
      const mockResponse: ResponseInterface = {
        "token": "mock-token-abc123",
        "user": {
          "email": email || "test@example.com",
          "id": 1,
          "name": "John Doe"
        }
      };

      const success = handleMockResponse(mockResponse);

      if (success) {
        const redirectTo = searchParams.get('from') || '/dashboard';
        router.push(redirectTo);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700 font-sans p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Please login to your account</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <Form 
            onSubmit={handleLogin}
            showLoginButton={email.trim() !== '' && password.trim() !== '' && !isLoading}
          />

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              For demonstration purposes, use any email/password combination.
              <br />
              <span className="font-medium">Mock token will be generated.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
