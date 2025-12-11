import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Message {
  id: string;
  speaker: string;
  text: string;
  isUser: boolean;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  messages: Message[];
}

export interface PracticeSession {
  id: string;
  title: string;
  targetPhrases: string[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Week {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: Topic[];
  practices: PracticeSession[];
  grammar: GrammarRule[];
  quizzes: Quiz[];
}

export interface UserProgress {
  id: string;
  weekId: string;
  topicsCompleted: string[];
  practicesCompleted: string[];
  grammarCompleted: string[];
  quizzesCompleted: string[];
}
