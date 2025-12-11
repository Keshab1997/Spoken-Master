import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import type { Quiz } from "@shared/schema";

interface QuizCardProps {
  quiz: Quiz;
  onComplete: (isCorrect: boolean) => void;
  isCompleted?: boolean;
}

export function QuizCard({ quiz, onComplete, isCompleted = false }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    onComplete(selectedAnswer === quiz.correctAnswer);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <Card className="overflow-visible" data-testid={`card-quiz-${quiz.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg" data-testid={`text-quiz-question-${quiz.id}`}>
              {quiz.question}
            </CardTitle>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="gap-1" data-testid={`badge-quiz-completed-${quiz.id}`}>
              <CheckCircle2 className="h-3 w-3" />
              Done
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          {quiz.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === quiz.correctAnswer;
            
            let buttonClass = "";
            if (showResult) {
              if (isCorrectOption) {
                buttonClass = "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400";
              } else if (isSelected && !isCorrectOption) {
                buttonClass = "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400";
              }
            } else if (isSelected) {
              buttonClass = "bg-primary/10 border-primary";
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={`justify-start h-auto py-3 px-4 ${buttonClass}`}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                data-testid={`button-option-${quiz.id}-${index}`}
              >
                <span className="mr-3 h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-left">{option}</span>
                {showResult && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto shrink-0" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 text-red-500 ml-auto shrink-0" />
                )}
              </Button>
            );
          })}
        </div>

        {showResult ? (
          <div className="flex flex-col items-center gap-3 pt-2">
            <p className={`text-sm font-medium ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`} data-testid={`text-quiz-result-${quiz.id}`}>
              {isCorrect ? "Correct! Well done!" : "Not quite. The correct answer is highlighted."}
            </p>
            <Button variant="outline" size="sm" onClick={handleReset} data-testid={`button-try-again-${quiz.id}`}>
              Try Again
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            data-testid={`button-submit-quiz-${quiz.id}`}
          >
            Check Answer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
