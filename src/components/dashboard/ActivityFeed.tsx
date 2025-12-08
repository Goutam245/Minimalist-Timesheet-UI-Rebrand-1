import { Clock, CheckCircle, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "time_logged" | "approved" | "submitted" | "rejected";
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "time_logged",
    title: "Time Logged",
    description: "8 hours on Website Redesign",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "approved",
    title: "Timesheet Approved",
    description: "Week of Dec 1-7 approved by Manager",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "submitted",
    title: "Timesheet Submitted",
    description: "Week of Dec 1-7 submitted for approval",
    time: "3 hours ago",
  },
  {
    id: "4",
    type: "rejected",
    title: "Entry Requires Changes",
    description: "Dec 5 entry needs clarification",
    time: "Yesterday",
  },
];

const iconMap = {
  time_logged: Clock,
  approved: CheckCircle,
  submitted: FileText,
  rejected: AlertCircle,
};

const colorMap = {
  time_logged: "bg-primary/10 text-primary",
  approved: "bg-success/10 text-success",
  submitted: "bg-info/10 text-info",
  rejected: "bg-warning/10 text-warning",
};

export function ActivityFeed() {
  return (
    <div className="card-elevated p-6 animate-slide-up">
      <h3 className="text-h3 text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  colorMap[activity.type]
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="text-small text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-tiny text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
