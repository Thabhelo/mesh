import { motion } from 'framer-motion';
import { Activity, Clock, TrendingUp, Zap } from 'lucide-react';
import { ShiftStats } from '../../types/ems';

interface ShiftIntelProps {
  stats: ShiftStats;
}

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const height = 60;
  const width = 280;
  const barWidth = width / data.length - 1;

  const currentHour = new Date().getHours();

  return (
    <div className="relative">
      <svg width={width} height={height} className="w-full h-auto">
        {data.map((value, i) => {
          const barHeight = (value / max) * (height - 10);
          const x = i * (barWidth + 1);
          const y = height - barHeight;
          const isCurrent = i === currentHour;
          const isPast = i < currentHour;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={2}
                fill={
                  isCurrent
                    ? 'hsl(25 95% 53%)'
                    : isPast
                    ? 'hsl(25 95% 53% / 0.3)'
                    : 'hsl(25 100% 90%)'
                }
              />
              {isCurrent && (
                <circle cx={x + barWidth / 2} cy={y - 4} r={2} fill="hsl(25 95% 53%)" />
              )}
            </g>
          );
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
        <span>12AM</span>
        <span>6AM</span>
        <span>12PM</span>
        <span>6PM</span>
        <span>12AM</span>
      </div>
    </div>
  );
}

export default function ShiftIntel({ stats }: ShiftIntelProps) {
  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
            <Activity size={14} />
            <span>Calls Today</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{stats.callsToday}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="p-4 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
            <Clock size={14} />
            <span>Avg Response</span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {stats.avgResponseTime}
            <span className="text-sm font-normal text-muted-foreground ml-1">min</span>
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 bg-card rounded-xl border border-border shadow-card"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <TrendingUp size={14} />
            <span>24h Call Pattern</span>
          </div>
          <div className="flex items-center gap-1 text-secondary text-xs font-medium">
            <Zap size={12} />
            <span>Peak: {stats.peakHours}</span>
          </div>
        </div>
        <MiniChart data={stats.hourlyPattern} />
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-4 bg-primary/5 border border-primary/10 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Zap size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-foreground font-medium mb-1">Shift Insight</p>
            <p className="text-xs text-muted-foreground">
              Call volume is{' '}
              <span className="text-primary font-medium">12% below average</span> for
              this time. Consider repositioning to District 4 for better coverage.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
