import { Mic, MicOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MicrophoneButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function MicrophoneButton({ isListening, isSupported, onClick, disabled }: MicrophoneButtonProps) {
  if (!isSupported) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <p className="text-sm text-destructive text-center max-w-xs" data-testid="text-speech-not-supported">
          Speech recognition is not supported in your browser. Please try Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
            <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          </>
        )}
        <Button
          size="icon"
          variant={isListening ? "default" : "outline"}
          className={`h-32 w-32 rounded-full relative z-10 transition-all duration-300 ${
            isListening 
              ? "animate-mic-pulse bg-primary" 
              : "hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={onClick}
          disabled={disabled}
          data-testid="button-microphone"
        >
          {isListening ? (
            <MicOff className="h-12 w-12" />
          ) : (
            <Mic className="h-12 w-12" />
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center" data-testid="text-mic-instruction">
        {isListening ? "Tap to stop listening" : "Tap the microphone to speak"}
      </p>
    </div>
  );
}
