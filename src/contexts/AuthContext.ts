import { createContext } from 'react';

interface User {
  $id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  resetPasswordRequest: (email: string) => Promise<boolean>;
  resetPassword: (userId: string, secret: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
