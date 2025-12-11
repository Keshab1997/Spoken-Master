import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ProfilePage from "@/pages/profile";
import WeekPage from "@/pages/week";
import TopicPage from "@/pages/topic";
import PracticePage from "@/pages/practice";
import GrammarPage from "@/pages/grammar";
import QuizPage from "@/pages/quiz";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/week/:weekId" component={WeekPage} />
      <Route path="/week/:weekId/topic/:topicId" component={TopicPage} />
      <Route path="/week/:weekId/practice/:practiceId" component={PracticePage} />
      <Route path="/week/:weekId/grammar/:grammarId" component={GrammarPage} />
      <Route path="/week/:weekId/quiz" component={QuizPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
