import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import HospitalStatus from '../../components/dashboard/HospitalStatus';
import { MOCK_HOSPITALS } from '../../types/ems';

export default function EMSHospitals() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hospitals</h1>
            <p className="text-muted-foreground text-sm">
              Real-time ED capacity and facility status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors text-sm">
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search hospitals..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors text-sm">
            <Filter size={14} />
            <span>Filters</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Facilities', value: MOCK_HOSPITALS.length, color: 'text-foreground' },
            { label: 'Open', value: MOCK_HOSPITALS.filter(h => h.status === 'open').length, color: 'text-primary' },
            { label: 'Busy', value: MOCK_HOSPITALS.filter(h => h.status === 'busy').length, color: 'text-secondary' },
            { label: 'On Divert', value: MOCK_HOSPITALS.filter(h => h.status === 'divert').length, color: 'text-destructive' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-card rounded-xl border border-border shadow-card"
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Hospital List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HospitalStatus hospitals={MOCK_HOSPITALS} />
        </div>
      </div>
    </DashboardLayout>
  );
}
