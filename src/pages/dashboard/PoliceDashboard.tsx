import { motion } from 'framer-motion';
import { Shield, Car, MapPin, Clock, User } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { MOCK_POLICE_CALLS, MOCK_POLICE_UNITS, Incident, Unit } from '../../types/dashboard';

function CallCard({ call, index }: { call: Incident; index: number }) {
  const minutesAgo = Math.floor((Date.now() - call.dispatchTime.getTime()) / 60000);
  const priorityColors = {
    1: 'bg-destructive/10 text-destructive',
    2: 'bg-secondary/10 text-secondary',
    3: 'bg-muted text-muted-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border shadow-card ${
        call.priority === 1 ? 'bg-destructive/5 border-destructive/20' : 'bg-card border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground">{call.id}</span>
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${priorityColors[call.priority]}`}>
          P{call.priority}
        </span>
      </div>
      <h3 className="font-semibold text-foreground mb-2">{call.type}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <MapPin size={14} />
        <span>{call.address}</span>
      </div>
      <p className="text-sm text-foreground/70 mb-3">{call.notes}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{minutesAgo}m ago</span>
        </div>
        <span>{call.assignedUnits.join(', ')}</span>
      </div>
    </motion.div>
  );
}

function UnitRow({ unit, index }: { unit: Unit; index: number }) {
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
      <div className={`w-2 h-2 rounded-full ${statusColors[unit.status]}`} />
      <span className="font-mono font-semibold text-foreground w-12">{unit.callSign}</span>
      <span className="text-sm text-foreground flex-1">{unit.officer}</span>
      <span className="text-sm text-muted-foreground capitalize">{unit.status.replace('_', ' ')}</span>
    </motion.div>
  );
}

export default function PoliceDashboard() {
  const availableCount = MOCK_POLICE_UNITS.filter(u => u.status === 'available').length;
  const activeCount = MOCK_POLICE_UNITS.filter(u => u.status === 'on_scene' || u.status === 'responding').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Police Operations</h1>
          <p className="text-muted-foreground text-sm">Active calls and unit deployment</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Calls', value: MOCK_POLICE_CALLS.length, icon: Shield },
            { label: 'Units Deployed', value: activeCount, icon: Car },
            { label: 'Available', value: availableCount, icon: Car },
            { label: 'Total Officers', value: MOCK_POLICE_UNITS.length, icon: User },
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
              Active Calls
            </h2>
            <div className="space-y-3">
              {MOCK_POLICE_CALLS.map((call, i) => (
                <CallCard key={call.id} call={call} index={i} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Unit Status
            </h2>
            <div className="space-y-2">
              {MOCK_POLICE_UNITS.map((unit, i) => (
                <UnitRow key={unit.id} unit={unit} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
