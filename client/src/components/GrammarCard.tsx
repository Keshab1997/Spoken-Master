import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookText, CheckCircle2 } from "lucide-react";
import type { GrammarRule } from "@shared/schema";

interface GrammarCardProps {
  rule: GrammarRule;
  isCompleted?: boolean;
}

export function GrammarCard({ rule, isCompleted = false }: GrammarCardProps) {
  return (
    <Card className="overflow-visible" data-testid={`card-grammar-${rule.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-accent flex items-center justify-center shrink-0">
              <BookText className="h-5 w-5 text-accent-foreground" />
            </div>
            <CardTitle className="text-lg" data-testid={`text-grammar-title-${rule.id}`}>
              {rule.title}
            </CardTitle>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="gap-1" data-testid={`badge-completed-${rule.id}`}>
              <CheckCircle2 className="h-3 w-3" />
              Done
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground" data-testid={`text-grammar-explanation-${rule.id}`}>
          {rule.explanation}
        </p>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Examples:</p>
          <div className="grid gap-2">
            {rule.examples.map((example, index) => (
              <div 
                key={index}
                className="bg-muted/50 rounded-md px-3 py-2 text-sm"
                data-testid={`text-example-${rule.id}-${index}`}
              >
                {example}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
