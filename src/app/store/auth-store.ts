import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userMockData } from '../mock/user';

interface UserInterface {
  email: string;
  id: number;
  name: string;
}

interface AuthState {
  email: string;
  password: string;
  user: {
    id: number | null;
    email: string;
    name: string;
  } | null;
  token: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setAuthData: (user: UserInterface, token: string) => void;
  clearForm: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: '',
      password: '',
      user: null,
      token: null,
      
      setEmail: (email: string) => set({ email }),
      setPassword: (password: string) => set({ password }),

      setAuthData: (user: UserInterface, token: string) => set({ 
        user,
        token,
        email: userMockData.email,
        password: userMockData.password
      }),
      
      clearForm: () => set({ email: '', password: '' }),

      logout: () => set({ 
        user: null, 
        token: null,
        email: '',
        password: '' 
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);
