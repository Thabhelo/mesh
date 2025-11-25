import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {title && (
          <div className="container py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
          </div>
        )}
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
