export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}