import { motion } from 'framer-motion';
import { Flame, Truck, MapPin, Clock, Users } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { MOCK_FIRE_INCIDENTS, MOCK_APPARATUS, FireIncident, Apparatus } from '../../types/dashboard';

function IncidentCard({ incident, index }: { incident: FireIncident; index: number }) {
  const minutesAgo = Math.floor((Date.now() - incident.dispatchTime.getTime()) / 60000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border shadow-card ${
        incident.priority === 1 ? 'bg-destructive/5 border-destructive/20' : 'bg-card border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground">{incident.id}</span>
        <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded">
          Alarm {incident.alarmLevel}
        </span>
      </div>
      <h3 className="font-semibold text-foreground mb-2">{incident.type}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <MapPin size={14} />
        <span>{incident.address}</span>
      </div>
      <p className="text-sm text-foreground/70 mb-3">{incident.notes}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{minutesAgo}m ago</span>
        </div>
        <span>{incident.assignedUnits.length} units</span>
      </div>
    </motion.div>
  );
}

function ApparatusRow({ apparatus, index }: { apparatus: Apparatus; index: number }) {
  const statusColors: Record<string, string> = {
    available: 'bg-primary',
    responding: 'bg-secondary',
    on_scene: 'bg-destructive',
    busy: 'bg-muted-foreground',
    offline: 'bg-muted-foreground/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border"
    >
      <div className={`w-2 h-2 rounded-full ${statusColors[apparatus.status]}`} />
      <span className="font-mono font-semibold text-foreground w-12">{apparatus.callSign}</span>
      <span className="text-sm text-muted-foreground capitalize flex-1">{apparatus.status.replace('_', ' ')}</span>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Users size={12} />
        <span>{apparatus.crew}</span>
      </div>
    </motion.div>
  );
}

export default function FireDashboard() {
  const availableCount = MOCK_APPARATUS.filter(a => a.status === 'available').length;
  const activeCount = MOCK_APPARATUS.filter(a => a.status === 'on_scene' || a.status === 'responding').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fire Operations</h1>
          <p className="text-muted-foreground text-sm">Real-time incident and apparatus tracking</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Incidents', value: MOCK_FIRE_INCIDENTS.length, icon: Flame },
            { label: 'Units Deployed', value: activeCount, icon: Truck },
            { label: 'Available', value: availableCount, icon: Truck },
            { label: 'Personnel', value: MOCK_APPARATUS.reduce((s, a) => s + a.crew, 0), icon: Users },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-card rounded-xl border border-border shadow-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Active Incidents
            </h2>
            <div className="space-y-3">
              {MOCK_FIRE_INCIDENTS.map((incident, i) => (
                <IncidentCard key={incident.id} incident={incident} index={i} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Apparatus Status
            </h2>
            <div className="space-y-2">
              {MOCK_APPARATUS.map((apparatus, i) => (
                <ApparatusRow key={apparatus.id} apparatus={apparatus} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
