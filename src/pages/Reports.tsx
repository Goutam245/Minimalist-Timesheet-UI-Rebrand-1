import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  FileText,
  FileSpreadsheet,
  Printer,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const monthlyData = [
  { month: "Jul", hours: 168, billable: 145 },
  { month: "Aug", hours: 175, billable: 160 },
  { month: "Sep", hours: 160, billable: 140 },
  { month: "Oct", hours: 180, billable: 165 },
  { month: "Nov", hours: 172, billable: 158 },
  { month: "Dec", hours: 156, billable: 144 },
];

const projectData = [
  { name: "Website Redesign", value: 45, color: "hsl(212, 92%, 58%)" },
  { name: "Mobile App", value: 25, color: "hsl(168, 71%, 60%)" },
  { name: "API Integration", value: 15, color: "hsl(252, 68%, 60%)" },
  { name: "Documentation", value: 10, color: "hsl(38, 92%, 55%)" },
  { name: "Other", value: 5, color: "hsl(220, 9%, 60%)" },
];

const teamData = [
  { name: "Alex Thompson", hours: 168, billable: 155, utilization: 92 },
  { name: "Emily Chen", hours: 160, billable: 160, utilization: 100 },
  { name: "Michael Park", hours: 152, billable: 120, utilization: 79 },
  { name: "Sarah Wilson", hours: 176, billable: 158, utilization: 90 },
];

export default function Reports() {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 10, 1),
    to: new Date(2024, 11, 31),
  });

  return (
    <AppLayout title="Reports" subtitle="Analyze your time tracking data">
      {/* Report Controls */}
      <div className="card-elevated p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="project">By Project</SelectItem>
              <SelectItem value="team">By Team Member</SelectItem>
              <SelectItem value="client">By Client</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 min-w-[240px] justify-start">
                <CalendarIcon className="w-4 h-4" />
                {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
                initialFocus
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="website">Website Redesign</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="api">API Integration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-elevated p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-small text-muted-foreground">Total Hours</span>
          </div>
          <p className="text-display font-mono text-foreground">1,011h</p>
          <p className="text-small text-success flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +8% vs previous period
          </p>
        </div>

        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-small text-muted-foreground">Billable Hours</span>
          </div>
          <p className="text-display font-mono text-foreground">912h</p>
          <p className="text-small text-muted-foreground mt-1">90% billable rate</p>
        </div>

        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-small text-muted-foreground">Team Members</span>
          </div>
          <p className="text-display font-mono text-foreground">4</p>
          <p className="text-small text-muted-foreground mt-1">Active this period</p>
        </div>

        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-small text-muted-foreground">Avg. Utilization</span>
          </div>
          <p className="text-display font-mono text-foreground">90%</p>
          <p className="text-small text-success flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +5% vs target
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trends */}
        <div className="card-elevated p-6 animate-slide-up">
          <h3 className="text-h3 text-foreground mb-6">Monthly Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `${value}h`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hours"
                  name="Total Hours"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="billable"
                  name="Billable Hours"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Distribution */}
        <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h3 className="text-h3 text-foreground mb-6">Time by Project</h3>
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {projectData.map((project) => (
                <div key={project.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-body text-foreground">{project.name}</span>
                  </div>
                  <span className="text-body font-mono text-muted-foreground">
                    {project.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Breakdown Table */}
      <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="p-6 border-b border-border">
          <h3 className="text-h3 text-foreground">Team Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-secondary">
                <th className="px-6 py-3 text-left text-small font-medium text-muted-foreground">
                  Team Member
                </th>
                <th className="px-6 py-3 text-center text-small font-medium text-muted-foreground">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-center text-small font-medium text-muted-foreground">
                  Billable Hours
                </th>
                <th className="px-6 py-3 text-center text-small font-medium text-muted-foreground">
                  Utilization
                </th>
                <th className="px-6 py-3 text-center text-small font-medium text-muted-foreground">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, index) => (
                <tr
                  key={member.name}
                  className="border-b border-border last:border-b-0 hover:bg-card-hover transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-body font-medium text-foreground">{member.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-body font-mono text-foreground">{member.hours}h</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-body font-mono text-success">{member.billable}h</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={cn(
                        "text-body font-mono font-medium",
                        member.utilization >= 90 ? "text-success" : member.utilization >= 80 ? "text-warning" : "text-destructive"
                      )}
                    >
                      {member.utilization}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          member.utilization >= 90 ? "bg-success" : member.utilization >= 80 ? "bg-warning" : "bg-destructive"
                        )}
                        style={{ width: `${member.utilization}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
