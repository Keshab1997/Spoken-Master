import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeedbackDisplayProps {
  transcript: string;
  targetPhrase: string;
  isCorrect: boolean | null;
  accuracy: number;
}

export function FeedbackDisplay({ transcript, targetPhrase, isCorrect, accuracy }: FeedbackDisplayProps) {
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(targetPhrase);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <Card className="border-2 border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-medium text-muted-foreground">Say this phrase:</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSpeak}
              data-testid="button-play-phrase"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-lg font-medium text-center" data-testid="text-target-phrase">
            "{targetPhrase}"
          </p>
        </CardContent>
      </Card>

      {transcript && (
        <Card className={`border-2 ${
          isCorrect === null 
            ? "border-border" 
            : isCorrect 
              ? "border-green-500 bg-green-500/5" 
              : "border-red-500 bg-red-500/5"
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {isCorrect !== null && (
                isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )
              )}
              <span className="text-sm font-medium text-muted-foreground">
                You said:
              </span>
              {isCorrect !== null && (
                <span className={`text-sm font-medium ml-auto ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                  {accuracy}% match
                </span>
              )}
            </div>
            <p 
              className={`text-lg text-center ${
                isCorrect === null 
                  ? "text-foreground" 
                  : isCorrect 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
              }`}
              data-testid="text-spoken-phrase"
            >
              "{transcript}"
            </p>
            {isCorrect !== null && (
              <p className={`text-sm text-center mt-2 ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`} data-testid="text-feedback">
                {isCorrect ? "Great job! Your pronunciation is correct!" : "Try again. Listen carefully and repeat."}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
