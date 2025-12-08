import { Calendar, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deadline {
  id: string;
  title: string;
  date: string;
  daysLeft: number;
  project: string;
}

const deadlines: Deadline[] = [
  { id: "1", title: "Submit Weekly Timesheet", date: "Dec 8", daysLeft: 0, project: "All Projects" },
  { id: "2", title: "Project Milestone", date: "Dec 12", daysLeft: 4, project: "Website Redesign" },
  { id: "3", title: "Monthly Report Due", date: "Dec 15", daysLeft: 7, project: "Reporting" },
];

export function UpcomingDeadlines() {
  return (
    <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-h3 text-foreground mb-4">Upcoming Deadlines</h3>
      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border transition-colors",
              deadline.daysLeft === 0
                ? "bg-destructive/5 border-destructive/20"
                : "bg-background border-border hover:bg-background-secondary"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                deadline.daysLeft === 0
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              )}
            >
              {deadline.daysLeft === 0 ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body font-medium text-foreground truncate">
                {deadline.title}
              </p>
              <p className="text-small text-muted-foreground">{deadline.project}</p>
            </div>
            <div className="text-right">
              <p className="text-small font-medium text-foreground">{deadline.date}</p>
              <p
                className={cn(
                  "text-tiny",
                  deadline.daysLeft === 0 ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {deadline.daysLeft === 0 ? "Due today" : `${deadline.daysLeft} days left`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
