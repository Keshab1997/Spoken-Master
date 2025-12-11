import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GrammarCard } from "@/components/GrammarCard";
import { weeksData } from "@/lib/weekData";
import { saveProgress, getWeekProgress } from "@/lib/auth";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function GrammarPage() {
  const [, params] = useRoute("/week/:weekId/grammar/:grammarId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const weekId = params?.weekId;
  const grammarId = params?.grammarId;
  
  const week = weeksData.find(w => w.id === weekId);
  const grammar = week?.grammar.find(g => g.id === grammarId);

  const progress = weekId ? getWeekProgress(weekId) : null;
  const initialCompleted = progress?.grammarCompleted.includes(grammarId || '') || false;
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    if (progress && grammarId) {
      setCompleted(progress.grammarCompleted.includes(grammarId));
    }
  }, [progress, grammarId]);

  if (!week || !grammar) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Grammar not found</h1>
            <Button onClick={() => setLocation("/")}>Back to Dashboard</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleComplete = () => {
    saveProgress(weekId!, 'grammar', grammarId!);
    setCompleted(true);
    toast({
      title: "Grammar lesson completed!",
      description: "Great job learning the rules!",
    });
  };

  const currentIndex = week.grammar.findIndex(g => g.id === grammarId);
  const nextGrammar = week.grammar[currentIndex + 1];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 -ml-2"
            onClick={() => setLocation(`/week/${weekId}`)}
            data-testid="button-back-week"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Week {week.number}
          </Button>

          <div className="mb-6">
            <Badge variant="secondary" className="mb-2">Week {week.number} - Grammar</Badge>
            <h1 className="text-2xl font-bold" data-testid="text-grammar-page-title">{grammar.title}</h1>
          </div>

          <GrammarCard rule={grammar} isCompleted={completed} />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {!completed ? (
              <Button 
                className="flex-1" 
                onClick={handleComplete}
                data-testid="button-mark-grammar-complete"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            ) : (
              <Button variant="outline" className="flex-1" disabled data-testid="button-grammar-completed">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Completed
              </Button>
            )}
            
            {nextGrammar && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setLocation(`/week/${weekId}/grammar/${nextGrammar.id}`)}
                data-testid="button-next-grammar"
              >
                Next Lesson
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
