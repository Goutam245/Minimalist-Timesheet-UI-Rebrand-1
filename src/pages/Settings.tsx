import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings2, 
  Shield, 
  Sliders,
  Camera,
  AlertTriangle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function Settings() {
  const { t } = useLanguage();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [approvalNotifications, setApprovalNotifications] = useState(true);
  const [billableByDefault, setBillableByDefault] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleSave = () => {
    toast.success(t("common.success"), {
      description: "Your settings have been saved.",
    });
  };

  return (
    <AppLayout title={t("settings.title")} subtitle={t("settings.subtitle")}>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 h-auto p-1">
          <TabsTrigger value="profile" className="gap-2 py-2.5">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{t("settings.profile")}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2 py-2.5">
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t("settings.preferences")}</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2 py-2.5">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">{t("settings.account")}</span>
          </TabsTrigger>
          <TabsTrigger value="app" className="gap-2 py-2.5">
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">{t("settings.appSettings")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.profile")}</h3>
            
            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  <AvatarFallback className="text-h2">SJ</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon-sm" 
                  className="absolute -bottom-1 -right-1 rounded-full"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <p className="text-h3 text-foreground">Sarah Johnson</p>
                <p className="text-body text-muted-foreground">Designer • Design Team</p>
              </div>
            </div>

            {/* Form */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("settings.firstName")}</Label>
                <Input id="firstName" defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("settings.lastName")}</Label>
                <Input id="lastName" defaultValue="Johnson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("settings.email")}</Label>
                <Input id="email" type="email" defaultValue="sarah.johnson@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("settings.phone")}</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">{t("settings.jobTitle")}</Label>
                <Input id="jobTitle" defaultValue="Senior Designer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">{t("settings.department")}</Label>
                <Input id="department" defaultValue="Design" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSave}>{t("settings.saveChanges")}</Button>
            </div>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.preferences")}</h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("settings.timezone")}</Label>
                <Select defaultValue="europe-berlin">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-berlin">Europe/Berlin (GMT+1)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                    <SelectItem value="america-new-york">America/New_York (GMT-5)</SelectItem>
                    <SelectItem value="america-los-angeles">America/Los_Angeles (GMT-8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("settings.dateFormat")}</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("settings.timeFormat")}</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24-hour (14:30)</SelectItem>
                    <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("settings.weekStartsOn")}</Label>
                <Select defaultValue="monday">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">{t("settings.monday")}</SelectItem>
                    <SelectItem value="sunday">{t("settings.sunday")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.notifications")}</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-foreground">{t("settings.emailNotifications")}</p>
                  <p className="text-small text-muted-foreground">{t("settings.emailNotificationsDesc")}</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-foreground">{t("settings.reminderNotifications")}</p>
                  <p className="text-small text-muted-foreground">{t("settings.reminderNotificationsDesc")}</p>
                </div>
                <Switch checked={reminderNotifications} onCheckedChange={setReminderNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-foreground">{t("settings.approvalNotifications")}</p>
                  <p className="text-small text-muted-foreground">{t("settings.approvalNotificationsDesc")}</p>
                </div>
                <Switch checked={approvalNotifications} onCheckedChange={setApprovalNotifications} />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSave}>{t("settings.saveChanges")}</Button>
            </div>
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.changePassword")}</h3>
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t("settings.currentPassword")}</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("settings.confirmPassword")}</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>{t("settings.updatePassword")}</Button>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.twoFactorAuth")}</h3>
            <p className="text-body text-muted-foreground mb-4">{t("settings.twoFactorAuthDesc")}</p>
            <Button variant="outline">{t("settings.enable2FA")}</Button>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.activeSessions")}</h3>
            <p className="text-body text-muted-foreground mb-4">{t("settings.activeSessionsDesc")}</p>
            <Button variant="outline">{t("settings.viewSessions")}</Button>
          </div>

          <div className="card-elevated p-6 border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h3 className="text-h3 text-destructive mb-2">{t("settings.dangerZone")}</h3>
                <p className="text-body text-muted-foreground mb-4">{t("settings.deleteAccountDesc")}</p>
                <Button variant="destructive">{t("settings.deleteAccount")}</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* App Settings Tab */}
        <TabsContent value="app" className="space-y-6">
          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.appSettings")}</h3>
            
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t("settings.defaultProject")}</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder={t("settings.selectDefault")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t("settings.selectDefault")}</SelectItem>
                      <SelectItem value="website">Website Redesign</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="api">API Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-foreground">{t("settings.billableByDefault")}</p>
                  <p className="text-small text-muted-foreground">{t("settings.billableByDefaultDesc")}</p>
                </div>
                <Switch checked={billableByDefault} onCheckedChange={setBillableByDefault} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-medium text-foreground">{t("settings.autoSave")}</p>
                  <p className="text-small text-muted-foreground">{t("settings.autoSaveDesc")}</p>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-6">{t("settings.workingHours")}</h3>
            
            <div className="grid gap-6 md:grid-cols-2 max-w-md">
              <div className="space-y-2">
                <Label>{t("settings.hoursPerDay")}</Label>
                <Input type="number" defaultValue="8" min="1" max="24" />
              </div>
              <div className="space-y-2">
                <Label>{t("settings.hoursPerWeek")}</Label>
                <Input type="number" defaultValue="40" min="1" max="168" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSave}>{t("settings.saveChanges")}</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
