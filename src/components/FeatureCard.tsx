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
      className={`p-8 rounded-lg border transition-all group shadow-card ${
        isHighlighted
          ? 'border-primary/60 bg-primary/5 hover:bg-primary/10'
          : 'border-border hover:border-primary/60 hover:bg-primary/5'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
          isHighlighted
            ? 'bg-primary/20'
            : 'bg-primary/10 group-hover:bg-primary/20'
        }`}
      >
        <Icon size={24} className="text-primary" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>

      {details && (
        <ul className="space-y-2">
          {details.map((detail, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
