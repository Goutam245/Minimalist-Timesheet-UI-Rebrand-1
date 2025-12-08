import { useState } from "react";
import { Trash2, Copy, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface TimeEntryRowProps {
  index: number;
  onDelete?: () => void;
  onCopy?: () => void;
}

const projects = [
  { id: "1", name: "Website Redesign", color: "bg-primary" },
  { id: "2", name: "Mobile App", color: "bg-accent" },
  { id: "3", name: "API Integration", color: "bg-info" },
  { id: "4", name: "Documentation", color: "bg-warning" },
];

export function TimeEntryRow({ index, onDelete, onCopy }: TimeEntryRowProps) {
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [billable, setBillable] = useState(true);

  const selectedProject = projects.find((p) => p.id === project);

  return (
    <div
      className="grid grid-cols-12 gap-3 items-center p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Project Select */}
      <div className="col-span-3">
        <Select value={project} onValueChange={setProject}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select project">
              {selectedProject && (
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", selectedProject.color)} />
                  <span>{selectedProject.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", p.color)} />
                  <span>{p.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="col-span-4">
        <Input
          placeholder="What did you work on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Start Time */}
      <div className="col-span-1">
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full font-mono text-center"
        />
      </div>

      {/* End Time */}
      <div className="col-span-1">
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full font-mono text-center"
        />
      </div>

      {/* Duration */}
      <div className="col-span-1 text-center">
        <span className="text-body font-mono font-medium text-foreground">8h</span>
      </div>

      {/* Billable Toggle */}
      <div className="col-span-1 flex justify-center">
        <div className="flex items-center gap-1.5">
          <Switch checked={billable} onCheckedChange={setBillable} />
          <DollarSign
            className={cn(
              "w-4 h-4 transition-colors",
              billable ? "text-success" : "text-muted-foreground"
            )}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="col-span-1 flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon-sm" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={onDelete} className="text-destructive hover:text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
