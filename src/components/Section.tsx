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
    default: 'bg-background',
    dark: 'bg-muted',
    gradient: 'bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-primary/20',
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
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{children}</h2>
      {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
