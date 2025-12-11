import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuizCard } from "@/components/QuizCard";
import { weeksData } from "@/lib/weekData";
import { saveProgress, getWeekProgress } from "@/lib/auth";
import { ArrowLeft, Trophy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const [, params] = useRoute("/week/:weekId/quiz");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const weekId = params?.weekId;
  const week = weeksData.find(w => w.id === weekId);
  const progress = weekId ? getWeekProgress(weekId) : null;

  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(
    new Set(progress?.quizzesCompleted || [])
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);

  if (!week) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
            <Button onClick={() => setLocation("/")}>Back to Dashboard</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalQuizzes = week.quizzes.length;
  const progressPercent = Math.round((completedQuizzes.size / totalQuizzes) * 100);
  const isAllComplete = completedQuizzes.size === totalQuizzes;

  const handleQuizComplete = (quizId: string, isCorrect: boolean) => {
    if (!completedQuizzes.has(quizId)) {
      setCompletedQuizzes(prev => new Set([...prev, quizId]));
      saveProgress(weekId!, 'quiz', quizId);
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    }
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
            <Badge variant="secondary" className="mb-2">Week {week.number} - Quiz</Badge>
            <h1 className="text-2xl font-bold" data-testid="text-quiz-page-title">Test Your Knowledge</h1>
            <p className="text-muted-foreground mt-1">Answer these questions to test what you learned</p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium" data-testid="text-quiz-progress">
                {completedQuizzes.size}/{totalQuizzes} questions
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="space-y-6">
            {week.quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onComplete={(isCorrect) => handleQuizComplete(quiz.id, isCorrect)}
                isCompleted={completedQuizzes.has(quiz.id)}
              />
            ))}
          </div>

          {isAllComplete && (
            <div className="mt-8 p-6 bg-accent/20 rounded-xl text-center">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold mb-2" data-testid="text-quiz-complete-title">Quiz Complete!</h2>
              <p className="text-muted-foreground mb-4" data-testid="text-quiz-score">
                You got {correctAnswers} out of {totalQuizzes} correct
              </p>
              <Button 
                onClick={() => setLocation(`/week/${weekId}`)}
                className="gap-2"
                data-testid="button-back-to-week"
              >
                <CheckCircle2 className="h-4 w-4" />
                Back to Week {week.number}
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
