import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { ProjectsBreakdown } from "@/components/dashboard/ProjectsBreakdown";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Welcome back, Sarah">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Hours This Week"
          value="39h"
          subtitle="of 40h target"
          trend={{ value: 12, label: "vs last week" }}
          icon={<Clock className="w-5 h-5" />}
        />
        <MetricCard
          title="Billable Hours"
          value="33.5h"
          subtitle="86% billable rate"
          trend={{ value: 5, label: "vs last week" }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Pending Approvals"
          value="2"
          subtitle="Awaiting review"
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <MetricCard
          title="Approved Timesheets"
          value="47"
          subtitle="This month"
          trend={{ value: 8, label: "vs last month" }}
          icon={<CheckCircle className="w-5 h-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2 space-y-6">
          <WeeklyChart />
          <ProjectsBreakdown />
        </div>

        {/* Right Column - Activity & Deadlines */}
        <div className="space-y-6">
          <ActivityFeed />
          <UpcomingDeadlines />
        </div>
      </div>
    </AppLayout>
  );
}
