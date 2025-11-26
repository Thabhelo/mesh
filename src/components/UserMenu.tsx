import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User as UserIcon, ChevronDown, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../providers/auth';
import { getDepartmentInfo } from '../types/user';

export default function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  if (!user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const photoURL = user.photoURL;
  const departmentInfo = getDepartmentInfo(profile?.department || null);
  
  // Get dashboard path based on department
  const getDashboardPath = () => {
    if (!profile?.department) return '/onboarding';
    // For now, all departments go to EMS dashboard as a demo
    // In production, each department would have its own dashboard
    return '/dashboard/ems';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/30 bg-background/50 hover:bg-background/80 transition-all duration-200 group"
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt={displayName}
            className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
            <UserIcon size={14} className="text-primary" />
          </div>
        )}
        
        <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
          {displayName}
        </span>
        
        <ChevronDown 
          size={14} 
          className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 py-2 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-border/50">
              <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
              {user.email && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
              )}
              {departmentInfo && (
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: departmentInfo.color }}
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {departmentInfo.label}
                  </span>
                </div>
              )}
            </div>

            <div className="py-2">
              <Link
                to={getDashboardPath()}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent/50 transition-colors"
              >
                <LayoutDashboard size={16} className="text-muted-foreground" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/onboarding"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent/50 transition-colors"
              >
                <Settings size={16} className="text-muted-foreground" />
                <span>Change Department</span>
              </Link>
            </div>

            <div className="border-t border-border/50 pt-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

