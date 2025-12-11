import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatBubble } from "@/components/ChatBubble";
import { weeksData } from "@/lib/weekData";
import { saveProgress } from "@/lib/auth";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function TopicPage() {
  const [, params] = useRoute("/week/:weekId/topic/:topicId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  
  const weekId = params?.weekId;
  const topicId = params?.topicId;
  
  const week = weeksData.find(w => w.id === weekId);
  const topic = week?.topics.find(t => t.id === topicId);

  if (!week || !topic) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
            <Button onClick={() => setLocation("/")}>Back to Dashboard</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleComplete = () => {
    saveProgress(weekId!, 'topic', topicId!);
    setCompleted(true);
    toast({
      title: "Topic completed!",
      description: "Great job! Keep learning.",
    });
  };

  const currentIndex = week.topics.findIndex(t => t.id === topicId);
  const nextTopic = week.topics[currentIndex + 1];

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

          <div className="mb-8">
            <Badge variant="secondary" className="mb-2">Week {week.number} - Topic</Badge>
            <h1 className="text-2xl font-bold" data-testid="text-topic-title">{topic.title}</h1>
            <p className="text-muted-foreground mt-1" data-testid="text-topic-description">{topic.description}</p>
          </div>

          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <div className="space-y-4">
              {topic.messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!completed ? (
              <Button 
                className="flex-1" 
                onClick={handleComplete}
                data-testid="button-mark-complete"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            ) : (
              <Button variant="outline" className="flex-1" disabled data-testid="button-completed">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Completed
              </Button>
            )}
            
            {nextTopic && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setLocation(`/week/${weekId}/topic/${nextTopic.id}`)}
                data-testid="button-next-topic"
              >
                Next Topic
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
