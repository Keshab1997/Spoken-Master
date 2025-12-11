import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm" data-testid="text-footer-brand">SpeakMaster</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span data-testid="text-footer-about">About</span>
            <span data-testid="text-footer-contact">Contact</span>
            <span data-testid="text-footer-help">Help</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            Learn English with confidence
          </p>
        </div>
      </div>
    </footer>
  );
}
