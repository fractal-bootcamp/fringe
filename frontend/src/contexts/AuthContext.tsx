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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const newToken = await getToken();
        setToken(newToken);
      } catch (error) {
        console.error('Failed to fetch token:', error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
    const interval = setInterval(fetchToken, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [getToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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