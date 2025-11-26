import { motion } from 'framer-motion';
import { Building2, Clock, AlertCircle, ChevronRight, Shield } from 'lucide-react';
import { Hospital } from '../../types/ems';

interface HospitalStatusProps {
  hospitals: Hospital[];
  compact?: boolean;
}

const statusConfig = {
  open: { color: 'bg-primary', text: 'text-primary', label: 'Open' },
  busy: { color: 'bg-secondary', text: 'text-secondary', label: 'Busy' },
  divert: { color: 'bg-destructive', text: 'text-destructive', label: 'Divert' },
};

function CapacityBar({ capacity, status }: { capacity: number; status: Hospital['status'] }) {
  const getBarColor = () => {
    if (status === 'divert') return 'bg-destructive';
    if (capacity > 80) return 'bg-secondary';
    if (capacity > 60) return 'bg-secondary/80';
    return 'bg-primary';
  };

  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${capacity}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full ${getBarColor()} rounded-full`}
      />
    </div>
  );
}

export default function HospitalStatus({ hospitals, compact = false }: HospitalStatusProps) {
  const sortedHospitals = [...hospitals].sort((a, b) => {
    if (a.status === 'divert' && b.status !== 'divert') return 1;
    if (a.status !== 'divert' && b.status === 'divert') return -1;
    return a.capacity - b.capacity;
  });

  if (compact) {
    return (
      <div className="space-y-3">
        {sortedHospitals.map((hospital, index) => {
          const config = statusConfig[hospital.status];
          return (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className={`w-2 h-2 rounded-full ${config.color}`} />
              <span className="text-foreground/80 text-sm flex-1 truncate">{hospital.name}</span>
              <span className="text-muted-foreground text-sm font-mono">{hospital.eta} min</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedHospitals.map((hospital, index) => {
        const config = statusConfig[hospital.status];
        
        return (
          <motion.div
            key={hospital.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-primary/30 shadow-card ${
              hospital.status === 'divert'
                ? 'bg-destructive/5 border-destructive/20'
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.color}/10`}>
                  <Building2 size={18} className={config.text} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{hospital.name}</h4>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    {hospital.traumaLevel && (
                      <span className="flex items-center gap-1">
                        <Shield size={12} />
                        Level {hospital.traumaLevel}
                      </span>
                    )}
                    <span>{hospital.distance} mi</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold ${config.text} uppercase`}>
                  {config.label}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">ED Capacity</span>
                <span className="text-foreground/60 font-mono">{hospital.capacity}%</span>
              </div>
              <CapacityBar capacity={hospital.capacity} status={hospital.status} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock size={14} />
                <span>{hospital.eta} min</span>
              </div>
              {hospital.status === 'divert' && hospital.divertReason && (
                <div className="flex items-center gap-1 text-destructive text-xs">
                  <AlertCircle size={12} />
                  <span>{hospital.divertReason}</span>
                </div>
              )}
              <ChevronRight size={16} className="text-muted-foreground/40" />
            </div>

            {hospital.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
                {hospital.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
