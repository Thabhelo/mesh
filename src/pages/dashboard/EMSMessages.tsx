import DashboardLayout from '../../components/dashboard/DashboardLayout';
import MessagingPanel from '../../components/dashboard/MessagingPanel';
import { MOCK_MESSAGES } from '../../types/ems';

export default function EMSMessages() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground text-sm">
              Communications with dispatch, units, and facilities
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 min-h-[600px] shadow-card">
          <MessagingPanel messages={MOCK_MESSAGES} />
        </div>
      </div>
    </DashboardLayout>
  );
}
