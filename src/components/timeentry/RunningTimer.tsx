import { useState, useEffect } from "react";
import { Play, Pause, Square, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RunningTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div
      className={cn(
        "card-elevated p-4 flex items-center justify-between",
        isRunning && "ring-2 ring-primary/20 bg-primary/5"
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            isRunning ? "bg-primary/10 text-primary animate-pulse-soft" : "bg-muted text-muted-foreground"
          )}
        >
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-small text-muted-foreground">
            {isRunning ? "Timer running" : "Start a timer"}
          </p>
          <p className="text-h2 font-mono text-foreground tracking-tight">
            {formatTime(seconds)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isRunning ? (
          <Button onClick={handleStart} className="gap-2">
            <Play className="w-4 h-4" />
            Start
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handlePause}>
              <Pause className="w-4 h-4" />
            </Button>
            <Button variant="soft-destructive" onClick={handleStop}>
              <Square className="w-4 h-4" />
              Stop
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
