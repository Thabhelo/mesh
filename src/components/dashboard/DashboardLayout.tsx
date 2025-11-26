import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Shield, Ambulance, Phone, Building2, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../providers/auth';
import { getDepartmentInfo } from '../../types/user';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Flame, label: 'Fire', path: '/dashboard/fire', color: '#DC2626' },
  { icon: Shield, label: 'Police', path: '/dashboard/police', color: '#2563EB' },
  { icon: Ambulance, label: 'EMS', path: '/dashboard/ems', color: '#059669' },
  { icon: Phone, label: 'Dispatch', path: '/dashboard/dispatch', color: '#CA8A04' },
  { icon: Building2, label: 'Admin', path: '/dashboard/admin', color: '#64748B' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const departmentInfo = getDepartmentInfo(profile?.department || null);
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="w-16 bg-card border-r border-border flex flex-col items-center py-4 fixed left-0 top-0 h-full z-40">
        <Link to="/" className="mb-6">
          <img src="/mesh_logo.svg" alt="Mesh" className="w-9 h-9 rounded-lg" />
        </Link>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary/10'
                    : 'hover:bg-muted'
                }`}
                style={isActive ? { color: item.color } : undefined}
              >
                <item.icon size={20} className={isActive ? '' : 'text-muted-foreground'} />
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2 items-center">
          <Link to="/" title="Back to site" className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
            <Home size={20} />
          </Link>
          <button
            onClick={signOut}
            title="Sign out"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-16">
        <header className="h-14 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {departmentInfo && (
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: departmentInfo.color }}
                />
                <span className="text-sm font-medium text-foreground">{departmentInfo.label}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <div className="h-4 w-px bg-border" />
            {user?.photoURL ? (
              <img src={user.photoURL} alt={displayName} className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">{displayName[0]}</span>
              </div>
            )}
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
