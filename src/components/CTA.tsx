import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CTAProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
}

export default function CTA({
  href,
  label,
  variant = 'primary',
  icon: Icon,
  className = '',
  children,
}: CTAProps) {
  const variants = {
    primary: 'px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/50 group',
    secondary: 'px-6 py-3 border border-slate-700 hover:border-red-500/50 text-white rounded-lg font-semibold transition-all hover:bg-red-500/10',
    tertiary: 'inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium',
  };

  const isInternal = href.startsWith('/');

  if (children) {
    return isInternal ? (
      <RouterLink to={href} className={`${variants[variant]} ${className}`}>
        {children}
      </RouterLink>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return isInternal ? (
    <RouterLink to={href} className={`inline-flex items-center justify-center gap-2 ${variants[variant]} ${className}`}>
      {label}
      {Icon && <Icon size={20} />}
      {!Icon && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
    </RouterLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 ${variants[variant]} ${className}`}>
      {label}
      {Icon && <Icon size={20} />}
      {!Icon && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
    </a>
  );
}
