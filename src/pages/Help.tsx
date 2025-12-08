import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  BookOpen, 
  Video, 
  Keyboard, 
  Code,
  MessageCircle,
  Send,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const quickLinks = [
  { icon: BookOpen, titleKey: "help.gettingStarted", descKey: "help.gettingStartedDesc" },
  { icon: Video, titleKey: "help.videoTutorials", descKey: "help.videoTutorialsDesc" },
  { icon: Keyboard, titleKey: "help.keyboard", descKey: "help.keyboardDesc" },
  { icon: Code, titleKey: "help.apiDocs", descKey: "help.apiDocsDesc" },
];

const faqItems = [
  { questionKey: "faq.howToLog", answerKey: "faq.howToLogAnswer" },
  { questionKey: "faq.editEntry", answerKey: "faq.editEntryAnswer" },
  { questionKey: "faq.billableVsNon", answerKey: "faq.billableVsNonAnswer" },
  { questionKey: "faq.approvalTime", answerKey: "faq.approvalTimeAnswer" },
  { questionKey: "faq.exportData", answerKey: "faq.exportDataAnswer" },
];

export default function Help() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("common.success"), {
      description: "Your message has been sent. We'll get back to you soon.",
    });
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const filteredFaq = faqItems.filter(
    (item) =>
      t(item.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(item.answerKey).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title={t("help.title")} subtitle={t("help.subtitle")}>
      {/* Search */}
      <div className="card-elevated p-6 mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={t("help.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-body-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Links */}
          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-4">{t("help.quickLinks")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <button
                  key={link.titleKey}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-secondary transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body font-medium text-foreground group-hover:text-primary transition-colors">
                      {t(link.titleKey)}
                    </p>
                    <p className="text-small text-muted-foreground">
                      {t(link.descKey)}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="card-elevated p-6">
            <h3 className="text-h3 text-foreground mb-4">{t("help.faq")}</h3>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-body font-medium hover:text-primary">
                    {t(item.questionKey)}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-muted-foreground">
                    {t(item.answerKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaq.length === 0 && searchQuery && (
              <p className="text-body text-muted-foreground text-center py-8">
                No results found for "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <div className="card-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-h3 text-foreground">{t("help.contactSupport")}</h3>
                <p className="text-small text-muted-foreground">
                  {t("help.contactSupportDesc")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("help.name")}</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("help.emailAddress")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{t("help.subject")}</Label>
                <Select
                  value={contactForm.subject}
                  onValueChange={(value) => setContactForm({ ...contactForm, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("help.selectTopic")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t("help.generalQuestion")}</SelectItem>
                    <SelectItem value="technical">{t("help.technicalIssue")}</SelectItem>
                    <SelectItem value="billing">{t("help.billingInquiry")}</SelectItem>
                    <SelectItem value="feature">{t("help.featureRequest")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("help.message")}</Label>
                <Textarea
                  id="message"
                  placeholder={t("help.describeIssue")}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                {t("help.sendMessage")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
