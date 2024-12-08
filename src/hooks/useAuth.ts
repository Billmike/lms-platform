'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/lib/auth-store';
import { User } from '@/types/auth';

export const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const login = async (email: string, password: string) => {
    const data = await authStore.login(email, password)

    if (data.success) {
      router.push('/dashboard/admin')
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = authStore.register(userData);
    
    if (result.success) {
      router.push('/auth/login');
    } else {
      setError(result.message);
    }
    
    return result;
  };

  const logout = () => {
    authStore.logout();
    router.push('/auth/login');
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