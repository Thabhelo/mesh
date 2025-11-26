import { motion } from 'framer-motion';
import { Phone, Clock, Flame, Shield, Ambulance, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { MOCK_DISPATCH_QUEUE, QueuedCall } from '../../types/dashboard';

const agencyIcons = { fire: Flame, police: Shield, ems: Ambulance };
const agencyColors = { fire: 'text-destructive', police: 'text-blue-500', ems: 'text-primary' };

function CallQueueItem({ call, index }: { call: QueuedCall; index: number }) {
  const minutesAgo = Math.floor((Date.now() - call.receivedTime.getTime()) / 60000);
  const statusColors: Record<string, string> = {
    pending: 'bg-destructive text-white',
    dispatched: 'bg-secondary text-white',
    en_route: 'bg-primary text-white',
    on_scene: 'bg-muted-foreground text-white',
    closed: 'bg-muted text-muted-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`p-4 rounded-xl border shadow-card ${
        call.status === 'pending' ? 'bg-destructive/5 border-destructive/20' : 'bg-card border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground">{call.id}</span>
        <span className={`px-2 py-0.5 text-xs font-medium rounded capitalize ${statusColors[call.status]}`}>
          {call.status}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground">{call.type}</h3>
        <span className="text-xs text-muted-foreground">P{call.priority}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{call.address}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>{minutesAgo}m</span>
        </div>
        <div className="flex items-center gap-1">
          {call.assignedAgency.map((agency) => {
            const Icon = agencyIcons[agency];
            return <Icon key={agency} size={14} className={agencyColors[agency]} />;
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function DispatchDashboard() {
  const pendingCalls = MOCK_DISPATCH_QUEUE.filter(c => c.status === 'pending').length;
  const activeCalls = MOCK_DISPATCH_QUEUE.filter(c => c.status !== 'closed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dispatch Center</h1>
            <p className="text-muted-foreground text-sm">911 call queue and coordination</p>
          </div>
          {pendingCalls > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 border border-destructive/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm font-medium text-destructive">{pendingCalls} pending</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Calls', value: activeCalls, icon: Phone },
            { label: 'Pending', value: pendingCalls, icon: AlertCircle },
            { label: 'Fire Units', value: 4, icon: Flame },
            { label: 'Avg Response', value: '4.2m', icon: Clock },
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

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Call Queue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {MOCK_DISPATCH_QUEUE.map((call, i) => (
              <CallQueueItem key={call.id} call={call} index={i} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
