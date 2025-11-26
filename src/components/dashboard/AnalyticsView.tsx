import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  Target,
  Ambulance,
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  suffix?: string;
}

function MetricCard({ title, value, change, icon: Icon, suffix }: MetricCardProps) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-card rounded-2xl border border-border shadow-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-muted rounded-xl">
          <Icon size={20} className="text-muted-foreground" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? 'text-primary' : 'text-destructive'
          }`}
        >
          <TrendIcon size={14} />
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">
        {value}
        {suffix && <span className="text-lg font-normal text-muted-foreground ml-1">{suffix}</span>}
      </p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </motion.div>
  );
}

function PerformanceChart() {
  const data = [
    { day: 'Mon', value: 5.8, target: 6 },
    { day: 'Tue', value: 6.2, target: 6 },
    { day: 'Wed', value: 5.5, target: 6 },
    { day: 'Thu', value: 7.1, target: 6 },
    { day: 'Fri', value: 6.8, target: 6 },
    { day: 'Sat', value: 5.2, target: 6 },
    { day: 'Sun', value: 4.9, target: 6 },
  ];

  const maxValue = 10;
  const chartHeight = 180;
  const chartWidth = 500;
  const barWidth = 50;
  const gap = 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-6 bg-card rounded-2xl border border-border shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground mb-1">Response Time Trend</h3>
          <p className="text-sm text-muted-foreground">Average response time by day</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-secondary" />
            <span className="text-muted-foreground">Target (6 min)</span>
          </div>
        </div>
      </div>

      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* Target line */}
        <line
          x1="0"
          y1={chartHeight - (6 / maxValue) * chartHeight}
          x2={chartWidth}
          y2={chartHeight - (6 / maxValue) * chartHeight}
          stroke="hsl(39 100% 57%)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * chartHeight;
          const x = i * (barWidth + gap) + gap;
          const y = chartHeight - barHeight;
          const isAboveTarget = d.value > d.target;

          return (
            <g key={d.day}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={isAboveTarget ? 'hsl(0 84% 60%)' : 'hsl(25 95% 53%)'}
                opacity={0.9}
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 16}
                textAnchor="middle"
                fill="hsl(215 16% 47%)"
                fontSize="12"
              >
                {d.day}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fill="hsl(222 47% 11% / 0.7)"
                fontSize="11"
                fontWeight="500"
              >
                {d.value}m
              </text>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

function CallVolumeChart() {
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    calls: Math.floor(Math.random() * 8) + 2,
  }));

  const maxCalls = Math.max(...data.map((d) => d.calls));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="p-6 bg-card rounded-2xl border border-border shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground mb-1">Call Volume Distribution</h3>
          <p className="text-sm text-muted-foreground">Calls by hour of day (last 30 days)</p>
        </div>
      </div>

      <div className="flex items-end gap-1 h-32">
        {data.map((d, i) => {
          const height = (d.calls / maxCalls) * 100;
          const currentHour = new Date().getHours();

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1"
              title={`${d.hour}:00 - ${d.calls} calls`}
            >
              <div
                className={`w-full rounded-t transition-all ${
                  i === currentHour ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                }`}
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
        <span>12AM</span>
        <span>6AM</span>
        <span>12PM</span>
        <span>6PM</span>
        <span>11PM</span>
      </div>
    </motion.div>
  );
}

function DestinationBreakdown() {
  const destinations = [
    { name: 'Memorial General', percentage: 35, color: 'hsl(25 95% 53%)' },
    { name: "St. Mary's Medical", percentage: 28, color: 'hsl(39 100% 57%)' },
    { name: 'University Hospital', percentage: 22, color: 'hsl(25 95% 63%)' },
    { name: 'County General', percentage: 10, color: 'hsl(39 100% 67%)' },
    { name: 'Other', percentage: 5, color: 'hsl(215 16% 47%)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 bg-card rounded-2xl border border-border shadow-card"
    >
      <h3 className="font-semibold text-foreground mb-4">Transport Destinations</h3>
      <div className="space-y-3">
        {destinations.map((dest, i) => (
          <div key={dest.name}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-foreground/70">{dest.name}</span>
              <span className="text-muted-foreground font-mono">{dest.percentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dest.percentage}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: dest.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Response Time"
          value="5.8"
          suffix="min"
          change={-8}
          icon={Clock}
        />
        <MetricCard
          title="Calls This Week"
          value={89}
          change={12}
          icon={Activity}
        />
        <MetricCard
          title="On-Time Rate"
          value="94"
          suffix="%"
          change={3}
          icon={Target}
        />
        <MetricCard
          title="Active Units"
          value={6}
          change={0}
          icon={Ambulance}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <CallVolumeChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DestinationBreakdown />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 bg-card rounded-2xl border border-border shadow-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Unit Utilization</h3>
          <div className="space-y-4">
            {['M-42', 'M-38', 'M-51', 'M-44'].map((unit, i) => {
              const utilization = 60 + Math.random() * 30;
              return (
                <div key={unit} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground w-12">{unit}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${utilization}%` }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`h-full rounded-full ${
                        utilization > 80 ? 'bg-secondary' : 'bg-primary'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {utilization.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-primary/5 border border-primary/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Performance Summary</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your unit is performing{' '}
            <span className="text-primary font-medium">above average</span> this week.
            Response times are 8% faster than the district average, and patient handoff
            efficiency has improved by 12% compared to last month.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
