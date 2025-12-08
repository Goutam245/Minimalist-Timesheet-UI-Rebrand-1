import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  MessageSquare,
  Eye,
  Clock,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Timesheet {
  id: string;
  employee: {
    name: string;
    avatar: string;
    role: string;
  };
  period: string;
  hours: number;
  billableHours: number;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  projects: string[];
}

const timesheets: Timesheet[] = [
  {
    id: "1",
    employee: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      role: "Developer",
    },
    period: "Dec 2 - Dec 8, 2024",
    hours: 42,
    billableHours: 38,
    submittedAt: "2 hours ago",
    status: "pending",
    projects: ["Website Redesign", "API Integration"],
  },
  {
    id: "2",
    employee: {
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      role: "Designer",
    },
    period: "Dec 2 - Dec 8, 2024",
    hours: 40,
    billableHours: 40,
    submittedAt: "5 hours ago",
    status: "pending",
    projects: ["Mobile App", "Brand Guidelines"],
  },
  {
    id: "3",
    employee: {
      name: "Michael Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      role: "Project Manager",
    },
    period: "Dec 2 - Dec 8, 2024",
    hours: 38,
    billableHours: 30,
    submittedAt: "1 day ago",
    status: "pending",
    projects: ["Client Meetings", "Documentation"],
  },
  {
    id: "4",
    employee: {
      name: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahW",
      role: "Developer",
    },
    period: "Nov 25 - Dec 1, 2024",
    hours: 40,
    billableHours: 36,
    submittedAt: "3 days ago",
    status: "approved",
    projects: ["Website Redesign"],
  },
];

export default function Approvals() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [detailSheet, setDetailSheet] = useState<Timesheet | null>(null);

  const filteredTimesheets = timesheets.filter(
    (t) => statusFilter === "all" || t.status === statusFilter
  );

  const pendingCount = timesheets.filter((t) => t.status === "pending").length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pendingIds = filteredTimesheets
      .filter((t) => t.status === "pending")
      .map((t) => t.id);
    if (selectedIds.length === pendingIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingIds);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="badge-approved">Approved</span>;
      case "rejected":
        return <span className="badge-rejected">Rejected</span>;
      default:
        return <span className="badge-pending">Pending</span>;
    }
  };

  return (
    <AppLayout title="Approval Queue" subtitle={`${pendingCount} timesheets awaiting your review`}>
      {/* Filters Bar */}
      <div className="card-elevated p-4 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name or project..." className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-small text-muted-foreground">
              {selectedIds.length} selected
            </span>
            <Button variant="soft-success" size="sm" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Approve All
            </Button>
            <Button variant="soft-destructive" size="sm" className="gap-2">
              <XCircle className="w-4 h-4" />
              Reject All
            </Button>
          </div>
        )}
      </div>

      {/* Timesheets Table */}
      <div className="card-elevated overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-background-secondary border-b border-border">
          <div className="col-span-1 flex items-center">
            <Checkbox
              checked={
                selectedIds.length ===
                filteredTimesheets.filter((t) => t.status === "pending").length &&
                selectedIds.length > 0
              }
              onCheckedChange={toggleSelectAll}
            />
          </div>
          <div className="col-span-3">
            <span className="text-small font-medium text-muted-foreground">Employee</span>
          </div>
          <div className="col-span-2">
            <span className="text-small font-medium text-muted-foreground">Period</span>
          </div>
          <div className="col-span-1 text-center">
            <span className="text-small font-medium text-muted-foreground">Hours</span>
          </div>
          <div className="col-span-2">
            <span className="text-small font-medium text-muted-foreground">Projects</span>
          </div>
          <div className="col-span-1 text-center">
            <span className="text-small font-medium text-muted-foreground">Status</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-small font-medium text-muted-foreground">Actions</span>
          </div>
        </div>

        {/* Table Rows */}
        {filteredTimesheets.map((timesheet, index) => (
          <div
            key={timesheet.id}
            className={cn(
              "grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-b-0 items-center transition-colors animate-fade-in",
              selectedIds.includes(timesheet.id) && "bg-primary/5",
              "hover:bg-card-hover"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="col-span-1">
              {timesheet.status === "pending" && (
                <Checkbox
                  checked={selectedIds.includes(timesheet.id)}
                  onCheckedChange={() => toggleSelect(timesheet.id)}
                />
              )}
            </div>
            <div className="col-span-3 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={timesheet.employee.avatar} />
                <AvatarFallback>{timesheet.employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-body font-medium text-foreground">
                  {timesheet.employee.name}
                </p>
                <p className="text-small text-muted-foreground">{timesheet.employee.role}</p>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-body text-foreground">{timesheet.period}</p>
              <p className="text-tiny text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timesheet.submittedAt}
              </p>
            </div>
            <div className="col-span-1 text-center">
              <p className="text-body font-mono font-semibold text-foreground">
                {timesheet.hours}h
              </p>
              <p className="text-tiny text-success">{timesheet.billableHours}h billable</p>
            </div>
            <div className="col-span-2">
              <div className="flex flex-wrap gap-1">
                {timesheet.projects.slice(0, 2).map((project, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-muted rounded text-tiny text-muted-foreground"
                  >
                    {project}
                  </span>
                ))}
                {timesheet.projects.length > 2 && (
                  <span className="px-2 py-0.5 bg-muted rounded text-tiny text-muted-foreground">
                    +{timesheet.projects.length - 2}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-1 text-center">{getStatusBadge(timesheet.status)}</div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setDetailSheet(timesheet)}
              >
                <Eye className="w-4 h-4" />
              </Button>
              {timesheet.status === "pending" && (
                <>
                  <Button variant="ghost" size="icon-sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="soft-success" size="sm">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="soft-destructive" size="sm">
                    <XCircle className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!detailSheet} onOpenChange={() => setDetailSheet(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Timesheet Details</DialogTitle>
            <DialogDescription>
              Review the complete timesheet submission
            </DialogDescription>
          </DialogHeader>
          {detailSheet && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-background-secondary rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={detailSheet.employee.avatar} />
                  <AvatarFallback>{detailSheet.employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-h3 text-foreground">{detailSheet.employee.name}</p>
                  <p className="text-small text-muted-foreground">
                    {detailSheet.employee.role} • {detailSheet.period}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-background-secondary rounded-lg">
                  <p className="text-small text-muted-foreground">Total Hours</p>
                  <p className="text-h2 font-mono text-foreground">{detailSheet.hours}h</p>
                </div>
                <div className="p-4 bg-background-secondary rounded-lg">
                  <p className="text-small text-muted-foreground">Billable Hours</p>
                  <p className="text-h2 font-mono text-success">{detailSheet.billableHours}h</p>
                </div>
                <div className="p-4 bg-background-secondary rounded-lg">
                  <p className="text-small text-muted-foreground">Billable Rate</p>
                  <p className="text-h2 font-mono text-foreground">
                    {Math.round((detailSheet.billableHours / detailSheet.hours) * 100)}%
                  </p>
                </div>
              </div>

              <div>
                <p className="text-small font-medium text-muted-foreground mb-2">Projects</p>
                <div className="flex flex-wrap gap-2">
                  {detailSheet.projects.map((project, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-small font-medium"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailSheet(null)}>
              Close
            </Button>
            {detailSheet?.status === "pending" && (
              <>
                <Button variant="soft-destructive" className="gap-2">
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button variant="success" className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
