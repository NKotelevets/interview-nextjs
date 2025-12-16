"use client";

import { Input } from './Input';
import Button from './Button';
import { useAuthStore } from '../store/auth-store';

interface FormProps {
  onSubmit: () => void;
  showLoginButton: boolean;
  isLoading?: boolean;
}

export const Form = ({ onSubmit, showLoginButton, isLoading = false }: FormProps) => {
  const { email, password, setEmail, setPassword } = useAuthStore();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
        
        {showLoginButton && (
          <div className="pt-2">
            <Button 
              title={isLoading ? "Logging in..." : "Login"}
              type="submit"
              className="w-full"
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </form>
  );
};
