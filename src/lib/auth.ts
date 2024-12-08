// This is a simplified JWT implementation for demo purposes
// In a production environment, you'd want to use a proper JWT library and secure secret

// const JWT_SECRET = 'your-secret-key'; // In production, this would be an environment variable
const TOKEN_KEY = 'lms_auth_token';

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const jwt = {
  sign(payload: JWTPayload): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const content = btoa(JSON.stringify(payload));
    const signature = btoa(JSON.stringify({ verified: true })); // Simplified for demo
    return `${header}.${content}.${signature}`;
  },

  verify(token: string): JWTPayload | null {
    try {
      const [, payload] = token.split('.');
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
};