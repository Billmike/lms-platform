"use client";

import { User, AuthState } from '@/types/auth';

const TOKEN_KEY = 'lms_auth_data';

// In-memory storage
class AuthStore {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123', // In a real app, this would be hashed
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private authState: AuthState = {
    currentUser: this.getUserData().currentUser,
    isAuthenticated: this.getUserData().isAuthenticated,
  };

  // Get current auth state
  getAuthState(): AuthState {
    return this.authState;
  }

  // Login
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user: AuthState['currentUser'] }> {
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    const dataResponse = await data.json();

    if (dataResponse.success && dataResponse.user) {
      localStorage.setItem('lms_auth_data', JSON.stringify({
        currentUser: dataResponse.user,
        isAuthenticated: true
      }));

      this.authState = {
        isAuthenticated: true,
        currentUser: dataResponse.user,
      }
      return { success: true, message: 'Login successful', user: dataResponse.user };
    }

    return { success: false, message: 'Login failed', user: null }
  }

  // Register
  register(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): { success: boolean; message: string } {
    if (this.users.some((u) => u.email === user.email)) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser: User = {
      ...user,
      id: (this.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return { success: true, message: 'Registration successful' };
  }

  // Logout
  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });

      localStorage.removeItem(TOKEN_KEY);

      this.authState = {
        currentUser: null,
        isAuthenticated: false,
      };
      return { success: true, message: 'Logout successful' };
    } catch {
      return { success: false, message: 'Logout failed' }
    }
  }

  // Get user by email
  getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  private getUserData(): AuthState {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(TOKEN_KEY);
  
      if (data) return JSON.parse(data)
      
      return {
        currentUser: null,
        isAuthenticated: false,
      }
    }

    return {
      currentUser: null,
      isAuthenticated: false,
    }
  }
}

// Export a singleton instance
export const authStore = new AuthStore();