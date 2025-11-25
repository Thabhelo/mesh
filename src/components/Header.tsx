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
    <header className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <RouterLink to="/" className="flex items-center gap-3 group">
          <img
            src="/mesh_logo.svg"
            alt="Mesh logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
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
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </RouterLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <RouterLink
            to="/platform"
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium"
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
