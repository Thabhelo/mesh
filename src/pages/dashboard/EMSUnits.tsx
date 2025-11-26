import { motion } from 'framer-motion';
import { Search, Filter, Radio } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import NearbyUnits from '../../components/dashboard/NearbyUnits';
import { MOCK_UNITS } from '../../types/ems';

export default function EMSUnits() {
  const statusCounts = {
    available: MOCK_UNITS.filter(u => u.status === 'available').length,
    responding: MOCK_UNITS.filter(u => u.status === 'responding').length,
    on_scene: MOCK_UNITS.filter(u => u.status === 'on_scene').length,
    transporting: MOCK_UNITS.filter(u => u.status === 'transporting').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Units</h1>
            <p className="text-muted-foreground text-sm">
              Track all EMS, Fire, and Police units in your area
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-sm font-medium shadow-[0_4px_20px_hsl(25_95%_53%/0.3)]">
            <Radio size={16} />
            <span>Broadcast</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search units..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors text-sm">
            <Filter size={14} />
            <span>Filters</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Available', value: statusCounts.available, color: 'bg-primary' },
            { label: 'Responding', value: statusCounts.responding, color: 'bg-secondary' },
            { label: 'On Scene', value: statusCounts.on_scene, color: 'bg-secondary/80' },
            { label: 'Transporting', value: statusCounts.transporting, color: 'bg-primary/70' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-card rounded-xl border border-border shadow-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2.5 h-2.5 rounded-full ${stat.color}`} />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Map and List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-card"
          >
            <h3 className="font-semibold text-foreground mb-4">Area Map</h3>
            <NearbyUnits units={MOCK_UNITS} showMap={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-card"
          >
            <h3 className="font-semibold text-foreground mb-4">All Units</h3>
            <NearbyUnits units={MOCK_UNITS} showMap={false} />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
