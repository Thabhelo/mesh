import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'gradient';
  withPadding?: boolean;
  id?: string;
}

export default function Section({
  children,
  className = '',
  variant = 'default',
  withPadding = true,
  id,
}: SectionProps) {
  const variantClasses = {
    default: 'bg-slate-950',
    dark: 'bg-gradient-to-b from-slate-900 to-slate-950',
    gradient: 'bg-gradient-to-r from-red-600/10 to-red-500/5 border-y border-red-500/20',
  };

  return (
    <section
      id={id}
      className={`${variantClasses[variant]} ${withPadding ? 'py-24' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  children,
  subtitle,
  className = '',
}: {
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{children}</h2>
      {subtitle && <p className="text-lg text-slate-300">{subtitle}</p>}
    </motion.div>
  );
}
