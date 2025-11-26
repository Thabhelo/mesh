import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, AlertTriangle, Navigation, User, FileText } from 'lucide-react';
import { ActiveCall } from '../../types/ems';

interface ActiveCallCardProps {
  call: ActiveCall;
}

const priorityConfig = {
  critical: {
    bg: 'bg-destructive/5',
    border: 'border-destructive/20',
    badge: 'bg-destructive',
    text: 'text-destructive',
    pulse: true,
  },
  urgent: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    badge: 'bg-secondary',
    text: 'text-secondary',
    pulse: false,
  },
  routine: {
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    badge: 'bg-primary',
    text: 'text-primary',
    pulse: false,
  },
};

export default function ActiveCallCard({ call }: ActiveCallCardProps) {
  const config = priorityConfig[call.priority];
  const minutesSinceDispatch = Math.floor(
    (Date.now() - call.dispatchTime.getTime()) / 60000
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bg} ${config.border} border rounded-2xl p-5 relative overflow-hidden shadow-card`}
    >
      {/* Priority indicator */}
      {config.pulse && (
        <div className="absolute top-4 right-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${config.badge} text-white`}
            >
              {call.priority}
            </span>
            <span className="text-muted-foreground text-xs">ID: {call.id}</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle size={24} className={config.text} />
            {call.type}
          </h3>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-3 mb-4 p-3 bg-muted/50 rounded-xl">
        <MapPin size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-foreground font-medium">{call.address}</p>
          <p className="text-muted-foreground text-sm">
            {call.coordinates.lat.toFixed(4)}, {call.coordinates.lng.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Clock size={14} />
            <span>ETA</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {call.eta} <span className="text-sm font-normal text-muted-foreground">min</span>
          </p>
        </div>
        <div className="p-3 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Clock size={14} />
            <span>Dispatch</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {minutesSinceDispatch}{' '}
            <span className="text-sm font-normal text-muted-foreground">min ago</span>
          </p>
        </div>
      </div>

      {/* Notes */}
      <div className="p-3 bg-muted/50 rounded-xl mb-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
          <FileText size={14} />
          <span>Notes</span>
        </div>
        <p className="text-foreground/80 text-sm">{call.notes}</p>
      </div>

      {/* Caller Info */}
      {call.callerInfo && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <User size={14} />
          <span>{call.callerInfo}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-[0_4px_20px_hsl(25_95%_53%/0.3)]">
          <Navigation size={18} />
          <span>Navigate</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-colors border border-border">
          <Phone size={18} />
        </button>
      </div>
    </motion.div>
  );
}
