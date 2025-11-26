import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  Building2,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
} from 'lucide-react';
import { useAuth } from '../../providers/auth';
import { getDepartmentInfo } from '../../types/user';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/ems' },
  { icon: Activity, label: 'Active Calls', path: '/dashboard/ems/calls' },
  { icon: Building2, label: 'Hospitals', path: '/dashboard/ems/hospitals' },
  { icon: Users, label: 'Units', path: '/dashboard/ems/units' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/ems/messages' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/ems/analytics' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const departmentInfo = getDepartmentInfo(profile?.department || null);
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        className="fixed left-0 top-0 h-full bg-card border-r border-border z-40 flex flex-col shadow-card"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img src="/mesh_logo.svg" alt="Mesh" className="w-9 h-9 rounded-lg" />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-semibold text-xl text-foreground overflow-hidden whitespace-nowrap"
                >
                  Mesh
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Department Badge */}
        {departmentInfo && !sidebarCollapsed && (
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: departmentInfo.color }}
              />
              <span className="text-sm font-medium text-muted-foreground">
                {departmentInfo.label}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                  ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <item.icon size={20} />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-border">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <Settings size={20} />
            {!sidebarCollapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}`}
      >
        {/* Top Bar */}
        <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
              <Bell size={20} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>

            {/* Unit ID */}
            <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-xl">
              <span className="text-sm font-mono font-semibold text-primary">
                M-42
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-9 h-9 rounded-full ring-2 ring-border"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {displayName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
