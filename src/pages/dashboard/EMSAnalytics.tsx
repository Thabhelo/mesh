import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AnalyticsView from '../../components/dashboard/AnalyticsView';

export default function EMSAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground text-sm">
              Performance metrics and operational insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 bg-card border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        <AnalyticsView />
      </div>
    </DashboardLayout>
  );
}
