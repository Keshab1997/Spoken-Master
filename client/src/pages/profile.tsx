import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getStoredUser, logoutUser, getProgress } from "@/lib/auth";
import { weeksData } from "@/lib/weekData";
import { User, BookOpen, Mic, Brain, Trophy, LogOut } from "lucide-react";
import { useEffect } from "react";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const user = getStoredUser();
  const progress = getProgress();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  if (!user) return null;

  const totalTopics = weeksData.reduce((acc, w) => acc + w.topics.length, 0);
  const totalPractices = weeksData.reduce((acc, w) => acc + w.practices.length, 0);
  const totalGrammar = weeksData.reduce((acc, w) => acc + w.grammar.length, 0);
  const totalQuizzes = weeksData.reduce((acc, w) => acc + w.quizzes.length, 0);

  const completedTopics = progress.reduce((acc, p) => acc + p.topicsCompleted.length, 0);
  const completedPractices = progress.reduce((acc, p) => acc + p.practicesCompleted.length, 0);
  const completedGrammar = progress.reduce((acc, p) => acc + p.grammarCompleted.length, 0);
  const completedQuizzes = progress.reduce((acc, p) => acc + p.quizzesCompleted.length, 0);

  const totalItems = totalTopics + totalPractices + totalGrammar + totalQuizzes;
  const completedItems = completedTopics + completedPractices + completedGrammar + completedQuizzes;
  const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleLogout = () => {
    logoutUser();
    setLocation("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold" data-testid="text-profile-name">{user.name}</h1>
                <p className="text-muted-foreground" data-testid="text-profile-username">@{user.username}</p>
                
                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium" data-testid="text-overall-progress">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Your Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Topics</span>
                  </div>
                  <p className="text-2xl font-bold" data-testid="text-topics-progress">
                    {completedTopics}/{totalTopics}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Mic className="h-5 w-5 text-accent-foreground" />
                    <span className="text-sm text-muted-foreground">Practice</span>
                  </div>
                  <p className="text-2xl font-bold" data-testid="text-practices-progress">
                    {completedPractices}/{totalPractices}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="h-5 w-5 text-secondary-foreground" />
                    <span className="text-sm text-muted-foreground">Grammar</span>
                  </div>
                  <p className="text-2xl font-bold" data-testid="text-grammar-progress">
                    {completedGrammar}/{totalGrammar}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Quizzes</span>
                  </div>
                  <p className="text-2xl font-bold" data-testid="text-quizzes-progress">
                    {completedQuizzes}/{totalQuizzes}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleLogout}
            data-testid="button-logout-profile"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
