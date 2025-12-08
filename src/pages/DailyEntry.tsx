import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TimeEntryRow } from "@/components/timeentry/TimeEntryRow";
import { RunningTimer } from "@/components/timeentry/RunningTimer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Copy, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DailyEntry() {
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState([1, 2]);

  const addEntry = () => {
    setEntries([...entries, entries.length + 1]);
  };

  const deleteEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const goToPreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  return (
    <AppLayout title="Daily Time Entry" subtitle="Log your hours for the day">
      {/* Timer Widget */}
      <div className="mb-6">
        <RunningTimer />
      </div>

      {/* Date Navigation */}
      <div className="card-elevated p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={goToPreviousDay}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 min-w-[200px] justify-start">
                <CalendarIcon className="w-4 h-4" />
                {format(date, "EEEE, MMMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon-sm" onClick={goToNextDay}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Copy className="w-4 h-4" />
            Copy Previous Day
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="text-right">
            <p className="text-small text-muted-foreground">Daily Total</p>
            <p className="text-h3 font-mono text-foreground">8h 00m</p>
          </div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-3 px-4 mb-2">
        <div className="col-span-3">
          <span className="text-small font-medium text-muted-foreground">Project</span>
        </div>
        <div className="col-span-4">
          <span className="text-small font-medium text-muted-foreground">Description</span>
        </div>
        <div className="col-span-1 text-center">
          <span className="text-small font-medium text-muted-foreground">Start</span>
        </div>
        <div className="col-span-1 text-center">
          <span className="text-small font-medium text-muted-foreground">End</span>
        </div>
        <div className="col-span-1 text-center">
          <span className="text-small font-medium text-muted-foreground">Duration</span>
        </div>
        <div className="col-span-1 text-center">
          <span className="text-small font-medium text-muted-foreground">Billable</span>
        </div>
        <div className="col-span-1"></div>
      </div>

      {/* Time Entries */}
      <div className="space-y-3 mb-6">
        {entries.map((_, index) => (
          <TimeEntryRow
            key={index}
            index={index}
            onDelete={() => deleteEntry(index)}
          />
        ))}
      </div>

      {/* Add Entry Button */}
      <Button
        variant="outline"
        className="w-full border-dashed gap-2 mb-6"
        onClick={addEntry}
      >
        <Plus className="w-4 h-4" />
        Add Time Entry
      </Button>

      {/* Submit Actions */}
      <div className="flex items-center justify-between card-elevated p-4">
        <div>
          <p className="text-body text-foreground">
            <span className="font-medium">2 entries</span> logged for{" "}
            <span className="font-medium">{format(date, "MMMM d")}</span>
          </p>
          <p className="text-small text-muted-foreground">
            Billable: 8h • Non-billable: 0h
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="gap-2">
            <Send className="w-4 h-4" />
            Submit for Approval
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
