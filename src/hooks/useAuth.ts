'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/lib/auth-store';
import { User } from '@/types/auth';

export const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const login = async (email: string, password: string) => {
    const result = authStore.login(email, password);
    
    if (result.success) {
      const user = authStore.getAuthState().currentUser;
      if (user) {
        // Redirect based on role
        switch (user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'instructor':
            router.push('/instructor');
            break;
          case 'student':
            router.push('/student');
            break;
        }
      }
    } else {
      setError(result.message);
    }
    
    return result;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = authStore.register(userData);
    
    if (result.success) {
      router.push('/login');
    } else {
      setError(result.message);
    }
    
    return result;
  };

  const logout = () => {
    authStore.logout();
    router.push('/login');
  };

  return {
    login,
    register,
    logout,
    error,
    user: authStore.getAuthState().currentUser,
    isAuthenticated: authStore.getAuthState().isAuthenticated,
  };
};