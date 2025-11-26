import { motion } from 'framer-motion';
import { Building2, TrendingUp, TrendingDown, Users, DollarSign, Clock, Activity } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

function MetricCard({ label, value, change, icon: Icon }: { 
  label: string; value: string; change: number; icon: React.ElementType 
}) {
  const isPositive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-xl border border-border shadow-card"
    >
      <div className="flex items-center justify-between mb-3">
        <Icon size={16} className="text-muted-foreground" />
        <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-primary' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const departments = [
    { name: 'Fire Department', budget: '$4.2M', spent: 68, personnel: 142 },
    { name: 'Police Department', budget: '$8.7M', spent: 72, personnel: 234 },
    { name: 'EMS Services', budget: '$2.8M', spent: 81, personnel: 86 },
    { name: 'Dispatch Center', budget: '$1.4M', spent: 65, personnel: 42 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administration</h1>
          <p className="text-muted-foreground text-sm">City-wide public safety overview</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Budget" value="$17.1M" change={4} icon={DollarSign} />
          <MetricCard label="Personnel" value="504" change={2} icon={Users} />
          <MetricCard label="Avg Response" value="5.4m" change={-8} icon={Clock} />
          <MetricCard label="Incidents MTD" value="1,247" change={-3} icon={Activity} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Department Budgets
          </h2>
          <div className="space-y-3">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{dept.name}</p>
                  <p className="text-sm text-muted-foreground">{dept.personnel} personnel</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{dept.budget}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${dept.spent > 80 ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${dept.spent}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{dept.spent}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 bg-primary/5 border border-primary/10 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-primary" />
            <span className="font-medium text-foreground">Performance Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Response times improved <span className="text-primary font-medium">8%</span> this month. 
            Budget utilization on track at <span className="text-primary font-medium">72%</span> for Q4.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
