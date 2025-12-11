import { Link, useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { weeksData } from "@/lib/weekData";
import { getWeekProgress } from "@/lib/auth";
import { ArrowLeft, BookOpen, Mic, BookText, HelpCircle, CheckCircle2, ChevronRight } from "lucide-react";

export default function WeekPage() {
  const [, params] = useRoute("/week/:weekId");
  const [, setLocation] = useLocation();
  const weekId = params?.weekId;
  
  const week = weeksData.find(w => w.id === weekId);
  const progress = weekId ? getWeekProgress(weekId) : null;

  if (!week) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Week not found</h1>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isTopicCompleted = (id: string) => progress?.topicsCompleted.includes(id);
  const isPracticeCompleted = (id: string) => progress?.practicesCompleted.includes(id);
  const isGrammarCompleted = (id: string) => progress?.grammarCompleted.includes(id);
  const isQuizCompleted = (id: string) => progress?.quizzesCompleted.includes(id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 -ml-2"
            onClick={() => setLocation("/")}
            data-testid="button-back-dashboard"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <Badge variant="secondary" className="mb-2">Week {week.number}</Badge>
            <h1 className="text-3xl font-bold" data-testid="text-week-title">{week.title}</h1>
            <p className="text-muted-foreground mt-1" data-testid="text-week-description">{week.description}</p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Topics</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {week.topics.map((topic) => (
                  <Link key={topic.id} href={`/week/${week.id}/topic/${topic.id}`}>
                    <Card className="overflow-visible hover-elevate cursor-pointer h-full" data-testid={`card-topic-${topic.id}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{topic.title}</CardTitle>
                          {isTopicCompleted(topic.id) && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          )}
                        </div>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{topic.messages.length} messages</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Mic className="h-5 w-5 text-accent-foreground" />
                <h2 className="text-xl font-semibold">Speaking Practice</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {week.practices.map((practice) => (
                  <Link key={practice.id} href={`/week/${week.id}/practice/${practice.id}`}>
                    <Card className="overflow-visible hover-elevate cursor-pointer h-full" data-testid={`card-practice-${practice.id}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{practice.title}</CardTitle>
                          {isPracticeCompleted(practice.id) && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          )}
                        </div>
                        <CardDescription>Practice speaking these phrases</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{practice.targetPhrases.length} phrases</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookText className="h-5 w-5 text-secondary-foreground" />
                <h2 className="text-xl font-semibold">Grammar</h2>
              </div>
              <div className="grid gap-4">
                {week.grammar.map((rule) => (
                  <Link key={rule.id} href={`/week/${week.id}/grammar/${rule.id}`}>
                    <Card className="overflow-visible hover-elevate cursor-pointer" data-testid={`card-grammar-link-${rule.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-accent flex items-center justify-center shrink-0">
                              <BookText className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{rule.title}</CardTitle>
                              <CardDescription className="line-clamp-1">{rule.explanation}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isGrammarCompleted(rule.id) && (
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Quizzes</h2>
              </div>
              <Link href={`/week/${week.id}/quiz`}>
                <Card className="overflow-visible hover-elevate cursor-pointer" data-testid="card-quiz-section">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">Test Your Knowledge</CardTitle>
                        <CardDescription>{week.quizzes.length} questions to test what you learned</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{week.quizzes.filter(q => isQuizCompleted(q.id)).length}/{week.quizzes.length}</Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
