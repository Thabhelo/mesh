import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[];
  variant?: 'default' | 'highlighted';
  delay?: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  details,
  variant = 'default',
  delay = 0,
}: FeatureCardProps) {
  const isHighlighted = variant === 'highlighted';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`p-8 rounded-lg border transition-all group ${
        isHighlighted
          ? 'border-red-500/50 bg-red-500/5 hover:bg-red-500/10'
          : 'border-slate-800 hover:border-red-500/50 hover:bg-red-500/5'
      }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
        isHighlighted
          ? 'bg-red-500/20'
          : 'bg-red-500/10 group-hover:bg-red-500/20'
      }`}>
        <Icon size={24} className="text-red-500" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-4">{description}</p>

      {details && (
        <ul className="space-y-2">
          {details.map((detail, idx) => (
            <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
