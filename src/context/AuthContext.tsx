import { api } from '@/helpers/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  complement?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string | null;
  document?: string | null;
  cellPhone?: string | null;
  birthDate?: string | null;
  gender?: 'MALE' | 'FEMALE' | string | null;
  role?: 'USER' | 'ADMIN' | string;
  isActive?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  profileCompleted?: boolean;
  stripeCustomerId?: string | null;
  address?: Address | null;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn: (token: string, user: User) => void;
  setProfile: (profile: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('@app:token');
    const storedUser = localStorage.getItem('@app:user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  function signIn(token: string, user: User) {
    setToken(token);
    setUser(user);

    localStorage.setItem('@app:token', token);
    localStorage.setItem('@app:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  function setProfile(profile: User) {
    setUser((prev) => {
      const merged = { ...(prev ?? {}), ...profile } as User;
      localStorage.setItem('@app:user', JSON.stringify(merged));
      return merged;
    });
  }

  function signOut() {
    setToken(null);
    setUser(null);

    localStorage.removeItem('@app:token');
    localStorage.removeItem('@app:user');
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, setProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
