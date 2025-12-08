import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Clock, 
  CalendarDays, 
  CheckCircle, 
  BarChart3,
  Settings,
  HelpCircle,
  Timer,
  Bell,
  ChevronDown,
  Menu,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";

const mainNavigation = [
  { name: "nav.dashboard", href: "/", icon: LayoutDashboard },
  { name: "nav.dailyEntry", href: "/daily", icon: Clock },
  { name: "nav.weeklyView", href: "/weekly", icon: CalendarDays },
  { name: "nav.approvals", href: "/approvals", icon: CheckCircle },
  { name: "nav.reports", href: "/reports", icon: BarChart3 },
];

const secondaryNavigation = [
  { name: "nav.settings", href: "/settings", icon: Settings },
  { name: "nav.help", href: "/help", icon: HelpCircle },
];

export function TopNav() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <Timer className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-h3 text-foreground font-semibold tracking-tight hidden sm:block">
              TimeFlow
            </span>
          </NavLink>
        </div>

        {/* Center: Main Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 text-body font-medium transition-colors rounded-md",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {t(item.name)}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1.5 text-small font-medium"
          >
            {language === "en" ? (
              <>
                <span>🇬🇧</span>
                <span className="hidden sm:inline">EN</span>
              </>
            ) : (
              <>
                <span>🇩🇪</span>
                <span className="hidden sm:inline">DE</span>
              </>
            )}
          </Button>

          {/* Quick Add (Desktop) */}
          <Button size="sm" className="hidden md:flex gap-2">
            <Plus className="w-4 h-4" />
            <span>{t("common.logTime")}</span>
          </Button>

          {/* Settings (Desktop) */}
          <NavLink to="/settings" className="hidden md:block">
            <Button 
              variant="ghost" 
              size="icon-sm"
              className={cn(
                location.pathname === "/settings" && "bg-secondary text-primary"
              )}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </NavLink>

          {/* Help (Desktop) */}
          <NavLink to="/help" className="hidden md:block">
            <Button 
              variant="ghost" 
              size="icon-sm"
              className={cn(
                location.pathname === "/help" && "bg-secondary text-primary"
              )}
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </NavLink>

          {/* Notifications */}
          <Button variant="ghost" size="icon-sm" className="relative hidden sm:flex">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-small">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-body font-medium">Sarah Johnson</span>
                  <span className="text-tiny text-muted-foreground">Designer</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden lg:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("nav.myAccount")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("nav.profile")}</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/settings">{t("nav.settings")}</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>{t("nav.team")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                {t("nav.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="text-left">{t("nav.menu")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-4">
                {mainNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-body font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {t(item.name)}
                    </NavLink>
                  );
                })}
                <div className="h-px bg-border my-3" />
                {secondaryNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-body font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {t(item.name)}
                    </NavLink>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
