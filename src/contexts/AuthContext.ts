import { createContext } from 'react';

interface User {
  $id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<boolean>;
  resetPassword: (userId: string, secret: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
