import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Platform', href: '/platform' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 pt-5">
      <div className="container">
        <div className="flex items-center justify-between gap-5 px-6 py-3 rounded-full border border-primary/20 bg-background/75 shadow-[0_20px_70px_rgba(15,23,42,0.7)] backdrop-blur-2xl">
          <RouterLink to="/" className="flex items-center gap-3 group">
            <img
              src="/mesh_logo.svg"
              alt="Mesh logo"
              className="h-9 w-auto rounded-full"
            />
            <span className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
              Mesh
            </span>
          </RouterLink>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <RouterLink
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/80 group-hover:w-full transition-all duration-300 rounded-full" />
              </RouterLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <RouterLink
              to="/platform"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors text-sm font-medium shadow-[0_10px_30px_rgba(249,115,22,0.45)]"
            >
              Get Started
            </RouterLink>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </RouterLink>
              ))}
              <RouterLink
                to="/platform"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-center font-medium"
              >
                Get Started
              </RouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
