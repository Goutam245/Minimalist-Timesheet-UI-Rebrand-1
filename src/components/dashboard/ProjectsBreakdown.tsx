import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  hours: number;
  percentage: number;
  color: string;
}

const projects: Project[] = [
  { id: "1", name: "Website Redesign", hours: 24.5, percentage: 45, color: "bg-primary" },
  { id: "2", name: "Mobile App", hours: 16, percentage: 30, color: "bg-accent" },
  { id: "3", name: "API Integration", hours: 8, percentage: 15, color: "bg-info" },
  { id: "4", name: "Documentation", hours: 5.5, percentage: 10, color: "bg-warning" },
];

export function ProjectsBreakdown() {
  const totalHours = projects.reduce((acc, p) => acc + p.hours, 0);

  return (
    <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 text-foreground">Projects This Week</h3>
        <span className="text-small text-muted-foreground font-mono">
          {totalHours}h total
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={cn("h-full transition-all duration-500", project.color)}
            style={{ width: `${project.percentage}%` }}
          />
        ))}
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-3 h-3 rounded", project.color)} />
              <span className="text-body text-foreground">{project.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body font-mono text-foreground">{project.hours}h</span>
              <span className="text-small text-muted-foreground w-10 text-right">
                {project.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
