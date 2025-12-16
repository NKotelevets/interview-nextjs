"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth-store';
import Button from '../components/Button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check authentication on client side
    const storedToken = localStorage.getItem('jwt');
    if (!storedToken && !token) {
      router.push('/login');
    }
  }, [router, token]);

  const handleLogout = () => {
    // Clear Zustand store
    logout();
    
    // Clear localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    
    // Clear cookie
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Redirect to login
    router.push('/login-test');
  };

  // Show loading state on server
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If no user data, show error
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-6">You are not authenticated. Please login to access the dashboard.</p>
          <Button 
            title="Go to Login"
            onClick={() => router.push('/login')}
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Button 
                title="Logout"
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Profile</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Token Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Authentication Status</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Authenticated ✓</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Token Present</p>
                <p className="font-medium">{token ? 'Yes' : 'No'}</p>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">Your JWT Token (truncated):</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm break-all">
                  {token ? `${token.substring(0, 30)}...` : 'No token'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                title="View Profile"
                onClick={() => alert('Profile page coming soon!')}
                className="w-full justify-center"
              />
              <Button 
                title="Settings"
                onClick={() => alert('Settings page coming soon!')}
                className="w-full justify-center bg-gray-600 hover:bg-gray-700"
              />
              <Button 
                title="Refresh Token"
                onClick={() => alert('Token refresh coming soon!')}
                className="w-full justify-center bg-green-600 hover:bg-green-700"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div>
                <p className="font-medium">Successful Login</p>
                <p className="text-sm text-gray-600">You logged in to your account</p>
              </div>
              <p className="text-sm text-gray-500">Just now</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Dashboard Access</p>
                <p className="text-sm text-gray-600">You accessed the dashboard</p>
              </div>
              <p className="text-sm text-gray-500">Just now</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
