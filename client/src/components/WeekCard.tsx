import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { BookOpen, Mic, BookText, HelpCircle, Lock, ChevronRight } from "lucide-react";
import type { Week } from "@shared/schema";
import { getWeekProgress } from "@/lib/auth";

interface WeekCardProps {
  week: Week;
  isLocked?: boolean;
}

export function WeekCard({ week, isLocked = false }: WeekCardProps) {
  const progress = getWeekProgress(week.id);
  
  const totalItems = week.topics.length + week.practices.length + week.grammar.length + week.quizzes.length;
  const completedItems = progress ? (
    progress.topicsCompleted.length +
    progress.practicesCompleted.length +
    progress.grammarCompleted.length +
    progress.quizzesCompleted.length
  ) : 0;
  
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card 
      className={`relative overflow-visible transition-all duration-200 ${isLocked ? 'opacity-60' : 'hover-elevate'}`}
      data-testid={`card-week-${week.number}`}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md z-10">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Lock className="h-8 w-8" />
            <span className="text-sm font-medium">Complete previous week</span>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Badge variant="secondary" className="mb-2" data-testid={`badge-week-${week.number}`}>
              Week {week.number}
            </Badge>
            <CardTitle className="text-xl" data-testid={`text-week-title-${week.number}`}>
              {week.title}
            </CardTitle>
            <CardDescription className="mt-1" data-testid={`text-week-desc-${week.number}`}>
              {week.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{week.topics.length} Topics</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mic className="h-4 w-4" />
            <span>{week.practices.length} Practice</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookText className="h-4 w-4" />
            <span>{week.grammar.length} Grammar</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="h-4 w-4" />
            <span>{week.quizzes.length} Quiz</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium" data-testid={`text-progress-${week.number}`}>
              {progressPercent}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {!isLocked && (
          <Link href={`/week/${week.id}`}>
            <Button className="w-full gap-2" data-testid={`button-start-week-${week.number}`}>
              {progressPercent > 0 ? "Continue" : "Start"} Learning
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
