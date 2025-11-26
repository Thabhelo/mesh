import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, MapPin, AlertTriangle, Navigation, Phone } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { ActiveCall, CallPriority } from '../../types/ems';

// Extended mock data for calls list
const MOCK_CALLS: ActiveCall[] = [
  {
    id: 'call-001',
    type: 'Chest Pain',
    priority: 'critical',
    address: '1847 Oak Street, Apt 4B',
    coordinates: { lat: 40.7128, lng: -74.006 },
    dispatchTime: new Date(Date.now() - 4 * 60 * 1000),
    eta: 4,
    notes: '67yo male, history of cardiac issues, conscious and breathing',
    callerInfo: 'Spouse on scene',
  },
  {
    id: 'call-002',
    type: 'Motor Vehicle Accident',
    priority: 'urgent',
    address: 'I-95 South, Mile Marker 42',
    coordinates: { lat: 40.7200, lng: -74.010 },
    dispatchTime: new Date(Date.now() - 12 * 60 * 1000),
    eta: 8,
    notes: '2 vehicles involved, unknown injuries, PD on scene',
    callerInfo: 'Bystander',
  },
  {
    id: 'call-003',
    type: 'Fall Injury',
    priority: 'routine',
    address: '523 Maple Avenue',
    coordinates: { lat: 40.7050, lng: -74.002 },
    dispatchTime: new Date(Date.now() - 18 * 60 * 1000),
    eta: 12,
    notes: '45yo female, fell from ladder, possible arm fracture',
    callerInfo: 'Patient',
  },
  {
    id: 'call-004',
    type: 'Difficulty Breathing',
    priority: 'urgent',
    address: '890 Pine Street, Unit 12',
    coordinates: { lat: 40.7180, lng: -74.008 },
    dispatchTime: new Date(Date.now() - 6 * 60 * 1000),
    eta: 5,
    notes: '72yo female, COPD history, O2 sat unknown',
    callerInfo: 'Caregiver',
  },
  {
    id: 'call-005',
    type: 'Seizure',
    priority: 'critical',
    address: '234 Commerce Boulevard',
    coordinates: { lat: 40.7100, lng: -74.015 },
    dispatchTime: new Date(Date.now() - 2 * 60 * 1000),
    eta: 3,
    notes: '28yo male, active seizure, no known history',
    callerInfo: 'Coworker',
  },
];

const priorityConfig: Record<CallPriority, { bg: string; border: string; badge: string; text: string }> = {
  critical: {
    bg: 'bg-destructive/5',
    border: 'border-destructive/20',
    badge: 'bg-destructive',
    text: 'text-destructive',
  },
  urgent: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    badge: 'bg-secondary',
    text: 'text-secondary',
  },
  routine: {
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    badge: 'bg-primary',
    text: 'text-primary',
  },
};

function CallCard({ call, index }: { call: ActiveCall; index: number }) {
  const config = priorityConfig[call.priority];
  const minutesSinceDispatch = Math.floor(
    (Date.now() - call.dispatchTime.getTime()) / 60000
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${config.bg} ${config.border} border rounded-2xl p-5 shadow-card`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {call.priority === 'critical' && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
            </span>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${config.badge} text-white`}
              >
                {call.priority}
              </span>
              <span className="text-muted-foreground text-xs font-mono">{call.id}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle size={20} className={config.text} />
              {call.type}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{call.eta} min</p>
          <p className="text-xs text-muted-foreground">ETA</p>
        </div>
      </div>

      <div className="flex items-start gap-2 mb-4 p-3 bg-muted/50 rounded-xl">
        <MapPin size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-sm text-foreground">{call.address}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{minutesSinceDispatch}m ago</span>
          </div>
          {call.callerInfo && (
            <span>Caller: {call.callerInfo}</span>
          )}
        </div>
      </div>

      <p className="text-sm text-foreground/70 mb-4">{call.notes}</p>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors text-sm">
          <Navigation size={16} />
          <span>Navigate</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition-colors border border-border text-sm">
          <Phone size={16} />
          <span>Call</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function EMSCalls() {
  const [filter, setFilter] = useState<'all' | CallPriority>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = MOCK_CALLS.filter((call) => {
    const matchesFilter = filter === 'all' || call.priority === filter;
    const matchesSearch =
      searchQuery === '' ||
      call.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const callCounts = {
    all: MOCK_CALLS.length,
    critical: MOCK_CALLS.filter((c) => c.priority === 'critical').length,
    urgent: MOCK_CALLS.filter((c) => c.priority === 'urgent').length,
    routine: MOCK_CALLS.filter((c) => c.priority === 'routine').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Active Calls</h1>
            <p className="text-muted-foreground text-sm">
              {MOCK_CALLS.length} active calls in your district
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Live updates</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search calls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'critical', 'urgent', 'routine'] as const).map((priority) => (
              <button
                key={priority}
                onClick={() => setFilter(priority)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === priority
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                <span className="ml-1.5 text-xs opacity-70">({callCounts[priority]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCalls.map((call, index) => (
            <CallCard key={call.id} call={call} index={index} />
          ))}
        </div>

        {filteredCalls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No calls match your search criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

