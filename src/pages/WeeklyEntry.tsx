import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus, Send, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = ["Dec 2", "Dec 3", "Dec 4", "Dec 5", "Dec 6", "Dec 7", "Dec 8"];

const projects = [
  { id: "1", name: "Website Redesign", color: "bg-primary", hours: [8, 7.5, 8, 8, 6, 0, 0] },
  { id: "2", name: "Mobile App", color: "bg-accent", hours: [0, 0, 1, 0, 2, 0, 0] },
  { id: "3", name: "API Integration", color: "bg-info", hours: [0.5, 0, 0, 0, 0, 0, 0] },
];

export default function WeeklyEntry() {
  const [weekOffset, setWeekOffset] = useState(0);

  const getTotalForDay = (dayIndex: number) => {
    return projects.reduce((sum, p) => sum + p.hours[dayIndex], 0);
  };

  const getTotalForProject = (projectIndex: number) => {
    return projects[projectIndex].hours.reduce((sum, h) => sum + h, 0);
  };

  const getWeekTotal = () => {
    return projects.reduce((sum, p) => sum + p.hours.reduce((s, h) => s + h, 0), 0);
  };

  return (
    <AppLayout title="Weekly Time Entry" subtitle="View and edit your weekly hours">
      {/* Week Navigation */}
      <div className="card-elevated p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => setWeekOffset(weekOffset - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-center min-w-[180px]">
            <p className="text-h3 text-foreground">Dec 2 - Dec 8, 2024</p>
            <p className="text-small text-muted-foreground">Week 49</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => setWeekOffset(weekOffset + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(0)}>
            Today
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-small text-muted-foreground">Week Total</p>
            <p className="text-h2 font-mono text-foreground">{getWeekTotal()}h</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Copy className="w-4 h-4" />
            Copy Week
          </Button>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="card-elevated overflow-hidden mb-6">
        {/* Header Row */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)_100px] border-b border-border">
          <div className="p-4 bg-background-secondary">
            <span className="text-small font-medium text-muted-foreground">Project</span>
          </div>
          {days.map((day, i) => (
            <div
              key={day}
              className={cn(
                "p-4 text-center border-l border-border bg-background-secondary",
                i >= 5 && "bg-muted/50"
              )}
            >
              <p className="text-small font-medium text-foreground">{day}</p>
              <p className="text-tiny text-muted-foreground">{dates[i]}</p>
            </div>
          ))}
          <div className="p-4 text-center border-l border-border bg-background-secondary">
            <span className="text-small font-medium text-muted-foreground">Total</span>
          </div>
        </div>

        {/* Project Rows */}
        {projects.map((project, projectIndex) => (
          <div
            key={project.id}
            className="grid grid-cols-[200px_repeat(7,1fr)_100px] border-b border-border last:border-b-0 hover:bg-card-hover transition-colors"
          >
            <div className="p-4 flex items-center gap-3">
              <div className={cn("w-3 h-3 rounded", project.color)} />
              <span className="text-body font-medium text-foreground truncate">
                {project.name}
              </span>
            </div>
            {project.hours.map((hours, dayIndex) => (
              <div
                key={dayIndex}
                className={cn(
                  "p-2 border-l border-border flex items-center justify-center",
                  dayIndex >= 5 && "bg-muted/30"
                )}
              >
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  defaultValue={hours || ""}
                  placeholder="-"
                  className="w-16 h-9 text-center font-mono text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            ))}
            <div className="p-4 border-l border-border flex items-center justify-center bg-background-secondary">
              <span className="text-body font-mono font-semibold text-foreground">
                {getTotalForProject(projectIndex)}h
              </span>
            </div>
          </div>
        ))}

        {/* Add Project Row */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)_100px] border-b border-border">
          <div className="p-4 col-span-9">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Totals Row */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)_100px] bg-primary/5">
          <div className="p-4">
            <span className="text-body font-semibold text-foreground">Daily Total</span>
          </div>
          {days.map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="p-4 border-l border-border flex items-center justify-center"
            >
              <span
                className={cn(
                  "text-body font-mono font-semibold",
                  getTotalForDay(dayIndex) >= 8 ? "text-success" : getTotalForDay(dayIndex) > 0 ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {getTotalForDay(dayIndex)}h
              </span>
            </div>
          ))}
          <div className="p-4 border-l border-border flex items-center justify-center bg-primary/10">
            <span className="text-h3 font-mono font-bold text-primary">
              {getWeekTotal()}h
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card-elevated p-4">
          <p className="text-small text-muted-foreground mb-1">Billable Hours</p>
          <p className="text-h2 font-mono text-success">37.5h</p>
          <p className="text-tiny text-muted-foreground">94% of total</p>
        </div>
        <div className="card-elevated p-4">
          <p className="text-small text-muted-foreground mb-1">Target Progress</p>
          <p className="text-h2 font-mono text-foreground">40h / 40h</p>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
        <div className="card-elevated p-4">
          <p className="text-small text-muted-foreground mb-1">Status</p>
          <div className="flex items-center gap-2">
            <span className="badge-pending">Pending Approval</span>
          </div>
          <p className="text-tiny text-muted-foreground mt-2">Submitted Dec 6, 2024</p>
        </div>
      </div>

      {/* Submit Actions */}
      <div className="flex items-center justify-between card-elevated p-4">
        <div>
          <p className="text-body text-foreground">
            <span className="font-medium">3 projects</span> with{" "}
            <span className="font-medium font-mono">{getWeekTotal()}h</span> logged
          </p>
          <p className="text-small text-muted-foreground">
            All entries saved automatically
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="gap-2">
            <Send className="w-4 h-4" />
            Submit Week
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
