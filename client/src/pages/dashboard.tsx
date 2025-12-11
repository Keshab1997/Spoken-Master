import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WeekCard } from "@/components/WeekCard";
import { weeksData } from "@/lib/weekData";
import { getStoredUser } from "@/lib/auth";
import { BookOpen, Mic, Brain, Trophy } from "lucide-react";

export default function Dashboard() {
  const user = getStoredUser();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="text-dashboard-title">
                {user ? `Welcome back, ${user.name}!` : "Learn English with Confidence"}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground" data-testid="text-dashboard-subtitle">
                Practice speaking English through interactive conversations and speech recognition.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-card rounded-lg p-4 flex flex-col items-center text-center border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="text-2xl font-bold" data-testid="text-stat-topics">6</span>
                <span className="text-sm text-muted-foreground">Topics</span>
              </div>
              <div className="bg-card rounded-lg p-4 flex flex-col items-center text-center border">
                <div className="h-12 w-12 rounded-full bg-accent/30 flex items-center justify-center mb-3">
                  <Mic className="h-6 w-6 text-accent-foreground" />
                </div>
                <span className="text-2xl font-bold" data-testid="text-stat-practices">6</span>
                <span className="text-sm text-muted-foreground">Practice Sessions</span>
              </div>
              <div className="bg-card rounded-lg p-4 flex flex-col items-center text-center border">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-secondary-foreground" />
                </div>
                <span className="text-2xl font-bold" data-testid="text-stat-grammar">3</span>
                <span className="text-sm text-muted-foreground">Grammar Rules</span>
              </div>
              <div className="bg-card rounded-lg p-4 flex flex-col items-center text-center border">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Trophy className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-2xl font-bold" data-testid="text-stat-quizzes">9</span>
                <span className="text-sm text-muted-foreground">Quizzes</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold" data-testid="text-curriculum-title">Your Curriculum</h2>
                <span className="text-sm text-muted-foreground">3 Weeks</span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {weeksData.map((week, index) => (
                  <WeekCard 
                    key={week.id} 
                    week={week} 
                    isLocked={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
