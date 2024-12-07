import { User, AuthState } from '@/types/auth';

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
    currentUser: null,
    isAuthenticated: false,
  };

  // Get current auth state
  getAuthState(): AuthState {
    return this.authState;
  }

  // Login
  login(email: string, password: string): { success: boolean; message: string } {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    this.authState = {
      currentUser: user,
      isAuthenticated: true,
    };

    return { success: true, message: 'Login successful' };
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
  logout() {
    this.authState = {
      currentUser: null,
      isAuthenticated: false,
    };
  }

  // Get user by email
  getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}

// Export a singleton instance
export const authStore = new AuthStore();