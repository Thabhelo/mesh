import { ReactNode } from 'react';
import { AuthProvider } from './auth';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background font-sans antialiased">{children}</div>
    </AuthProvider>
  );
}
