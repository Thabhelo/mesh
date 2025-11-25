import { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <div className="min-h-screen bg-background font-sans antialiased">{children}</div>;
}
