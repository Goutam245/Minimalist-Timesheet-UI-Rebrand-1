import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { day: "Mon", total: 8.5, billable: 7 },
  { day: "Tue", total: 7.5, billable: 6 },
  { day: "Wed", total: 9, billable: 8 },
  { day: "Thu", total: 8, billable: 7.5 },
  { day: "Fri", total: 6, billable: 5 },
  { day: "Sat", total: 0, billable: 0 },
  { day: "Sun", total: 0, billable: 0 },
];

export function WeeklyChart() {
  return (
    <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-h3 text-foreground">Weekly Hours</h3>
          <p className="text-small text-muted-foreground">Dec 2 - Dec 8, 2024</p>
        </div>
        <div className="flex items-center gap-4 text-small">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-muted-foreground">Billable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary/30" />
            <span className="text-muted-foreground">Non-billable</span>
          </div>
        </div>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220 13% 91%)" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(220 9% 44%)" }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(220 9% 44%)" }}
              tickFormatter={(value) => `${value}h`}
              domain={[0, 12]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(220 13% 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              labelStyle={{ color: "hsl(220 20% 14%)", fontWeight: 500, marginBottom: 4 }}
              formatter={(value: number, name: string) => [
                `${value}h`,
                name === "billable" ? "Billable" : "Total"
              ]}
            />
            <Bar 
              dataKey="total" 
              fill="hsl(212 92% 85%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              name="Total"
            />
            <Bar 
              dataKey="billable" 
              fill="hsl(212 92% 58%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              name="Billable"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
