import { ReactNode } from "react";
import { TopNav } from "./TopNav";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background-secondary">
      <TopNav />
      <main className="pt-16">
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-h1 text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-body text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
