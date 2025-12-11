import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { FeedbackDisplay } from "@/components/FeedbackDisplay";
import { useSpeechRecognition, comparePhrase } from "@/hooks/useSpeechRecognition";
import { weeksData } from "@/lib/weekData";
import { saveProgress } from "@/lib/auth";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PracticePage() {
  const [, params] = useRoute("/week/:weekId/practice/:practiceId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const weekId = params?.weekId;
  const practiceId = params?.practiceId;
  
  const week = weeksData.find(w => w.id === weekId);
  const practice = week?.practices.find(p => p.id === practiceId);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; accuracy: number } | null>(null);

  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !isListening && practice) {
      const result = comparePhrase(transcript, practice.targetPhrases[currentPhraseIndex]);
      setFeedback(result);
      
      if (result.isCorrect && !completedPhrases.has(currentPhraseIndex)) {
        setCompletedPhrases(prev => new Set([...prev, currentPhraseIndex]));
      }
    }
  }, [transcript, isListening, practice, currentPhraseIndex, completedPhrases]);

  if (!week || !practice) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Practice not found</h1>
            <Button onClick={() => setLocation("/")}>Back to Dashboard</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPhrases = practice.targetPhrases.length;
  const progressPercent = Math.round((completedPhrases.size / totalPhrases) * 100);
  const currentPhrase = practice.targetPhrases[currentPhraseIndex];
  const isAllComplete = completedPhrases.size === totalPhrases;

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      setFeedback(null);
      startListening();
    }
  };

  const handlePrevious = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1);
      resetTranscript();
      setFeedback(null);
    }
  };

  const handleNext = () => {
    if (currentPhraseIndex < totalPhrases - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      resetTranscript();
      setFeedback(null);
    }
  };

  const handleComplete = () => {
    saveProgress(weekId!, 'practice', practiceId!);
    toast({
      title: "Practice completed!",
      description: "Excellent work on your pronunciation!",
    });
    setLocation(`/week/${weekId}`);
  };

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
            <Badge variant="secondary" className="mb-2">Week {week.number} - Speaking Practice</Badge>
            <h1 className="text-2xl font-bold" data-testid="text-practice-title">{practice.title}</h1>
            <p className="text-muted-foreground mt-1">Practice speaking these phrases out loud</p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium" data-testid="text-practice-progress">
                {completedPhrases.size}/{totalPhrases} phrases
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePrevious}
              disabled={currentPhraseIndex === 0}
              data-testid="button-previous-phrase"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground" data-testid="text-phrase-number">
              Phrase {currentPhraseIndex + 1} of {totalPhrases}
            </span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleNext}
              disabled={currentPhraseIndex === totalPhrases - 1}
              data-testid="button-next-phrase"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-8 py-8">
            <FeedbackDisplay
              transcript={transcript}
              targetPhrase={currentPhrase}
              isCorrect={feedback?.isCorrect ?? null}
              accuracy={feedback?.accuracy ?? 0}
            />

            <MicrophoneButton
              isListening={isListening}
              isSupported={isSupported}
              onClick={handleMicClick}
            />
          </div>

          {isAllComplete && (
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                onClick={handleComplete}
                className="gap-2"
                data-testid="button-finish-practice"
              >
                <CheckCircle2 className="h-5 w-5" />
                Finish Practice
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
