'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth} from '@clerk/nextjs';

interface AuthContextType {
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
        const token = await getToken();
        setToken(token);
      
    };

    fetchToken();
  }, [getToken]);

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 