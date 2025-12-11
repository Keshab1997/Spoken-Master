import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "@shared/schema";

interface ChatBubbleProps {
  message: Message;
}

const avatarColors: Record<string, string> = {
  "Amit": "bg-primary text-primary-foreground",
  "Priya": "bg-accent text-accent-foreground",
  "Rahul": "bg-secondary text-secondary-foreground",
  "You": "bg-muted text-muted-foreground",
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.isUser;
  const initials = message.speaker.slice(0, 2).toUpperCase();
  const colorClass = avatarColors[message.speaker] || "bg-secondary text-secondary-foreground";

  return (
    <div
      className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-testid={`chat-bubble-${message.id}`}
    >
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className={colorClass}>
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border rounded-bl-md"
        }`}
      >
        {!isUser && (
          <p className="text-xs font-medium text-muted-foreground mb-1" data-testid={`text-speaker-${message.id}`}>
            {message.speaker}
          </p>
        )}
        <p className="text-base leading-relaxed" data-testid={`text-message-${message.id}`}>
          {message.text}
        </p>
      </div>
    </div>
  );
}
