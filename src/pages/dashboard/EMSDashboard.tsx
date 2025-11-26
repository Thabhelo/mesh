import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ActiveCallCard from '../../components/dashboard/ActiveCallCard';
import HospitalStatus from '../../components/dashboard/HospitalStatus';
import NearbyUnits from '../../components/dashboard/NearbyUnits';
import ShiftIntel from '../../components/dashboard/ShiftIntel';
import MessagingPanel from '../../components/dashboard/MessagingPanel';
import {
  MOCK_ACTIVE_CALL,
  MOCK_HOSPITALS,
  MOCK_UNITS,
  MOCK_SHIFT_STATS,
  MOCK_MESSAGES,
} from '../../types/ems';

export default function EMSDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Real-time operational overview for your shift
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Last updated:</span>
            <span className="text-foreground/70">Just now</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse ml-2" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Active Call & Shift Intel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Call */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Active Call
                </h2>
              </div>
              <ActiveCallCard call={MOCK_ACTIVE_CALL} />
            </div>

            {/* Shift Intel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Shift Intel
                </h2>
              </div>
              <ShiftIntel stats={MOCK_SHIFT_STATS} />
            </motion.div>
          </div>

          {/* Middle Column - Hospitals */}
          <div className="lg:col-span-4 space-y-6">
            {/* Hospital Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Hospital Status
                </h2>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                  <span>View all</span>
                  <ChevronRight size={14} />
                </button>
              </div>
              <HospitalStatus hospitals={MOCK_HOSPITALS} />
            </motion.div>
          </div>

          {/* Right Column - Units & Messages */}
          <div className="lg:col-span-4 space-y-6">
            {/* Nearby Units */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Nearby Units
                </h2>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                  <span>Full map</span>
                  <ChevronRight size={14} />
                </button>
              </div>
              <NearbyUnits units={MOCK_UNITS} />
            </motion.div>

            {/* Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={14} />
                  Messages
                </h2>
                {MOCK_MESSAGES.filter((m) => !m.read).length > 0 && (
                  <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full font-medium">
                    {MOCK_MESSAGES.filter((m) => !m.read).length} new
                  </span>
                )}
              </div>
              <MessagingPanel messages={MOCK_MESSAGES} compact />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
